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
  color: var(--primary-color);
`;

const Description = styled.p`
  font-size: 1.6rem;
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

const WorkLink = styled.a`
  color: var(--primary-color);
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #fff;
    background: var(--primary-color);
    border-radius: 4px;
    padding: 0.1em 0.1em;
    text-decoration: none;
  }
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  background: var(--primary-color);
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.7em 1.4em;
  border-radius: 2.5rem;
  margin-top: 1.2rem;
  text-decoration: none;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  border: 1.5px solid rgba(255,255,255,0.13);
  backdrop-filter: blur(18px) saturate(1.5);
  -webkit-backdrop-filter: blur(18px) saturate(1.5);
  opacity: 0.97;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  gap: 0.7em;
  font-family: var(--font-family);
  &:hover {
    background: var(--primary-color-dark, #0044aa);
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 4px 20px rgba(0,0,0,0.28);
    text-decoration: none;
  }
`;

const Arrow = styled.span`
  font-size: 1.3em;
  margin-left: 0.2em;
  transition: transform 0.2s;
  ${ContactButton}:hover & {
    transform: translateX(4px);
  }
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 1rem;
`;


const Hero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Title>I'M CLEO!</Title>
        <Description>
          <TeslaLink
            href="https://www.usnews.com/education/best-high-schools/washington/districts/lake-washington-school-district/tesla-stem-high-school-146690"
            target="_blank"
            rel="noopener noreferrer"
          >
            Student Full Stack Developer @ Tesla STEM.{" "}
          </TeslaLink>
          Effective <WorkLink href="#projects">work</WorkLink> in AI, GIS, web, business, and engineering
          . <HighlightedText>Let’s build what’s next.</HighlightedText>
        </Description>
        <ContactButton href="#contact">
          Get in touch <Arrow>&rarr;</Arrow>
        </ContactButton>
        <IconsContainer>
          <SocialIcons />
        </IconsContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
