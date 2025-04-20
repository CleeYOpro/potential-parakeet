import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import AboutMe from './components/AboutMe';
import LedGrid from './components/LedGrid';

const AppContainer = styled.div`
  min-height: 100vh;
  color: #0066ff;
  position: relative;
  background: #000000;
`;

const TopSection = styled.div`
  height: 100vh;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const BottomSection = styled.div`
  position: relative;
  margin-top: 100vh;
  z-index: 3;
  padding: 0 2rem;
  pointer-events: ${props => props.allowScroll ? 'auto' : 'none'};
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  transition: transform 0.6s ease;
  transform: translateY(${props => props.scrollPosition}px);
`;

const Section = styled.div`
  background: rgba(32, 32, 32, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 1000px;
`;

const ScrollButton = styled.button`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(32, 32, 32, 0.7);
  backdrop-filter: blur(8px);
  border: none;
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Pixelify Sans', system-ui;

  &:hover {
    background: rgba(32, 32, 32, 0.9);
  }

  ${props => props.position === 'top' ? `
    top: 1rem;
  ` : `
    bottom: 2rem;
  `}

  &::before {
    content: ${props => props.position === 'top' ? '"↑"' : '"↓"'};
    font-size: 1.2rem;
  }
`;

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const preventScroll = (e) => {
      if (!isScrolled) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isScrolled]);

  const handleScrollClick = (direction) => {
    if (direction === 'up') {
      setScrollPosition(0);
      setIsScrolled(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const newPosition = -window.innerHeight * 0.9;
      setScrollPosition(newPosition);
      setIsScrolled(true);
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <AppContainer>
      <TopSection>
        <LedGrid />
        <ContentContainer ref={contentRef} scrollPosition={scrollPosition}>
          <Navbar />
          <Hero />
        </ContentContainer>
      </TopSection>
      <BottomSection allowScroll={isScrolled}>
        <Section>
          <TechStack />
        </Section>
        <Section>
          <AboutMe />
        </Section>
      </BottomSection>
      {isScrolled && (
        <ScrollButton
          onClick={() => handleScrollClick('up')}
          position="top"
        >
          Back to Main
        </ScrollButton>
      )}
      {!isScrolled && (
        <ScrollButton
          onClick={() => handleScrollClick('down')}
          position="bottom"
        >
          Explore
        </ScrollButton>
      )}
    </AppContainer>
  );
}

export default App; 