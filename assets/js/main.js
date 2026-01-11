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

    // Small caps for first few words of the first paragraph
    function initSmallCapsIntro() {
        const firstPara = document.querySelector('.gh-content > p:first-of-type');
        if (!firstPara) return;
        
        // Get the text content, preserving any inner HTML for later restoration
        const originalHTML = firstPara.innerHTML;
        const textContent = firstPara.textContent;
        
        // Skip if already processed or empty
        if (firstPara.querySelector('.small-caps-intro') || !textContent.trim()) return;
        
        // Match first 4-5 words (after the first letter which becomes dropcap)
        // We want to wrap words 2-5 in small caps (word 1's first letter is the dropcap)
        const words = textContent.trim().split(/\s+/);
        if (words.length < 2) return;
        
        // Take the first word (minus dropcap letter) and next 3-4 words
        const firstWord = words[0];
        const restOfFirstWord = firstWord.slice(1); // Everything after dropcap
        const nextWords = words.slice(1, 5).join(' '); // Words 2-5
        const remainingWords = words.slice(5).join(' '); // Rest of paragraph
        
        // Build new HTML: first letter + small-caps span + rest
        const dropcapLetter = firstWord.charAt(0);
        const smallCapsText = restOfFirstWord + (nextWords ? ' ' + nextWords : '');
        const remainingText = remainingWords ? ' ' + remainingWords : '';
        
        firstPara.innerHTML = dropcapLetter + 
            '<span class="small-caps-intro">' + smallCapsText + '</span>' + 
            remainingText;
    }

    // Set up event listeners
    document.addEventListener('DOMContentLoaded', function() {
        // Theme is initialized by blocking script in <head> to prevent FOUC
        // Only need to set up toggle button and small caps here
        initSmallCapsIntro();
        
        const toggleBtn = document.querySelector('.dark-mode-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }
    });
})();
