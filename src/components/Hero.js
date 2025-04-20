import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 4rem;
  position: relative;
  text-align: left;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 77, 77, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(65, 105, 255, 0.1) 0%, transparent 50%),
      linear-gradient(45deg, transparent 48%, rgba(0, 255, 204, 0.1) 49%, transparent 51%);
    background-size: 200% 200%;
    animation: ${gradientAnimation} 15s ease infinite;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
    min-height: 90vh;
  }

  @media (max-width: 480px) {
    padding: 0 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 3px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.2;
  max-width: 800px;
`;

const Highlight = styled.span`
  background: linear-gradient(45deg, #ff4d4d, #4169ff, #00ffcc);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 3s ease infinite;
  font-weight: 600;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  animation: bounce 2s infinite;
  z-index: 1;

  @media (max-width: 768px) {
    left: 2rem;
  }

  @media (max-width: 480px) {
    left: 1.5rem;
    font-size: 0.7rem;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const Description = styled.div`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1rem;
  max-width: 800px;
  line-height: 1.4;
  opacity: 0.95;

  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    line-height: 1.2;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <ContentWrapper>
        <Name>im cleo!</Name>
        <Description>
          Sophomore @ Tesla STEM. First Place WTSA. Web Development. AI. GeoTech. Engineering. <Highlight>Building What's Next.</Highlight>
        </Description>
      </ContentWrapper>
      <ScrollIndicator>
        Scroll to explore
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero; 