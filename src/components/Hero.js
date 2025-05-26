import React from 'react';
import styled, { keyframes } from 'styled-components';
import SocialIcons from './SocialIcons';

const shine = keyframes`
  0% {
    background-position: -100% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 4rem;
  position: relative;
  text-align: left;
  background: transparent;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #fff;
`;

const HighlightedText = styled.span`
  color: var(--primary-color);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(
      120deg,
      var(--primary-color) 0%,
      var(--primary-color) 45%,
      #fff 50%,
      var(--primary-color) 55%,
      var(--primary-color) 100%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: ${shine} 1s linear infinite;
  }
`;

const TeslaLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: bold;

  &:hover {
    color: #fff;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 1rem;
`;

const WtsaLogo = styled.img`
  height: 32px;
  width: auto;
  object-fit: contain;
  margin-left: 4px;
  margin-right: 0px;
  vertical-align: middle;
  horizontal-align: middle;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Title>I'M CLEO!</Title>
        <Description>
          Sophomore @ <TeslaLink href="https://www.usnews.com/education/best-high-schools/washington/districts/lake-washington-school-district/tesla-stem-high-school-146690" target="_blank" rel="noopener noreferrer">Tesla STEM</TeslaLink>. First Place <WtsaLogo src="/wtsa.png" alt="WTSA Logo" />. Web Development. AI. GeoTech. Engineering. <HighlightedText>Building What's Next</HighlightedText>.
        </Description>
        <IconsContainer>
          <SocialIcons />
        </IconsContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
