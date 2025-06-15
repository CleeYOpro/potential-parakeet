import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LedGrid from './components/LedGrid';
import GradientOverlay from './components/GradientOverlay';
import About from './about';
import Contact from './contact';
import { ThemeProvider } from './contexts/ThemeContext';
import Projects from './projects';

const AppContainer = styled.div`
  min-height: 100vh;
  color: ${props => props.theme === 'dark' ? '#0066ff' : '#0044aa'};
  position: relative;
  background: ${props => props.theme === 'dark' ? '#000000' : '#f5f5f5'};
  overflow: ${props => props.currentPage === 'home' ? 'hidden' : 'auto'};
`;

const TopSection = styled.div`
  height: 100vh;
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
`;

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initialize with current hash

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Remove the flashing grid pattern
  useEffect(() => {
    const bodyElement = document.body;
    const originalBodyStyle = bodyElement.getAttribute('style') || '';

    bodyElement.setAttribute('style', `${originalBodyStyle}; min-height: ${currentPage === 'home' ? '100vh' : 'auto'}`);

    return () => {
      bodyElement.setAttribute('style', originalBodyStyle);
    };
  }, [currentPage]);

  return (
    <ThemeProvider>
      <AppWrapper currentPage={currentPage} />
    </ThemeProvider>
  );
}

// Separate component to access ThemeContext
const AppWrapper = ({ currentPage }) => {
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

  // Inside the AppWrapper component's return statement:
  return (
    <AppContainer currentPage={currentPage} theme={isDarkMode ? 'dark' : 'light'}>
      <Navbar />
      {currentPage === 'home' && (
        <TopSection>
          <LedGrid />
          <GradientOverlay />
          <ContentContainer>
            <Hero />
          </ContentContainer>
        </TopSection>
      )}
      {currentPage === 'about' && (
        <About />
      )}
      {currentPage === 'projects' && (
        <Projects />
      )}
      {currentPage === 'contact' && (
        <Contact />
      )}
    </AppContainer>
  );
};

export default App;