import React from 'react';
import { ResumeData, CustomizationSettings } from '../../types';
import { FontStyle, FontWeight } from '../../constants';
import DefaultTemplate from './DefaultTemplate';
import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import CreativeTemplate from './CreativeTemplate';
import ElegantTemplate from './ElegantTemplate';
import CorporateTemplate from './CorporateTemplate';

interface ResumeTemplateProps {
    data: ResumeData;
    settings: CustomizationSettings;
}

type FontSetting = {
    family: string;
    weight: FontWeight;
    style: FontStyle;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ data, settings }) => {
    
    const buildFontQuery = (font: FontSetting): string => {
        const familyName = font.family.replace(' ', '+');
        // Request italic fonts correctly from Google Fonts API v2
        if (font.style === 'italic') {
            return `family=${familyName}:ital,wght@1,${font.weight}`;
        }
        return `family=${familyName}:wght@${font.weight}`;
    };

    const headingFontQuery = buildFontQuery(settings.typography.headingFont);
    const bodyFontQuery = buildFontQuery(settings.typography.bodyFont);
    
    // Combine queries for heading and body fonts. The API handles multiple `family=` parameters.
    const fontUrl = `https://fonts.googleapis.com/css2?${headingFontQuery}&${bodyFontQuery}&display=swap`;

    return (
        <>
            <style>
                {`@import url('${fontUrl}');`}
            </style>
            {(() => {
                switch (settings.template) {
                    case 'Professional':
                        return <ProfessionalTemplate data={data} settings={settings} />;
                    case 'Modern':
                        return <ModernTemplate data={data} settings={settings} />;
                    case 'Creative':
                        return <CreativeTemplate data={data} settings={settings} />;
                    case 'Elegant':
                        return <ElegantTemplate data={data} settings={settings} />;
                    case 'Corporate':
                        return <CorporateTemplate data={data} settings={settings} />;
                    case 'Default':
                    default:
                        return <DefaultTemplate data={data} settings={settings} />;
                }
            })()}
        </>
    );
};

export default ResumeTemplate;