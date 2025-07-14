'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const resolved = stored || (systemPrefersDark ? 'dark' : 'light');

    applyTheme(resolved);
    setTheme(resolved);
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme');
      if (!stored) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
        setTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    document.documentElement.setAttribute('data-theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  if (!hasMounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme: handleSetTheme }}
    >
      <button
        onClick={toggleTheme}
        className={`fixed top-4 left-4 px-3 py-2 rounded-full z-50 font-semibold transition-colors duration-200 ${
          theme === 'light'
            ? 'bg-sec-light lg:bg-border-light  hover:bg-border-light lg:hover:bg-light-hov'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {children}
    </ThemeContext.Provider>
  );
}
