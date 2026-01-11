/**
 * atharva-theme main JavaScript
 */

(function() {
    'use strict';

    // Dark mode toggle functionality
    const STORAGE_KEY = 'theme-preference';
    
    function getThemePreference() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return stored;
        }
        return 'auto';
    }

    function setTheme(theme) {
        const html = document.documentElement;
        html.classList.remove('dark-mode', 'light-mode');
        
        if (theme === 'dark') {
            html.classList.add('dark-mode');
        } else if (theme === 'light') {
            html.classList.add('light-mode');
        }
        // 'auto' - no class, uses prefers-color-scheme
        
        localStorage.setItem(STORAGE_KEY, theme);
    }

    function toggleTheme() {
        const current = getThemePreference();
        const isDark = current === 'dark' || 
            (current === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        setTheme(isDark ? 'light' : 'dark');
    }

    // Initialize theme on load
    function initTheme() {
        const preference = getThemePreference();
        if (preference !== 'auto') {
            setTheme(preference);
        }
    }

    // Set up event listeners
    document.addEventListener('DOMContentLoaded', function() {
        // Theme is initialized by blocking script in <head> to prevent FOUC
        // Small caps handled by CSS ::first-line - no JS needed
        const toggleBtn = document.querySelector('.dark-mode-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }
    });
})();
