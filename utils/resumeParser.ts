// @ts-ignore - pdfjs-dist will be installed via npm
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore - mammoth will be installed via npm
import * as mammoth from 'mammoth';

export interface ParsedResume {
  text: string;
  skills: string[];
  experience: string;
}

// Set up the worker using local file from node_modules
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { standardSkills, canonicalMap } from './ats/canonicalMap';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * Parse PDF file and extract text
 */
export const parsePDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF. Please ensure the file is a valid PDF.');
  }
};

/**
 * Parse DOCX file and extract text
 */
export const parseDOCX = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error('Failed to parse DOCX. Please ensure the file is a valid DOCX.');
  }
};

/**
 * Parse resume file (PDF or DOCX) and extract text
 */
export const parseResumeFile = async (file: File): Promise<string> => {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return parsePDF(file);
  } else if (
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileName.endsWith('.docx')
  ) {
    return parseDOCX(file);
  } else {
    throw new Error('Unsupported file format. Please upload a PDF or DOCX file.');
  }
};

/**
 * Normalize and clean resume text
 */
export const normalizeResumeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Extract skills from resume text using keyword matching with standard ATS list
 */
export const extractSkillsFromText = (text: string): string[] => {
  const normalizedText = normalizeResumeText(text);
  const foundSkills = new Set<string>();

  // Helper function to check for skill presence with word boundaries
  const hasSkill = (skill: string): boolean => {
    // Escape special regex characters
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create regex with word boundaries (or whitespace/punctuation boundaries)
    // We match: (start of line OR whitespace OR non-word char) + skill + (end of line OR whitespace OR non-word char)
    // This allows matching "C++" or "C#" which might be bordered by punctuation like commas
    const regex = new RegExp(`(?:^|\\s|\\W)${escapedSkill}(?:$|\\s|\\W)`, 'i');

    return regex.test(normalizedText);
  };

  // 1. Check Standard Skills
  standardSkills.forEach(skill => {
    if (hasSkill(skill)) {
      foundSkills.add(skill);
    }
  });

  // 2. Check Aliases from Canonical Map
  Object.keys(canonicalMap).forEach(alias => {
    if (hasSkill(alias)) {
      foundSkills.add(canonicalMap[alias]);
    }
  });

  return Array.from(foundSkills);
};
