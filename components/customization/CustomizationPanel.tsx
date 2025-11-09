
import React, { useState } from 'react';
import { CustomizationSettings } from '../../types';
import TemplateTab from './TemplateTab';
import ColorTab from './ColorTab';
import TypographyTab from './TypographyTab';
import LayoutTab from './LayoutTab';

interface CustomizationPanelProps {
  settings: CustomizationSettings;
  onUpdate: (settings: CustomizationSettings) => void;
}

type Tab = 'Templates' | 'Colors' | 'Typography' | 'Layout';

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ settings, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Colors');

  const tabs: Tab[] = ['Templates', 'Colors', 'Typography', 'Layout'];

  return (
    <div className="flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-4 px-4" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4">
        {activeTab === 'Templates' && <TemplateTab settings={settings} onUpdate={onUpdate} />}
        {activeTab === 'Colors' && <ColorTab settings={settings} onUpdate={onUpdate} />}
        {activeTab === 'Typography' && <TypographyTab settings={settings} onUpdate={onUpdate} />}
        {activeTab === 'Layout' && <LayoutTab settings={settings} onUpdate={onUpdate} />}
      </div>
    </div>
  );
};

export default CustomizationPanel;
