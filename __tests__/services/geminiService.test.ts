/**
 * @jest-environment jsdom
 */

import { enhanceCoverLetterWithAI } from '../../services/geminiService';
import { initialResumeData } from '../../types';

const mockResumeData = {
  ...initialResumeData,
  summary: 'Experienced software developer with 5 years in web development',
  experience: [
    {
      id: '1',
      company: 'Tech Solutions',
      position: 'Senior Developer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      isCurrent: true,
      summary: 'Led development of web applications using React and Node.js'
    }
  ],
  skills: [
    {
      id: '1',
      name: 'Programming Languages',
      keywords: ['JavaScript', 'TypeScript', 'Python']
    }
  ]
};

describe('geminiService', () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  describe('enhanceCoverLetterWithAI', () => {
    test('throws error when job title is missing', async () => {
      await expect(
        enhanceCoverLetterWithAI('', 'Tech Corp', mockResumeData)
      ).rejects.toThrow('Job title is required for AI enhancement');
    });

    test('throws error when company name is missing', async () => {
      await expect(
        enhanceCoverLetterWithAI('Developer', '', mockResumeData)
      ).rejects.toThrow('Company name is required for AI enhancement');
    });

    test('calls AI API via fetch with correct parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, content: 'Generated cover letter content' })
      });

      const result = await enhanceCoverLetterWithAI(
        'Software Developer',
        'Tech Corp',
        mockResumeData,
        'Draft content'
      );

      expect(mockFetch).toHaveBeenCalledWith('/api/ai', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }));

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.prompt).toContain('Software Developer');
      expect(body.systemMessage).toContain('expert career consultant');
      expect(body.type).toBe('coverLetter');
      expect(result).toBe('Generated cover letter content');
    });

    test('includes resume context in the payload', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, content: 'Generated content' })
      });

      await enhanceCoverLetterWithAI(
        'Software Developer',
        'Tech Corp',
        mockResumeData
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.prompt).toContain('Software Developer');
      expect(body.prompt).toContain('Tech Corp');
      expect(body.prompt).toContain('Experienced software developer');
      expect(body.prompt).toContain('Senior Developer at Tech Solutions');
      expect(body.prompt).toContain('JavaScript, TypeScript, Python');
    });

    test('handles HTTP errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429
      });

      await expect(
        enhanceCoverLetterWithAI('Developer', 'Tech Corp', mockResumeData)
      ).rejects.toThrow('HTTP error! status: 429');
    });

    test('handles API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: false, error: 'API rate limit exceeded' })
      });

      await expect(
        enhanceCoverLetterWithAI('Developer', 'Tech Corp', mockResumeData)
      ).rejects.toThrow('API rate limit exceeded');
    });

    test('includes body draft when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, content: 'Enhanced content' })
      });

      await enhanceCoverLetterWithAI(
        'Developer',
        'Tech Corp',
        mockResumeData,
        'My draft content'
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.prompt).toContain('My draft content');
      expect(body.bodyDraft).toBe('My draft content');
    });

    test('handles empty resume data gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, content: 'Generated content' })
      });

      const emptyResumeData = {
        ...initialResumeData,
        experience: [],
        skills: [],
        education: []
      };

      const result = await enhanceCoverLetterWithAI(
        'Developer',
        'Tech Corp',
        emptyResumeData
      );

      expect(result).toBe('Generated content');
      expect(mockFetch).toHaveBeenCalled();
    });

    test('trims whitespace from required fields', async () => {
      await expect(
        enhanceCoverLetterWithAI('  ', 'Tech Corp', mockResumeData)
      ).rejects.toThrow('Job title is required for AI enhancement');

      await expect(
        enhanceCoverLetterWithAI('Developer', '  ', mockResumeData)
      ).rejects.toThrow('Company name is required for AI enhancement');
    });
  });
});