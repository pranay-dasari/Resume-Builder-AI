import { supabase } from './supabase';

const TEMP_STORAGE_KEY = 'temp_resume_data';

export interface TempResumeData {
    resumeText: string;
    atsScore: number;
    suggestions: string[];
    timestamp: number;
}

// Save temporary data to local storage
export const saveTempResume = (data: Omit<TempResumeData, 'timestamp'>) => {
    try {
        const dataToSave: TempResumeData = {
            ...data,
            timestamp: Date.now(),
        };
        localStorage.setItem(TEMP_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
        console.error('Failed to save temporary resume data:', error);
    }
};

// Retrieve temporary data from local storage
export const getTempResume = (): TempResumeData | null => {
    try {
        const stored = localStorage.getItem(TEMP_STORAGE_KEY);
        if (!stored) return null;
        return JSON.parse(stored) as TempResumeData;
    } catch (error) {
        console.error('Failed to retrieve temporary resume data:', error);
        return null;
    }
};

// Clear temporary data
export const clearTempResume = () => {
    try {
        localStorage.removeItem(TEMP_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear temporary resume data:', error);
    }
};

// Sync temporary data to Supabase
// Returns true if sync was successful (or no data to sync), false otherwise
export const syncTempResumeToSupabase = async (userId: string): Promise<boolean> => {
    const tempData = getTempResume();

    if (!tempData) {
        return true; // Nothing to sync
    }

    try {
        const { error } = await supabase
            .from('resumes')
            .insert({
                user_id: userId,
                content: tempData,
                created_at: new Date().toISOString(),
            });

        if (error) {
            console.error('Error syncing resume to Supabase:', error);
            return false;
        }

        // Clear local storage only after successful sync
        clearTempResume();
        return true;
    } catch (err) {
        console.error('Unexpected error syncing resume:', err);
        return false;
    }
};
