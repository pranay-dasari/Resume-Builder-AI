// Client-side AI interface that calls secure API endpoints
// No API keys are exposed to the browser

export interface GenerateTextOptions {
  prompt: string;
  systemMessage?: string;
  temperature?: number;
  maxTokens?: number;
  retryWithGemini?: boolean;
}

export interface AIResponse {
  success: boolean;
  content?: string;
  error?: string;
  provider?: 'openrouter' | 'gemini';
}

/**
 * Secure AI text generation function that calls backend API
 * API keys are kept secure on the server side
 */
export const generateText = async ({
  prompt,
  systemMessage = "You are a professional resume writer. Output ONLY the polished professional text. No explanations, no additional commentary.",
  temperature = 0.4,
  maxTokens = 300,
}: GenerateTextOptions): Promise<string> => {
  
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        systemMessage,
        temperature,
        maxTokens,
        type: 'enhance'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: AIResponse = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'AI generation failed');
    }

    if (!result.content) {
      throw new Error('No content received from AI service');
    }

    return result.content;
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error(`AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Enhanced text generation with Gemini-compatible interface for backward compatibility
 */
export const enhanceTextWithAI = async (promptText: string, instruction: string): Promise<string> => {
  return generateText({
    prompt: promptText,
    systemMessage: instruction,
    temperature: 0.7,
    maxTokens: 400
  });
};

/**
 * Cover letter generation with AI (secure API call)
 */
export const enhanceCoverLetterWithAI = async (
  jobTitle: string,
  companyName: string,
  resumeData: any,
  bodyDraft?: string
): Promise<string> => {
  if (!jobTitle.trim()) {
    throw new Error("Job title is required for AI enhancement");
  }

  if (!companyName.trim()) {
    throw new Error("Company name is required for AI enhancement");
  }

  // Build context from resume data
  const experienceContext = resumeData.experience
    ?.map((exp: any) => `${exp.position} at ${exp.company}: ${exp.summary}`)
    .join('\n') || '';

  const skillsContext = resumeData.skills
    ?.map((skill: any) => `${skill.name}: ${skill.keywords?.join(', ') || ''}`)
    .join('\n') || '';

  const educationContext = resumeData.education
    ?.map((edu: any) => `${edu.degree} in ${edu.areaOfStudy} from ${edu.institution}`)
    .join('\n') || '';

  const systemPrompt = `You are an expert career consultant and professional writer. Draft a compelling, professional cover letter body for the applicant. The tone should be enthusiastic yet professional, highlighting how the applicant's experience aligns with the desired role. 

Key requirements:
- Output ONLY the body paragraphs (no salutation or closing)
- Keep it to 2-3 paragraphs maximum
- Be specific about relevant experience and skills
- Show enthusiasm for the role and company
- Maintain professional tone throughout
- Make it personalized to the job and company`;

  const userQuery = `Write a cover letter body for:

Job Title: ${jobTitle}
Company: ${companyName}
${bodyDraft ? `Current draft/focus: ${bodyDraft}` : ''}

Applicant's Background:
Professional Summary: ${resumeData.summary || ''}

Work Experience:
${experienceContext}

Skills:
${skillsContext}

Education:
${educationContext}

Please generate compelling body content that connects the applicant's background to this specific role at ${companyName}.`;

  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: userQuery,
        systemMessage: systemPrompt,
        temperature: 0.6,
        maxTokens: 500,
        type: 'coverLetter',
        jobTitle,
        companyName,
        resumeData,
        bodyDraft
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: AIResponse = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Cover letter generation failed');
    }

    if (!result.content) {
      throw new Error('No content received from AI service');
    }

    return result.content;
  } catch (error) {
    console.error("Cover letter generation error:", error);
    throw new Error(`Cover letter generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Development utilities for testing AI functionality
export const testAIConnection = async (): Promise<boolean> => {
  try {
    const testResult = await generateText({
      prompt: "Test connection",
      systemMessage: "Respond with 'Connection successful'",
      temperature: 0.1,
      maxTokens: 10
    });
    console.log("✅ AI connection test successful:", testResult);
    return true;
  } catch (error) {
    console.error("❌ AI connection test failed:", error);
    return false;
  }
};