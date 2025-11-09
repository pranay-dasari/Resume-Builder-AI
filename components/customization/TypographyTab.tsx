
import React from 'react';
import { CustomizationSettings } from '../../types';
import { GOOGLE_FONTS, FONT_WEIGHTS, FONT_STYLES } from '../../constants';
import Select from '../ui/Select';

interface TypographyTabProps {
  settings: CustomizationSettings;
  onUpdate: (settings: CustomizationSettings) => void;
}

const TypographyTab: React.FC<TypographyTabProps> = ({ settings, onUpdate }) => {
    const handleTypographyChange = <T extends keyof CustomizationSettings['typography']>(
        field: T, 
        value: CustomizationSettings['typography'][T]
    ) => {
        onUpdate({
            ...settings,
            typography: {
                ...settings.typography,
                [field]: value
            }
        });
    };
    
    const handleFontChange = (
        fontType: 'headingFont' | 'bodyFont',
        property: 'family' | 'weight' | 'style',
        value: string
    ) => {
        onUpdate({
            ...settings,
            typography: {
                ...settings.typography,
                [fontType]: {
                    ...settings.typography[fontType],
                    [property]: value
                }
            }
        })
    }

  return (
    <div className="space-y-4">
        <h3 className="font-semibold">Font Settings</h3>

        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Size (pt)</label>
            <input 
                type="number"
                value={settings.typography.fontSize}
                onChange={e => handleTypographyChange('fontSize', parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Line Height</label>
            <input 
                type="number"
                step="0.1"
                value={settings.typography.lineHeight}
                onChange={e => handleTypographyChange('lineHeight', parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
            />
        </div>
        
        <div className="p-2 border rounded-md dark:border-gray-600">
          <h4 className="text-sm font-semibold mb-2">Heading Font</h4>
          <Select label="Family" value={settings.typography.headingFont.family} onChange={e => handleFontChange('headingFont', 'family', e.target.value)}>
              {GOOGLE_FONTS.map(font => <option key={font} value={font}>{font}</option>)}
          </Select>
          <Select label="Weight" value={settings.typography.headingFont.weight} onChange={e => handleFontChange('headingFont', 'weight', e.target.value)}>
              {FONT_WEIGHTS.map(weight => <option key={weight} value={weight}>{weight}</option>)}
          </Select>
           <Select label="Style" value={settings.typography.headingFont.style} onChange={e => handleFontChange('headingFont', 'style', e.target.value)}>
              {FONT_STYLES.map(style => <option key={style} value={style} className="capitalize">{style}</option>)}
          </Select>
        </div>
        
        <div className="p-2 border rounded-md dark:border-gray-600">
           <h4 className="text-sm font-semibold mb-2">Body Font</h4>
           <Select label="Family" value={settings.typography.bodyFont.family} onChange={e => handleFontChange('bodyFont', 'family', e.target.value)}>
              {GOOGLE_FONTS.map(font => <option key={font} value={font}>{font}</option>)}
          </Select>
           <Select label="Weight" value={settings.typography.bodyFont.weight} onChange={e => handleFontChange('bodyFont', 'weight', e.target.value)}>
              {FONT_WEIGHTS.map(weight => <option key={weight} value={weight}>{weight}</option>)}
          </Select>
           <Select label="Style" value={settings.typography.bodyFont.style} onChange={e => handleFontChange('bodyFont', 'style', e.target.value)}>
              {FONT_STYLES.map(style => <option key={style} value={style} className="capitalize">{style}</option>)}
          </Select>
        </div>
    </div>
  );
};

export default TypographyTab;
