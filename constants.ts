export const SOCIAL_NETWORKS = ['LinkedIn', 'GitHub', 'Twitter', 'Portfolio', 'Website', 'StackOverflow'];
export const LANGUAGE_FLUENCY = ['Native Speaker', 'Fluent', 'Professional', 'Intermediate', 'Basic'];

export const GOOGLE_FONTS = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Merriweather'
];

export type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export const FONT_WEIGHTS: FontWeight[] = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

export type FontStyle = 'normal' | 'italic';
export const FONT_STYLES: FontStyle[] = ['normal', 'italic'];

export const PAGE_FORMATS = ['Letter', 'A4'];

export const TEMPLATES = [
    { id: 'Professional', name: 'Professional Clean' },
    { id: 'Modern', name: 'Modern Two-Column' },
    { id: 'Creative', name: 'Creative Split' },
    { id: 'Elegant', name: 'Elegant Sidebar' },
    { id: 'Corporate', name: 'Corporate Sidebar' },
    { id: 'Default', name: 'Classic Professional' },
];

export const COLOR_PALETTES = [
    {
      name: 'Corporate Blue',
      primary: '#3b82f6', // blue-500
      text: '#1f2937',    // gray-800
      background: '#ffffff', // white
    },
    {
      name: 'Modern Green',
      primary: '#10b981', // emerald-500
      text: '#111827',    // gray-900
      background: '#f9fafb', // gray-50
    },
    {
      name: 'Elegant Gray',
      primary: '#6b7280', // gray-500
      text: '#1f2937',    // gray-800
      background: '#ffffff', // white
    },
    {
      name: 'Bold Crimson',
      primary: '#ef4444', // red-500
      text: '#1f2937',    // gray-800
      background: '#fef2f2', // red-50
    },
    {
      name: 'Creative Purple',
      primary: '#8b5cf6', // violet-500
      text: '#374151',    // gray-700
      background: '#f5f3ff', // violet-50
    },
    {
      name: 'Classic Navy',
      primary: '#1e3a8a', // blue-800
      text: '#111827',    // gray-900
      background: '#f3f4f6', // gray-100
    },
];