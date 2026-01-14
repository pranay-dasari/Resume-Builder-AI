import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    isLoading: boolean;
    isAnonymous: boolean;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    isLoading: true,
    isAnonymous: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        // 1. Check active session on load
        const initializeAuth = async () => {
            try {
                const { data: { session: existingSession }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error("Error getting session:", error);
                }

                if (existingSession) {
                    if (mounted) {
                        setSession(existingSession);
                        setUser(existingSession.user);
                    }
                } else {
                    // 2. If no active session, sign in anonymously
                    console.log("No active session, signing in anonymously...");
                    const { data: { session: anonSession }, error: anonError } = await supabase.auth.signInAnonymously();

                    if (anonError) {
                        console.error("Error signing in anonymously:", anonError);
                        // Gracefully continue even if auth fails, app can still work in read-only or local mode depending on logic
                    } else if (anonSession) {
                        if (mounted) {
                            setSession(anonSession);
                            setUser(anonSession.user);
                        }
                    }
                }
            } catch (err) {
                console.error("Unexpected error during auth initialization:", err);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        initializeAuth();

        // 3. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (mounted) {
                setSession(session);
                setUser(session?.user ?? null);
                setIsLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // Safe check for anonymous status
    // supabase-js creates a user with `is_anonymous` property (if supported by version) 
    // or we can assume if identity provider is 'anonymous' (or check identities array)
    const isAnonymous = user?.is_anonymous ?? false;

    const value = {
        session,
        user,
        isLoading,
        isAnonymous,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
