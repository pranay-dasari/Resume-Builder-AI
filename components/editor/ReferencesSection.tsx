import React from 'react';
import Textarea from '../ui/Textarea';

interface ReferencesSectionProps {
  references: string;
  onUpdate: (references: string) => void;
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({ references, onUpdate }) => {
  return (
    <Textarea
      label="References"
      id="references"
      value={references}
      onChange={(e) => onUpdate(e.target.value)}
      rows={2}
    />
  );
};

export default ReferencesSection;