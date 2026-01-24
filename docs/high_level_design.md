# High-Level Design (HLD) Document

## 1. Introduction
The **Resume Builder AI** is a modern, privacy-focused web application designed to assist job seekers in creating professional, ATS-optimized resumes and cover letters. This document outlines the high-level architecture, key components, data flow, and design decisions that drive the system.

### 1.1 Goals & Objectives
-   **User-Centric Design**: Provide a real-time "What You See Is What You Get" (WYSIWYG) editing experience.
-   **AI-Enhanced**: Integrate Large Language Models (LLMs) to rewrite summaries, generate specific bullet points, and draft cover letters.
-   **ATS Intelligence**: Incorporate a logic engine to score resumes against specific Job Descriptions (JDs) and provide actionable gap analysis.
-   **Privacy-First**: Minimize server-side storage of Personal Identifiable Information (PII) by relying on client-side state and intelligent stateless processing.

---

## 2. System Architecture

The system follows a **Client-Server Architecture** utilizing a Single Page Application (SPA) frontend and a stateless backend acting largely as an API Gateway and Compute Engine.

### 2.1 Logical View

```mermaid
graph TD
    User[User / Browser]
    
    subgraph "Frontend Layer (React SPA)"
        UI[UI Components]
        State[Global State Manager]
        PDF[PDF Generation Engine]
    end

    subgraph "Backend Layer (Node.js/Express)"
        APIGateway[API Gateway / Router]
        AIService[AI Service Controller]
        ATSService[ATS Scoring Engine]
    end

    subgraph "External Services"
        OpenRouter[OpenRouter API (DeepSeek)]
        Gemini[Google Gemini API]
    end

    User <-->|Interacts| UI
    UI <-->|Updates| State
    UI -->|Requests PDF| PDF
    
    UI -- "HTTPS / JSON" --> APIGateway
    APIGateway --> AIService
    APIGateway --> ATSService
    
    AIService -- "API Calls" --> OpenRouter
    AIService -- "Fallback" --> Gemini
```

### 2.2 Component Responsibilities

#### Frontend (Client-Side)
-   **Resume Builder Core**: Handles the multi-column layout, drag-and-drop section ordering, and real-time form inputs.
-   **Artifact Selector**: Manages navigation between Resume and Cover Letter modes.
-   **Preview Engine**: Renders the document based on selected templates and raw JSON data.
-   **PDF Generator**: Uses `html2pdf.js` to convert the DOM structure into high-fidelity PDF documents entirely in the browser.

#### Backend (Server-Side)
-   **API Proxy**: Masks sensitive API keys (OpenRouter/Gemini) from the client.
-   **ATS Logic Engine**: Parses job descriptions, performs fuzzy keyword matching against the resume, and calculates alignment scores. This is done server-side to keep complex logic and large dictionary bundles (`standardSkills`, `canonicalMap`) out of the client bundle.
-   **AI Controller**: Orchestrates LLM requests, implementing fallback logic (DeepSeek -> Gemini) to ensure high availability.

---

## 3. Data Design

### 3.1 Data Model
The application uses a **Document-Oriented Data Model** represented as JSON.

*   **ResumeData**: The root object containing `basics`, `experience`, `education`, `skills`, and `layout` configurations.
*   **CoverLetterData**: Contains `sender` details (synced from Resume), `recipient` info, and the `body` text.

### 3.2 Storage Strategy
To strictly adhere to privacy constraints and reduce infrastructure costs, the system uses a **Client-Side Persistence** strategy:
-   **Session Memory**: State is held in React's memory during the session.
-   **File System (User)**: Persistence is achieved by Exporting (`Save as JSON`) and Importing (`Load JSON`) the state to/from the user's local device.
-   **No Database**: There is currently **no** database attached to the system. No PII is persisted on the server.

### 3.3 Data Flow: AI Generation
1.  **Trigger**: User clicks "Enhance with AI" on a specific text field.
2.  **Payload**: Client sends current text + context (e.g., job title) to `/api/ai`.
3.  **Processing**: Server constructs a system prompt and calls the primary LLM provider.
4.  **Response**: Normalized text is returned to the client and auto-fills the field.

---

## 4. Key Components & Technologies

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19 + Vite** | High performance, component reusability, and fast build times. |
| **Styling** | **Tailwind CSS** | Utility-first CSS for rapid UI development and easy Dark Mode implementation. |
| **Icons** | **Lucide React** | Consistent, lightweight SVG iconography. |
| **Fuzzy Search** | **Fuse.js** | Used in the ATS engine for smart keyword matching (e.g., matching "ReactJS" to "React"). |
| **Backend Runtime** | **Node.js** | JavaScript ubiquity allows sharing type definitions (`types.ts`) between frontend and backend. |
| **Server Framework** | **Express.js** | Lightweight routing for API endpoints. |
| **Deployment** | **Vercel** | Serverless function capability allows the `api/` directory to scale automatically without managing servers. |

---

## 5. Security Architecture

### 5.1 API Security
-   **Key Management**: API keys for external AI services are stored in environment variables (`.env`) on the server. They are **never** exposed to the client browser.
-   **CORS**: Cross-Origin Resource Sharing is configured to allow requests only from trusted origins (local development and production Vercel domain).

### 5.2 Data Privacy
-   **Stateless Processing**: The backend processes data (e.g., for ATS scoring) in memory and returns the result. It does not write user data to disk or a database.
-   **Client-Side Generation**: PDF generation happens locally, ensuring the final document is never transmitted to a third party.

---

## 6. Scalability & Performance

### 6.1 Performance
-   **Code Splitting**: Vite automatically chunks the Javascript bundle.
-   **Lazy Loading**: Heavy components (like the PDF previewer or Charts) can be lazy-loaded.
-   **Debouncing**: ATS Analysis requires an explicit "Analyze" click rather than running on every keystroke to save compute and API costs.

### 6.2 Availability
-   **AI Fallback**: The backend implements a robust fallback mechanism. If the primary cost-effective model (OpenRouter/DeepSeek) processes fail or timeout, the system seamlessly switches to Google Gemini.
-   **Serverless**: By deploying on Vercel, the API endpoints scale infinitely with traffic spikes, requiring no manual provisioning.

---

## 7. Future Considerations
-   **Authentication**: Implementing user accounts (via Auth0 or Firebase) to allow cloud storage of resumes.
-   **Version History**: tracking changes to resumes over time.
-   **Multi-Resume Management**: Allowing a user to manage distinct versions of their resume for different job applications within the app UI.
