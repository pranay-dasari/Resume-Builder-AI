
import React from 'react';
import { CustomizationSettings } from '../../types';

interface ColorTabProps {
  settings: CustomizationSettings;
  onUpdate: (settings: CustomizationSettings) => void;
}

const ColorInput: React.FC<{label: string, value: string, onChange: (value: string) => void}> = ({label, value, onChange}) => (
    <div className="flex items-center justify-between mb-2">
        <label className="text-sm">{label}</label>
        <div className="relative">
            <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600" />
        </div>
    </div>
);


const ColorTab: React.FC<ColorTabProps> = ({ settings, onUpdate }) => {
    const handleColorChange = (colorName: keyof CustomizationSettings['colors'], value: string) => {
        onUpdate({
            ...settings,
            colors: {
                ...settings.colors,
                [colorName]: value
            }
        });
    }

  return (
    <div>
      <h3 className="font-semibold mb-4">Color Customization</h3>
      <ColorInput label="Primary Color" value={settings.colors.primary} onChange={(val) => handleColorChange('primary', val)} />
      <ColorInput label="Text Color" value={settings.colors.text} onChange={(val) => handleColorChange('text', val)} />
      <ColorInput label="Background Color" value={settings.colors.background} onChange={(val) => handleColorChange('background', val)} />
    </div>
  );
};

export default ColorTab;
