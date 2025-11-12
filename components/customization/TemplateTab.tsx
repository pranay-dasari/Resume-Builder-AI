import React from 'react';
import { CustomizationSettings } from '../../types';
import { TEMPLATES } from '../../constants';

interface TemplateTabProps {
  settings: CustomizationSettings;
  onUpdate: (settings: CustomizationSettings) => void;
}

const TemplateTab: React.FC<TemplateTabProps> = ({ settings, onUpdate }) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Select a Template</h3>
      <div className="grid grid-cols-2 gap-4">
        {TEMPLATES.map(template => (
          <div key={template.id} 
               onClick={() => onUpdate({ ...settings, template: template.id })}
               className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${settings.template === template.id ? 'border-blue-500 shadow-lg' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'}`}
          >
            <div className="bg-white dark:bg-gray-700 h-24 w-full rounded flex overflow-hidden border dark:border-gray-600">
                {template.id === 'Professional' && (
                    <div className="p-2 w-full flex flex-col">
                        <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-800 mr-2 flex-shrink-0"></div> {/* Photo */}
                            <div className="flex-grow">
                                <div className="h-4 w-3/4 bg-gray-700 dark:bg-gray-300 rounded-sm mb-1"></div> {/* Name */}
                                <div className="h-2 w-1/2 bg-gray-500 dark:bg-gray-400 rounded-sm"></div> {/* Headline */}
                            </div>
                        </div>
                        <div className="h-2 w-1/3 bg-blue-500 dark:bg-blue-400 rounded-sm mb-2"></div> {/* Section title */}
                        <div className="h-1.5 w-full bg-gray-400 dark:bg-gray-500 rounded-sm mb-1"></div>
                        <div className="h-1.5 w-5/6 bg-gray-400 dark:bg-gray-500 rounded-sm mb-1"></div>
                        <div className="h-1.5 w-full bg-gray-400 dark:bg-gray-500 rounded-sm mb-1"></div>
                        <div className="h-1.5 w-2/3 bg-gray-400 dark:bg-gray-500 rounded-sm"></div>
                    </div>
                )}
                 {template.id === 'Modern' && (
                    <>
                        <div className="w-1/3 h-full bg-gray-700 dark:bg-gray-800 p-2 flex flex-col"> {/* Sidebar */}
                            <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600 mx-auto mb-2 shrink-0"></div> {/* Photo */}
                            <div className="h-2 w-full bg-gray-500 dark:bg-gray-700 rounded-sm mb-1"></div>
                            <div className="h-2 w-2/3 bg-gray-500 dark:bg-gray-700 rounded-sm"></div>
                            <div className="h-2 w-full bg-gray-500 dark:bg-gray-700 rounded-sm mt-3 mb-1"></div>
                            <div className="h-2 w-5/6 bg-gray-500 dark:bg-gray-700 rounded-sm"></div>
                        </div>
                        <div className="w-2/3 h-full p-2"> {/* Main content */}
                            <div className="h-5 w-3/4 bg-gray-600 dark:bg-gray-400 rounded-sm mb-1"></div> {/* Name */}
                            <div className="h-3 w-1/2 bg-gray-400 dark:bg-gray-500 rounded-sm mb-3"></div> {/* Headline */}
                            <div className="h-3 w-1/3 bg-blue-500 dark:bg-blue-400 rounded-sm mb-2"></div> {/* Section title */}
                            <div className="h-2 w-full bg-gray-400 dark:bg-gray-500 rounded-sm mb-1"></div>
                            <div className="h-2 w-5/6 bg-gray-400 dark:bg-gray-500 rounded-sm"></div>
                        </div>
                    </>
                )}
                 {template.id === 'Creative' && (
                    <div className="w-full h-full flex">
                        <div className="w-1/3 h-full bg-blue-500 dark:bg-blue-700 p-2 flex flex-col items-center"> {/* Sidebar */}
                            <div className="h-4 w-3/4 bg-white/90 rounded-sm mb-1"></div> {/* Name */}
                            <div className="h-2 w-1/2 bg-white/70 rounded-sm mb-4"></div> {/* Headline */}
                            <div className="h-2 w-2/3 bg-white/90 rounded-sm mb-2 self-start"></div> {/* Section Title */}
                            <div className="h-1.5 w-5/6 bg-white/70 rounded-sm mb-1 self-start"></div>
                            <div className="h-1.5 w-full bg-white/70 rounded-sm mb-1 self-start"></div>
                        </div>
                        <div className="w-2/3 h-full p-2"> {/* Main */}
                            <div className="h-3 w-1/3 bg-gray-500 dark:bg-gray-400 rounded-sm mb-2"></div> {/* Section Title */}
                            <div className="h-2 w-full bg-gray-400 dark:bg-gray-500 rounded-sm mb-1"></div>
                            <div className="h-2 w-5/6 bg-gray-400 dark:bg-gray-500 rounded-sm mb-1"></div>
                            <div className="h-2 w-full bg-gray-400 dark:bg-gray-500 rounded-sm"></div>
                        </div>
                    </div>
                )}
                {template.id === 'Elegant' && (
                    <div className="w-full h-full flex">
                        <div className="w-1/3 h-full bg-red-500 dark:bg-red-700 p-2 flex flex-col items-start"> {/* Sidebar */}
                            <div className="w-10 h-10 bg-white/90 mb-4 self-center"></div> {/* Initials */}
                            <div className="h-2 w-2/3 bg-white/90 rounded-sm mb-0.5"></div> {/* Label */}
                            <div className="h-1.5 w-full bg-white/70 rounded-sm mb-2"></div> {/* Value */}
                            <div className="h-2 w-2/3 bg-white/90 rounded-sm mb-0.5"></div> {/* Label */}
                            <div className="h-1.5 w-full bg-white/70 rounded-sm mb-2"></div> {/* Value */}
                        </div>
                        <div className="w-2/3 h-full p-2"> {/* Main */}
                            <div className="h-4 w-3/4 bg-gray-600 dark:bg-gray-400 rounded-sm mb-1"></div> {/* Name */}
                            <div className="h-2 w-full bg-gray-400 dark:bg-gray-500 rounded-sm mb-3"></div> {/* Summary */}
                            <div className="h-2 w-1/3 bg-gray-500 dark:bg-gray-400 rounded-sm mb-2"></div> {/* Section Title */}
                            <div className="h-1.5 w-full bg-gray-400 dark:bg-gray-500 rounded-sm mb-1"></div>
                            <div className="h-1.5 w-5/6 bg-gray-400 dark:bg-gray-500 rounded-sm"></div>
                        </div>
                    </div>
                )}
                {template.id === 'Corporate' && (
                    <div className="w-full h-full flex">
                        <div className="w-1/3 h-full bg-blue-800 dark:bg-blue-900 p-2 flex flex-col"> {/* Sidebar */}
                            <div className="w-8 h-8 bg-blue-500 dark:bg-blue-700 mb-4 self-center"></div> {/* Initials */}
                            <div className="h-2 w-1/2 bg-white/90 rounded-sm mb-2"></div> {/* Section Title */}
                            <div className="h-1.5 w-full bg-white/70 rounded-sm mb-1"></div>
                            <div className="h-1.5 w-3/4 bg-white/70 rounded-sm mb-1"></div>
                        </div>
                        <div className="w-2/3 h-full p-2"> {/* Main */}
                            <div className="h-4 w-3/4 bg-gray-600 dark:bg-gray-400 rounded-sm mb-1"></div> {/* Name */}
                            <div className="h-1.5 w-full bg-gray-400 dark:bg-gray-500 rounded-sm mb-1"></div>
                            <div className="h-1.5 w-5/6 bg-gray-400 dark:bg-gray-500 rounded-sm mb-3"></div>
                            <div className="h-2 w-1/3 bg-gray-500 dark:bg-gray-400 rounded-sm mb-2"></div> {/* Section Title */}
                            <div className="h-1.5 w-full bg-gray-400 dark:bg-gray-500 rounded-sm mb-1"></div>
                        </div>
                    </div>
                )}
                 {template.id === 'Default' && (
                    <div className="p-2 w-full">
                        <div className="h-5 w-1/2 bg-gray-700 dark:bg-gray-300 rounded-sm mb-1"></div> {/* Name */}
                        <div className="h-3 w-3/4 bg-gray-500 dark:bg-gray-400 rounded-sm mb-3"></div> {/* Headline */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2 space-y-1">
                            <div className="h-2 w-1/3 bg-blue-500 dark:bg-blue-400 rounded-sm"></div> {/* Section title */}
                            <div className="h-1.5 w-full bg-gray-400 dark:bg-gray-500 rounded-sm"></div>
                            <div className="h-1.5 w-5/6 bg-gray-400 dark:bg-gray-500 rounded-sm"></div>
                          </div>
                          <div className="col-span-1 space-y-1">
                            <div className="h-2 w-1/2 bg-blue-500 dark:bg-blue-400 rounded-sm"></div> {/* Section title */}
                            <div className="h-1.5 w-full bg-gray-400 dark:bg-gray-500 rounded-sm"></div>
                            <div className="h-1.5 w-full bg-gray-400 dark:bg-gray-500 rounded-sm"></div>
                          </div>
                        </div>
                    </div>
                )}
            </div>
            <p className="text-center text-sm mt-2">{template.name}</p>
          </div>
        ))}
      </div>
       <p className="text-sm text-gray-500 mt-4">More templates coming soon!</p>
    </div>
  );
};

export default TemplateTab;