/**
 * SEO Utilities for dynamic meta tag management
 */

export interface SEOConfig {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

/**
 * Update page meta tags dynamically
 */
export const updateMetaTags = (config: SEOConfig) => {
  // Update title
  document.title = config.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', config.description);

  // Update canonical - IMPORTANT: Only ONE canonical per page
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', config.canonical);

  // Update OG tags
  updateOrCreateMetaTag('property', 'og:title', config.ogTitle || config.title);
  updateOrCreateMetaTag('property', 'og:description', config.ogDescription || config.description);
  updateOrCreateMetaTag('property', 'og:type', config.ogType || 'website');
  updateOrCreateMetaTag('property', 'og:url', config.ogUrl || config.canonical);

  // Update Twitter tags
  updateOrCreateMetaTag('name', 'twitter:title', config.twitterTitle || config.title);
  updateOrCreateMetaTag('name', 'twitter:description', config.twitterDescription || config.description);
};

/**
 * Helper to update or create meta tags
 */
const updateOrCreateMetaTag = (attrName: string, attrValue: string, content: string) => {
  let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

/**
 * SEO configurations for different pages
 */
export const SEO_CONFIGS = {
  home: {
    title: 'AI Resume Builder | Free Online & ATS-Friendly CV Maker',
    description: 'Build a professional, ATS-friendly resume in minutes with our easy AI resume builder. Try our online CV maker for free and land your dream job!',
    canonical: 'https://buildresumenow.in/',
    ogType: 'website',
  },
  resumeBuilder: {
    title: 'Free Resume Builder | AI Resume Builder & Free Resume Download',
    description: 'Build a professional, ATS-friendly resume for free using our AI Resume Builder. Download your resume instantly in PDF format.',
    canonical: 'https://buildresumenow.in/resume-builder',
    ogType: 'website',
  },
  coverLetterBuilder: {
    title: 'Free Cover Letter Builder | AI Cover Letter Generator',
    description: 'Create a professional cover letter for free using our AI Cover Letter Builder. Fast, simple, and downloadable in one click.',
    canonical: 'https://buildresumenow.in/cover-letter-builder',
    ogType: 'website',
  },
  privacy: {
    title: 'Privacy Policy | AI Resume Builder',
    description: 'Read our privacy policy to understand how we protect your data.',
    canonical: 'https://buildresumenow.in/privacy-policy',
  },
  terms: {
    title: 'Terms and Conditions | AI Resume Builder',
    description: 'Read our terms and conditions for using our AI Resume Builder.',
    canonical: 'https://buildresumenow.in/terms-and-conditions',
  },
  contact: {
    title: 'Contact Us | AI Resume Builder',
    description: 'Get in touch with our support team. We are here to help!',
    canonical: 'https://buildresumenow.in/contact',
  },
};
