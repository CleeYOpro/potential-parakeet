import styled from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from "react-icons/ri";
import { SiMedium } from "react-icons/si";

const SocialContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  justify-content: center;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2.4rem;
  transition: all 0.3s ease;

  &.large {
    font-size: 2.7rem; /* Bigger for LinkedIn & Instagram */
  }

  /* Optional vertical alignment tweaks for specific icons */
  &.linkedin svg {
    transform: translateY(0.5px);
  }
  &.instagram svg {
    
    font-size: 3rem;
  }

  &:hover {
    color: var(--primary-color);
    transform: translateY(-3px);
  }
`;

const SocialIcons = () => {
  return (
    <SocialContainer>
      <SocialLink href="https://github.com/CleeYOpro" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </SocialLink>
      <SocialLink className="large linkedin" href="https://linkedin.com/in/cleofus" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </SocialLink>
      <SocialLink href="https://medium.com/@cleobala" target="_blank" rel="noopener noreferrer">
        <SiMedium />
      </SocialLink>
      <SocialLink className="large instagram" href="https://instagram.com/cle0b" target="_blank" rel="noopener noreferrer">
        <RiInstagramFill />
      </SocialLink>
    </SocialContainer>
  );
};

export default SocialIcons;
