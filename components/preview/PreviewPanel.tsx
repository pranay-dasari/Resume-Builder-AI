
import React from 'react';
import { ResumeData, CustomizationSettings } from '../../types';
import ResumeTemplate from './ResumeTemplate';

interface PreviewPanelProps {
  resumeData: ResumeData;
  customization: CustomizationSettings;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ resumeData, customization }) => {
  const isLetter = customization.layout.pageFormat === 'Letter';
  // A4: 210mm x 297mm. Letter: 8.5in x 11in (215.9mm x 279.4mm)
  // We use a fixed width for the container and scale the preview.
  const aspectRatio = isLetter ? 8.5 / 11 : 210 / 297;
  
  return (
    <div className="w-full p-8 flex items-start justify-center">
        <div id="resume-preview-container" className="w-full max-w-4xl" style={{ aspectRatio: `${aspectRatio}` }}>
            <div id="resume-preview" className="bg-white shadow-lg w-full h-full transform origin-top-left">
                <ResumeTemplate data={resumeData} settings={customization} />
            </div>
        </div>
    </div>
  );
};

export default PreviewPanel;
