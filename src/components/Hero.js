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

  span {
    color: #0055ff;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(
        120deg,
        #0055ff 0%,
        #0055ff 45%,
        #fff 50%,
        #0055ff 55%,
        #0055ff 100%
      );
      background-size: 200% auto;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      animation: ${shine} 1s linear infinite;
    }
  }
`;

const TeslaLink = styled.a`
  color: #0055ff;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 1rem;
`;

const ScrollPrompt = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 4rem;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Arrow = styled.span`
  display: inline-block;
  transform: rotate(45deg);
  border: solid #666;
  border-width: 0 2px 2px 0;
  padding: 4px;
  margin-top: -4px;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Title>I'M CLEO!</Title>
        <Description>
          Sophomore @ <TeslaLink href="https://www.usnews.com/education/best-high-schools/washington/districts/lake-washington-school-district/tesla-stem-high-school-146690" target="_blank" rel="noopener noreferrer">Tesla STEM</TeslaLink>. First Place WTSA. Web Development. AI. GeoTech. Engineering. <span>Building What's Next</span>.
        </Description>
        <IconsContainer>
          <SocialIcons />
        </IconsContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero; 