import React, { useState, useCallback } from 'react';
import { ResumeData, CustomizationSettings, initialResumeData, initialCustomizationSettings } from './types';
import EditorPanel from './components/editor/EditorPanel';
import PreviewPanel from './components/preview/PreviewPanel';
import CustomizationPanel from './components/customization/CustomizationPanel';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [customization, setCustomization] = useState<CustomizationSettings>(initialCustomizationSettings);
  const [showLandingPage, setShowLandingPage] = useState(true);

  const handleResumeChange = useCallback((newResumeData: ResumeData) => {
    setResumeData(newResumeData);
  }, []);

  const handleCustomizationChange = useCallback((newCustomization: CustomizationSettings) => {
    setCustomization(newCustomization);
  }, []);

  const handleStartBuilding = () => {
    setShowLandingPage(false);
  };

  if (showLandingPage) {
    return <LandingPage onStart={handleStartBuilding} />;
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header resumeData={resumeData} customization={customization} onImport={handleResumeChange} />
      <main className="flex-grow flex">
        <div className="w-full grid grid-cols-1 lg:grid-cols-10 xl:grid-cols-4 gap-4 p-4 items-start">
          {/* Left Panel: Editor */}
          <div className="lg:col-span-3 xl:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-1">
            <EditorPanel 
              resumeData={resumeData} 
              onUpdate={handleResumeChange}
              template={customization.template}
            />
          </div>
          
          {/* Center Panel: Preview */}
          <div className="lg:col-span-4 xl:col-span-2 flex items-start justify-center bg-gray-200 dark:bg-gray-700 rounded-lg shadow-inner">
             <PreviewPanel resumeData={resumeData} customization={customization} />
          </div>

          {/* Right Panel: Customization */}
          <div className="lg:col-span-3 xl:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-1">
            <CustomizationPanel 
              settings={customization} 
              onUpdate={handleCustomizationChange} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;