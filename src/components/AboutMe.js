import styled from 'styled-components';
import TechStack from './TechStack';
import { useEffect, useState } from 'react';

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
  color: var(--primary-color-light);

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  color: #555;
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
  background: var(--card-bg-light);
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

const AnimatedSentence = styled.span`
  display: block;
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? '0' : '20px')});
  transition: opacity 0.6s, transform 0.6s;
  margin-bottom: 0.5em;
`;

const Emph = styled.span`
  position: relative;
  display: inline-block;
  color: var(--primary-color);
  font-weight: 700;
  z-index: 1;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-color-light), var(--primary-color) 80%);
    border-radius: 1px;
    transform: scaleX(${props => (props.underline ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
    opacity: 0.7;
  }
`;

const sentences = [
  [
    "I’m a high school junior, ",
    { emph: "web developer", underline: true },
    ", and automation specialist focused on helping clients solve ",
    { emph: "real problems", underline: true },
    " through technology."
  ],
  [
    "I build ",
    { emph: "clean, responsive websites", underline: true },
    ", streamline operations through automation, and deliver ",
    { emph: "custom digital solutions", underline: true },
    " that drive measurable results."
  ],
  [
    "Whether it's AI-driven tools, ",
    { emph: "GIS dashboards", underline: true },
    ", or business-ready platforms, I bring a mix of technical skill and strategic thinking."
  ],
  [
    "I also offer strengths in business development, clear communication, and research-backed problem solving."
  ],
  [
    "Clients value my ",
    { emph: "collaborative style", underline: true },
    ", transparency, and commitment to getting things done—no matter how complex the challenge."
  ]
];

const AboutMe = () => {
  const [visibleSentences, setVisibleSentences] = useState(Array(sentences.length).fill(false));
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    let timeouts = [];
    sentences.forEach((_, i) => {
      timeouts.push(setTimeout(() => {
        setVisibleSentences(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        // After the last sentence, trigger underline
        if (i === sentences.length - 1) {
          setTimeout(() => setShowUnderline(true), 700);
        }
      }, i * 600));
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <AboutContainer>
      <AboutSection>
        <Content>
          <Title>About Me</Title>
          <Description as="div">
            {sentences.map((parts, i) => (
              <AnimatedSentence key={i} visible={visibleSentences[i]}>
                {parts.map((part, j) =>
                  typeof part === 'string' ? part :
                    <Emph key={j} underline={showUnderline && part.underline}>{part.emph}</Emph>
                )}
              </AnimatedSentence>
            ))}
          </Description>
        </Content>
        <PictureBoxes>
          <PictureBox>
            <img src={screenshot} alt="About me" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          </PictureBox>
          <PictureBox>
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
