import React from 'react';
import styled from 'styled-components';
import TechStack from './TechStack';

import cmcLogo from './imgs/cmc.png';
import rockLogo from './imgs/rock.png';
import tsaLogo from './imgs/tsa.png';

const AboutContainer = styled.section`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const AboutSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Organizations = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const OrgLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const OrgLogo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.3s ease;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }

  &:hover {
    filter: grayscale(0%);
  }
`;

const PictureBoxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PictureBox = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(32, 32, 32, 0.7);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const TechStackSection = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const AboutMe = () => {
  return (
    <AboutContainer>
      <AboutSection>
        <Content>
          <Title>About Me</Title>
          <Description>
            I'm passionate about learning through doing. Like working on projects where I can code, build, and lead—especially when there's a chance to collaborate with others. Whether it's a team based task, a coding project, or something completely new, I'm all about figuring things out and making ideas come to life.<br />I am involved in a variety of organizations that fuel my passions:
          </Description>
          <Organizations>
            <OrgLink href="https://www.cmch-vellore.edu/" target="_blank" rel="noopener noreferrer">
              <OrgLogo src={cmcLogo} alt="Christian Medical College Vellore" />
            </OrgLink>
            <OrgLink href="https://rocketcontest.org/" target="_blank" rel="noopener noreferrer">
              <OrgLogo src={rockLogo} alt="American Rocketry Challenge" />
            </OrgLink>
            <OrgLink href="https://tsaweb.org/" target="_blank" rel="noopener noreferrer">
              <OrgLogo src={tsaLogo} alt="Technology Student Association" />
            </OrgLink>
          </Organizations>
        </Content>
        <PictureBoxes>
          <PictureBox />
          <PictureBox />
        </PictureBoxes>
      </AboutSection>
      
      <TechStackSection>
        <TechStack />
      </TechStackSection>
    </AboutContainer>
  );
};

export default AboutMe;
