import React, { useEffect, useState } from 'react';
import { GoogleUser, initializeGoogleSignIn, getCurrentUser, signOutUser } from '../utils/googleAuth';
import { LogOut, User } from 'lucide-react';

interface GoogleSignInProps {
  onSignIn?: (user: GoogleUser) => void;
  onSignOut?: () => void;
  showUserProfile?: boolean;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({
  onSignIn,
  onSignOut,
  showUserProfile = true,
}) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId) {
          setError('Google Client ID not configured');
          setLoading(false);
          return;
        }

        // Initialize Google Sign-In
        await initializeGoogleSignIn(clientId);

        // Check if user is already signed in
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          onSignIn?.(currentUser);
        }

        // Listen for sign-in events
        const handleSignIn = (event: CustomEvent) => {
          const signedInUser = event.detail as GoogleUser;
          setUser(signedInUser);
          setShowDropdown(false);
          onSignIn?.(signedInUser);
        };

        // Listen for sign-out events
        const handleSignOut = () => {
          setUser(null);
          setShowDropdown(false);
          onSignOut?.();
        };

        window.addEventListener('google-signin-success', handleSignIn as EventListener);
        window.addEventListener('google-signout', handleSignOut);

        setLoading(false);

        return () => {
          window.removeEventListener('google-signin-success', handleSignIn as EventListener);
          window.removeEventListener('google-signout', handleSignOut);
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Google Sign-In';
        setError(errorMessage);
        setLoading(false);
      }
    };

    initializeAuth();
  }, [onSignIn, onSignOut]);

  const handleSignOut = () => {
    signOutUser();
    setUser(null);
    setShowDropdown(false);
    onSignOut?.();
  };

  if (loading) {
    return (
      <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 py-2 text-sm text-red-500">
        {error}
      </div>
    );
  }

  // User is signed in
  if (user && showUserProfile) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
          title={user.email}
        >
          {user.picture && (
            <img
              src={user.picture}
              alt={user.name}
              className="w-5 h-5 rounded-full"
            />
          )}
          <span className="hidden sm:inline max-w-[100px] truncate">{user.given_name}</span>
          <span className="sm:hidden">
            <User className="w-4 h-4" />
          </span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mb-3"
                />
              )}
              <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 border-t border-gray-200 dark:border-gray-700"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  // User is not signed in - render sign-in button container
  return (
    <div
      id="google-signin-button"
      className="flex justify-center"
    />
  );
};

export default GoogleSignIn;
