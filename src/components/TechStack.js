import styled, { keyframes } from 'styled-components';
import {
  SiGithub, SiHuggingface, SiFigma, SiFramer, SiJavascript, SiTypescript, SiReact, SiNodedotjs,
  SiHtml5, SiCss3, SiPython, SiSupabase, SiMongodb, SiAdobeillustrator, SiArcgis, SiGooglecolab, SiVercel,
  SiCanva, SiTensorflow, SiNumpy, SiArduino, SiOpenstreetmap, SiGoogleearthengine
} from 'react-icons/si';
import { DiJava, DiEclipse } from 'react-icons/di';
import { SiFlask } from "react-icons/si";
import { SiPandas } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
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

const TechStackContainer = styled.section`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color-light);
  text-align: center;
`;

const IconsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1.5rem;
  width: 100%;
  justify-items: center;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${({ index }) => `${index * 0.1}s`};
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);

    svg {
      color: var(--primary-color);
      filter: drop-shadow(0 0 6px var(--primary-color));
    }
  }

  svg {
    width: 70%;
    height: 70%;
    color: white;
    transition: color 0.3s, filter 0.3s;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const IconName = styled.span`
  color: #eee;
  font-size: 0.8rem;
  text-align: center;
`;

const Tooltip = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  width: max-content;
  z-index: 1;
  font-size: 0.75rem;
  transition: opacity 0.3s;

  ${IconWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const techStack = [
  // Version Control & AI
  { name: 'GitHub', icon: SiGithub, tooltip: 'Version control & collaboration' },
  { name: 'Hugging Face', icon: SiHuggingface, tooltip: 'AI model hub' },

  // IDEs
  { name: 'VS Code', icon: VscCode, tooltip: 'Source code editor' },
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
  return (
    <TechStackContainer>
      <Title>Tech Stack</Title>
      <IconsContainer>
        {techStack.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <Icon key={index} index={index}>
              <IconWrapper>
                <IconComponent />
                <Tooltip>{tech.tooltip}</Tooltip>
              </IconWrapper>
              <IconName>{tech.name}</IconName>
            </Icon>
          );
        })}
      </IconsContainer>
    </TechStackContainer>
  );
};

export default TechStack;
