

import React from 'react';
import { ResumeData, CustomizationSettings, ReorderableSectionKey } from '../../types';

interface TemplateProps {
    data: ResumeData;
    settings: CustomizationSettings;
}

const LeftSection: React.FC<{ title: string; fontSize: number; children: React.ReactNode; textColor: string }> = ({ title, fontSize, children, textColor }) => (
    <div className="mb-4" style={{ breakInside: 'avoid' }}>
        <h2 className="font-bold uppercase tracking-wider mb-2 pb-1" style={{ color: textColor, opacity: 0.9, fontSize: `${fontSize}pt` }}>{title}</h2>
        {children}
    </div>
);

const RightSection: React.FC<{ title: string; textColor: string; fontSize: number; children: React.ReactNode }> = ({ title, textColor, fontSize, children }) => (
    <div className="mb-6" style={{ breakInside: 'avoid' }}>
        <h2 className="font-bold uppercase tracking-widest mb-3 pb-1.5" style={{ color: textColor, borderBottom: `1px solid ${textColor}33`, fontSize: `${fontSize}pt` }}>{title}</h2>
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
    const { colors, typography, layout } = settings;
    const { fontSizes } = typography;
    const sidebarTextColor = colors.sidebarText;

    const isLetter = layout.pageFormat === 'Letter';
    const pageMinHeight = isLetter ? '11in' : '297mm';

    const getInitials = (name: string) => {
        if (!name) return '';
        const nameParts = name.split(' ');
        if (nameParts.length > 1) {
            return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const sectionComponents: Record<ReorderableSectionKey, React.ReactNode> = {
        summary: summary ? <p className="mb-6" style={{ fontSize: `${fontSizes.body}pt` }}>{summary}</p> : null,
        experience: experience.length > 0 ? (
            <RightSection title="Experience" textColor={colors.text} fontSize={fontSizes.sectionTitle}>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4" style={{ breakInside: 'avoid', fontSize: `${fontSizes.body}pt` }}>
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">
                                {exp.project ? `${exp.project} - ${exp.position}` : exp.position} | {exp.company}
                            </h3>
                            <p className="text-gray-500" style={{ fontSize: `${fontSizes.meta}pt` }}>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        </div>
                        <p className="text-gray-500 mb-1" style={{ fontSize: `${fontSizes.meta}pt` }}>{exp.location}</p>
                        <div className="pl-2">{renderSummaryList(exp.summary)}</div>
                    </div>
                ))}
            </RightSection>
        ) : null,
        education: education.length > 0 ? (
            <LeftSection title="Education" fontSize={fontSizes.sectionTitle} textColor={sidebarTextColor}>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3" style={{ breakInside: 'avoid', fontSize: `${fontSizes.body}pt` }}>
                        <h3 className="font-bold">{edu.institution}</h3>
                        <p>{edu.degree}</p>
                        <p className="opacity-80" style={{ fontSize: `${fontSizes.meta}pt` }}>{edu.areaOfStudy}</p>
                        <p className="opacity-80" style={{ fontSize: `${fontSizes.meta}pt` }}>{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </LeftSection>
        ) : null,
        skills: skills.length > 0 ? (
            <LeftSection title="Key Skills & Characteristics" fontSize={fontSizes.sectionTitle} textColor={sidebarTextColor}>
                {skills.map(skill => (
                    <div key={skill.id} className="mb-2" style={{ breakInside: 'avoid' }}>
                        {skill.name && <h4 className="font-bold" style={{ fontSize: `${fontSizes.body}pt` }}>{skill.name}</h4>}
                        <p style={{ fontSize: `${fontSizes.meta}pt` }}>{skill.keywords.join(', ')}</p>
                    </div>
                ))}
            </LeftSection>
        ) : null,
        projects: projects.length > 0 ? (
            <LeftSection title="Projects" fontSize={fontSizes.sectionTitle} textColor={sidebarTextColor}>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-2" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold" style={{ fontSize: `${fontSizes.body}pt` }}>{proj.name}</h3>
                        <p className="opacity-80" style={{ fontSize: `${fontSizes.meta}pt` }}>{proj.role}</p>
                    </div>
                ))}
            </LeftSection>
        ) : null,
        profiles: null, // Contact info handled separately
        certifications: null,
        languages: null,
        interests: null,
        references: references ? (
            <RightSection title="References" textColor={colors.text} fontSize={fontSizes.sectionTitle}>
                <p style={{ fontSize: `${fontSizes.body}pt` }}>{references}</p>
            </RightSection>
        ) : null,
    };

    const templateLayout = data.layout[settings.template];
    const column1Keys = templateLayout ? templateLayout.column1 : []; // Sidebar
    const column2Keys = templateLayout ? templateLayout.column2 : []; // Main

    return (
        <div className="flex w-full"
            style={{
                backgroundColor: colors.primary,
                fontFamily: `'${typography.bodyFont.family}', sans-serif`,
                fontSize: `${typography.fontSizes.body}pt`,
                lineHeight: typography.lineHeight,
                fontWeight: typography.bodyFont.weight,
                fontStyle: typography.bodyFont.style,
                minHeight: pageMinHeight,
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
            <div className="w-[35%] p-6" style={{ color: sidebarTextColor }}>
                <div className="w-20 h-20 mb-6 flex items-center justify-center" style={{ backgroundColor: `${sidebarTextColor}33` }}>
                    <span className="font-bold" style={{ fontSize: `${fontSizes.name / 1.5}pt` }}>{getInitials(basics.name)}</span>
                </div>

                <div className="space-y-3 mb-6" style={{ fontSize: `${fontSizes.meta}pt` }}>
                    {basics.location && <div><h4 className="font-bold uppercase tracking-wider mb-0.5" style={{ fontSize: `${fontSizes.sectionTitle}pt` }}>Location</h4><p>{basics.location}</p></div>}
                    {basics.phone && <div><h4 className="font-bold uppercase tracking-wider mb-0.5" style={{ fontSize: `${fontSizes.sectionTitle}pt` }}>Phone</h4><p>{basics.phone}</p></div>}
                    {basics.email && <div><h4 className="font-bold uppercase tracking-wider mb-0.5" style={{ fontSize: `${fontSizes.sectionTitle}pt` }}>Email</h4><p className="break-all">{basics.email}</p></div>}
                    {basics.website && <div><h4 className="font-bold uppercase tracking-wider mb-0.5" style={{ fontSize: `${fontSizes.sectionTitle}pt` }}>Website</h4><p className="break-all">{basics.website}</p></div>}
                </div>

                {column1Keys.map(key => sectionComponents[key])}
            </div>

            {/* Right Column (Main) */}
            <div className="w-[65%] p-8" style={{ color: colors.text, backgroundColor: colors.background }}>
                <h1 className="font-bold tracking-wide" style={{ color: colors.text, fontSize: `${fontSizes.name}pt` }}>{basics.name}</h1>
                <p className="text-gray-600 mb-6" style={{ fontSize: `${fontSizes.headline}pt` }}>{basics.headline}</p>

                {column2Keys.map(key => sectionComponents[key])}
            </div>
        </div>
    );
};

export default CorporateTemplate;
