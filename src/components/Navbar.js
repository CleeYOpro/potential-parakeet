import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import UnderConstructionModal from './UnderConstructionModal';
import SettingsModal from './SettingsModal';
import { ThemeContext } from '../contexts/ThemeContext';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 1rem;
  z-index: 1000;
  background: rgba(61, 61, 61, 0.7);
  opacity: 0.7;
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  max-width: 900px;

  @media (max-width: 768px) {
    padding: 0.8rem;
    width: 90%;
    max-width: 400px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  text-align: left;
  font-size: 1.6rem;
  font-weight: bold;
  background: ${props => props.customGradient || `linear-gradient(
    45deg,
    var(--primary-color),
    #ff3333,
    #ffcc00,
    #00ff66,
    #00ffff
  )`};
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradientAnimation} 8s ease infinite;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    flex: 1;
    margin: 0 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  position: relative;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }

  &:hover::after {
    width: 100%;
  }
`;

const IconButton = styled.button`
  display: flex;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  min-width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const MobileMenuButton = styled(IconButton)`
  @media (min-width: 769px) {
    display: none;
  }
`;

const SettingsButton = styled(IconButton)`
  margin-left: 1rem;
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(61, 61, 61, 0.7);
  backdrop-filter: blur(8px);
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 999;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
  }
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { ledColor } = useContext(ThemeContext);

  // Create a gradient using the colors from the settings
  const createGradient = () => {
    // Get all the color options
    const colorOptions = [
      '#0055ff', // Blue
      '#ff3333', // Red
      '#ffcc00', // Yellow
      '#00ff66', // Green
      '#00ffff', // Cyan
      '#ff66ff'  // Pink
    ];
    
    // Make sure the current ledColor is first in the gradient
    const sortedColors = [ledColor, ...colorOptions.filter(color => color !== ledColor)];
    
    // Create the gradient string with the first 5 colors
    return `linear-gradient(
      45deg,
      ${sortedColors[0]},
      ${sortedColors[1]},
      ${sortedColors[2]},
      ${sortedColors[3]},
      ${sortedColors[4]}
    )`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href === '#home') {
      window.location.hash = 'home';
    } else if (href === '#about') {
      window.location.hash = 'about';
    } else if (href === '#contact') {
      window.location.hash = 'contact';
    } else {
      setIsModalOpen(true);
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo customGradient={createGradient()}>CLEO BALARANJITH</Logo>
          <NavGroup>
            <NavLink href="#home" onClick={handleNavClick}>HOME</NavLink>
            <NavLink href="#about" onClick={handleNavClick}>ABOUT</NavLink>
            <NavLink href="#projects" onClick={handleNavClick}>PROJECTS</NavLink>
            <NavLink href="#contact" onClick={handleNavClick}>CONTACT</NavLink>
          </NavGroup>
          <SettingsButton onClick={handleSettingsClick} aria-label="Settings">
            ⚙️
          </SettingsButton>
          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </NavContainer>
      </Nav>
      <MobileMenu isOpen={isMobileMenuOpen}>
        <NavLink href="#home" onClick={handleNavClick}>
          HOME
        </NavLink>
        <NavLink href="#about" onClick={handleNavClick}>
          ABOUT
        </NavLink>
        <NavLink href="#projects" onClick={handleNavClick}>
          PROJECTS
        </NavLink>
        <NavLink href="#contact" onClick={handleNavClick}>
          CONTACT
        </NavLink>
      </MobileMenu>
      <UnderConstructionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default Navbar;
