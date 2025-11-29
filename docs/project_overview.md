# Resume Builder AI - Project Overview

## 1. Executive Summary
**Resume Builder AI** is a cutting-edge application designed to empower job seekers by automating and optimizing the creation of professional application materials. By leveraging advanced AI (Google Gemini) and a sophisticated Applicant Tracking System (ATS) logic engine, the platform ensures that users not only create visually stunning resumes and cover letters but also maximize their chances of passing automated screening filters.

## 2. Product Vision
To bridge the gap between candidate potential and employer visibility by providing intelligent, data-driven tools that demystify the hiring process. The product focuses on **usability**, **aesthetic excellence**, and **algorithmic precision**.

## 3. Core Features

### 3.1. Intelligent Resume Builder
- **Real-Time Editing**: A dual-pane interface allowing users to edit content and see live updates.
- **Smart Templates**: A variety of professional templates (Professional, Modern, Creative, Executive) that automatically adjust layout and typography.
- **Customization**: Granular control over fonts, colors, spacing, and section ordering.

### 3.2. AI-Powered Cover Letter Generator
- **Context-Aware Creation**: Generates cover letters by analyzing the user's resume and the specific Job Description (JD).
- **Bidirectional Sync**: Automatically keeps contact info and shared details in sync between the resume and cover letter.
- **Tone Adjustment**: AI drafts content with professional, enthusiastic, and personalized tones.

### 3.3. ATS Logic Engine & Gap Analysis
- **Compatibility Scoring**: Calculates a "Match Score" (0-100%) based on a weighted algorithm comparing the candidate's profile against the JD.
- **Gap Identification**: Highlights "Critical Gaps" (missing mandatory skills) and offers "Suggestions" (bonus skills) to improve the score.
- **Semantic Matching**: Understands synonyms and related terms (e.g., "ReactJS" = "React") to ensure fair scoring.

## 4. System Architecture

The application follows a modern, component-based architecture with a strong separation of concerns between the UI, data management, and AI services.

### 4.1. Frontend Architecture
- **Framework**: React 19 with TypeScript for type safety and component modularity.
- **Build Tool**: Vite for lightning-fast development and optimized production builds.
- **Styling**: Tailwind CSS for a utility-first, responsive design system.
- **State Management**: React Hooks (`useState`, `useCallback`) managing complex states for Resume Data, Cover Letter Data, and UI View modes.

### 4.2. AI & Backend Services
- **AI Integration**: Direct integration with **Google Gemini API** (`gemini-2.5-flash`) via the `@google/genai` SDK.
- **Service Layer**: `geminiService.ts` handles prompt engineering, error handling, and API communication.
- **ATS Pipeline (Logic Engine)**: A 5-phase data processing pipeline:
    1.  **Parser**: Extracts keywords and requirements from raw Job Descriptions.
    2.  **Validator**: Ensures data integrity and schema compliance.
    3.  **Normalizer**: Sanitizes inputs (deduplication, date formatting).
    4.  **Mapper**: Semantic translation using a canonical skill map.
    5.  **Scorer**: Calculates the final match score based on weighted criteria (Hard Constraints, Skills, Semantics).

### 4.3. Data Flow
1.  **User Input** -> **React State** -> **Real-time Preview**
2.  **Job Description** + **Resume Data** -> **Gemini API** -> **Generated Content**
3.  **Resume** + **Job Description** -> **ATS Engine** -> **Gap Analysis Report**

## 5. Technical Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript | Core UI library and logic |
| **Build & Tooling** | Vite, PostCSS | Development server and bundler |
| **Styling** | Tailwind CSS | Styling and responsive design |
| **AI Model** | Google Gemini 2.5 Flash | Content generation and enhancement |
| **PDF Generation** | html2pdf.js (implied) | Exporting artifacts to PDF |
| **Testing** | Jest (implied structure) | Unit and integration testing |

## 6. User Workflow

1.  **Landing & Selection**: User starts at the Landing Page and chooses to build a Resume or Cover Letter via the `ArtifactSelector`.
2.  **Building & Editing**:
    - User enters details in the `EditorPanel`.
    - Changes are reflected instantly in the `PreviewPanel`.
    - User customizes the look in the `CustomizationPanel`.
3.  **AI Enhancement**:
    - User inputs a Job Description.
    - AI suggests improvements or generates a cover letter body.
4.  **Analysis & Optimization**:
    - User runs the ATS check.
    - System provides a score and actionable feedback (Critical Gaps).
5.  **Export**: User downloads the polished documents as PDFs.

## 7. Future Roadmap (Inferred)
- **Backend Expansion**: Formalizing the Python/FastAPI backend for robust server-side processing.
- **User Accounts**: Saving profiles and history (Database integration).
- **Multi-Language Support**: Localizing the interface and generation capabilities.
