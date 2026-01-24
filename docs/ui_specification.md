# UI Specification Document

## 1. Introduction
This document serves as the visual and functional reference for the **Resume Builder AI** user interface. It outlines every screen, component, and interaction available to the user, providing a guide for designers and stakeholders to understand the application's flow and look-and-feel.

---

## 2. Global UI Elements

### 2.1 Color Palette
-   **Primary Action**: Blue (`bg-blue-600`) - Used for primary buttons like "Start Building", "Download PDF".
-   **Secondary Action**: Gray/White (`bg-white`, `border-gray-300`) - Used for secondary buttons like "Import JSON", "Back".
-   **Success State**: Green (`text-green-700`) - Used for "Build Cover Letter" badges and success alerts.
-   **Warning/Error**: Red (`text-red-600`) - Used in ATS alerts and validation errors.
-   **Backgrounds**:
    -   **Light Mode**: Off-white/Gray (`bg-gray-100`).
    -   **Dark Mode**: Dark Gray (`bg-gray-900`).

### 2.2 Typography
-   **Headers**: Bold, large sans-serif fonts (e.g., "Build Your Story").
-   **Body Text**: Clean, readable sans-serif fonts (e.g., Robot, Inter).
-   **Input Labels**: Medium weight, typically gray (`text-gray-700`).

---

## 3. Screen 1: Landing Page

**Route**: `/` (Initial View)
**Purpose**: Welcomes the user and directs them to start the core workflow.

### 3.1 Layout
-   **Center Aligned**: Content is vertically and horizontally centered in the viewport.
-   **Header**: Clean, no navigation bar.

### 3.2 UI Components
1.  **"Contact Us" Button** (Top Right)
    -   **Style**: Floating raised button, blue background.
    -   **Interaction**: Smooth scrolls the page down to the footer.
2.  **Hero Title**
    -   **Text**: "Build Your Story with an **AI Resume Builder**".
    -   **Style**: Large, Bold 4XL-6XL text. "AI Resume Builder" is highlighted in Blue.
3.  **Subtitle**
    -   **Text**: "Craft a professional, ATS-friendly resume in minutes."
    -   **Style**: Medium Gray, subtitle size.
4.  **"Start Building" Button** (Primary Call-to-Action)
    -   **Style**: Large, Blue, Rounded-LG, Shadow-LG.
    -   **Interaction**:
        -   **Hover**: Scales up slightly (105%), deepens blue color.
        -   **Click**: Navigates to **Screen 2: Artifact Selector**.

---

## 4. Screen 2: Artifact Selector

**Route**: Internal (`selector` view)
**Purpose**: Allows the user to choose their desired output document type.

### 4.1 Layout
-   **Grid**: Two equal-width cards displayed side-by-side (stacks on mobile).
-   **Navigation**: "Back" button available in top left (via Header).

### 4.2 Cards
1.  **Resume Builder Card**
    -   **Icon**: Document/Page icon.
    -   **Title**: "Build Resume".
    -   **Badges**: "ATS-Friendly", "AI Enhanced" (Pill shapes, subtle background colors).
    -   **Interaction**: Click navigates to **Screen 3: Resume Builder**.
2.  **Cover Letter Builder Card**
    -   **Icon**: Envelope/Mail icon.
    -   **Title**: "Build Cover Letter".
    -   **Badges**: "Data Sync", "AI Powered".
    -   **Interaction**: Click navigates to **Screen 4: Cover Letter Builder**.

---

## 5. Screen 3: Resume Builder (Main Workspace)

**Route**: Internal (`resume` view)
**Layout**:
-   **Top**: Global Header.
-   **Left**: Editor Panel (Scrollable).
-   **Center**: Preview Area (Fixed/Scrollable).
-   **Right**: Customization Panel (Scrollable).

### 5.1 Global Header
-   **Left**: "Back" Arrow (Returns to Selector), App Title ("AI Resume Builder").
-   **Right Actions**:
    -   **"Build Cover Letter"**: Green outline button.
    -   **"Download PDF"**: Blue Split-Button.
        -   **Main Button**: Generates PDF.
        -   **Chevron**: Opens Dropdown Menu.
            -   **Resume Score**: Opens **ATS Dashboard Modal**.
            -   **Preview**: Opens PDF in new browser tab.
            -   **Download PDF**: Triggers file download.

### 5.2 Left Panel: Editor
**Structure**: Vertical stack of Accordion (Collapsible) sections.

**Common Interactions**:
-   **Expand/Collapse**: Clicking a section header toggles visibility.
-   **Drag & Drop**: Six-dot "grip" icon allows reordering entire sections.

#### Modules (Accordions):
1.  **Basics**:
    -   Terms: Name, Headline, Email, Phone, Location, Website.
    -   **Photo Upload**: File input triggering system file picker. Preview shows circular thumbnail.
2.  **Summary**:
    -   **Textarea**: Multi-line input for professional bio.
    -   **"AI Enhance" Button**: Small "magic wand" icon button inside the header.
        -   **Click**: Shows loading spinner -> replaces text with AI version.
3.  **Work Experience**:
    -   **"Add Experience" Button**: Creates a new empty entry block.
    -   **Entry Block**:
        -   Fields: Company, Position, Location, Start/End Date.
        -   **"Current" Checkbox**: Disables "End Date" field when checked.
        -   **Delete Button**: Trash icon to remove specific entry.
4.  **Skills**:
    -   **Category Input**: e.g., "Programming".
    -   **Keywords Input**: Comma-separated text input.
5.  **Other Sections**: Education, Projects, Custom Sections follow the same "Add/Remove Entry" pattern.

### 5.3 Center Panel: Live Preview
-   **Visual**: Renders an A4/Letter page resembling paper.
-   **Behavior**: Non-editable. Updates instantly (sub-100ms) as the user types in the Editor or adjusts sliders in Customization.
-   **Zoom**: Responsive scaling to fit the panel width.

### 5.4 Right Panel: Customization
**Structure**: Tabbed Interface (Top Navigation Bar).

#### Tab 1: Templates
-   **Grid**: Thumbnails of available layouts (Professional, Modern, Creative, etc.).
-   **Interaction**: Click applies layout immediately. Selected template has a blue border.
-   **Color Picker**: Row of colored circles. Clicking sets the primary accent color.

#### Tab 2: Font-Resize (Typography)
-   **Font Family Dropdowns**: Two selects (Heading Font, Body Font).
-   **Sliding Ranges**: Horizontal sliders with drag handles.
    -   Controls: Font Size (Name, Headings, Body), Line Height.
    -   **Feedback**: Live update in Center Preview.

#### Tab 3: Layout & Data
-   **Margins**: 4 Sliders (Top, Bottom, Left, Right).
-   **Page Format**: Toggle Button (A4 vs Letter).
-   **Data Actions**:
    -   **"Import JSON"**: Opens file picker to load `resume.json`.
    -   **"Export JSON"**: Triggers download of `resume.json`.

---

## 6. Screen 4: Cover Letter Builder

**Route**: Internal (`coverLetter` view)
**Layout**: Split Screen (Editor Left, Preview Right).

### 6.1 Editor Actions
-   **Top Bar**:
    -   "Back to Resume" (Secondary).
    -   "Download PDF" (Primary).

### 6.2 Editor Form
-   **Auto-Filled Section**: "Your Details" (Read-only view of Name/Email from Resume).
-   **Target Section**:
    -   Inputs: Recipient Name, Company Name, Job Title.
-   **Content Section**:
    -   **"Generate with AI"**: Large prominent button.
        -   **Interaction**: Reads "Summary" from Resume + "Job Title" input -> Fills the Body Textarea.
    -   **Body Textarea**: Large editable region for the letter content.

---

## 7. Artifacts & Modals

### 7.1 ATS Dashboard Modal
**Trigger**: "Resume Score" item in Header Dropdown.
**Overlay**: Darkens the background content.

**UI Sections**:
1.  **Input View**:
    -   **Textarea**: "Paste Job Description".
    -   **Analyze Button**: Blue button with spinner state.
2.  **Results View** (Replaces Input View):
    -   **Score Gauge**: Circular progress chart (0-100%).
        -   **Color Rules**: Red (<50), Amber (50-80), Green (>80).
    -   **Missing Skills List**:
        -   Items displayed as tags.
        -   **"+ Add" Button**: Small action next to each missing skill. Clicking it adds the skill to the Resume data and removes the tag from the list.
    -   **Alerts**: Colored boxes for "Experience Mismatch" or "Seniority Warning".

### 7.2 Legal Pages
-   **Privacy Policy / Terms**: Simple full-page text documents with a "Back" button at the top and standard footer at the bottom.

---

## 8. Navigational Flow
1.  **Landing** -> (Click Start) -> **Selector**
2.  **Selector** -> (Click Resume) -> **Resume Builder**
3.  **Selector** -> (Click Cover Letter) -> **Cover Letter Builder**
4.  **Resume Builder** -> (Click "Build Cover Letter") -> **Cover Letter Builder** (Data Synced)
5.  **Cover Letter Builder** -> (Click "Go to Resume") -> **Resume Builder**
