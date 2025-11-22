

import React from 'react';
import { ResumeData, CustomizationSettings, ReorderableSectionKey } from '../../types';

interface TemplateProps {
    data: ResumeData;
    settings: CustomizationSettings;
}

// SVG Icons
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5 inline-block" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5 inline-block" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5 inline-block" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
const WebsiteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5 inline-block" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l-1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>;
const LinkedInIcon = () => <svg className="w-5 h-5 mb-1" role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>;
const GitHubIcon = () => <svg className="w-5 h-5 mb-1" role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>;


const Section: React.FC<{ title: string; fontSize: number; children: React.ReactNode }> = ({ title, fontSize, children }) => (
    <div className="mb-4" style={{ breakInside: 'avoid' }}>
        <h2 className="font-bold uppercase tracking-widest text-gray-700 pb-1 mb-2 border-b-2 border-gray-300" style={{ fontSize: `${fontSize}pt` }}>
            {title}
        </h2>
        {children}
    </div>
);

const renderSummaryList = (text: string) => {
    return text.split('\n').map((line, index) => {
        if (line.trim().startsWith('*')) {
            return (
                <li key={index} className="relative pl-4 mb-1" style={{ breakInside: 'avoid' }}>
                    <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    {line.trim().substring(1).trim()}
                </li>
            );
        }
        return <p key={index} className="mb-1">{line}</p>;
    });
};

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
    const { basics, summary, experience, education, skills, profiles, certifications, projects, languages, interests, references } = data;
    const { colors, typography, layout } = settings;
    const { fontSizes } = typography;

    const isLetter = layout.pageFormat === 'Letter';
    const pageMinHeight = isLetter ? '11in' : '297mm';

    const formatUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
    };

    const sectionComponents: Record<ReorderableSectionKey, React.ReactNode> = {
        summary: summary ? <Section title="Summary" fontSize={fontSizes.sectionTitle}><p style={{ fontSize: `${fontSizes.body}pt` }}>{summary}</p></Section> : null,
        profiles: profiles.length > 0 ? (
            <Section title="Profiles" fontSize={fontSizes.sectionTitle}>
                <div className="flex space-x-12">
                    {profiles.map(p => (
                        <a href={formatUrl(p.url)} key={p.id} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-600 hover:text-black">
                            {p.network === 'LinkedIn' && <LinkedInIcon />}
                            {p.network === 'GitHub' && <GitHubIcon />}
                            <span className="font-medium" style={{ fontSize: `${fontSizes.body}pt` }}>{p.username}</span>
                            <span style={{ fontSize: `${fontSizes.meta}pt` }}>{p.network}</span>
                        </a>
                    ))}
                </div>
            </Section>
        ) : null,
        experience: experience.length > 0 ? (
            <Section title="Experience" fontSize={fontSizes.sectionTitle}>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4" style={{ breakInside: 'avoid' }}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{exp.company}</h3>
                            <strong className="text-gray-800" style={{ fontSize: `${fontSizes.meta}pt` }}>{exp.startDate} to {exp.isCurrent ? 'Present' : exp.endDate}</strong>
                        </div>
                        <div className="flex justify-between items-baseline" style={{ fontSize: `${fontSizes.body}pt` }}>
                            <p className="italic">
                                {exp.project ? `${exp.project} - ${exp.position}` : exp.position}
                            </p>
                            <p className="text-gray-600" style={{ fontSize: `${fontSizes.meta}pt` }}>{exp.location}</p>
                        </div>
                        {exp.url && <a href={formatUrl(exp.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" style={{ fontSize: `${fontSizes.meta}pt` }}><WebsiteIcon />{exp.url}</a>}
                        <ul className="mt-1 list-none" style={{ fontSize: `${fontSizes.body}pt` }}>{renderSummaryList(exp.summary)}</ul>
                    </div>
                ))}
            </Section>
        ) : null,
        education: education.length > 0 ? (
            <Section title="Education" fontSize={fontSizes.sectionTitle}>
                {education.map(edu => (
                    <div key={edu.id} className="flex justify-between items-start" style={{ breakInside: 'avoid' }}>
                        <div>
                            <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{edu.institution}</h3>
                            <p style={{ fontSize: `${fontSizes.body}pt` }}>{edu.degree}</p>
                            <p className="text-gray-600" style={{ fontSize: `${fontSizes.meta}pt` }}>{edu.areaOfStudy}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold" style={{ fontSize: `${fontSizes.meta}pt` }}>{edu.startDate} to {edu.endDate}</p>
                        </div>
                    </div>
                ))}
            </Section>
        ) : null,
        projects: projects.length > 0 ? (
            <Section title="Projects" fontSize={fontSizes.sectionTitle}>
                <div className="grid grid-cols-1 gap-y-4">
                    {projects.map(proj => (
                        <div key={proj.id} style={{ breakInside: 'avoid' }}>
                            <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{proj.name}</h3>
                            <p className="font-semibold" style={{ fontSize: `${fontSizes.body}pt` }}>{proj.role}</p>
                            <p className="text-gray-700" style={{ fontSize: `${fontSizes.body}pt` }}>{proj.description}</p>
                            {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline mt-1" style={{ fontSize: `${fontSizes.meta}pt` }}>{proj.url}</a>}
                        </div>
                    ))}
                </div>
            </Section>
        ) : null,
        certifications: certifications.length > 0 ? (
            <Section title="Certifications" fontSize={fontSizes.sectionTitle}>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    {certifications.map(cert => (
                        <div key={cert.id} className="flex justify-between items-baseline" style={{ breakInside: 'avoid' }}>
                            <div>
                                <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{cert.name}</h3>
                                <p style={{ fontSize: `${fontSizes.body}pt` }}>{cert.issuer}</p>
                            </div>
                            <p className="font-bold" style={{ fontSize: `${fontSizes.meta}pt` }}>{cert.date}</p>
                        </div>
                    ))}
                </div>
            </Section>
        ) : null,
        skills: skills.length > 0 ? (
            <Section title="Skills" fontSize={fontSizes.sectionTitle}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8">
                    {skills.map(skill => (
                        <div key={skill.id} style={{ breakInside: 'avoid' }}>
                            <h3 className="font-bold" style={{ fontSize: `${fontSizes.subheading}pt` }}>{skill.name}</h3>
                            <p className="text-gray-800" style={{ fontSize: `${fontSizes.body}pt` }}>{skill.keywords.join(', ')}</p>
                        </div>
                    ))}
                </div>
            </Section>
        ) : null,
        languages: languages.length > 0 ? (
            <Section title="Languages" fontSize={fontSizes.sectionTitle}>
                <p style={{ fontSize: `${fontSizes.body}pt` }}>
                    {languages.map(lang => `${lang.language} (${lang.fluency})`).join(', ')}
                </p>
            </Section>
        ) : null,
        interests: interests.length > 0 ? (
            <Section title="Interests" fontSize={fontSizes.sectionTitle}>
                <p style={{ fontSize: `${fontSizes.body}pt` }}>{interests.map(i => i.name).join(', ')}</p>
            </Section>
        ) : null,
        references: references ? (
            <Section title="References" fontSize={fontSizes.sectionTitle}>
                <p style={{ fontSize: `${fontSizes.body}pt` }}>{references}</p>
            </Section>
        ) : null,
    };

    return (
        <div
            className="p-10"
            style={{
                backgroundColor: colors.background,
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
                    h1, h2, h3, h4, h5, h6, b, strong { 
                        font-family: '${typography.headingFont.family}', sans-serif;
                        font-weight: ${typography.headingFont.weight};
                        font-style: ${typography.headingFont.style};
                    }
                    li {
                        break-inside: avoid;
                    }
                `}
            </style>

            {/* Header */}
            <header className="flex items-center mb-6">
                {basics.photo && <img src={basics.photo} alt={basics.name} className="w-24 h-24 rounded-full object-cover mr-6" />}
                <div className="flex-grow">
                    <h1 className="font-bold" style={{ fontSize: `${fontSizes.name}pt` }}>{basics.name}</h1>
                    <p className="text-gray-700" style={{ fontSize: `${fontSizes.headline}pt` }}>{basics.headline}</p>
                    <div className="text-gray-500 mt-2 flex flex-wrap" style={{ fontSize: `${fontSizes.meta}pt` }}>
                        {basics.location && <span className="mr-4"><LocationIcon />{basics.location}</span>}
                        {basics.phone && <span className="mr-4"><PhoneIcon />{basics.phone}</span>}
                        {basics.email && <span className="mr-4"><EmailIcon />{basics.email}</span>}
                        {basics.website && <a href={formatUrl(basics.website)} target="_blank" rel="noopener noreferrer" className="hover:underline"><WebsiteIcon />{basics.website}</a>}
                    </div>
                </div>
            </header>
            <hr className="mb-4" />

            {data.sectionOrder.map(key => (
                <React.Fragment key={key}>
                    {sectionComponents[key]}
                </React.Fragment>
            ))}

        </div>
    );
};

export default ProfessionalTemplate;