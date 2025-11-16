

import React from 'react';
import { ResumeData, CustomizationSettings, ReorderableSectionKey } from '../../types';

interface ResumeTemplateProps {
    data: ResumeData;
    settings: CustomizationSettings;
}

const Section: React.FC<{title: string; primaryColor: string; fontSize: number; children: React.ReactNode}> = ({ title, primaryColor, fontSize, children }) => (
    <div className="mb-4" style={{ breakInside: 'avoid' }}>
        <h2 className="font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ borderColor: primaryColor, color: primaryColor, fontSize: `${fontSize}pt` }}>
            {title}
        </h2>
        {children}
    </div>
);

const DefaultTemplate: React.FC<ResumeTemplateProps> = ({ data, settings }) => {
    const { basics, summary, experience, education, skills, profiles, languages, projects, certifications, interests, references } = data;
    const { colors, typography, layout } = settings;
    const { fontSizes } = typography;
    const sidebarTextColor = colors.sidebarText;

    const isLetter = layout.pageFormat === 'Letter';
    const pageMinHeight = isLetter ? '11in' : '297mm';

    const formatUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
    };

    const renderSummary = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.trim().startsWith('*')) {
                return <li key={index} className="ml-4" style={{ breakInside: 'avoid' }}>{line.trim().substring(1).trim()}</li>;
            }
            return <p key={index} className="mb-1">{line}</p>;
        });
    };
    
    const sectionComponents: Record<ReorderableSectionKey, React.ReactNode> = {
        summary: summary ? (
            <Section title="Summary" primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                <div style={{ fontSize: `${fontSizes.body}pt` }}>{renderSummary(summary)}</div>
            </Section>
        ) : null,
        experience: experience.length > 0 ? (
            <Section title="Experience" primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{exp.position}</h3>
                        <div className="flex justify-between" style={{ fontSize: `${fontSizes.body}pt` }}>
                            <p className="font-semibold">{exp.company}</p>
                            <p className="italic" style={{ fontSize: `${fontSizes.meta}pt` }}>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        </div>
                        <div className="mt-1 list-disc pl-5" style={{ fontSize: `${fontSizes.body}pt` }}>{renderSummary(exp.summary)}</div>
                    </div>
                ))}
            </Section>
        ) : null,
        projects: projects.length > 0 ? (
             <Section title="Projects" primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{proj.name}</h3>
                        <p className="font-semibold italic" style={{ fontSize: `${fontSizes.body}pt` }}>{proj.role}</p>
                        <p className="mt-1" style={{ fontSize: `${fontSizes.body}pt` }}>{proj.description}</p>
                        {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline mt-1" style={{ fontSize: `${fontSizes.meta}pt` }}>{proj.url}</a>}
                    </div>
                ))}
            </Section>
        ) : null,
        profiles: profiles.length > 0 ? (
            <Section title="Profiles" primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                {profiles.map(p => (
                    <a key={p.id} href={formatUrl(p.url)} target="_blank" rel="noopener noreferrer" className="block hover:underline" style={{color: sidebarTextColor, fontSize: `${fontSizes.body}pt`}}>{p.network}: {p.username}</a>
                ))}
            </Section>
        ) : null,
        skills: skills.length > 0 ? (
            <Section title="Skills" primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                {skills.map(skill => (
                    <div key={skill.id} className="mb-1" style={{ breakInside: 'avoid' }}>
                        <p className="font-semibold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{skill.name}</p>
                        {skill.keywords.length > 0 && <p className="pl-2" style={{ fontSize: `${fontSizes.body}pt` }}>{skill.keywords.join(', ')}</p>}
                    </div>
                ))}
            </Section>
        ) : null,
        education: education.length > 0 ? (
            <Section title="Education" primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{edu.institution}</h3>
                        <p style={{ fontSize: `${fontSizes.body}pt` }}>{edu.degree}, {edu.areaOfStudy}</p>
                        <p className="italic" style={{ fontSize: `${fontSizes.meta}pt` }}>{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </Section>
        ) : null,
        languages: languages.length > 0 ? (
            <Section title="Languages" primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                 {languages.map(lang => (
                     <p key={lang.id} style={{ fontSize: `${fontSizes.body}pt` }}>{lang.language} ({lang.fluency})</p>
                 ))}
            </Section>
        ) : null,
        certifications: certifications.length > 0 ? (
            <Section title="Certifications" primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                {certifications.map(c => (
                     <div key={c.id} className="mb-1" style={{ breakInside: 'avoid', fontSize: `${fontSizes.body}pt` }}>
                        <p className="font-semibold">{c.name}</p>
                        <p style={{ fontSize: `${fontSizes.meta}pt` }}>{c.issuer} ({c.date})</p>
                    </div>
                ))}
            </Section>
        ) : null,
        interests: interests.length > 0 ? (
            <Section title="Interests" primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                <p style={{ fontSize: `${fontSizes.body}pt` }}>{interests.map(i => i.name).join(', ')}</p>
            </Section>
        ) : null,
        references: references ? (
            <Section title="References" primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                <p style={{ fontSize: `${fontSizes.body}pt` }}>{references}</p>
            </Section>
        ): null,
    };

    const templateLayout = data.layout[settings.template];
    const column1Keys = templateLayout ? templateLayout.column1 : [];
    const column2Keys = templateLayout ? templateLayout.column2 : [];
    const sidebarBg = colors.primary;

    return (
        <div
            style={{
                backgroundColor: sidebarBg, // Use primary color as the base for faux-column effect
                color: colors.text,
                fontFamily: `'${typography.bodyFont.family}', sans-serif`,
                fontSize: `${typography.fontSizes.body}pt`,
                lineHeight: typography.lineHeight,
                fontWeight: typography.bodyFont.weight,
                fontStyle: typography.bodyFont.style,
                minHeight: pageMinHeight,
                width: '100%',
            }}
        >
            <style>
                {`
                    h1, h2, h3, h4, h5, h6 { 
                        font-family: '${typography.headingFont.family}', sans-serif;
                        font-weight: ${typography.headingFont.weight};
                        font-style: ${typography.headingFont.style};
                    }
                    li {
                        break-inside: avoid;
                    }
                    .sidebar-column {
                        color: ${sidebarTextColor};
                    }
                    .sidebar-column h2, .sidebar-column a {
                        color: ${sidebarTextColor} !important;
                    }
                    .sidebar-column h2 {
                        border-color: ${sidebarTextColor}80 !important;
                    }
                    .sidebar-column a {
                        opacity: 0.9;
                    }
                    .sidebar-column a:hover {
                        opacity: 1;
                    }
                `}
            </style>
            
            <div style={{ backgroundColor: colors.background }} className="p-8">
                <header className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="font-bold" style={{ color: colors.primary, fontSize: `${fontSizes.name}pt` }}>{basics.name}</h1>
                        <p style={{ fontSize: `${fontSizes.headline}pt` }}>{basics.headline}</p>
                    </div>
                    {basics.photo && <img src={basics.photo} alt={basics.name} className="w-24 h-24 rounded-full object-cover" />}
                </header>
                
                <div className="mb-6 flex flex-wrap justify-between items-center border-y py-2" style={{ borderColor: colors.primary + '33', fontSize: `${fontSizes.meta}pt` }}>
                    <span>{basics.email}</span>
                    <span>{basics.phone}</span>
                    <a href={formatUrl(basics.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">{basics.website}</a>
                    <span>{basics.location}</span>
                </div>
            </div>

            <div className="flex">
                <div className="w-2/3 p-8 pt-0" style={{ backgroundColor: colors.background }}>
                   {column1Keys.map(key => sectionComponents[key])}
                </div>

                <div className="w-1/3 p-8 pt-0 sidebar-column">
                   {column2Keys.map(key => sectionComponents[key])}
                </div>
            </div>
        </div>
    );
};

export default DefaultTemplate;
