import React from 'react';
import styled from 'styled-components';

import cmcLogo from './imgs/cmc.png';
import rockLogo from './imgs/rock.png';
import tsaLogo from './imgs/tsa.png';

const AboutContainer = styled.section`
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
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

const MoreButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
  margin-top: 2rem;

  @media (max-width: 480px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
  }

  &:hover {
    background: #ff3333;
  }
`;

const AboutMe = () => {
  return (
    <AboutContainer>
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
        <MoreButton>More About Me</MoreButton>
      </Content>
      <PictureBoxes>
        <PictureBox />
        <PictureBox />
      </PictureBoxes>
    </AboutContainer>
  );
};

export default AboutMe;
