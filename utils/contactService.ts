import { supabase } from './supabase';
import { ResumeData } from '../types';

export interface ContactData {
  id?: string;
  email: string;
  phone: string;
  website: string;
  profiles: Array<{
    network: string;
    username: string;
    url: string;
  }>;
  created_at?: string;
  updated_at?: string;
}

/**
 * Save contact information (email and social media) to Supabase
 */
export const saveContactInfo = async (resumeData: ResumeData): Promise<{ success: boolean; error?: string; data?: ContactData }> => {
  try {
    const contactData: ContactData = {
      email: resumeData.basics.email,
      phone: resumeData.basics.phone,
      website: resumeData.basics.website,
      profiles: resumeData.profiles.map(profile => ({
        network: profile.network,
        username: profile.username,
        url: profile.url,
      })),
    };

    const { data, error } = await supabase
      .from('contacts')
      .insert([contactData])
      .select();

    if (error) {
      console.error('Error saving contact info:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error in saveContactInfo:', errorMessage);
    return { success: false, error: errorMessage };
  }
};

/**
 * Update existing contact information
 */
export const updateContactInfo = async (id: string, resumeData: ResumeData): Promise<{ success: boolean; error?: string; data?: ContactData }> => {
  try {
    const contactData: Partial<ContactData> = {
      email: resumeData.basics.email,
      phone: resumeData.basics.phone,
      website: resumeData.basics.website,
      profiles: resumeData.profiles.map(profile => ({
        network: profile.network,
        username: profile.username,
        url: profile.url,
      })),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('contacts')
      .update(contactData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating contact info:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error in updateContactInfo:', errorMessage);
    return { success: false, error: errorMessage };
  }
};

/**
 * Fetch all saved contacts
 */
export const fetchContacts = async (): Promise<{ success: boolean; error?: string; data?: ContactData[] }> => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error in fetchContacts:', errorMessage);
    return { success: false, error: errorMessage };
  }
};

/**
 * Delete a contact record
 */
export const deleteContact = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error in deleteContact:', errorMessage);
    return { success: false, error: errorMessage };
  }
};
