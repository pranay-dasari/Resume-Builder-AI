import React from 'react';

interface ArtifactSelectorProps {
  onSelectResume: () => void;
  onSelectCoverLetter: () => void;
  onATSCalculator: () => void;
  onBack: () => void;
}

const ArtifactSelector: React.FC<ArtifactSelectorProps> = ({ onSelectResume, onSelectCoverLetter, onATSCalculator, onBack }) => {
  const handleContactUs = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4 relative">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
      >
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      {/* Contact Us Button - Top Right */}
      <button
        onClick={handleContactUs}
        aria-label="Contact Us"
        className="absolute top-4 right-4 px-8 py-3 bg-blue-600 text-white font-bold text-sm rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 transform hover:scale-105"
      >
        Contact Us
      </button>

      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Choose What to <span className="text-blue-500">Build</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12">
          Select the type of document you'd like to create with AI assistance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Resume Card */}
          <div
            onClick={onSelectResume}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Build Resume
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
                Create a professional, ATS-friendly resume with AI-powered content enhancement and multiple templates.
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  ATS-Friendly
                </span>
                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                  AI Enhanced
                </span>
                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                  Multiple Templates
                </span>
              </div>
            </div>
          </div>

          {/* Cover Letter Card */}
          <div
            onClick={onSelectCoverLetter}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Build Cover Letter
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
                Craft compelling cover letters that sync with your resume data and leverage AI for personalized content.
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                  Data Sync
                </span>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  AI Powered
                </span>
                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                  Professional
                </span>
              </div>
            </div>
          </div>

          {/* ATS Score Calculator Card */}
          <div
            onClick={onATSCalculator}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                ATS Score Calculator
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
                Check how well your resume matches job descriptions with our ATS compatibility analyzer.
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs rounded-full">
                  Score Analysis
                </span>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  Skill Matching
                </span>
                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                  Instant Feedback
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Both tools work together seamlessly - your resume data automatically syncs to your cover letters.
          </p>
        </div>
      </div>


    </div>
  );
};

export default ArtifactSelector;