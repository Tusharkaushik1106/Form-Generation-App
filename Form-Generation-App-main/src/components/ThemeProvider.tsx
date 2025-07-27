'use client';
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<any>(null);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored) {
      console.log('Loading theme from localStorage:', stored);
      setTheme(stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('Setting theme to dark based on system preference');
      setTheme('dark');
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Updating DOM class, theme:', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
      console.log('DOM classes after update:', document.documentElement.classList.toString());
    }
  }, [theme]);
  
  const toggleTheme = () => {
    console.log('Toggle theme called, current theme:', theme);
    setTheme(t => {
      const newTheme = t === 'dark' ? 'light' : 'dark';
      console.log('Setting theme to:', newTheme);
      return newTheme;
    });
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 