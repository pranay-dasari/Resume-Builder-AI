import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

export interface User {
    name: string;
    email: string;
    picture: string;
    googleId: string;
    image?: string;
}

interface AuthContextType {
    user: User | null;
    isGoogleLoaded: boolean;
    login: () => void;
    logout: () => void;
    handleGoogleSignIn: (response: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

    const handleGoogleSignIn = useCallback((response: any) => {
        try {
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            const newUser: User = {
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                googleId: payload.sub,
                image: payload.picture
            };
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            setUser(newUser);
        } catch (error) {
            console.error("Failed to parse Google sign-in response", error);
        }
    }, []);

    useEffect(() => {
        // Determine initial user state
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
            }
        }

        const initGoogleAuth = () => {
            if (!(window as any).google) return;

            const client_id = process.env.GOOGLE_CLIENT_ID;
            if (!client_id) {
                console.error("Google Client ID is missing.");
                return;
            }

            (window as any).google.accounts.id.initialize({
                client_id,
                callback: handleGoogleSignIn,
                auto_select: false, // Disable auto_select to prevent sticky sign-ins
                cancel_on_tap_outside: false,
                use_fedcm_for_prompt: false
            });

            setIsGoogleLoaded(true);

            // We don't automatically prompt for auto-select here anymore
            // to avoid race conditions and unexpected sign-ins.
            // The AuthButton will handle rendering the sign-in button.
        };

        if ((window as any).google) {
            initGoogleAuth();
        } else {
            window.addEventListener('load', initGoogleAuth);
        }

        // Listen for storage changes in case login happens in another tab
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'loggedInUser') {
                setUser(e.newValue ? JSON.parse(e.newValue) : null);
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('load', initGoogleAuth);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [handleGoogleSignIn]);

    const login = () => {
        if ((window as any).google) {
            (window as any).google.accounts.id.prompt();
        } else {
            alert("Google Sign-In is still loading. Please try again in a moment.");
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('loggedInUser');

            if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.id) {
                (window as any).google.accounts.id.disableAutoSelect();
                (window as any).google.accounts.id.cancel();
            }
        } catch (error) {
            console.error("AuthContext: Error during logout cleanup", error);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isGoogleLoaded, login, logout, handleGoogleSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
