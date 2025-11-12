
import React, { useRef } from 'react';
import { ResumeData, CustomizationSettings, initialResumeData } from '../types';

interface HeaderProps {
  resumeData: ResumeData;
  customization: CustomizationSettings;
  onImport: (data: ResumeData) => void;
}

// Declare html2pdf for TypeScript since it's loaded from a script tag
declare var html2pdf: any;

const Header: React.FC<HeaderProps> = ({ resumeData, customization, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleExportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(resumeData, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "resume.json";
    link.click();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const importedData = JSON.parse(text);
          
          // Deep merge with defaults to prevent crashes on malformed/partial data
          const mergedData: ResumeData = {
            ...initialResumeData,
            ...importedData,
            basics: { ...initialResumeData.basics, ...(importedData.basics || {}) },
            layout: { ...initialResumeData.layout, ...(importedData.layout || {}) },
            // Ensure array fields exist, falling back to initial data if null/undefined in import
            profiles: importedData.profiles ?? initialResumeData.profiles,
            experience: importedData.experience ?? initialResumeData.experience,
            education: importedData.education ?? initialResumeData.education,
            skills: importedData.skills ?? initialResumeData.skills,
            languages: importedData.languages ?? initialResumeData.languages,
            certifications: importedData.certifications ?? initialResumeData.certifications,
            projects: importedData.projects ?? initialResumeData.projects,
            sectionOrder: importedData.sectionOrder ?? initialResumeData.sectionOrder,
          };

          onImport(mergedData);
          alert('Resume data imported successfully!');
        }
      } catch (error) {
        console.error("Failed to parse JSON file:", error);
        alert("Error: Could not import resume data. The file may be invalid.");
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input to allow importing the same file again
  };
  
  const getPdfOptions = () => {
      const isLetter = customization.layout.pageFormat === 'Letter';
      const paperSize = isLetter ? 'letter' : 'a4';
      
      const margins = customization.layout.margins;
      // Convert margins from cm to mm for jsPDF
      const margin_mm = [margins.top * 10, margins.left * 10, margins.bottom * 10, margins.right * 10];

      return {
        margin:       margin_mm,
        filename:     `${resumeData.basics.name}_Resume.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: paperSize, orientation: 'portrait' }
      };
  };

  const handlePrintPdf = () => {
      const element = document.getElementById('resume-preview');
      if (!element) {
        console.error("Resume preview element not found.");
        alert("Could not find the resume preview to download.");
        return;
      }

      const opt = getPdfOptions();
      // Use html2pdf to generate and save the PDF
      html2pdf().from(element).set(opt).save();
  };

  const handlePreviewPdf = () => {
      const element = document.getElementById('resume-preview');
      if (!element) {
        console.error("Resume preview element not found.");
        alert("Could not find the resume preview.");
        return;
      }

      const opt = getPdfOptions();
      // Use html2pdf to generate the PDF and open in a new tab
      html2pdf().from(element).set(opt).toPdf().get('pdf').then((pdf: any) => {
          window.open(pdf.output('bloburl'), '_blank');
      });
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center z-10">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        <span className="text-blue-500">AI</span> Resume Builder
      </h1>
      <div className="flex items-center space-x-2">
         <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/json"
          className="hidden"
        />
        <button
          onClick={handleImportClick}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Import JSON
        </button>
        <button
          onClick={handleExportJson}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Export JSON
        </button>
        <button
          onClick={handlePreviewPdf}
           className="px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-blue-300 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Preview
        </button>
        <button
          onClick={handlePrintPdf}
          className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Download PDF
        </button>
      </div>
    </header>
  );
};

export default Header;
