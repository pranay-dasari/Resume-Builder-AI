import React from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthButton: React.FC = () => {
    const { user, login, logout, isGoogleLoaded } = useAuth();

    if (user) {
        return (
            <button
                onClick={() => {
                    if (window.confirm('Are you sure you want to sign out?')) {
                        logout();
                    }
                }}
                title="Sign Out"
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
            >
                <img
                    src={user.image || user.picture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/default-avatar.png";
                    }}
                />
            </button>
        );
    }

    return (
        <button
            onClick={login}
            disabled={!isGoogleLoaded}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-md whitespace-nowrap ${isGoogleLoaded
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
        >
            Sign In
        </button>
    );
};

export default AuthButton;
