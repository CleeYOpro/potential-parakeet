import React from 'react';
import styled from 'styled-components';

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
  margin-bottom: 2rem;
  color: #fff;

  span {
    color: #0055ff;
  }
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
          Sophomore @ Tesla STEM. First Place WTSA. Web Development. AI. GeoTech. Engineering. <span>Building What's Next</span>.
        </Description>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero; 