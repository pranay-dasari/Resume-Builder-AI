import React from 'react';
import { ResumeData, CustomizationSettings, ReorderableSectionKey } from '../../types';

interface TemplateProps {
    data: ResumeData;
    settings: CustomizationSettings;
}

const LeftSection: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="mb-4 text-sm" style={{ breakInside: 'avoid' }}>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 text-white/90">{title}</h2>
        {children}
    </div>
);

const RightSection: React.FC<{title: string; textColor: string; children: React.ReactNode}> = ({ title, textColor, children }) => (
    <div className="mb-6" style={{ breakInside: 'avoid' }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-1.5" style={{ color: textColor, borderBottom: `1px solid ${textColor}33` }}>{title}</h2>
        {children}
    </div>
);

const renderSummaryList = (text: string) => {
    return text.split('\n').map((line, index) => {
        if (line.trim().startsWith('*')) {
            return (
                <li key={index} className="mb-1" style={{ breakInside: 'avoid' }}>
                    {line.trim().substring(1).trim()}
                </li>
            );
        }
        return <p key={index} className="mb-1">{line}</p>;
    });
};


const CorporateTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
    const { basics, summary, experience, education, skills, profiles, languages, projects, certifications, interests, references } = data;
    const { colors, typography } = settings;

    const getInitials = (name: string) => {
        if (!name) return '';
        const nameParts = name.split(' ');
        if (nameParts.length > 1) {
            return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };
    
    const sectionComponents: Record<ReorderableSectionKey, React.ReactNode> = {
        summary: summary ? <p className="text-sm mb-6">{summary}</p> : null,
        experience: experience.length > 0 ? (
            <RightSection title="Experience" textColor={colors.text}>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 text-sm" style={{ breakInside: 'avoid' }}>
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{exp.position} | {exp.company}</h3>
                            <p className="text-xs text-gray-500">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{exp.location}</p>
                        <div className="pl-2">{renderSummaryList(exp.summary)}</div>
                    </div>
                ))}
            </RightSection>
        ) : null,
        education: education.length > 0 ? (
            <LeftSection title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold">{edu.institution}</h3>
                        <p>{edu.degree}</p>
                        <p className="opacity-80 text-xs">{edu.areaOfStudy}</p>
                        <p className="opacity-80 text-xs">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </LeftSection>
        ) : null,
        skills: skills.length > 0 ? (
            <LeftSection title="Key Skills & Characteristics">
                {skills.map(skill => (
                    <div key={skill.id} className="mb-2" style={{ breakInside: 'avoid' }}>
                        {skill.name && <h4 className="font-bold">{skill.name}</h4>}
                        <p className="text-xs">{skill.keywords.join(', ')}</p>
                    </div>
                ))}
            </LeftSection>
        ) : null,
        projects: projects.length > 0 ? (
             <LeftSection title="Projects">
                {projects.map(proj => (
                    <div key={proj.id} className="mb-2" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold">{proj.name}</h3>
                        <p className="text-xs opacity-80">{proj.role}</p>
                    </div>
                ))}
            </LeftSection>
        ) : null,
        profiles: null, // Contact info handled separately
        certifications: null,
        languages: null,
        interests: null,
        references: references ? (
             <RightSection title="References" textColor={colors.text}>
                <p className="text-sm">{references}</p>
            </RightSection>
        ) : null,
    };

    const templateLayout = data.layout[settings.template];
    const column1Keys = templateLayout ? templateLayout.column1 : []; // Sidebar
    const column2Keys = templateLayout ? templateLayout.column2 : []; // Main

    return (
        <div className="flex w-full h-full"
             style={{
                fontFamily: `'${typography.bodyFont.family}', sans-serif`,
                fontSize: `${typography.fontSize}pt`,
                lineHeight: typography.lineHeight,
                fontWeight: typography.bodyFont.weight,
                fontStyle: typography.bodyFont.style,
            }}
        >
             <style>
                {`
                    h1, h2, h3, h4, h5, h6, b, strong { 
                        font-family: '${typography.headingFont.family}', sans-serif;
                        font-weight: ${typography.headingFont.weight};
                        font-style: ${typography.headingFont.style};
                    }
                `}
            </style>
            
            {/* Left Column (Sidebar) */}
            <div className="w-[35%] p-6 text-white" style={{ backgroundColor: colors.primary }}>
                 <div className="w-20 h-20 mb-6 flex items-center justify-center bg-white/20">
                    <span className="text-3xl font-bold">{getInitials(basics.name)}</span>
                </div>
                
                <div className="space-y-3 text-xs mb-6">
                    {basics.location && <div><h4 className="font-bold uppercase tracking-wider text-sm mb-0.5">Location</h4><p>{basics.location}</p></div>}
                    {basics.phone && <div><h4 className="font-bold uppercase tracking-wider text-sm mb-0.5">Phone</h4><p>{basics.phone}</p></div>}
                    {basics.email && <div><h4 className="font-bold uppercase tracking-wider text-sm mb-0.5">Email</h4><p className="break-all">{basics.email}</p></div>}
                    {basics.website && <div><h4 className="font-bold uppercase tracking-wider text-sm mb-0.5">Website</h4><p className="break-all">{basics.website}</p></div>}
                </div>

                {column1Keys.map(key => sectionComponents[key])}
            </div>

            {/* Right Column (Main) */}
            <div className="w-[65%] p-8" style={{ color: colors.text, backgroundColor: colors.background }}>
                <h1 className="text-4xl font-bold tracking-wide" style={{ color: colors.text }}>{basics.name}</h1>
                <p className="text-md text-gray-600 mb-6">{basics.headline}</p>

                {column2Keys.map(key => sectionComponents[key])}
            </div>
        </div>
    );
};

export default CorporateTemplate;
