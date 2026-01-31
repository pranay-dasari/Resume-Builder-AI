import React from 'react';
import { CheckCircle, Zap, Download, Shield } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

interface ResumeBuilderPageProps {
  onBuildSimple: () => void;
  onBuildCustom: () => void;
  onBack: () => void;
}

const ResumeBuilderPage: React.FC<ResumeBuilderPageProps> = ({ onBuildSimple, onBuildCustom, onBack }) => {
  // Apply SEO metadata for this page
  usePageSEO({
    title: 'Free Resume Builder | AI Resume Builder & Free Resume Download',
    description: 'Build a professional, ATS-friendly resume for free using our AI Resume Builder. Download your resume instantly in PDF format.',
    canonicalUrl: 'https://buildresumenow.in/resume-builder',
    ogUrl: 'https://buildresumenow.in/resume-builder',
  });

  return (
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
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Build Your Professional Resume in Minutes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Create an ATS-friendly resume using our AI-powered resume builder. Choose the mode that fits your needs.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
            {/* Simple Mode Button */}
            <button
              onClick={onBuildSimple}
              className="flex-1 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-300 group text-left"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Simple Resume</h3>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">Recommended</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Perfect for standard, professional resumes. Quick, easy, and auto-formatted for best ATS results.
              </p>
              <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline flex items-center">
                Start Simple Build
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </button>

            {/* Custom Mode Button */}
            <button
              onClick={onBuildCustom}
              className="flex-1 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border-2 border-transparent hover:border-purple-500 hover:shadow-xl transition-all duration-300 group text-left"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                  <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Custom Resume</h3>
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">Advanced</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Full control over layout, fonts, colors, and styling. Best for creative roles or specific design needs.
              </p>
              <span className="text-purple-600 dark:text-purple-400 font-medium group-hover:underline flex items-center">
                Start Custom Build
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </button>
          </div>
        </section>

        {/* Features grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Why Choose Our Resume Builder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy to Use</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Simple, intuitive interface that guides you through creating a professional resume step by step.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
                <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Download</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download your resume as a PDF instantly. No waiting, no hidden fees, completely free.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ATS-Friendly</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our resumes are optimized to pass Applicant Tracking Systems and get noticed by recruiters.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mb-4">
                <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get intelligent suggestions to improve your resume content and make it stand out.
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
              <span className="text-gray-700 dark:text-gray-300">Professional resume templates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">Customizable designs and colors</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">Real-time preview of your resume</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">ATS compatibility checker</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">PDF download in seconds</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">100% free, no credit card required</span>
            </li>
          </ul>
        </section>

        {/* CTA section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Build Your Resume?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of job seekers who have successfully created their resumes with our free builder.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onBuildSimple}
              className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Build Simple Resume
            </button>
            <button
              onClick={onBuildCustom}
              className="px-8 py-3 bg-purple-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
            >
              Build Custom Resume
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResumeBuilderPage;
