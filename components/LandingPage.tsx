import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to the <span className="text-blue-500">AI Resume Builder</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Craft your professional story, powered by intelligence.
        </p>
        
        <button
          onClick={onStart}
          aria-label="Start building your resume"
          className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 transform hover:scale-105"
        >
          Start Resume Building
        </button>

        <p className="mt-8 text-md italic text-gray-500 dark:text-gray-400">
          "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt
        </p>
      </div>

      <footer className="absolute bottom-4 text-xs text-gray-400 dark:text-gray-500">
        <p>add by DUAL-SYNC</p>
      </footer>
    </div>
  );
};

export default LandingPage;
