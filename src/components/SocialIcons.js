import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from "react-icons/ri";
import { SiMedium } from "react-icons/si";

const slowFallIn = keyframes`
  0% {
    transform: translateY(-80px) scale(0.8);
    opacity: 0;
  }
  60% {
    transform: translateY(8px) scale(1.05);
    opacity: 1;
  }
  80% {
    transform: translateY(-2px) scale(1);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

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
  animation: ${slowFallIn} 1s ease-out forwards;
  animation-delay: ${({ delay }) => delay || "0s"};
  animation-fill-mode: forwards; /* ✅ Keeps them visible after anim */
  opacity: 0;

  &.large {
    font-size: 2.7rem;
  }

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
      <SocialLink delay="0s" href="https://github.com/CleeYOpro" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </SocialLink>
      <SocialLink delay="0.15s" className="large linkedin" href="https://linkedin.com/in/cleofus" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </SocialLink>
      <SocialLink delay="0.3s" href="https://medium.com/@cleobala" target="_blank" rel="noopener noreferrer">
        <SiMedium />
      </SocialLink>
      <SocialLink delay="0.45s" className="large instagram" href="https://instagram.com/cle0b" target="_blank" rel="noopener noreferrer">
        <RiInstagramFill />
      </SocialLink>
    </SocialContainer>
  );
};

export default SocialIcons;
