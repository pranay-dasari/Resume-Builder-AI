import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Zap, Download, Sparkles } from 'lucide-react';

interface CoverLetterBuilderPageProps {
  onStart: () => void;
  onBack: () => void;
}

const CoverLetterBuilderPage: React.FC<CoverLetterBuilderPageProps> = ({ onStart, onBack }) => {

  return (
    <>
      <Helmet>
        <title>Free Cover Letter Builder | AI Cover Letter Generator</title>
        <meta
          name="description"
          content="Create a professional cover letter for free using our AI Cover Letter Builder. Fast, simple, and downloadable in one click."
        />
        <link
          rel="canonical"
          href="https://buildresumenow.in/cover-letter-builder"
        />
        <meta property="og:url" content="https://buildresumenow.in/cover-letter-builder" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* Back button - Top Left */}
      <div className="px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
      </div>

      {/* Main content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-12">
        {/* Hero section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Create a Professional Cover Letter in Minutes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
            Write a compelling cover letter using our AI cover letter generator. Download instantly and impress employers with a personalized letter.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 transform hover:scale-105"
          >
            Start Writing Your Cover Letter
          </button>
        </section>

        {/* Features grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Why Use Our Cover Letter Builder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast & Simple</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create a professional cover letter in just a few minutes with our easy-to-use builder.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
                <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">One-Click Download</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download your cover letter as a PDF with a single click. No registration required.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Writing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get intelligent suggestions to enhance your cover letter and make it more compelling.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mb-4">
                <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Professional Templates</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose from multiple professionally designed templates that impress employers.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="mb-16 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What You Get</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">Multiple professional templates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">Customizable fonts and colors</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">Real-time preview</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">Sync with your resume data</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">PDF download instantly</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">100% free, no credit card needed</span>
            </li>
          </ul>
        </section>

        {/* CTA section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Write Your Cover Letter?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Stand out from other candidates with a personalized, professional cover letter.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 transform hover:scale-105"
          >
            Start Writing Now
          </button>
        </section>
      </main>
    </div>
    </>
  );
};

export default CoverLetterBuilderPage;
