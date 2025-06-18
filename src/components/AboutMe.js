import { useContext } from 'react';
import styled from 'styled-components';
import TechStack from './TechStack';
import { ThemeContext } from '../contexts/ThemeContext';

import cmcLogo from './imgs/cmc.png';
import rockLogo from './imgs/rock.png';
import tsaLogo from './imgs/tsa.png';
import image12 from './imgs/image12.png';
import fiver from './imgs/fiver.png';
import screenshot from './imgs/WhatsApp Image 2025-06-17 at 20.15.26_5e311667.jpg';
import award from './imgs/WhatsApp Image 2025-05-17 at 22.55.10_fbedebc8.jpg';

const AboutContainer = styled.section`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;
  z-index: 1;

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
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(2px);
  border-radius: 8px;
  padding: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Content = styled.div`
  flex: 1;
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.isDarkMode ? 'var(--primary-color)' : 'var(--primary-color-light)'};

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  color: ${props => props.isDarkMode ? '#666' : '#555'};
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
  height: 80px;
  width: auto;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.3s ease;

  @media (max-width: 768px) {
    height: 60px;
  }

  @media (max-width: 480px) {
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
  background: ${props => props.isDarkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)'};
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
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(2px);
  border-radius: 8px;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const AboutMe = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <AboutContainer>
      <AboutSection>
        <Content>
          <Title isDarkMode={isDarkMode}>About Me</Title>
          <Description isDarkMode={isDarkMode}>
            I'm passionate about learning through doing. Like working on projects where I can code, build, and lead—especially when there's a chance to collaborate with others. Whether it's a team based task, a coding project, or something completely new, I'm all about figuring things out and making ideas come to life.
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
            <OrgLink href="https://tesla.lwsd.org/" target="_blank" rel="noopener noreferrer">
              <OrgLogo src={image12} alt="Tesla STEM High School" />
            </OrgLink>
            <OrgLink href="https://www.fiverr.com/s/pd8krrY" target="_blank" rel="noopener noreferrer">
              <OrgLogo src={fiver} alt="Fiverr" />
            </OrgLink>
          </Organizations>
        </Content>
        <PictureBoxes>
          <PictureBox isDarkMode={isDarkMode}>
            <img src={screenshot} alt="About me" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          </PictureBox>
          <PictureBox isDarkMode={isDarkMode}>
            <img src={award} alt="Award" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          </PictureBox>
        </PictureBoxes>
      </AboutSection>

      <TechStackSection>
        <TechStack />
      </TechStackSection>
    </AboutContainer>
  );
};

export default AboutMe;
