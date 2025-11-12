import React from 'react';
import { ResumeData, CustomizationSettings, ReorderableSectionKey } from '../../types';

interface ResumeTemplateProps {
    data: ResumeData;
    settings: CustomizationSettings;
}

const Section: React.FC<{title: string; primaryColor: string; children: React.ReactNode}> = ({ title, primaryColor, children }) => (
    <div className="mb-4" style={{ breakInside: 'avoid' }}>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
            {title}
        </h2>
        {children}
    </div>
);

const DefaultTemplate: React.FC<ResumeTemplateProps> = ({ data, settings }) => {
    const { basics, summary, experience, education, skills, profiles, languages, projects, certifications, interests, references } = data;
    const { colors, typography } = settings;

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
            <Section title="Summary" primaryColor={colors.primary}>
                <div className="text-sm">{renderSummary(summary)}</div>
            </Section>
        ) : null,
        experience: experience.length > 0 ? (
            <Section title="Experience" primaryColor={colors.primary}>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold text-base">{exp.position}</h3>
                        <div className="flex justify-between text-sm">
                            <p className="font-semibold">{exp.company}</p>
                            <p className="italic">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        </div>
                        <div className="text-sm mt-1 list-disc pl-5">{renderSummary(exp.summary)}</div>
                    </div>
                ))}
            </Section>
        ) : null,
        projects: projects.length > 0 ? (
             <Section title="Projects" primaryColor={colors.primary}>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold text-base">{proj.name}</h3>
                        <p className="text-sm font-semibold italic">{proj.role}</p>
                        <p className="text-sm mt-1">{proj.description}</p>
                        {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="block text-xs text-blue-600 hover:underline mt-1">{proj.url}</a>}
                    </div>
                ))}
            </Section>
        ) : null,
        profiles: profiles.length > 0 ? (
            <Section title="Profiles" primaryColor={colors.primary}>
                {profiles.map(p => (
                    <a key={p.id} href={formatUrl(p.url)} target="_blank" rel="noopener noreferrer" className="block text-sm hover:underline" style={{color: colors.primary}}>{p.network}: {p.username}</a>
                ))}
            </Section>
        ) : null,
        skills: skills.length > 0 ? (
            <Section title="Skills" primaryColor={colors.primary}>
                {skills.map(skill => (
                    <div key={skill.id} className="mb-1" style={{ breakInside: 'avoid' }}>
                        <p className="font-semibold text-sm">{skill.name}</p>
                        {skill.keywords.length > 0 && <p className="text-xs pl-2">{skill.keywords.join(', ')}</p>}
                    </div>
                ))}
            </Section>
        ) : null,
        education: education.length > 0 ? (
            <Section title="Education" primaryColor={colors.primary}>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold text-base">{edu.institution}</h3>
                        <p className="text-sm">{edu.degree}, {edu.areaOfStudy}</p>
                        <p className="text-xs italic">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </Section>
        ) : null,
        languages: languages.length > 0 ? (
            <Section title="Languages" primaryColor={colors.primary}>
                 {languages.map(lang => (
                     <p key={lang.id} className="text-sm">{lang.language} ({lang.fluency})</p>
                 ))}
            </Section>
        ) : null,
        certifications: certifications.length > 0 ? (
            <Section title="Certifications" primaryColor={colors.primary}>
                {certifications.map(c => (
                     <div key={c.id} className="mb-1 text-sm" style={{ breakInside: 'avoid' }}>
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-xs">{c.issuer} ({c.date})</p>
                    </div>
                ))}
            </Section>
        ) : null,
        interests: interests.length > 0 ? (
            <Section title="Interests" primaryColor={colors.primary}>
                <p className="text-sm">{interests.map(i => i.name).join(', ')}</p>
            </Section>
        ) : null,
        references: references ? (
            <Section title="References" primaryColor={colors.primary}>
                <p className="text-sm">{references}</p>
            </Section>
        ): null,
    };

    const templateLayout = data.layout[settings.template];
    const column1Keys = templateLayout ? templateLayout.column1 : [];
    const column2Keys = templateLayout ? templateLayout.column2 : [];


    return (
        <div
            className="p-8"
            style={{
                backgroundColor: colors.background,
                color: colors.text,
                fontFamily: `'${typography.bodyFont.family}', sans-serif`,
                fontSize: `${typography.fontSize}pt`,
                lineHeight: typography.lineHeight,
                fontWeight: typography.bodyFont.weight,
                fontStyle: typography.bodyFont.style,
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
            
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>{basics.name}</h1>
                    <p className="text-lg">{basics.headline}</p>
                </div>
                {basics.photo && <img src={basics.photo} alt={basics.name} className="w-24 h-24 rounded-full object-cover" />}
            </header>
            
            <div className="text-xs mb-6 flex flex-wrap justify-between items-center border-y py-2" style={{ borderColor: colors.primary + '33' }}>
                <span>{basics.email}</span>
                <span>{basics.phone}</span>
                <a href={formatUrl(basics.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">{basics.website}</a>
                <span>{basics.location}</span>
            </div>

            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                   {column1Keys.map(key => sectionComponents[key])}
                </div>

                <div className="col-span-1">
                   {column2Keys.map(key => sectionComponents[key])}
                </div>
            </div>
        </div>
    );
};

export default DefaultTemplate;