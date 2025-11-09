
import React from 'react';
import Accordion from '../ui/Accordion';
import Input from '../ui/Input';

interface ApiKeySectionProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeySection: React.FC<ApiKeySectionProps> = ({ apiKey, setApiKey }) => {
  return (
    <Accordion title="API Integration" isOpenDefault={true}>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        Enter your Gemini API key to enable AI features. Your key is stored only in your browser.
      </p>
      <Input
        label="Gemini API Key"
        id="apiKey"
        type="password"
        placeholder="Enter your API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
    </Accordion>
  );
};

export default ApiKeySection;
