import React, { createContext, useState, useEffect } from 'react';

// Create context
export const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  
  // State for LED color
  const [ledColor, setLedColor] = useState('#0055ff'); // Default blue
  
  // State for LED pattern
  const [ledPattern, setLedPattern] = useState('random'); // Default random
  
  // Toggle dark mode
  const toggleDarkMode = (value) => {
    const newMode = typeof value === 'boolean' ? value : !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };
  
  // Set LED color
  const handleSetLedColor = (color) => {
    setLedColor(color);
    localStorage.setItem('ledColor', color);
  };
  
  // Set LED pattern
  const handleSetLedPattern = (pattern) => {
    setLedPattern(pattern);
    localStorage.setItem('ledPattern', pattern);
  };
  
  // Load settings from localStorage on initial render
  useEffect(() => {
    // Check for dark mode
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
    
    // Check for LED color
    const savedLedColor = localStorage.getItem('ledColor');
    if (savedLedColor) {
      setLedColor(savedLedColor);
    }
    
    // Check for LED pattern
    const savedLedPattern = localStorage.getItem('ledPattern');
    if (savedLedPattern) {
      setLedPattern(savedLedPattern);
    }
  }, []);
  
  // Apply dark mode to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);
  
  return (
    <ThemeContext.Provider 
      value={{
        isDarkMode,
        toggleDarkMode,
        ledColor,
        setLedColor: handleSetLedColor,
        ledPattern,
        setLedPattern: handleSetLedPattern
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
