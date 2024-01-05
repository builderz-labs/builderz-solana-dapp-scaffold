'use client'

import React, { createContext, useState, ReactNode } from 'react';

interface ThemeContextProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDark: false,
  setIsDark: () => { },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};