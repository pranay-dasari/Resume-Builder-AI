/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoverLetterEditor from '../../components/coverLetter/CoverLetterEditor';
import { initialCoverLetterData, initialResumeData } from '../../types';
import * as geminiService from '../../services/geminiService';

// Mock the Gemini service
jest.mock('../../services/geminiService');
const mockEnhanceCoverLetterWithAI = geminiService.enhanceCoverLetterWithAI as jest.MockedFunction<typeof geminiService.enhanceCoverLetterWithAI>;

const mockProps = {
  data: initialCoverLetterData,
  onUpdate: jest.fn(),
  resumeData: initialResumeData
};

describe('CoverLetterEditor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form sections', () => {
    render(<CoverLetterEditor {...mockProps} />);

    expect(screen.getByText('Your Information')).toBeInTheDocument();
    expect(screen.getByText('Recipient Information')).toBeInTheDocument();
    expect(screen.getByText('Job Application Details')).toBeInTheDocument();
    expect(screen.getByText('Letter Content')).toBeInTheDocument();
  });

  test('updates data when form fields change', () => {
    render(<CoverLetterEditor {...mockProps} />);

    // Letter Content is open by default, but Your Information is closed.
    fireEvent.click(screen.getByText('Your Information'));

    const nameInput = screen.getAllByPlaceholderText('John Doe')[0];
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });

    expect(mockProps.onUpdate).toHaveBeenCalledWith({
      ...initialCoverLetterData,
      senderName: 'Jane Smith'
    });
  });

  test('validates required fields', async () => {
    const dataWithErrors = {
      ...initialCoverLetterData,
      senderName: 'Valid Name',
      companyName: 'Valid Company',
      jobTitle: 'Valid Job'
    };

    render(<CoverLetterEditor {...mockProps} data={dataWithErrors} />);

    fireEvent.click(screen.getByText('Your Information'));

    // Trigger validation by changing to empty
    const nameInput = screen.getAllByPlaceholderText('John Doe')[0];
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.blur(nameInput);

    // Should show validation error
    await waitFor(() => {
      const errorMessages = screen.getAllByText('Name is required');
      expect(errorMessages.length).toBeGreaterThan(0);
      expect(errorMessages[0]).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('validates email format', async () => {
    render(<CoverLetterEditor {...mockProps} />);

    fireEvent.click(screen.getByText('Your Information'));

    const emailInput = screen.getByPlaceholderText('john.doe@email.com');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput); // Trigger validation

    await waitFor(() => {
      expect(screen.getAllByText('Please enter a valid email address')[0]).toBeInTheDocument();
    });
  });

  test('AI enhancement requires job title and company name', async () => {
    const dataWithoutRequired = {
      ...initialCoverLetterData,
      jobTitle: '',
      companyName: ''
    };

    render(<CoverLetterEditor {...mockProps} data={dataWithoutRequired} />);

    const aiButton = screen.getByText('Enhance with AI');
    fireEvent.click(aiButton);

    expect(screen.getByText('Please enter a job title before using AI enhancement.')).toBeInTheDocument();
  });

  test('AI enhancement works with valid data', async () => {
    const dataWithRequired = {
      ...initialCoverLetterData,
      jobTitle: 'Software Developer',
      companyName: 'Tech Corp'
    };

    mockEnhanceCoverLetterWithAI.mockResolvedValue('Enhanced cover letter content');

    render(<CoverLetterEditor {...mockProps} data={dataWithRequired} />);

    const aiButton = screen.getByText('Enhance with AI');
    fireEvent.click(aiButton);

    // Should show loading state
    expect(screen.getByText('Enhancing...')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockEnhanceCoverLetterWithAI).toHaveBeenCalledWith(
        'Software Developer',
        'Tech Corp',
        initialResumeData,
        ''
      );
    });

    await waitFor(() => {
      expect(mockProps.onUpdate).toHaveBeenCalledWith({
        ...dataWithRequired,
        bodyContent: 'Enhanced cover letter content'
      });
    });
  });

  test('handles AI enhancement errors', async () => {
    const dataWithRequired = {
      ...initialCoverLetterData,
      jobTitle: 'Software Developer',
      companyName: 'Tech Corp'
    };

    mockEnhanceCoverLetterWithAI.mockRejectedValue(new Error('API Error'));

    render(<CoverLetterEditor {...mockProps} data={dataWithRequired} />);

    // Ensure the AI button is visible, though it might be by default
    // fireEvent.click(screen.getByText('Job Application Details')); // Not strictly needed if button is always visible

    const aiButton = screen.getByText('Enhance with AI');
    fireEvent.click(aiButton);

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  test('salutation and closing dropdowns work', async () => {
    render(<CoverLetterEditor {...mockProps} />);

    // Letter Content is open by default. If we can't find it, try clicking.
    const salutationSelectValue = 'Dear Hiring Manager,';
    let salutationSelect = screen.queryByDisplayValue(salutationSelectValue);

    if (!salutationSelect) {
      fireEvent.click(screen.getByText('Letter Content'));
      salutationSelect = await screen.findByDisplayValue(salutationSelectValue);
    }

    fireEvent.change(salutationSelect, { target: { value: 'Dear Sir/Madam,' } });

    expect(mockProps.onUpdate).toHaveBeenCalledWith({
      ...initialCoverLetterData,
      salutation: 'Dear Sir/Madam,'
    });
  });

  test('character limits are enforced', async () => {
    render(<CoverLetterEditor {...mockProps} />);

    fireEvent.click(screen.getByText('Your Information'));

    const nameInput = screen.getAllByPlaceholderText('John Doe')[0];
    const longName = 'a'.repeat(101);
    fireEvent.change(nameInput, { target: { value: longName } });
    fireEvent.blur(nameInput); // Trigger validation

    await waitFor(() => {
      expect(screen.getAllByText('Name must be less than 100 characters')[0]).toBeInTheDocument();
    });
  });
});