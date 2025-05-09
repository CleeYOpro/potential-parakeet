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
  const [ledPattern, setLedPattern] = useState('wave'); // Default wave
  
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
    
    // Apply the color to CSS variables
    document.documentElement.style.setProperty('--primary-color', color);
    
    // Calculate a darker shade for hover effects
    const darkerColor = calculateDarkerColor(color);
    document.documentElement.style.setProperty('--primary-color-dark', darkerColor);
    
    // Calculate a lighter shade for light mode
    const lighterColor = calculateLighterColor(color);
    document.documentElement.style.setProperty('--primary-color-light', lighterColor);
  };
  
  // Set LED pattern
  const handleSetLedPattern = (pattern) => {
    setLedPattern(pattern);
    localStorage.setItem('ledPattern', pattern);
  };
  
  // Helper function to calculate a darker shade of a color
  const calculateDarkerColor = (hexColor) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Darken by 20%
    const darkerR = Math.max(0, Math.floor(r * 0.8));
    const darkerG = Math.max(0, Math.floor(g * 0.8));
    const darkerB = Math.max(0, Math.floor(b * 0.8));
    
    // Convert back to hex
    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
  };
  
  // Helper function to calculate a lighter shade of a color
  const calculateLighterColor = (hexColor) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Lighten by 20%
    const lighterR = Math.min(255, Math.floor(r + (255 - r) * 0.2));
    const lighterG = Math.min(255, Math.floor(g + (255 - g) * 0.2));
    const lighterB = Math.min(255, Math.floor(b + (255 - b) * 0.2));
    
    // Convert back to hex
    return `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`;
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
      // Apply the color to CSS variables
      document.documentElement.style.setProperty('--primary-color', savedLedColor);
      document.documentElement.style.setProperty('--primary-color-dark', calculateDarkerColor(savedLedColor));
      document.documentElement.style.setProperty('--primary-color-light', calculateLighterColor(savedLedColor));
    } else {
      // Set default color variables
      document.documentElement.style.setProperty('--primary-color', '#0055ff');
      document.documentElement.style.setProperty('--primary-color-dark', '#0044cc');
      document.documentElement.style.setProperty('--primary-color-light', '#3377ff');
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
