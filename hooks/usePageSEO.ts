import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  ogUrl?: string;
}

/**
 * usePageSEO - A React 19 compatible hook for managing page SEO metadata
 * Uses native DOM APIs to inject/update meta tags without external dependencies
 * 
 * Features:
 * - Updates page title
 * - Updates meta description
 * - Sets canonical URL (prevents duplicates by checking first)
 * - Sets Open Graph URL (optional)
 * - Cleans up only the tags it added on unmount
 */
export const usePageSEO = (config: SEOConfig) => {
  useEffect(() => {
    const tagsAdded: HTMLElement[] = [];

    // 1. Update page title
    const originalTitle = document.title;
    document.title = config.title;

    // 2. Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    const originalDescription = metaDescription?.content || '';
    
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
      tagsAdded.push(metaDescription);
    }
    metaDescription.content = config.description;

    // 3. Update or create canonical link
    // Check if canonical already exists to avoid duplicates
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    const originalCanonical = canonicalLink?.href || '';
    
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
      tagsAdded.push(canonicalLink);
    }
    canonicalLink.href = config.canonicalUrl;

    // 4. Update or create Open Graph URL (optional)
    if (config.ogUrl) {
      let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
      
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
        tagsAdded.push(ogUrl);
      }
      ogUrl.content = config.ogUrl;
    }

    // Cleanup: Restore original values on unmount
    return () => {
      document.title = originalTitle;
      
      if (metaDescription && originalDescription) {
        metaDescription.content = originalDescription;
      }
      
      if (canonicalLink && originalCanonical) {
        canonicalLink.href = originalCanonical;
      }
      
      // Remove only the tags we added
      tagsAdded.forEach(tag => {
        if (tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      });
    };
  }, [config.title, config.description, config.canonicalUrl, config.ogUrl]);
};
