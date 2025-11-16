

import React from 'react';
import { ResumeData, CustomizationSettings, ReorderableSectionKey } from '../../types';

// Icons for contact info
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
const WebsiteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l-1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.62 1.62 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>;
const GitHubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;


interface TemplateProps {
    data: ResumeData;
    settings: CustomizationSettings;
}

const LeftSection: React.FC<{title: string; fontSize: number; children: React.ReactNode; textColor: string}> = ({ title, fontSize, children, textColor }) => (
    <div className="mb-4" style={{ breakInside: 'avoid' }}>
        <h2 className="font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ borderColor: `${textColor}80`, color: textColor, fontSize: `${fontSize}pt` }}>{title}</h2>
        {children}
    </div>
);

const RightSection: React.FC<{title: string; fontSize: number; children: React.ReactNode}> = ({ title, fontSize, children }) => (
    <div className="mb-6" style={{ breakInside: 'avoid' }}>
        <h2 className="font-bold uppercase tracking-wider text-gray-600 mb-3 pb-1 border-b-2 border-gray-300" style={{ fontSize: `${fontSize}pt` }}>{title}</h2>
        {children}
    </div>
);

const renderSummaryList = (text: string) => {
    return text.split('\n').map((line, index) => {
        if (line.trim().startsWith('*')) {
            return (
                <li key={index} className="relative pl-5 mb-1" style={{ breakInside: 'avoid' }}>
                     <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                    {line.trim().substring(1).trim()}
                </li>
            );
        }
        return <p key={index} className="mb-1">{line}</p>;
    });
};

const CreativeTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
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

    const getProfileIcon = (network: string) => {
        switch (network.toLowerCase()) {
            case 'linkedin': return <LinkedInIcon />;
            case 'github': return <GitHubIcon />;
            default: return <WebsiteIcon />;
        }
    };

    const sectionComponents: Record<ReorderableSectionKey, React.ReactNode> = {
        summary: summary ? (
            <RightSection title="Summary" fontSize={fontSizes.sectionTitle}>
                <div style={{ fontSize: `${fontSizes.body}pt` }}>{renderSummaryList(summary)}</div>
            </RightSection>
        ) : null,
        experience: experience.length > 0 ? (
            <RightSection title="Work Experience" fontSize={fontSizes.sectionTitle}>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{exp.position}</h3>
                        <div className="flex justify-between items-baseline mb-1" style={{ fontSize: `${fontSizes.body}pt` }}>
                            <p className="font-semibold" style={{color: colors.primary}}>{exp.company}</p>
                            <div className="text-gray-500 text-right" style={{ fontSize: `${fontSizes.meta}pt` }}>
                                <span>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                <span className="mx-1">&#8226;</span>
                                <span>{exp.location}</span>
                            </div>
                        </div>
                        <ul className="list-none" style={{ fontSize: `${fontSizes.body}pt` }}>{renderSummaryList(exp.summary)}</ul>
                    </div>
                ))}
            </RightSection>
        ) : null,
        education: education.length > 0 ? (
            <LeftSection title="Education" fontSize={fontSizes.sectionTitle} textColor={sidebarTextColor}>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3" style={{ breakInside: 'avoid', fontSize: `${fontSizes.body}pt` }}>
                        <h3 className="font-bold">{edu.degree}</h3>
                        <p className="">{edu.institution}</p>
                        <p className="opacity-80" style={{ fontSize: `${fontSizes.meta}pt` }}>{edu.areaOfStudy}</p>
                        <p className="opacity-80" style={{ fontSize: `${fontSizes.meta}pt` }}>{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </LeftSection>
        ) : null,
        skills: skills.length > 0 ? (
            <LeftSection title="Skills" fontSize={fontSizes.sectionTitle} textColor={sidebarTextColor}>
                <ul className="list-none" style={{ fontSize: `${fontSizes.body}pt` }}>
                     {skills.map(skill => (
                        <div key={skill.id} className="mb-2">
                             {skill.name && <h4 className="font-bold">{skill.name}</h4>}
                             {skill.keywords.map((keyword, index) => (
                                 <li key={index} className="relative pl-4" style={{ breakInside: 'avoid' }}>
                                    <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full" style={{backgroundColor: `${sidebarTextColor}CC`}}></span>
                                    {keyword}
                                </li>
                             ))}
                        </div>
                    ))}
                </ul>
            </LeftSection>
        ) : null,
        profiles: profiles.length > 0 ? (
            <LeftSection title="Profiles" fontSize={fontSizes.sectionTitle} textColor={sidebarTextColor}>
                {profiles.map(p => (
                    <a key={p.id} href={formatUrl(p.url)} target="_blank" rel="noopener noreferrer" className="flex items-center mb-1 hover:opacity-80 break-words" style={{ fontSize: `${fontSizes.body}pt` }}>
                       {getProfileIcon(p.network)}
                       <span>{p.username}</span>
                    </a>
                ))}
            </LeftSection>
        ) : null,
        projects: projects.length > 0 ? (
             <RightSection title="Projects" fontSize={fontSizes.sectionTitle}>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                        <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{proj.name}</h3>
                        <p className="font-semibold italic" style={{ fontSize: `${fontSizes.body}pt` }}>{proj.role}</p>
                        <p className="mt-1" style={{ fontSize: `${fontSizes.body}pt` }}>{proj.description}</p>
                        {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline mt-1" style={{ fontSize: `${fontSizes.meta}pt` }}>{proj.url}</a>}
                    </div>
                ))}
            </RightSection>
        ) : null,
        certifications: certifications.length > 0 ? (
            <LeftSection title="Certifications" fontSize={fontSizes.sectionTitle} textColor={sidebarTextColor}>
                {certifications.map(c => (
                     <div key={c.id} className="mb-2" style={{ breakInside: 'avoid', fontSize: `${fontSizes.body}pt` }}>
                        <p className="font-semibold">{c.name}</p>
                        <p className="opacity-80" style={{ fontSize: `${fontSizes.meta}pt` }}>{c.issuer} ({c.date})</p>
                    </div>
                ))}
            </LeftSection>
        ) : null,
        languages: languages.length > 0 ? (
            <LeftSection title="Languages" fontSize={fontSizes.sectionTitle} textColor={sidebarTextColor}>
                 {languages.map(lang => (
                     <p key={lang.id} style={{ fontSize: `${fontSizes.body}pt` }}>{lang.language} <span className="opacity-80">({lang.fluency})</span></p>
                 ))}
            </LeftSection>
        ) : null,
        interests: interests.length > 0 ? (
            <LeftSection title="Interests" fontSize={fontSizes.sectionTitle} textColor={sidebarTextColor}>
                <p style={{ fontSize: `${fontSizes.body}pt` }}>{interests.map(i => i.name).join(', ')}</p>
            </LeftSection>
        ) : null,
        references: references ? (
            <RightSection title="References" fontSize={fontSizes.sectionTitle}>
                <p style={{ fontSize: `${fontSizes.body}pt` }}>{references}</p>
            </RightSection>
        ): null,
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

            {/* Left Column */}
            <div className="w-[35%] p-6" style={{ color: sidebarTextColor }}>
                <div className="mb-6">
                    <h1 className="font-bold uppercase tracking-wide" style={{ fontSize: `${fontSizes.name}pt` }}>{basics.name}</h1>
                    <p className="opacity-90" style={{ fontSize: `${fontSizes.headline}pt` }}>{basics.headline}</p>
                </div>

                <div className="space-y-2 mb-6" style={{ fontSize: `${fontSizes.meta}pt` }}>
                    {basics.email && <p className="flex items-center break-all"><EmailIcon /> {basics.email}</p>}
                    {basics.phone && <p className="flex items-center"><PhoneIcon /> {basics.phone}</p>}
                    {basics.location && <p className="flex items-center"><LocationIcon /> {basics.location}</p>}
                    {basics.website && <a href={formatUrl(basics.website)} target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 break-all"><WebsiteIcon /> {basics.website}</a>}
                </div>
                
                {column1Keys.map(key => sectionComponents[key])}
            </div>
            
            {/* Right Column */}
            <div className="w-[65%] p-8" style={{ color: colors.text, backgroundColor: colors.background }}>
                {column2Keys.map(key => sectionComponents[key])}
            </div>

        </div>
    );
};

export default CreativeTemplate;
