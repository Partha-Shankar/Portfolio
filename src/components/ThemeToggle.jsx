import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function getInitialTheme() {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    // Respect OS preference
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme);

    // Apply theme on mount and whenever it changes
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

    return (
        <motion.button
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.08 }}
            className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full flex items-center justify-center shadow-xl border transition-all duration-300"
            style={{
                background: theme === 'dark'
                    ? 'linear-gradient(135deg, #1e293b, #0f172a)'
                    : 'linear-gradient(135deg, #fff, #f1f5f9)',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)',
                boxShadow: theme === 'dark'
                    ? '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
                    : '0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
            }}
        >
            <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                    <motion.span
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Sun size={20} className="text-amber-400" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Moon size={20} className="text-indigo-600" />
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

// Export so App can call applyTheme on initial render
export { applyTheme, getInitialTheme };
