import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { parseResumeFile, normalizeResumeText, extractSkillsFromText } from '../../utils/resumeParser';
import { calculateATSScore, ATSScoreResult, JobDescriptionInput } from '../../services/atsService';
import ATSScore from './ATSScore';

interface ATSCalculatorState {
  resumeFile: File | null;
  resumeText: string;
  jobDescription: string;
  loading: boolean;
  error: string | null;
  results: ATSScoreResult | null;
}

const ATSCalculator: React.FC<{ onBack: () => void; onBuildResume?: () => void; onBuildCoverLetter?: () => void }> = ({ onBack, onBuildResume, onBuildCoverLetter }) => {
  const [state, setState] = useState<ATSCalculatorState>({
    resumeFile: null,
    resumeText: '',
    jobDescription: '',
    loading: false,
    error: null,
    results: null,
  });

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      setState(prev => ({
        ...prev,
        error: 'File size exceeds 2MB limit. Please upload a smaller file.'
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const text = await parseResumeFile(file);
      setState(prev => ({
        ...prev,
        resumeFile: file,
        resumeText: text,
        loading: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to parse resume file',
        loading: false,
      }));
    }
  };

  const handleCalculate = async () => {
    if (!state.resumeText || !state.jobDescription) {
      setState(prev => ({
        ...prev,
        error: 'Please upload a resume and enter a job description'
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Extract skills from resume text
      const resumeSkills = extractSkillsFromText(state.resumeText);

      // Parse job description to extract skills
      const jdSkills = extractSkillsFromText(state.jobDescription);

      // Create a mock ResumeData object from parsed text
      const mockResumeData = {
        basics: {
          name: 'Candidate',
          headline: '',
          photo: '',
          email: '',
          phone: '',
          website: '',
          location: '',
        },
        summary: state.resumeText,
        profiles: [],
        experience: [
          {
            id: '1',
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrent: false,
            summary: state.resumeText,
          }
        ],
        education: [
          {
            id: '1',
            institution: '',
            degree: '',
            areaOfStudy: '',
            startDate: '',
            endDate: '',
            summary: '',
          }
        ],
        skills: [
          {
            id: '1',
            name: 'Skills',
            keywords: resumeSkills,
          }
        ],
        languages: [],
        certifications: [],
        projects: [],
        interests: [],
        references: '',
        sectionOrder: [],
        layout: {},
      };

      const jobDescriptionInput: JobDescriptionInput = {
        description: state.jobDescription,
        required_skills: jdSkills,
      };

      const result = calculateATSScore(mockResumeData, jobDescriptionInput);
      setState(prev => ({
        ...prev,
        results: result,
        loading: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to calculate ATS score',
        loading: false,
      }));
    }
  };

  const isCalculateDisabled = !state.resumeText || !state.jobDescription || state.loading;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            <span className="text-blue-500">ATS</span> Score Calculator
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onBuildResume}
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-blue-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Build Resume Now
          </button>
          <button
            onClick={onBuildCoverLetter}
            className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md shadow-sm hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-gray-700 dark:text-green-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Build Cover Letter
          </button>
        </div>
      </header>

      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title and Description */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Upload your resume and paste a job description
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              See how well your resume matches the role.
            </p>
          </div>

        {/* Error Alert */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 dark:text-red-300">{state.error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Resume Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Upload Resume
            </h2>

            <div className="mb-4">
              <label className="block">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 font-semibold">
                    {state.resumeFile ? state.resumeFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    PDF or DOCX (max 2MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleResumeUpload}
                  disabled={state.loading}
                  className="hidden"
                />
              </label>
            </div>

            {state.resumeFile && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300 text-sm">
                  Resume uploaded successfully
                </span>
              </div>
            )}

            {state.resumeText && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-blue-700 dark:text-blue-300 text-sm font-semibold mb-2">
                  Resume Preview (first 300 characters):
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-xs line-clamp-3">
                  {state.resumeText.substring(0, 300)}...
                </p>
              </div>
            )}
          </div>

          {/* Job Description Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Job Description
            </h2>

            <textarea
              value={state.jobDescription}
              onChange={(e) => setState(prev => ({ ...prev, jobDescription: e.target.value }))}
              placeholder="Paste the job description here..."
              disabled={state.loading}
              className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {state.jobDescription && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-blue-700 dark:text-blue-300 text-sm font-semibold mb-2">
                  Job Description Preview (first 300 characters):
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-xs line-clamp-3">
                  {state.jobDescription.substring(0, 300)}...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleCalculate}
            disabled={isCalculateDisabled}
            className={`px-8 py-4 font-bold text-lg rounded-lg transition-all duration-300 ${
              isCalculateDisabled
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {state.loading ? 'Calculating...' : 'Calculate ATS Score'}
          </button>
        </div>

        {/* Results Section */}
        {state.results && (
          <div className="space-y-6">
            {/* Main Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ATSScore
                score={state.results.score}
                label="Overall ATS Score"
                subLabel="Your resume's match to the job description"
              />

              {/* Breakdown */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Score Breakdown
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">
                        Hard Constraints
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {state.results.breakdown.hard_constraints}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${state.results.breakdown.hard_constraints}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">
                        Skill Match
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {state.results.breakdown.skill_match}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${state.results.breakdown.skill_match}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">
                        Semantic Match
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {state.results.breakdown.semantic_match}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${state.results.breakdown.semantic_match}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matched Skills */}
            {state.results.metadata.matched_skills.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Matched Skills ({state.results.metadata.matched_skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {state.results.metadata.matched_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {(state.results.gap_analysis.critical_missing.length > 0 ||
              state.results.gap_analysis.bonus_missing.length > 0) && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  Missing Skills
                </h3>

                {state.results.gap_analysis.critical_missing.length > 0 && (
                  <div className="mb-4">
                    <p className="text-red-700 dark:text-red-300 font-semibold mb-2">
                      Critical Missing Skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {state.results.gap_analysis.critical_missing.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {state.results.gap_analysis.bonus_missing.length > 0 && (
                  <div>
                    <p className="text-amber-700 dark:text-amber-300 font-semibold mb-2">
                      Bonus Skills to Consider:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {state.results.gap_analysis.bonus_missing.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Experience Flag */}
            {state.results.metadata.experience_flag && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-700 dark:text-blue-300">
                  {state.results.metadata.experience_flag}
                </p>
              </div>
            )}

            {/* Suggestions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Suggestions to Improve Your Match
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
                  <span>
                    Add missing critical skills to your resume if you have experience with them
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
                  <span>
                    Use keywords from the job description in your work experience descriptions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
                  <span>
                    Highlight achievements that demonstrate the required skills
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
                  <span>
                    Consider adding a professional summary that aligns with the role
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
                  <span>
                    Ensure your resume is well-formatted and ATS-friendly
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ATSCalculator;
