import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  SiGithub, SiHuggingface, SiFigma, SiFramer, SiJavascript, SiTypescript, SiReact, SiNodedotjs,
  SiHtml5, SiCss3, SiPython, SiSupabase, SiMongodb, SiAdobeillustrator, SiArcgis, SiGooglecolab, SiVercel,
  SiCanva, SiTensorflow, SiNumpy, SiArduino, SiOpenstreetmap, SiGoogleearthengine
} from 'react-icons/si';
import { DiJava, DiEclipse } from 'react-icons/di';
import { SiFlask } from "react-icons/si";
import { SiPandas } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import OpenRocketIcon from './OpenRocketIcon';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const infiniteScroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const TechStackContainer = styled.section`
  padding: 1rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1150px;
  margin: 0 auto;

  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 1.5rem;
    padding-bottom: 3rem;
    margin: 2rem;
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    padding: 0rem;
    padding-bottom: 2.5rem;
    margin: 2rem;
    margin-bottom: 0;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: rgba(31, 30, 30, 0.8);
  opacity: 1;
  backdrop-filter: blur(400px) saturate(1.8);
  -webkit-backdrop-filter: blur(400px) saturate(1.8);
  border-radius: 2.5rem 2.5rem 2.5rem 2.5rem / 2.2rem 2.2rem 2.2rem 2.2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  border: 1.5px solid rgba(255,255,255,0.13);
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  animation: ${infiniteScroll} 30s linear infinite;
  width: fit-content;
`;

const CarouselSlide = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.75rem;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  animation: ${fadeIn} 0.5s ease-out;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    svg {
      color: var(--primary-color);
      filter: drop-shadow(0 0 4px var(--primary-color));
    }
  }

  &:active {
    transform: scale(1.05);
  }

  svg {
    width: 30px;
    height: 30px;
    color: white;
    transition: color 0.3s, filter 0.3s;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const NotificationBox = styled.div`
  position: fixed;
  left: 47%;
  transform: translate(-50%, -50%);
  background: rgba(31, 30, 30, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: var(--primary-color-light);
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 9999;
  animation: ${({ isVisible, isFading }) => 
    isFading ? fadeOut : isVisible ? slideUp : 'none'
  } 0.3s ease-out forwards;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;




const techStack = [
  // Version Control & AI
  { name: 'GitHub', icon: SiGithub, tooltip: 'Version control & collaboration' },
  { name: 'Hugging Face', icon: SiHuggingface, tooltip: 'AI model hub' },

  // IDEs
  { name: 'VS Code', icon: VscVscode, tooltip: 'Source code editor' },
  { name: 'Eclipse IDE', icon: DiEclipse, tooltip: 'Java IDE' },

  // Design & Prototyping
  { name: 'Figma', icon: SiFigma, tooltip: 'Interface design tool' },
  { name: 'Framer', icon: SiFramer, tooltip: 'Interactive prototyping tool' },
  { name: 'Adobe Illustrator', icon: SiAdobeillustrator, tooltip: 'Vector graphics editor' },
  { name: 'Canva', icon: SiCanva, tooltip: 'Graphic design platform' },

  // Programming Languages
  { name: 'JavaScript', icon: SiJavascript, tooltip: 'Web programming language' },
  { name: 'TypeScript', icon: SiTypescript, tooltip: 'Typed superset of JS' },
  { name: 'HTML', icon: SiHtml5, tooltip: 'Markup language for web pages' },
  { name: 'CSS', icon: SiCss3, tooltip: 'Style sheet language for web design' },
  { name: 'Python', icon: SiPython, tooltip: 'High-level programming language' },
  { name: 'Java', icon: DiJava, tooltip: 'Object-oriented language' },

  // Frameworks & Libraries
  { name: 'React', icon: SiReact, tooltip: 'UI library' },
  { name: 'Node.js', icon: SiNodedotjs, tooltip: 'Server-side JS runtime' },
  { name: 'Flask', icon: SiFlask, tooltip: 'Python web framework' },
  { name: 'TensorFlow', icon: SiTensorflow, tooltip: 'Machine learning framework' },
  { name: 'NumPy', icon: SiNumpy, tooltip: 'Numerical computing library' },
  { name: 'GeoPandas', icon: SiPandas, tooltip: 'Geospatial data analysis library' },

  // Databases & Backend
  { name: 'Supabase', icon: SiSupabase, tooltip: 'Backend as a service' },
  { name: 'MongoDB', icon: SiMongodb, tooltip: 'NoSQL database' },

  // Geospatial
  { name: 'ArcGIS', icon: SiArcgis, tooltip: 'Geospatial analytics' },
  { name: 'OpenStreetMap', icon: SiOpenstreetmap, tooltip: 'Collaborative mapping project' },
  { name: 'Google Earth Engine', icon: SiGoogleearthengine, tooltip: 'Planet-scale environmental analysis' },

  // Cloud & Deployment
  { name: 'Vercel', icon: SiVercel, tooltip: 'Frontend & static site hosting' },
  { name: 'Google Colab', icon: SiGooglecolab, tooltip: 'Cloud Jupyter notebooks' },

  // Hardware & Simulation
  { name: 'Arduino', icon: SiArduino, tooltip: 'Open-source electronics platform' },
  { name: 'Open Rocket', icon: OpenRocketIcon, tooltip: 'Rocket simulation software' }
];

const TechStack = () => {
  const [clickedTech, setClickedTech] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // Create duplicated array for seamless infinite scroll
  const duplicatedTechStack = [...techStack, ...techStack];

  const handleIconClick = (techName) => {
    // Reset any existing animation
    setIsFading(false);
    setIsVisible(false);
    
    // Set new tech name and show
    setTimeout(() => {
      setClickedTech(techName);
      setIsVisible(true);
    }, 50);
  };

  useEffect(() => {
    if (isVisible && clickedTech) {
      // Start fade out after 1.5 seconds
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 1500);

      // Hide completely after fade animation
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setClickedTech(null);
        setIsFading(false);
      }, 1800);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isVisible, clickedTech]);

  return (
    <TechStackContainer>
      <CarouselWrapper>
        <CarouselContainer>
          <CarouselTrack>
            {duplicatedTechStack.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <CarouselSlide key={index}>
                  <Icon>
                    <IconWrapper onClick={() => handleIconClick(tech.name)}>
                      <IconComponent />
                    </IconWrapper>
                  </Icon>
                </CarouselSlide>
              );
            })}
          </CarouselTrack>
        </CarouselContainer>
        {clickedTech && (
          <NotificationBox isVisible={isVisible} isFading={isFading}>
            {clickedTech}
          </NotificationBox>
        )}
      </CarouselWrapper>
    </TechStackContainer>
  );
};

export default TechStack;
