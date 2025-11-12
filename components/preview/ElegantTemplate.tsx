import React from 'react';
import { ResumeData, CustomizationSettings, ReorderableSectionKey } from '../../types';

interface TemplateProps {
    data: ResumeData;
    settings: CustomizationSettings;
}

const LeftSection: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="mb-4" style={{ breakInside: 'avoid' }}>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 text-white/90">{title}</h2>
        {children}
    </div>
);

const RightSection: React.FC<{title: string; textColor: string; children: React.ReactNode}> = ({ title, textColor, children }) => (
    <div className="mb-6" style={{ breakInside: 'avoid' }}>
        <h2 className="text-base font-bold uppercase tracking-wider mb-3 pb-1" style={{ color: textColor, borderBottom: `1px solid ${textColor}` }}>{title}</h2>
        {children}
    </div>
);

const renderSummaryList = (text: string, textColor: string) => {
    return text.split('\n').map((line, index) => {
        if (line.trim().startsWith('*')) {
            return (
                <li key={index} className="relative pl-5 mb-1" style={{ breakInside: 'avoid' }}>
                    <span className="absolute left-1 top-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: textColor }}></span>
                    {line.trim().substring(1).trim()}
                </li>
            );
        }
        return <p key={index} className="mb-1">{line}</p>;
    });
};

const ElegantTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
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
    
    type RenderContext = 'sidebar' | 'main';

    const sectionRenderers: Record<ReorderableSectionKey, { title: string; isVisible: boolean; render: (context: RenderContext) => React.ReactNode; }> = {
        summary: {
            title: "Summary",
            isVisible: !!summary,
            render: () => <p className="mb-6 text-sm">{summary}</p>
        },
        experience: {
            title: "Experience",
            isVisible: experience.length > 0,
            render: () => experience.map(exp => (
                <div key={exp.id} className="mb-4 text-sm" style={{ breakInside: 'avoid' }}>
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold">{exp.position} | {exp.company}</h3>
                        <p className="text-xs text-gray-600">{exp.location}</p>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                    <ul className="list-none">{renderSummaryList(exp.summary, colors.text)}</ul>
                </div>
            ))
        },
        education: {
            title: "Education",
            isVisible: education.length > 0,
            render: () => education.map(edu => (
                <div key={edu.id} className="mb-2 text-sm" style={{ breakInside: 'avoid' }}>
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold">{edu.degree}, {edu.institution}</h3>
                        <p className="text-xs text-gray-600">{edu.endDate}</p>
                    </div>
                    <p className="text-xs text-gray-500">{edu.areaOfStudy}</p>
                </div>
            ))
        },
        skills: {
            title: "Key Skills & Characteristics",
            isVisible: skills.length > 0,
            render: (context) => {
                const keywords = skills.flatMap(s => s.keywords);
                if (context === 'sidebar') {
                    return <p className="text-xs">{keywords.join(', ')}</p>;
                }
                return (
                    <ul className="list-none text-sm columns-2">
                        {keywords.map((keyword, index) => (
                             <li key={index} className="relative pl-5 mb-1" style={{ breakInside: 'avoid' }}>
                                <span className="absolute left-1 top-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.text }}></span>
                                {keyword}
                            </li>
                        ))}
                    </ul>
                );
            }
        },
        profiles: {
            title: "Profiles",
            isVisible: profiles.length > 0,
            render: () => profiles.map(p => (
                <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs hover:opacity-80 break-all">{p.network}: {p.username}</a>
            ))
        },
        projects: {
            title: "Projects",
            isVisible: projects.length > 0,
            render: () => projects.map(proj => (
                <div key={proj.id} className="mb-3 text-sm" style={{ breakInside: 'avoid' }}>
                    <h3 className="font-bold">{proj.name}</h3>
                    <p className="italic text-xs">{proj.role}</p>
                    <p className="mt-1">{proj.description}</p>
                </div>
            ))
        },
        certifications: {
            title: "Certifications",
            isVisible: certifications.length > 0,
            render: () => certifications.map(c => (
                 <div key={c.id} className="mb-2 text-xs" style={{ breakInside: 'avoid' }}>
                    <p className="font-semibold">{c.name}</p>
                    <p className="opacity-80">{c.issuer} ({c.date})</p>
                </div>
            ))
        },
        languages: {
            title: "Languages",
            isVisible: languages.length > 0,
            render: () => languages.map(lang => (
                 <p key={lang.id} className="text-xs">{lang.language} ({lang.fluency})</p>
             ))
        },
        interests: {
            title: "Interests",
            isVisible: interests.length > 0,
            render: () => <p className="text-xs">{interests.map(i => i.name).join(', ')}</p>
        },
        references: {
            title: "References",
            isVisible: !!references,
            render: () => <p className="text-sm">{references}</p>
        },
    };

    const templateLayout = data.layout[settings.template];
    const column1Keys = templateLayout ? templateLayout.column1 : [];
    const column2Keys = templateLayout ? templateLayout.column2 : [];

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

            {/* Left Column */}
            <div className="w-[30%] p-6 text-white" style={{ backgroundColor: colors.primary }}>
                <div className="w-24 h-24 mb-8 flex items-center justify-center" style={{ backgroundColor: colors.background }}>
                    <span className="text-4xl font-bold" style={{ color: colors.primary }}>{getInitials(basics.name)}</span>
                </div>
                
                <div className="space-y-4 text-xs mb-6">
                    {basics.location && <div><h4 className="font-bold uppercase tracking-wider text-sm mb-1">Location</h4><p>{basics.location}</p></div>}
                    {basics.phone && <div><h4 className="font-bold uppercase tracking-wider text-sm mb-1">Phone</h4><p>{basics.phone}</p></div>}
                    {basics.email && <div><h4 className="font-bold uppercase tracking-wider text-sm mb-1">Email</h4><p className="break-all">{basics.email}</p></div>}
                    {basics.website && <div><h4 className="font-bold uppercase tracking-wider text-sm mb-1">Website</h4><p className="break-all">{basics.website}</p></div>}
                </div>

                 {column1Keys.map(key => {
                    const section = sectionRenderers[key];
                    if (!section || !section.isVisible) return null;
                    return (
                        <LeftSection key={key} title={section.title}>
                            {section.render('sidebar')}
                        </LeftSection>
                    );
                })}
            </div>
            
            {/* Right Column */}
            <div className="w-[70%] p-8" style={{ color: colors.text, backgroundColor: colors.background }}>
                <h1 className="text-4xl font-bold" style={{ color: colors.text }}>{basics.name}</h1>
                
                {column2Keys.map(key => {
                    const section = sectionRenderers[key];
                    if (!section || !section.isVisible) return null;
                    if (key === 'summary') {
                        return <React.Fragment key={key}>{section.render('main')}</React.Fragment>;
                    }
                    return null;
                })}

                {column2Keys.map(key => {
                     const section = sectionRenderers[key];
                     if (!section || !section.isVisible || key === 'summary') return null;
                     return (
                        <RightSection key={key} title={section.title} textColor={colors.text}>
                            {section.render('main')}
                        </RightSection>
                    );
                })}
            </div>
        </div>
    );
};

export default ElegantTemplate;
