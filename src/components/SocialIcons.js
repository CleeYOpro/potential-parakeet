import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaMedium, FaInstagram } from 'react-icons/fa';

const SocialContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  justify-content: center;
`;

const SocialLink = styled.a`
  color: #fff;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #0055ff;
    transform: translateY(-3px);
  }
`;

const SocialIcons = () => {
    return (
        <SocialContainer>
            <SocialLink href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <FaGithub />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
            </SocialLink>
            <SocialLink href="https://medium.com/@yourusername" target="_blank" rel="noopener noreferrer">
                <FaMedium />
            </SocialLink>
            <SocialLink href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
            </SocialLink>
        </SocialContainer>
    );
};

export default SocialIcons; 