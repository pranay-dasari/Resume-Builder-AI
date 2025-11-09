
import React from 'react';
import { CustomizationSettings } from '../../types';
import Select from '../ui/Select';
import { PAGE_FORMATS } from '../../constants';

interface LayoutTabProps {
  settings: CustomizationSettings;
  onUpdate: (settings: CustomizationSettings) => void;
}

const LayoutTab: React.FC<LayoutTabProps> = ({ settings, onUpdate }) => {
    const handleLayoutChange = <T extends keyof CustomizationSettings['layout']>(
        field: T,
        value: CustomizationSettings['layout'][T]
    ) => {
        onUpdate({
            ...settings,
            layout: {
                ...settings.layout,
                [field]: value
            }
        });
    };

    const handleMarginChange = (margin: keyof CustomizationSettings['layout']['margins'], value: string) => {
        handleLayoutChange('margins', {
            ...settings.layout.margins,
            [margin]: parseFloat(value)
        });
    };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Page Settings</h3>
      <Select label="Page Format" value={settings.layout.pageFormat} onChange={e => handleLayoutChange('pageFormat', e.target.value as 'A4' | 'Letter')}>
        {PAGE_FORMATS.map(format => <option key={format} value={format}>{format}</option>)}
      </Select>
      
      <div>
        <h4 className="font-semibold text-sm mb-2">Margins (cm)</h4>
        <div className="grid grid-cols-2 gap-4">
            <div>
                 <label className="text-xs">Top</label>
                 <input type="number" step="0.1" value={settings.layout.margins.top} onChange={e => handleMarginChange('top', e.target.value)} className="w-full mt-1 p-1 border rounded dark:bg-gray-700 dark:border-gray-600"/>
            </div>
             <div>
                 <label className="text-xs">Bottom</label>
                 <input type="number" step="0.1" value={settings.layout.margins.bottom} onChange={e => handleMarginChange('bottom', e.target.value)} className="w-full mt-1 p-1 border rounded dark:bg-gray-700 dark:border-gray-600"/>
            </div>
             <div>
                 <label className="text-xs">Left</label>
                 <input type="number" step="0.1" value={settings.layout.margins.left} onChange={e => handleMarginChange('left', e.target.value)} className="w-full mt-1 p-1 border rounded dark:bg-gray-700 dark:border-gray-600"/>
            </div>
             <div>
                 <label className="text-xs">Right</label>
                 <input type="number" step="0.1" value={settings.layout.margins.right} onChange={e => handleMarginChange('right', e.target.value)} className="w-full mt-1 p-1 border rounded dark:bg-gray-700 dark:border-gray-600"/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutTab;
