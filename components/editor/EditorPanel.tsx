import React, { useState } from 'react';
import { ResumeData, ReorderableSectionKey } from '../../types';
import Accordion from '../ui/Accordion';
import BasicsSection from './BasicsSection';
import SummarySection from './SummarySection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ProfilesSection from './ProfilesSection';
import LanguagesSection from './LanguagesSection';
import CertificationsSection from './CertificationsSection';
import ProjectsSection from './ProjectsSection';
import ReferencesSection from './ReferencesSection';

interface EditorPanelProps {
  resumeData: ResumeData;
  onUpdate: (data: ResumeData) => void;
  template: string;
}

const DragHandle: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 cursor-grab group-hover:text-gray-600">
      <circle cx="9" cy="6" r="1.5" />
      <circle cx="15" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" />
      <circle cx="15" cy="18" r="1.5" />
  </svg>
);

const EditorPanel: React.FC<EditorPanelProps> = ({ resumeData, onUpdate, template }) => {
  const [draggedItem, setDraggedItem] = useState<{ key: ReorderableSectionKey, column: number } | null>(null);
  
  const sectionConfig: Record<ReorderableSectionKey, { title: string; component: React.ReactNode }> = {
    summary: { title: 'Summary', component: <SummarySection summary={resumeData.summary} onUpdate={summary => onUpdate({ ...resumeData, summary })} /> },
    profiles: { title: 'Social Profiles', component: <ProfilesSection profiles={resumeData.profiles} onUpdate={profiles => onUpdate({ ...resumeData, profiles })} /> },
    experience: { title: 'Work Experience', component: <ExperienceSection experience={resumeData.experience} onUpdate={experience => onUpdate({ ...resumeData, experience })} /> },
    projects: { title: 'Projects', component: <ProjectsSection projects={resumeData.projects} onUpdate={projects => onUpdate({ ...resumeData, projects })} /> },
    education: { title: 'Education', component: <EducationSection education={resumeData.education} onUpdate={education => onUpdate({ ...resumeData, education })} /> },
    certifications: { title: 'Certifications', component: <CertificationsSection certifications={resumeData.certifications} onUpdate={certifications => onUpdate({ ...resumeData, certifications })} /> },
    skills: { title: 'Skills', component: <SkillsSection skills={resumeData.skills} onUpdate={skills => onUpdate({ ...resumeData, skills })} /> },
    languages: { title: 'Languages', component: <LanguagesSection languages={resumeData.languages} onUpdate={languages => onUpdate({ ...resumeData, languages })} /> },
    references: { title: 'References', component: <ReferencesSection references={resumeData.references} onUpdate={references => onUpdate({ ...resumeData, references })} /> },
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, key: ReorderableSectionKey, column: number) => {
    e.dataTransfer.effectAllowed = 'move';
    setDraggedItem({ key, column });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, targetKey: ReorderableSectionKey, targetColumn: number) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.key === targetKey) return;

    const { key: draggedKey, column: sourceColumn } = draggedItem;

    const newLayout = { ...resumeData.layout };
    const templateLayout = { ...(newLayout[template] || { column1: [], column2: [] }) };

    const sourceColKey = `column${sourceColumn}` as const;
    const targetColKey = `column${targetColumn}` as const;

    let sourceColItems = [...templateLayout[sourceColKey]];
    let targetColItems = sourceColumn === targetColumn ? sourceColItems : [...templateLayout[targetColKey]];

    const draggedIndex = sourceColItems.indexOf(draggedKey);
    if (draggedIndex === -1) return;

    const [removed] = sourceColItems.splice(draggedIndex, 1);
    
    const targetIndex = targetColItems.indexOf(targetKey);
    targetColItems.splice(targetIndex, 0, removed);
    
    templateLayout[sourceColKey] = sourceColItems;
    templateLayout[targetColKey] = targetColItems;
    newLayout[template] = templateLayout;

    const newSectionOrder = [...templateLayout.column1, ...templateLayout.column2];

    onUpdate({ ...resumeData, layout: newLayout, sectionOrder: newSectionOrder });
  };
  
  const handleDropInColumn = (e: React.DragEvent<HTMLDivElement>, targetColumn: number) => {
     e.preventDefault();
     if (!draggedItem) return;

     const { key: draggedKey, column: sourceColumn } = draggedItem;
     
     // Only handle if dropping into a different, empty column
     const templateLayout = resumeData.layout[template];
     if (!templateLayout || sourceColumn === targetColumn || templateLayout[`column${targetColumn}` as const].length > 0) return;

     const newLayout = { ...resumeData.layout };
     const sourceColKey = `column${sourceColumn}` as const;
     const targetColKey = `column${targetColumn}` as const;

     const newSourceCol = templateLayout[sourceColKey].filter(k => k !== draggedKey);
     const newTargetCol = [...templateLayout[targetColKey], draggedKey];

     newLayout[template] = {
         ...templateLayout,
         [sourceColKey]: newSourceCol,
         [targetColKey]: newTargetCol
     };

     const newSectionOrder = [...newLayout[template].column1, ...newLayout[template].column2];
     onUpdate({ ...resumeData, layout: newLayout, sectionOrder: newSectionOrder });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };
  
  const renderSectionsForColumn = (columnKeys: ReorderableSectionKey[], column: number) => {
      return columnKeys.map(key => (
          <div
            key={key}
            draggable
            onDragStart={(e) => handleDragStart(e, key, column)}
            onDragOver={(e) => handleDragOver(e, key, column)}
            onDragEnd={handleDragEnd}
            className={`transition-opacity ${draggedItem?.key === key ? 'opacity-50' : 'opacity-100'}`}
          >
            <Accordion title={sectionConfig[key].title} dragHandle={<DragHandle />}>
                {sectionConfig[key].component}
            </Accordion>
          </div>
      ));
  }
  
  const templateLayout = resumeData.layout[template];
  const isMultiColumn = !!templateLayout;

  const getColumnTitles = () => {
      if (template === 'Default') return { col1: 'Main Column (Left)', col2: 'Sidebar (Right)' };
      if (template === 'Modern') return { col1: 'Main Column (Right)', col2: 'Sidebar (Left)' };
      return { col1: 'Main Column', col2: 'Sidebar Column' };
  }
  const columnTitles = getColumnTitles();


  return (
    <div className="space-y-1">
      <Accordion title="Basics" isOpenDefault={true}>
        <BasicsSection basics={resumeData.basics} onUpdate={basics => onUpdate({ ...resumeData, basics })} />
      </Accordion>

      {isMultiColumn ? (
        <>
          <div>
            <h4 className="p-3 font-semibold text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">{columnTitles.col1}</h4>
            <div 
              className="min-h-[4rem]" // min height to act as a drop zone
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropInColumn(e, 1)}
            >
              {renderSectionsForColumn(templateLayout.column1, 1)}
            </div>
          </div>
          <div>
            <h4 className="p-3 font-semibold text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">{columnTitles.col2}</h4>
            <div 
              className="min-h-[4rem]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropInColumn(e, 2)}
            >
              {renderSectionsForColumn(templateLayout.column2, 2)}
            </div>
          </div>
        </>
      ) : (
        resumeData.sectionOrder.map((key) => (
         <div
            key={key}
            draggable
            onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; setDraggedItem({key, column: 0}); }}
            onDragOver={(e) => {
              e.preventDefault();
              if (!draggedItem || draggedItem.key === key) return;

              const currentOrder = resumeData.sectionOrder;
              const draggedIndex = currentOrder.indexOf(draggedItem.key);
              const targetIndex = currentOrder.indexOf(key);
              
              if (draggedIndex === -1 || targetIndex === -1) return;

              const newOrder = [...currentOrder];
              const [removed] = newOrder.splice(draggedIndex, 1);
              newOrder.splice(targetIndex, 0, removed);
              
              onUpdate({ ...resumeData, sectionOrder: newOrder });
            }}
            onDragEnd={handleDragEnd}
            className={`transition-opacity ${draggedItem?.key === key ? 'opacity-50' : 'opacity-100'}`}
          >
            <Accordion title={sectionConfig[key].title} dragHandle={<DragHandle />}>
              {sectionConfig[key].component}
            </Accordion>
          </div>
        ))
      )}
    </div>
  );
};

export default EditorPanel;
