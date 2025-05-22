import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import UnderConstructionModal from './UnderConstructionModal';
import SettingsModal from './SettingsModal';
import { ThemeContext } from '../contexts/ThemeContext';
import io from 'socket.io-client';


const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 1rem;
  z-index: 1000;
  background: rgba(50, 49, 49, 0.7);
  opacity: 0.85;
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

const Logo = styled.a`
  text-align: left;
  font-size: 1.6rem;
  font-weight: bold;
  font-family: 'Pixelify Sans', sans-serif;
  color: white;
  margin-right: auto;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.hoverColor || '#00aaff'}; /* Use the chosen color or default to light blue */
  }

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

const UserCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 0.9rem;
  margin-right: 1rem;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  
  @media (max-width: 768px) {
    padding: 0.2rem 0.5rem;
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
`;

const UserIcon = styled.span`
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const OnlineText = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const { ledColor } = useContext(ThemeContext);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = io('https://your-websocket-server.com', {
      transports: ['websocket'],
      autoConnect: true
    });

    // Listen for user count updates
    socket.on('userCount', (count) => {
      setUserCount(count);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

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
    } else if (href === '#projects') {
      window.location.hash = 'projects';
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

  // Inside the Navbar component's return statement
  return (
    <>
      <Nav>
        <NavContainer>
          <Logo href="#home" hoverColor={ledColor}>CLEO BALARANJITH</Logo>
          <NavGroup>
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </NavGroup>

          {/* User count display */}
          <UserCount>
            <UserIcon>👥</UserIcon>
            <span>{userCount}</span>
            <OnlineText>online</OnlineText>
          </UserCount>

          <SettingsButton onClick={() => setIsSettingsOpen(true)}>
            ⚙️
          </SettingsButton>

          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </MobileMenuButton>
        </NavContainer>
      </Nav>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)}>
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </MobileMenu>

      {/* Modals */}
      <UnderConstructionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Navbar;
