# Low-Level Design Document

This document provides a comprehensive technical reference for the Resume Builder AI application. It details the system architecture, data models, component hierarchy, backend logic, and external integrations, serving as the single source of truth for developers.

## 1. System Overview

The Resume Builder AI is a React-based single-page application (SPA) designed to help users create professional resumes and cover letters. It features real-time previewing, AI-powered content enhancement, and a sophisticated ATS (Applicant Tracking System) scoring engine.

### Tech Stack
-   **Frontend**: React (TypeScript), Vite, Tailwind CSS
-   **Backend**: Node.js, Express (functioning as both a local server and Vercel serverless functions)
-   **AI Providers**: OpenRouter (Primary: DeepSeek-V3), Google Gemini (Fallback)
-   **Parsing/Search**: `pdf-parse` (PDF text extraction), `Fuse.js` (Fuzzy string matching)

---

## 2. Architecture & Data Flow

The application follows a client-server architecture where the frontend manages the state and UI, while the backend handles heavy computation (ATS scoring) and AI API proxying.

### 2.1 State Management (`App.tsx`)
The root `App` component manages the global state and "routing" via conditional rendering (`currentView`).

-   **`resumeData`**: The core state object containing all user-entered resume information.
-   **`coverLetterData`**: State for cover letter specific fields; synchronizes with `resumeData`.
-   **`customization`**: Visual settings (fonts, colors, margins).
-   **`currentView`**: Controls the active screen (`landing`, `selector`, `resume`, `coverLetter`, `privacy`, `terms`, `contact`).

### 2.2 Data Models (`types.ts`)

#### ResumeData
| Field | Type | Description |
| :--- | :--- | :--- |
| `basics` | `Basics` | Personal info (Name, Email, Phone, Location, etc.) |
| `summary` | `string` | Professional summary text |
| `experience` | `WorkExperience[]` | Array of job history entries |
| `education` | `Education[]` | Array of educational background entries |
| `skills` | `Skill[]` | Array of skill categories and keywords |
| `profiles` | `Profile[]` | Social media/portfolio links (LinkedIn, GitHub) |
| `projects` | `Project[]` | Notable projects and descriptions |
| `notifications` | `Certification[]` | Certifications and licenses |
| `languages` | `Language[]` | Spoken languages and fluency levels |
| `interests` | `Interest[]` | Personal interests |
| `layout` | `Object` | Template-specific column configurations |
| `sectionOrder` | `string[]` | Ordered list of section keys (for drag-and-drop) |

#### CoverLetterData
| Field | Type | Description |
| :--- | :--- | :--- |
| `senderName`...`senderEmail` | `string` | Synced from `ResumeData.basics` |
| `recipientName`...`companyAddress` | `string` | Target company details |
| `jobTitle` | `string` | Role being applied for |
| `bodyContent` | `string` | Main letter text (AI-generatable) |
| `templateId` | `string` | ID of the selected visual template |

---

## 3. Detailed Component Breakdown

### 3.1 Landing Page (`LandingPage.tsx`)
-   **Route**: `/` (Initial View)
-   **Purpose**: Entry point and marketing.
-   **Actions**: "Start Building" button -> Transitions `currentView` to `selector`.

### 3.2 Artifact Selector (`ArtifactSelector.tsx`)
-   **Route**: `currentView === 'selector'`
-   **Purpose**: Central hub to choose between Resume Builder and Cover Letter Builder.
-   **Logic**:
    -   Displays cards for "Resume" and "Cover Letter".
    -   Handles navigation state updates via callback props (`onSelectResume`, `onSelectCoverLetter`).

### 3.3 Resume Builder Module
**Route**: `currentView === 'resume'`
**Layout**: 3-Column Grid (Editor, Preview, Customization) with a Top Header.

#### A. Header (`Header.tsx`)
-   **Global Actions**:
    -   `Measure ATS Score`: Opens `ATSModal` (See Section 3.5).
    -   `Import JSON`: Loads a `resume.json` file into state.
    -   `Export JSON`: Saves state to a downloadable JSON file.
    -   `Download PDF`: Triggers PDF generation (likely via `window.print` or library).
    -   `Cover Letter`: Switches to Cover Letter Builder.

#### B. Editor Panel (`components/editor/*`)
Located on the left, this panel allows data entry. It uses an Accordion UI (Collapsible sections).
-   **`BasicsSection.tsx`**: Inputs for Name, Headline, Email, Phone, Location, Website.
-   **`SummarySection.tsx`**: Textarea for professional summary + "AI Enhance" button.
-   **`ExperienceSection.tsx`**: Variable list management for jobs (Company, Role, Dates, Description).
-   **`EducationSection.tsx`**: Variable list for degrees and schools.
-   **`SkillsSection.tsx`**: Management of Skill Categories (e.g., "Frontend") and comma-separated keywords.
-   **`ProjectsSection.tsx`**: Project Name, Role, Description, Link.
-   **Other Sections**: Profiles, Languages, Certifications, Interests, References.

#### C. Preview Panel (`components/preview/PreviewPanel.tsx`)
Located in the center, this renders the live resume.
-   **Logic**: Dynamically selects a `TemplateRenderer` based on `customization.template`.
-   **State**: Reacts immediately to changes in `resumeData`.

#### D. Customization Panel (`components/customization/CustomizationPanel.tsx`)
Located on the right.
-   **Templates**: Grid selector for templates (Professional, Modern, Creative, etc.).
-   **Colors**: Primary accent color picker.
-   **Typography**: Font family selection (Heading/Body), Font Size sliders, Line Height slider.
-   **Layout**: Margin adjustment sliders.

### 3.4 Cover Letter Builder (`components/coverLetter/*`)
**Route**: `currentView === 'coverLetter'`
-   **`CoverLetterBuilder.tsx`**: Parent container.
-   **`CoverLetterEditor.tsx`**:
    -   **Sync Logic**: Auto-populates Sender info from Resume.
    -   **Job Details**: Inputs for Job Title, Company.
    -   **Body**: Textarea with specialized AI generation that prompts backend with Resume + Job details to write a tailored letter.
-   **Preview**: Renders the letter on the right, sharing styling (fonts/colors) with the selected template definition.

### 3.5 ATS Dashboard Module (`components/ats/*`)
A sophisticated modal overlay to analyze the resume against a job description.

#### Components
-   **`ATSModal.tsx`**: Wrapper dialog.
-   **`ATSDashboard.tsx`**: Main controller.
    -   **State**: `jdText` (Input), `result` (Analysis outcome).
    -   **API Call**: POST `/api/ats-score`.
-   **`ATSScore.tsx`**: Circular gauge visualization of the overall score (0-100).
-   **`ATSMetrics.tsx`**: Bar charts for sub-scores:
    -   Hard Constraints (Experience, Education)
    -   Skill Match (Keyword overlap)
    -   Semantic Match (Contextual relevance)
-   **`ATSGapAnalysis.tsx`**:
    -   Lists **Critical Missing Skills** (High priority).
    -   Lists **Bonus Missing Skills** (Low priority).
    -   **Action**: Clicking a missing skill adds it to the Resume's skill list via `onAddSkill` callback.
-   **`ATSAlerts.tsx`**: Displays warnings (e.g., "Experience Mismatch", "Seniority Warning").

---

## 4. Backend Services & Logic

### 4.1 Backend Architecture
The backend is a Node.js Express application (`api/index.ts`) configured to run locally or as Vercel serverless functions.
-   **Configuration**: Loads `.env` for API keys (OpenRouter, Google Gemini).
-   **Middleware**: CORS enabled, JSON parsing.

### 4.2 AI Service (`/api/ai`)
-   **Purpose**: General text generation (Resume Summary, Cover Letter, Rewrites).
-   **Flow**:
    1.  Receives `prompt`, `systemMessage`, `temperature`.
    2.  **Primary**: Attempts request to **OpenRouter** (DeepSeek model).
    3.  **Fallback**: If OpenRouter fails, attempts request to **Google Gemini** (Flash model).
    4.  Returns standardized JSON response.

### 4.3 ATS Scoring Engine (`services/atsService.ts`)
This service implements a multi-phase analysis pipeline.

**Endpoint**: `POST /api/ats-score`
**Input**: `candidate` (ResumeData), `jobDescription` (Text).

#### Logic Phases:
1.  **Phase 0: Extraction**
    -   Extracts Experience Range (e.g., "3-5 years") from JD text using Regex.
    -   Extracts Keywords/Skills using context heuristics (scanning for "bonus", "preferred").

2.  **Phase 1: Normalization**
    -   Converts all text to lowercase.
    -   Uses `canonicalMap` to normalize variations (e.g., "reactjs" -> "react", "aws" -> "amazon web services").

3.  **Phase 2: Semantic Mapper**
    -   Uses `Fuse.js` for fuzzy matching logic to handle typos or slight variations in skill naming.
    -   Maps Candidate Skills and JD Skills to a "Canonical Set".

4.  **Phase 3: Scoring**
    -   **Hard Constraints (40%)**:
        -   Experience Years vs. JD Requirements.
        -   Education check.
    -   **Skill Match (35%)**:
        -   Calculates overlap of Critical and Bonus skills.
    -   **Semantic Match (25%)**:
        -   Vector-like "bag-of-words" comparison between full JD text and stringified Resume Data.

5.  **Phase 4: Output**
    -   Returns total score, breakdown, and gap analysis (missing skills).

---

## 5. Integrations & External Libraries

| Library/Service | Purpose |
| :--- | :--- |
| **OpenRouter SDK** | Primary AI Interface (DeepSeek V3). |
| **@google/genai** | Fallback AI Interface (Gemini 1.5 Flash). |
| **Fuse.js** | Client-side fuzzy search, reused in backend for skill mapping. |
| **React Router (Custom)** | Lightweight internal routing state (no external library). |
| **Tailwind CSS** | Styling engine with Dark Mode support. |

## 6. Assumptions & Constraints
-   **Persistence**: Data is currently local-only (browser memory/session). Refreshing resets data unless manually exported/imported.
-   **ATS Logic**: The ATS engine assumes English language text. Experience calculation interprets "Current" jobs as ending on `Date.now()`.
-   **AI Usage**: Requires valid API keys in `.env`.
