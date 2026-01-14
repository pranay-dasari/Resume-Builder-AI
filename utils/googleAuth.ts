/**
 * Google Sign-In Authentication Service
 * Handles Google OAuth 2.0 authentication and user session management
 */

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: GoogleUser | null;
  loading: boolean;
  error: string | null;
}

declare global {
  interface Window {
    google: any;
  }
}

/**
 * Initialize Google Sign-In
 * Call this once when the app loads
 */
export const initializeGoogleSignIn = (clientId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if Google API is already loaded
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: true,
          itp_support: true,
        });
        resolve();
      } else {
        reject(new Error('Google Sign-In failed to load'));
      }
    };

    script.onerror = () => {
      reject(new Error('Failed to load Google Sign-In script'));
    };

    document.head.appendChild(script);
  });
};

/**
 * Handle the credential response from Google
 */
const handleCredentialResponse = (response: any) => {
  if (response.credential) {
    // Decode JWT token
    const decoded = decodeJWT(response.credential);
    if (decoded) {
      // Store user data
      const user: GoogleUser = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
      };

      // Save to localStorage
      localStorage.setItem('google_user', JSON.stringify(user));
      localStorage.setItem('google_token', response.credential);

      // Dispatch custom event for app to listen to
      window.dispatchEvent(
        new CustomEvent('google-signin-success', { detail: user })
      );
    }
  }
};

/**
 * Decode JWT token (without verification - for client-side use only)
 * In production, verify the token on your backend
 */
const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = (): GoogleUser | null => {
  try {
    const userStr = localStorage.getItem('google_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
};

/**
 * Get stored Google token
 */
export const getGoogleToken = (): string | null => {
  return localStorage.getItem('google_token');
};

/**
 * Check if user is authenticated
 */
export const isUserAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

/**
 * Sign out user
 */
export const signOutUser = (): void => {
  try {
    // Sign out from Google
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    // Clear local storage
    localStorage.removeItem('google_user');
    localStorage.removeItem('google_token');

    // Dispatch sign-out event
    window.dispatchEvent(new CustomEvent('google-signout'));
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

/**
 * Render Google Sign-In button
 */
export const renderGoogleSignInButton = (
  containerId: string,
  options?: {
    theme?: 'outline' | 'filled_blue' | 'filled_black';
    size?: 'large' | 'medium' | 'small';
    text?: 'signin_with' | 'signup_with' | 'signin' | 'signup';
    width?: string;
  }
): void => {
  if (!window.google?.accounts?.id) {
    console.error('Google Sign-In not initialized');
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  window.google.accounts.id.renderButton(container, {
    theme: options?.theme || 'outline',
    size: options?.size || 'large',
    text: options?.text || 'signin_with',
    width: options?.width || '100%',
  });
};

/**
 * Prompt user to sign in
 */
export const promptGoogleSignIn = (): void => {
  if (!window.google?.accounts?.id) {
    console.error('Google Sign-In not initialized');
    return;
  }

  window.google.accounts.id.prompt((notification: any) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      console.log('Google Sign-In prompt not displayed');
    }
  });
};
