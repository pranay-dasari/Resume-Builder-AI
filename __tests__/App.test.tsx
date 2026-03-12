import React from 'react';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

// Mock matchMedia for components like Toaster that might use it
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

describe('App Component', () => {
    it('renders the main landing page header', () => {
        render(
            <HelmetProvider>
                <App />
            </HelmetProvider>
        );

        // The main landing page will have the "Build Your Story..." text
        expect(screen.getByText(/Build Your Story with an/i)).toBeInTheDocument();
    });
});
