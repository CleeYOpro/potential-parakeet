import { useState, useContext } from 'react';
import styled from 'styled-components';
import UnderConstructionModal from './UnderConstructionModal';
import SettingsModal from './SettingsModal';
import { ThemeContext } from '../contexts/ThemeContext';


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
  font-family: var(--font-family-mono), 'Rubik Mono One', monospace;
  color: white;
  margin-right: auto;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease, width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: visible;
  display: inline-block;
  min-width: 2.5em;
  min-height: 1.6em;
  width: 2.5em;
  box-sizing: content-box;
  white-space: nowrap;

  .logo-inner {
    display: inline-block;
    height: 1.6em;
    width: 100%;
    white-space: nowrap;
    position: relative;
  }
  .c-base {
    display: inline-block;
    color: var(--primary-color);
    transition: color 0.3s;
    z-index: 2;
    position: relative;
  }
  .leo {
    display: inline-block;
    overflow: hidden;
    max-width: 0;
    opacity: 0;
    vertical-align: top;
    transition: max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
    white-space: nowrap;
    color: white;
  }
  .leo span {
    display: inline-block;
    padding-left: 0.1em;
  }
  .b-base {
    display: inline-block;
    color: var(--primary-color);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
    margin-left: 0.1em;
  }
  .alaranjith {
    display: inline-block;
    overflow: hidden;
    max-width: 0;
    opacity: 0;
    vertical-align: top;
    transition: max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
    white-space: nowrap;
    color: white;
  } 
  .alaranjith span {
    display: inline-block;
    padding-left: 0.1em;
  }
  &:hover {
    width: 15em;
    min-width: 15em;
  }
  &:hover .leo {
    max-width: 3.5em;
    opacity: 1;
  }
  &:hover .b-base {
    transform: translateX(0.13em);
  }
  &:hover .alaranjith {
    max-width: 12em;
    opacity: 1;
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
          <Logo href="#home" hoverColor={ledColor} onClick={handleNavClick}>
            <span className="logo-inner">
              <span className="c-base">C</span>
              <span className="leo"><span>LEO</span></span>
              <span className="b-base">B</span>
              <span className="alaranjith"><span>ALARANJITH</span></span>
            </span>
          </Logo>
          <NavGroup>
            <NavLink href="#home" onClick={handleNavClick}>Home</NavLink>
            <NavLink href="#about" onClick={handleNavClick}>About</NavLink>
            <NavLink href="#projects" onClick={handleNavClick}>Projects</NavLink>
            <NavLink href="#contact" onClick={handleNavClick}>Contact</NavLink>
          </NavGroup>

          <SettingsButton onClick={handleSettingsClick}>
            ⚙️
          </SettingsButton>

          <MobileMenuButton onClick={toggleMobileMenu}>
            ☰
          </MobileMenuButton>
        </NavContainer>
      </Nav>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)}>
        <NavLink href="#home" onClick={handleNavClick}>Home</NavLink>
        <NavLink href="#about" onClick={handleNavClick}>About</NavLink>
        <NavLink href="#projects" onClick={handleNavClick}>Projects</NavLink>
        <NavLink href="#contact" onClick={handleNavClick}>Contact</NavLink>
      </MobileMenu>

      {/* Modals */}
      <UnderConstructionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Navbar;
