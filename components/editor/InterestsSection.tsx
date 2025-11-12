import React, { useState, useEffect } from 'react';
import { Interest } from '../../types';

interface InterestsSectionProps {
  interests: Interest[];
  onUpdate: (interests: Interest[]) => void;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ interests, onUpdate }) => {
  const [textValue, setTextValue] = useState(interests.map(i => i.name).join(', '));

  useEffect(() => {
    // Sync local state if prop changes
    setTextValue(interests.map(i => i.name).join(', '));
  }, [interests]);

  const handleBlur = () => {
    const currentNames = interests.map(i => i.name);
    const newNames = textValue.split(',').map(name => name.trim()).filter(Boolean);

    if (JSON.stringify(currentNames.sort()) !== JSON.stringify(newNames.sort())) {
        const newInterests = newNames.map((name, index) => ({
            id: `${Date.now()}-${index}`,
            name,
        }));
        onUpdate(newInterests);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor="interests-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Interests
      </label>
      <textarea
        id="interests-input"
        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        rows={3}
        placeholder="e.g. Hiking, Photography, Open Source"
        value={textValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p className="text-xs text-gray-500 mt-1">Separate interests with a comma.</p>
    </div>
  );
};

export default InterestsSection;
