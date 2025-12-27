
// Re-export functions from the new unified AI client for backward compatibility
export { 
  enhanceTextWithAI as enhanceTextWithGemini,
  enhanceCoverLetterWithAI 
} from "../utils/aiClient";