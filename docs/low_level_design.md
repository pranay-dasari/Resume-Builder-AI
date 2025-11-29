# Low-Level Design Document

This document provides a detailed breakdown of the user interface, including pages, fields, buttons, and their specific functionalities.

## 1. Landing Page (`LandingPage.tsx`)

**Route**: `/` (Initial View)

### UI Elements
-   **Hero Section**:
    -   Title: "Build Your Story with an AI Resume Builder"
    -   Subtitle: "Craft a professional, ATS-friendly resume in minutes."
-   **Primary Action**:
    -   **Button**: `Start Building`
        -   **Functionality**: Navigates the user to the **Artifact Selector** view.

## 2. Artifact Selector (`ArtifactSelector.tsx`)

**Route**: Internal State (`currentView === 'selector'`)

### UI Elements
-   **Selection Cards**:
    1.  **Build Resume**
        -   **Icon**: Document/Resume icon.
        -   **Badges**: "ATS-Friendly", "AI Enhanced", "Multiple Templates".
        -   **Action**: Clicking the card navigates to the **Resume Builder** view.
    2.  **Build Cover Letter**
        -   **Icon**: Envelope/Letter icon.
        -   **Badges**: "Data Sync", "AI Powered", "Professional".
        -   **Action**: Clicking the card navigates to the **Cover Letter Builder** view.

## 3. Resume Builder View

**Route**: Internal State (`currentView === 'resume'`)
**Layout**: Header (Top), Three-Column Grid (Editor, Preview, Customization).

### 3.1. Header (`Header.tsx`)

**Global Actions**:
-   **Import JSON** (Button):
    -   **Functionality**: Opens a file picker to upload a `resume.json` file. Parses the file and populates the application state.
-   **Export JSON** (Button):
    -   **Functionality**: Downloads the current resume state as a `resume.json` file.
-   **Preview** (Button):
    -   **Functionality**: Opens the generated PDF in a new browser tab for review.
-   **Download PDF** (Button):
    -   **Functionality**: Generates a high-quality PDF of the resume and triggers a file download (`[Name]_Resume.pdf`).

### 3.2. Editor Panel (`EditorPanel.tsx`)

**Location**: Left Column
**Structure**: Accordion-based list of sections. Users can drag and drop sections to reorder them.

#### Sections & Fields:

1.  **Basics**
    -   **Name**: Text Input
    -   **Headline**: Text Input (e.g., "Senior Software Engineer")
    -   **Email**: Text Input
    -   **Phone**: Text Input
    -   **Location**: Text Input
    -   **Website**: Text Input
    -   **Photo URL**: Text Input (Optional)

2.  **Summary**
    -   **Summary**: Textarea
    -   **AI Enhance** (Button): Rewrites the summary using Gemini AI to be more professional and impact-focused.

3.  **Work Experience**
    -   **Add Experience** (Button): Adds a new job entry.
    -   **Fields per Entry**:
        -   **Company**: Text Input
        -   **Position**: Text Input
        -   **Location**: Text Input
        -   **Start Date**: Text Input
        -   **End Date**: Text Input (Disabled if "Current" is checked)
        -   **I currently work here**: Checkbox
        -   **Summary/Achievements**: Textarea with **AI Enhance** button.

4.  **Education**
    -   **Institution**: Text Input
    -   **Degree**: Text Input
    -   **Area of Study**: Text Input
    -   **Start/End Date**: Text Inputs
    -   **Score/Grade**: Text Input (Optional)

5.  **Skills**
    -   **Category Name**: Text Input (e.g., "Frontend")
    -   **Keywords**: Text Input (Comma-separated, e.g., "React, TypeScript, CSS")

6.  **Projects**
    -   **Name**: Text Input
    -   **Role**: Text Input
    -   **Description**: Textarea with **AI Enhance** button.
    -   **Link**: Text Input

7.  **Other Sections**:
    -   **Social Profiles**: Network, Username, URL.
    -   **Certifications**: Name, Issuer, Date.
    -   **Languages**: Language, Fluency (Dropdown).
    -   **Interests**: Name.
    -   **References**: Textarea.

### 3.3. Preview Panel (`PreviewPanel.tsx`)

**Location**: Center Column
**Functionality**:
-   Renders the resume in real-time based on the selected **Template** and **Data**.
-   Reflects all changes made in the Editor and Customization panels immediately.
-   Supports Zoom In/Out controls (implied).

### 3.4. Customization Panel (`CustomizationPanel.tsx`)

**Location**: Right Column
**Tabs**:

1.  **Templates**
    -   **Dropdown/Grid**: Select from templates like "Professional", "Modern", "Creative", "Executive", "Elegant".
    -   **Color Picker**: Choose primary accent colors.

2.  **Typography** (Font-Resize)
    -   **Font Family**: Dropdowns for Heading and Body fonts (e.g., Roboto, Lato, Merriweather).
    -   **Font Sizes**: Sliders/Inputs for Name, Headings, Body text size.
    -   **Line Height**: Slider to adjust text spacing.

3.  **Layout**
    -   **Page Format**: Toggle between A4 and Letter.
    -   **Margins**: Sliders for Top, Bottom, Left, Right margins.

## 4. Cover Letter Builder (`CoverLetterBuilder.tsx`)

**Route**: Internal State (`currentView === 'coverLetter'`)
**Layout**: Split View (Editor Left, Preview Right).

### 4.1. Cover Letter Editor (`CoverLetterEditor.tsx`)

#### Sections:

1.  **Your Information** (Auto-synced from Resume)
    -   **Full Name**: Text Input
    -   **Email**: Text Input (Validated format)
    -   **Phone**: Text Input
    -   **Address**: Text Input

2.  **Recipient Information**
    -   **Recipient Name**: Text Input
    -   **Recipient Title**: Text Input
    -   **Company Name**: Text Input (Required)
    -   **Company Address**: Text Input

3.  **Job Application Details**
    -   **Job Title**: Text Input (Required)
    -   **Date**: Date Picker

4.  **Letter Content**
    -   **Salutation**: Dropdown + Custom Input (e.g., "Dear Hiring Manager,")
    -   **Body Content**: Large Textarea.
        -   **Action**: **Enhance with AI** button.
            -   **Functionality**: Uses Gemini AI to generate a professional cover letter body based on the user's Resume Data, Job Title, and Company Name.
    -   **Closing**: Dropdown + Custom Input (e.g., "Sincerely,")

### 4.2. Actions
-   **Back to Selection**: Returns to Artifact Selector.
-   **Go to Resume**: Switches to Resume Builder (preserving data sync).
-   **Download PDF**: Generates the cover letter PDF.

## 5. Data Models & State

### 5.1. ResumeData
-   **Basics**: Personal info.
-   **Sections**: Arrays of objects (Experience, Education, Skills, etc.).
-   **Layout**: Stores column arrangements for multi-column templates.
-   **SectionOrder**: Array of keys defining the vertical order of sections.

### 5.2. CoverLetterData
-   **Shared Fields**: Synced with ResumeData (Name, Email, Phone, Address).
-   **Specific Fields**: Recipient info, Job info, Letter content.
-   **TemplateId**: ID of the selected cover letter template.

### 5.3. Synchronization Logic
-   Updates to "Basics" in Resume Builder automatically update "Your Information" in Cover Letter Builder.
-   Updates to "Your Information" in Cover Letter Builder reflect back to "Basics" in Resume Builder.
