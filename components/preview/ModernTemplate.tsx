

import React from 'react';
import { ResumeData, CustomizationSettings, ReorderableSectionKey } from '../../types';

interface ResumeTemplateProps {
    data: ResumeData;
    settings: CustomizationSettings;
}

const LeftSection: React.FC<{ title: string; fontSize: number; children: React.ReactNode; textColor: string }> = ({ title, fontSize, children, textColor }) => (
    <div className="mb-6" style={{ breakInside: 'avoid' }}>
        <h3 className="font-bold uppercase tracking-wider mb-2" style={{ color: textColor, opacity: 0.8, fontSize: `${fontSize}pt` }}>{title}</h3>
        {children}
    </div>
);

const RightSection: React.FC<{ title: string; primaryColor: string; fontSize: number; children: React.ReactNode }> = ({ title, primaryColor, fontSize, children }) => (
    <div className="mb-6" style={{ breakInside: 'avoid' }}>
        <h2 className="font-bold uppercase tracking-wider text-gray-700 mb-4 pb-1 border-b-2" style={{ borderColor: primaryColor, fontSize: `${fontSize}pt` }}>{title}</h2>
        {children}
    </div>
);

const ProfileIcon: React.FC<{ network: string }> = ({ network }) => {
    switch (network.toLowerCase()) {
        case 'linkedin':
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 flex-shrink-0"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.62 1.62 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>;
        case 'github':
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 flex-shrink-0"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"></path></svg>;
        case 'stackoverflow':
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 flex-shrink-0"><path d="M19 20.5v-6h2v8h-24v-8h2v6h20zM6.53 11.53l8.94-1.87-.34-1.62-8.94 1.87.34 1.62zm.88 3.54l8.24-3.92-.68-1.44-8.24 3.92.68 1.44zm1.53 3.42l6.9-5.9-1-1.18-6.9 5.9 1 1.18zm2.84 2.51l4.9-7.38-1.36-.9-4.9 7.38 1.36.9zM18 1.5h-12v2h12v-2z"></path></svg>;
        default:
            return null;
    }
}

const ModernTemplate: React.FC<ResumeTemplateProps> = ({ data, settings }) => {
    const { basics, summary, experience, education, skills, profiles, languages, certifications, projects, interests, references } = data;
    const { colors, typography, layout } = settings;
    const { fontSizes } = typography;
    const sidebarTextColor = colors.sidebarText;

    const isLetter = layout.pageFormat === 'Letter';
    const pageMinHeight = isLetter ? '11in' : '297mm';

    type RenderContext = 'sidebar' | 'main';

    const formatUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
    };

    const renderSummaryList = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.trim().startsWith('*')) {
                return <li key={index} className="mb-1" style={{ breakInside: 'avoid' }}>{line.trim().substring(1).trim()}</li>;
            }
            return <p key={index} className="mb-1">{line}</p>;
        });
    };

    const sectionRenderers: Record<ReorderableSectionKey, { title: string; isVisible: boolean; render: (context: RenderContext) => React.ReactNode; }> = {
        summary: {
            title: "Summary",
            isVisible: !!summary,
            render: () => <p style={{ fontSize: `${fontSizes.body}pt` }}>{summary}</p>
        },
        experience: {
            title: "Experience",
            isVisible: experience.length > 0,
            render: (context) => experience.map(exp => (
                <div key={exp.id} className="mb-4 relative pl-5" style={{ breakInside: 'avoid' }}>
                    <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 bg-white" style={{ borderColor: context === 'main' ? colors.primary : sidebarTextColor }}></div>
                    <div className="absolute left-[4.5px] top-1.5 w-px h-full" style={{ backgroundColor: context === 'main' ? colors.primary : sidebarTextColor }}></div>
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{exp.company}</h3>
                        <p className={`font-semibold ${context === 'main' ? 'text-gray-500' : 'opacity-80'}`} style={{ fontSize: `${fontSizes.meta}pt` }}>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="font-semibold" style={{ color: context === 'main' ? colors.primary : sidebarTextColor, fontSize: `${fontSizes.subheading}pt` }}>
                        {exp.project ? `${exp.project} - ${exp.position}` : exp.position}
                    </p>
                    <p className={`mb-1 ${context === 'main' ? 'text-gray-500' : 'opacity-80'}`} style={{ fontSize: `${fontSizes.meta}pt` }}>{exp.location}</p>
                    <ul className="mt-1 list-disc pl-5" style={{ fontSize: `${fontSizes.body}pt` }}>{renderSummaryList(exp.summary)}</ul>
                </div>
            ))
        },
        education: {
            title: "Education",
            isVisible: education.length > 0,
            render: (context) => education.map(edu => (
                <div key={edu.id} className="mb-2" style={{ breakInside: 'avoid' }}>
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{edu.institution}</h3>
                        <p className={`font-semibold ${context === 'main' ? 'text-gray-500' : 'opacity-80'}`} style={{ fontSize: `${fontSizes.meta}pt` }}>{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <p style={{ fontSize: `${fontSizes.body}pt` }}>{edu.degree}</p>
                    <p className={`${context === 'main' ? 'text-gray-500' : 'opacity-80'}`} style={{ fontSize: `${fontSizes.meta}pt` }}>{edu.areaOfStudy}</p>
                </div>
            ))
        },
        projects: {
            title: "Projects",
            isVisible: projects.length > 0,
            render: (context) => (
                <div className={`grid grid-cols-1 ${context === 'main' ? 'md:grid-cols-2' : ''} gap-x-6 gap-y-2`}>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-2 relative pl-5" style={{ breakInside: 'avoid' }}>
                            <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 bg-white" style={{ borderColor: context === 'main' ? colors.primary : sidebarTextColor }}></div>
                            <div className="absolute left-[4.5px] top-1.5 w-px h-full" style={{ backgroundColor: context === 'main' ? colors.primary : sidebarTextColor }}></div>
                            <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{proj.name}</h3>
                            <p className="font-semibold" style={{ color: context === 'main' ? colors.primary : sidebarTextColor, fontSize: `${fontSizes.body}pt` }}>{proj.role}</p>
                            <p className="mt-1" style={{ fontSize: `${fontSizes.body}pt` }}>{proj.description}</p>
                        </div>
                    ))}
                </div>
            )
        },
        profiles: {
            title: "Profiles",
            isVisible: profiles.length > 0,
            render: () => profiles.map(p => (
                <a key={p.id} href={formatUrl(p.url)} target="_blank" rel="noopener noreferrer" className="flex items-center mb-1 hover:opacity-80 break-all" style={{ fontSize: `${fontSizes.body}pt` }}>
                    <ProfileIcon network={p.network} />
                    <span>{p.username}</span>
                </a>
            ))
        },
        skills: {
            title: "Skills",
            isVisible: skills.length > 0,
            render: () => skills.map(skill => (
                <div key={skill.id} className="mb-3" style={{ breakInside: 'avoid', fontSize: `${fontSizes.body}pt` }}>
                    <h4 className="font-bold">{skill.name}</h4>
                    <p className="mt-1 font-light" style={{ fontSize: `${fontSizes.meta}pt` }}>{skill.keywords.join(', ')}</p>
                </div>
            ))
        },
        certifications: {
            title: "Certifications",
            isVisible: certifications.length > 0,
            render: () => certifications.map(cert => (
                <div key={cert.id} className="mb-2" style={{ breakInside: 'avoid', fontSize: `${fontSizes.body}pt` }}>
                    <p className="font-bold">{cert.name}</p>
                    <p className="font-light" style={{ fontSize: `${fontSizes.meta}pt` }}>{cert.issuer}</p>
                    <p className="font-light" style={{ fontSize: `${fontSizes.meta}pt` }}>{cert.date}</p>
                </div>
            ))
        },
        languages: {
            title: "Languages",
            isVisible: languages.length > 0,
            render: () => languages.map(lang => (
                <div key={lang.id} className="mb-1" style={{ fontSize: `${fontSizes.body}pt` }}>
                    <span className="font-bold">{lang.language}: </span>
                    <span className="font-light">{lang.fluency}</span>
                </div>
            ))
        },
        interests: {
            title: "Interests",
            isVisible: interests.length > 0,
            render: () => <p className="font-light" style={{ fontSize: `${fontSizes.body}pt` }}>{interests.map(i => i.name).join(', ')}</p>
        },
        references: {
            title: "References",
            isVisible: !!references,
            render: () => <p className="font-light" style={{ fontSize: `${fontSizes.body}pt` }}>{references}</p>
        }
    };

    const templateLayout = data.layout[settings.template];
    const column1Keys = templateLayout ? templateLayout.column1 : []; // Right column (main)
    const column2Keys = templateLayout ? templateLayout.column2 : []; // Left column (sidebar)

    return (
        <div
            className="flex w-full"
            style={{
                backgroundColor: colors.primary,
                color: colors.text,
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
                    h1, h2, h3, h4, h5, h6 { 
                        font-family: '${typography.headingFont.family}', sans-serif;
                        font-weight: ${typography.headingFont.weight};
                        font-style: ${typography.headingFont.style};
                    }
                     li {
                        break-inside: avoid;
                    }
                `}
            </style>
            {/* Left Column (Sidebar) */}
            <div className="w-1/3 p-6" style={{ color: sidebarTextColor }}>
                {basics.photo && (
                    <div className="flex justify-center mb-6">
                        <img src={basics.photo} alt={basics.name} className="w-32 h-32 rounded-full object-cover border-4" style={{ borderColor: sidebarTextColor }} />
                    </div>
                )}

                {column2Keys.map(key => {
                    const section = sectionRenderers[key];
                    if (!section || !section.isVisible) return null;
                    return (
                        <LeftSection key={key} title={section.title} fontSize={fontSizes.sectionTitle} textColor={sidebarTextColor}>
                            {section.render('sidebar')}
                        </LeftSection>
                    );
                })}
            </div>

            {/* Right Column (Main) */}
            <div className="w-2/3 p-8" style={{ backgroundColor: colors.background }}>
                <header className="mb-6">
                    <h1 className="font-bold text-gray-800" style={{ fontSize: `${fontSizes.name}pt` }}>{basics.name}</h1>
                    <p className="text-gray-600 mt-1" style={{ fontSize: `${fontSizes.headline}pt` }}>{basics.headline}</p>
                </header>
                <div className="flex flex-wrap text-gray-500 items-center space-x-4 mb-8" style={{ fontSize: `${fontSizes.meta}pt` }}>
                    <span>{basics.location}</span>
                    <span className="text-gray-300">&#9679;</span>
                    <span>{basics.phone}</span>
                    <span className="text-gray-300">&#9679;</span>
                    <span>{basics.email}</span>
                    <span className="text-gray-300">&#9679;</span>
                    <a href={formatUrl(basics.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">{basics.website}</a>
                </div>

                {column1Keys.map(key => {
                    const section = sectionRenderers[key];
                    if (!section || !section.isVisible) return null;
                    return (
                        <RightSection key={key} title={section.title} primaryColor={colors.primary} fontSize={fontSizes.sectionTitle}>
                            {section.render('main')}
                        </RightSection>
                    );
                })}
            </div>

        </div>
    );
};

export default ModernTemplate;
