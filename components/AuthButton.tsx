import React from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthButton: React.FC = () => {
    const { user, login, logout, isGoogleLoaded } = useAuth();

    if (user) {
        return (
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
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
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                    }}
                />
            </button>
        );
    }

    return (
        <div className="flex items-center min-h-[40px] justify-end">
            {!isGoogleLoaded ? (
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-9 w-28 rounded-full shadow-sm"></div>
            ) : (
                <button
                    onClick={login}
                    className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                >
                    Sign In
                </button>
            )}
        </div>
    );
};

export default AuthButton;
