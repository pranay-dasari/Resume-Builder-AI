
import React, { useState } from 'react';
import Textarea from '../ui/Textarea';
import { enhanceTextWithGemini } from '../../services/geminiService';

interface SummarySectionProps {
  summary: string;
  onUpdate: (summary: string) => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary, onUpdate }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    // FIX: Removed API key check. The service now handles the key from the environment.
    setIsEnhancing(true);
    try {
      const instruction = "You are a professional resume writer. Improve the following summary to be more impactful and concise for a job application. Return only the improved text.";
      const enhancedSummary = await enhanceTextWithGemini(summary, instruction);
      onUpdate(enhancedSummary);
    } catch (error) {
      console.error(error);
      alert("Failed to enhance summary. Check the console for details.");
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <Textarea
      label="Summary"
      id="summary"
      value={summary}
      onChange={(e) => onUpdate(e.target.value)}
      onEnhance={handleEnhance}
      isEnhancing={isEnhancing}
      rows={6}
    />
  );
};

export default SummarySection;