import { useState, useEffect, useCallback } from 'react';

export interface User {
    name: string;
    email: string;
    picture: string;
    googleId: string;
    image?: string;
}

export const useAuth = () => {
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
                image: payload.picture // Add image alias as requested
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
            setIsGoogleLoaded(true);

            const client_id = (import.meta as any).env.VITE_GOOGLE_CLIENT_ID;
            if (!client_id) {
                console.error("Google Client ID is missing.");
                return;
            }

            (window as any).google.accounts.id.initialize({
                client_id,
                callback: handleGoogleSignIn,
                auto_select: true,
                cancel_on_tap_outside: false
            });

            // If user is NOT logged in, we explicitly prompt for auto-select
            if (!localStorage.getItem('loggedInUser')) {
                (window as any).google.accounts.id.prompt();
            }
        };

        if ((window as any).google) {
            initGoogleAuth();
        } else {
            // In case the script hasn't loaded yet, wait for window load
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
        localStorage.removeItem('loggedInUser');
        if ((window as any).google) {
            (window as any).google.accounts.id.disableAutoSelect();
        }
        setUser(null);
        // Optionally reload to clear any deep state, but React state update should suffice
        // window.location.reload(); 
    };

    return { user, login, logout, isGoogleLoaded };
};
