import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  position: relative;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 2rem;
  max-width: 800px;
  line-height: 1.2;

  .highlight {
    color: #00ffcc;
  }

  .flag {
    display: inline-block;
    margin: 0 0.5rem;
  }
`;

const CTALink = styled.a`
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }

  &::after {
    content: '⟶';
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(5px);
  }
`;

const Hero = () => {
    return (
        <HeroSection>
            <SubTitle>SEAN O'BRIEN</SubTitle>
            <Title>
                10x Australian <span role="img" aria-label="Australian flag" className="flag">🇦🇺</span>
                <span className="highlight">Windsurfing Champion</span>. Design leader @ Brisbane Agency.
                Building the big thing in <span role="img" aria-label="data icon" className="flag">💾</span> data startups.
            </Title>
            <CTALink href="#work">
                Come and see what I'm currently working on
            </CTALink>
        </HeroSection>
    );
};

export default Hero; 