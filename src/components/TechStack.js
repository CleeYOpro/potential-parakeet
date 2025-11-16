import React from 'react';
import styled from 'styled-components';
import {
  SiGithub,
  SiSupabase,
  SiReact,
  SiTypescript,
  SiPython,
  SiVercel,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const TechContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const TechSection = styled.div`
  background: rgba(31, 30, 30, 0.8);
  backdrop-filter: blur(400px) saturate(1.8);
  -webkit-backdrop-filter: blur(400px) saturate(1.8);
  border-radius: 2.5rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.18), 0 1.5px 8px rgba(0,0,0,0.10);
  border: 1.5px solid rgba(255,255,255,0.13);
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.8rem;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.4rem;
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
    gap: 1.1rem;
  }
`;

const Label = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #ccc;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 26px;
    height: 26px;
    color: #fff;
    transition: all 0.3s ease;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
  }

  &:hover svg {
    color: var(--primary-color, #60a5fa);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

// Your 7 favorites
const tech = [
  { name: 'VS Code', icon: VscVscode },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Supabase', icon: SiSupabase },
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Python', icon: SiPython },
  { name: 'Vercel', icon: SiVercel },
];

const FavTechStack = () => {
  return (
    <TechContainer>
      <TechSection>
        <Label>fav tech rn:</Label>
        {tech.map((t) => (
          <Icon key={t.name} aria-label={t.name}>
            <t.icon />
          </Icon>
        ))}
      </TechSection>
    </TechContainer>
  );
};

export default FavTechStack;