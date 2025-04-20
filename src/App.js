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

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 2rem;
  min-height: 200vh;
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

  const handleScrollClick = (direction) => {
    if (direction === 'up') {
      setScrollPosition(0);
      setIsScrolled(false);
    } else {
      const newPosition = -window.innerHeight * 0.9;
      setScrollPosition(newPosition);
      setIsScrolled(true);
    }
  };

  return (
    <AppContainer>
      <div className="content-wrapper">
        <LedGrid />
        <ContentContainer ref={contentRef} scrollPosition={scrollPosition}>
          <Navbar />
          <Hero />
          <Section>
            <TechStack />
          </Section>
          <Section>
            <AboutMe />
          </Section>
        </ContentContainer>
      </div>
      {isScrolled && (
        <ScrollButton
          onClick={() => handleScrollClick('up')}
          position="top"
        >
          Back to Top
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