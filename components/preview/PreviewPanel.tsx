import React from 'react';
import { ResumeData, CustomizationSettings } from '../../types';
import ResumeTemplate from './ResumeTemplate';

interface PreviewPanelProps {
  resumeData: ResumeData;
  customization: CustomizationSettings;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ resumeData, customization }) => {
  // By removing the fixed aspect ratio, the container's height will be determined by its content.
  // This ensures that the generated PDF does not include extra blank space at the bottom
  // when the resume content is shorter than a full page.
  
  return (
    <div className="w-full p-8 flex items-start justify-center">
        <div id="resume-preview-container" className="w-full max-w-4xl">
            <div id="resume-preview" className="bg-white shadow-lg w-full transform origin-top-left">
                <ResumeTemplate data={resumeData} settings={customization} />
            </div>
        </div>
    </div>
  );
};

export default PreviewPanel;