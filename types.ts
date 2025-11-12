import { FontStyle, FontWeight } from './constants';

export interface Basics {
  name: string;
  headline: string;
  photo: string;
  email: string;
  phone: string;
  website: string;
  location: string;
}

export interface Profile {
  id: string;
  network: string;
  username: string;
  url: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  url?: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  summary: string;
}

export interface Education {
  id:string;
  institution: string;
  degree: string;
  areaOfStudy: string;
  startDate: string;
  endDate: string;
  summary: string;
}

export interface Skill {
  id: string;
  name: string; // This will now be the category name, e.g., "Web Technologies"
  keywords: string[]; // These are the individual skills
}

export interface Language {
    id: string;
    language: string;
    fluency: 'Native Speaker' | 'Fluent' | 'Professional' | 'Basic' | 'Intermediate';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  description: string;
  url?: string;
}

export interface Interest {
  id: string;
  name: string;
}

// Keys for sections that can be reordered
export type ReorderableSectionKey = 
  | 'summary'
  | 'profiles'
  | 'experience'
  | 'projects'
  | 'education'
  | 'certifications'
  | 'skills'
  | 'languages'
  | 'interests'
  | 'references';


export interface ResumeData {
  basics: Basics;
  summary: string;
  profiles: Profile[];
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
  interests: Interest[];
  references: string;
  sectionOrder: ReorderableSectionKey[];
  layout: {
    [templateName: string]: {
      column1: ReorderableSectionKey[];
      column2: ReorderableSectionKey[];
    }
  }
}

export const initialResumeData: ResumeData = {
  basics: {
    name: 'John Doe',
    headline: 'Creative and Innovative Web Developer',
    photo: '',
    email: 'john.doe@gmail.com',
    phone: '(555) 123-4567',
    website: 'https://johndoe.me/',
    location: 'Pleasantville, CA 94588',
  },
  summary: 'Innovative Web Developer with 5 years of experience in building impactful and user-friendly websites and applications. Specializes in front-end technologies and passionate about modern web standards and cutting-edge development techniques. Proven track record of leading successful projects from concept to deployment.',
  profiles: [
    { id: '1', network: 'LinkedIn', username: 'johndoe', url: 'https://linkedin.com/in/johndoe' },
    { id: '2', network: 'GitHub', username: 'johndoe', url: 'https://github.com/johndoe' },
  ],
  experience: [
    {
      id: '1',
      company: 'Creative Solutions Inc.',
      position: 'Senior Web Developer',
      location: 'San Francisco, CA',
      url: 'https://creativesolutions.inc/',
      startDate: 'January 2019',
      endDate: 'Present',
      isCurrent: true,
      summary: '* Spearheaded the redesign of the main product website, resulting in a 40% increase in user engagement.\n* Developed and implemented a new responsive framework, improving cross-device compatibility.\n* Mentored a team of four junior developers, fostering a culture of technical excellence.',
    },
     {
      id: '2',
      company: 'TechAdvancers',
      position: 'Web Developer',
      location: 'San Jose, CA',
      startDate: 'June 2016',
      endDate: 'December 2018',
      isCurrent: false,
      summary: '* Collaborated in a team of 10 to develop high-quality web applications using React.js and Node.js.\n* Managed the integration of third-party services such as Stripe for payments and Twilio for SMS services.\n* Optimized application performance, achieving a 30% reduction in load times.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California',
      degree: "Bachelor's in Computer Science",
      areaOfStudy: 'Berkeley, CA',
      startDate: 'August 2012',
      endDate: 'May 2016',
      summary: '',
    },
  ],
  skills: [
    { id: '1', name: 'Web Technologies', keywords: ['HTML5', 'JavaScript', 'PHP', 'Python'] },
    { id: '2', name: 'Web Frameworks', keywords: ['React.js', 'Angular', 'Vue.js', 'Laravel', 'Django'] },
    { id: '3', name: 'Tools', keywords: ['Webpack', 'Git', 'Jenkins', 'Docker', 'JIRA'] },
  ],
  languages: [],
  certifications: [
    { id: '1', name: 'Full-Stack Web Development', issuer: 'CodeAcademy', date: '2020' },
    { id: '2', name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '2019' },
  ],
  projects: [
    { id: '1', name: 'E-Commerce Platform', role: 'Project Lead', description: 'Led the development of a full-stack e-commerce platform, improving sales conversion by 25%.', url: '' },
    { id: '2', name: 'Interactive Dashboard', role: 'Frontend Developer', description: 'Created an interactive analytics dashboard for a SaaS application, enhancing data visualization for clients.', url: '' },
  ],
  interests: [
    { id: '1', name: 'Hiking' },
    { id: '2', name: 'Photography' },
    { id: '3', name: 'Open Source Contribution' },
  ],
  references: '',
  sectionOrder: [
    'summary',
    'experience',
    'projects',
    'profiles',
    'skills',
    'education',
    'languages',
    'certifications',
    'interests',
    'references',
  ],
  layout: {
    'Default': {
      column1: ['summary', 'experience', 'projects'],
      column2: ['profiles', 'skills', 'education', 'languages', 'certifications', 'interests', 'references']
    },
    'Modern': {
      column1: ['summary', 'experience', 'education', 'projects'],
      column2: ['profiles', 'skills', 'certifications', 'languages', 'interests', 'references']
    },
    'Creative': {
      column1: ['education', 'skills', 'profiles', 'languages', 'certifications', 'interests'],
      column2: ['summary', 'experience', 'projects', 'references']
    },
    'Elegant': {
      column1: ['profiles', 'languages', 'certifications', 'interests'],
      column2: ['summary', 'experience', 'education', 'skills', 'projects', 'references']
    },
    'Corporate': {
      column1: ['skills', 'education', 'projects', 'profiles', 'languages', 'certifications', 'interests'],
      column2: ['summary', 'experience', 'references']
    }
  }
};

// --- Customization Types ---

export interface CustomizationSettings {
  template: string;
  colors: {
    primary: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    headingFont: {
        family: string;
        weight: FontWeight;
        style: FontStyle;
    },
    bodyFont: {
        family: string;
        weight: FontWeight;
        style: FontStyle;
    }
  };
  layout: {
    pageFormat: 'A4' | 'Letter';
    margins: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }
  }
}

export const initialCustomizationSettings: CustomizationSettings = {
    template: 'Professional', // Set Professional as the default
    colors: {
        primary: '#374151', // gray-700
        background: '#ffffff',
        text: '#1f2937', // gray-800
    },
    typography: {
        fontFamily: 'Lato', // A clean, professional default
        fontSize: 10,
        lineHeight: 1.5,
        headingFont: {
            family: 'Lato',
            weight: '700' as FontWeight,
            style: 'normal' as FontStyle,
        },
        bodyFont: {
            family: 'Roboto',
            weight: '400' as FontWeight,
            style: 'normal' as FontStyle,
        }
    },
    layout: {
        pageFormat: 'Letter',
        margins: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }
    }
}