import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import LedGrid from './components/LedGrid';
import GradientOverlay from './components/GradientOverlay';
import TypingAnimation from './components/TypingAnimation';
import { ThemeProvider } from './contexts/ThemeContext';

const AppContainer = styled.div`
  min-height: 100vh;
  color: ${props => props.theme === 'dark' ? '#0066ff' : '#0044aa'};
  position: relative;
  background: ${props => props.theme === 'dark' ? '#000000' : '#f5f5f5'};
  overflow: hidden;
`;

const TopSection = styled.div`
  height: 100vh;
  position: relative;
  width: 100%;
  overflow: hidden;
`;



function App() {
  return (
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  );
}

// Separate component to access ThemeContext
const AppWrapper = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const isDark = document.body.classList.contains('dark-mode');
      setIsDarkMode(isDark);
    };

    // Create a MutationObserver to watch for class changes on the body
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AppContainer theme={isDarkMode ? 'dark' : 'light'}>
      <Navbar />
      <TopSection>
        <LedGrid />
        <GradientOverlay />
        <TypingAnimation />
      </TopSection>
    </AppContainer>
  );
};

export default App;