import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveTempResume, getTempResume, syncTempResumeToSupabase, TempResumeData } from '../utils/resumeStorage';

const ResumeAnalyzer: React.FC = () => {
    const { session, isAnonymous, user, isLoading } = useAuth();
    const [analysisResult, setAnalysisResult] = useState<TempResumeData | null>(null);
    const [syncStatus, setSyncStatus] = useState<string>('');

    // Load temp data on mount
    useEffect(() => {
        const temp = getTempResume();
        if (temp) {
            setAnalysisResult(temp);
        }
    }, []);

    // Sync when user becomes authenticated (not anonymous) and we have temp data
    useEffect(() => {
        if (user && !isAnonymous && analysisResult) {
            // In a real app, you might ask for confirmation or do this silently
            // For this example, we'll suggest it via UI or auto-sync if appropriate
            console.log("User is authenticated. Ready to sync.");
        }
    }, [user, isAnonymous, analysisResult]);

    const handleAnalyze = () => {
        // Simulate ATS analysis
        const dummyResult: TempResumeData = {
            resumeText: "Sample resume text...",
            atsScore: 85,
            suggestions: ["Add more keywords", "Improve formatting"],
            timestamp: Date.now()
        };

        setAnalysisResult(dummyResult);

        if (isAnonymous || !session) {
            saveTempResume(dummyResult);
            console.log("Saved to local storage (anonymous mode)");
        } else {
            // Direct save to DB logic would go here for logged-in users
            console.log("Direct save to DB (authenticated mode)");
        }
    };

    const handleManualSync = async () => {
        if (user && !isAnonymous) {
            setSyncStatus('Syncing...');
            const success = await syncTempResumeToSupabase(user.id);
            if (success) {
                setSyncStatus('Synced successfully! Local storage cleared.');
                setAnalysisResult(null); // Or keep it but know it's in DB
            } else {
                setSyncStatus('Sync failed.');
            }
        } else {
            setSyncStatus('Please sign in to sync.');
        }
    };


    if (isLoading) return <div>Loading Auth...</div>;

    return (
        <div className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800 my-4">
            <h2 className="text-xl font-bold mb-2">Resume Analyzer (Auth Integration Test)</h2>

            <div className="mb-4">
                <p><strong>Status:</strong> {session ? 'Signed In' : 'Signed Out'}</p>
                <p><strong>Mode:</strong> {isAnonymous ? 'Anonymous (Guest)' : 'Authenticated (User)'}</p>
                <p><strong>User ID:</strong> {user?.id ?? 'N/A'}</p>
            </div>

            <div className="space-x-2 mb-4">
                <button
                    onClick={handleAnalyze}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Simulate Analyze Resume
                </button>

                {/* In real app, this would be your "Sign In with Google" button */}
                {!isAnonymous && (
                    <button
                        onClick={handleManualSync}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        disabled={!analysisResult}
                    >
                        Sync to Cloud
                    </button>
                )}
            </div>

            {analysisResult && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900 rounded border border-yellow-200 dark:border-yellow-700">
                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-100">Analysis Result (Temporarily Saved)</h3>
                    <p>ATS Score: {analysisResult.atsScore}</p>
                    <p>Suggestions: {analysisResult.suggestions.join(', ')}</p>
                    {isAnonymous && <p className="text-sm text-gray-500 mt-2">Sign in to save this permanently.</p>}
                </div>
            )}

            {syncStatus && <p className="mt-2 text-sm font-semibold">{syncStatus}</p>}
        </div>
    );
};

export default ResumeAnalyzer;
