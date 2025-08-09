import { useState, useContext } from 'react';
import styled from 'styled-components';
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
  background: rgba(50, 49, 49, 0.55);
  opacity: 0.92;
  backdrop-filter: blur(18px) saturate(1.5);
  border-radius: 2.5rem 2.5rem 2.5rem 2.5rem / 2.2rem 2.2rem 2.2rem 2.2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  border: 1.5px solid rgba(255,255,255,0.13);
  padding: 1.1rem 2.5rem;
  width: 100%;
  max-width: 900px;
  transition: background 0.3s, box-shadow 0.3s;
  font-family: var(--font-family);

  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
    width: 90%;
    max-width: 400px;
    border-radius: 1.5rem;
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
  transition: gap 0.3s;
  @media (max-width: 768px) {
    display: none;
  }
  &.logo-hover {
    gap: 1.1rem;
  }
`;

const MobileNavGroup = styled.div`
  display: none;
  flex: 1;
  justify-content: center;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
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
  @media (min-width: 769px) {
    &:hover {
      width: 7.5em;
      min-width: 7.5em;
    }
    &:hover .leo {
      max-width: 2.2em;
      opacity: 1;
    }
    &:hover .b-base {
      transform: translateX(0.09em);
    }
    &:hover .alaranjith {
      max-width: 6.9em;
      opacity: 1;
    }
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
  font-family: var(--font-family);

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



const SettingsButton = styled(IconButton)`
  margin-left: 1.7rem;
  transition: margin 0.3s;
  &.logo-hover {
    margin-left: 0.7rem;
  }
`;



const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  transition: background 0.2s;
  font-family: var(--font-family);
  &:focus {
    
    color: var(--primary-color);
    outline: none;
  }
`;

const DropdownMenu = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  position: absolute;
  left: 50%;
  transform: translateX(-49%);
  top: 180%;
  min-width: 90vw;
  max-width: 900px;
  z-index: 999;
  background: rgba(31, 30, 30, 0.8);
  opacity: 1;
  backdrop-filter: blur(400px) saturate(1.8);
  -webkit-backdrop-filter: blur(400px) saturate(1.8);
  border-radius: 2.5rem 2.5rem 2.5rem 2.5rem / 2.2rem 2.2rem 2.2rem 2.2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  border: 1.5px solid rgba(255,255,255,0.13);
  padding: 1.2rem 0.5rem;
  width: 100%;
  max-width: 900px;
  transition: background 0.3s, box-shadow 0.3s;
  font-family: var(--font-family);
  text-align: center;
  @media (min-width: 900px) {
    min-width: 700px;
    max-width: 700px;
  }
`;


const DropdownItem = styled.a`
  display: block;
  color: #fff;
  padding: 0.7rem 1.2rem;
  text-decoration: none;
  font-size: 1rem;
  z-index: 1000;
  
  transition: background 0.2s, color 0.2s;
  font-family: var(--font-family);
  &:hover {
    background: var(--primary-color);
    color: #fff;
  }
`;


const Navbar = () => {
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownHover, setDropdownHover] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const { ledColor } = useContext(ThemeContext);

  const handleNavClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href === '/' || href === 'https://cleof.us/' || href === window.location.origin + '/') {
      window.location.href = '/';
      return;
    }
    if (href === '#about') {
      window.location.hash = 'about';
    } else if (href === '#contact') {
      window.location.hash = 'contact';
    } else if (href === '#projects') {
      window.location.hash = 'projects';
    } else if (href === '#reading-list') {
      window.location.hash = 'reading-list';
    } else if (href === '#blog') {
      window.location.hash = 'blog';
    } 
    //else {
      //setIsModalOpen(true);
    //}
    setDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  // Only close dropdown when a link is clicked, not when button is clicked
  const handleDropdownItemClick = (e) => {
    handleNavClick(e);
    setDropdownOpen(false);
  };

  // Keep dropdown open if mouse is over menu or button
  const handleDropdownMouseEnter = () => {
    setDropdownHover(true);
    setDropdownOpen(true);
  };
  const handleDropdownMouseLeave = () => {
    setDropdownHover(false);
    setTimeout(() => {
      if (!dropdownHover) setDropdownOpen(false);
    }, 120);
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo
            href="/"
            hoverColor={ledColor}
            onClick={handleNavClick}
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <span className="logo-inner">
              <span className="c-base">C</span>
              <span className="leo"><span>LEO</span></span>
              <span className="b-base">B</span>
              <span className="alaranjith"><span>ALARANJITH</span></span>
            </span>
          </Logo>
          {/* Desktop Nav */}
          <NavGroup className={logoHover ? 'logo-hover' : ''}>
            <NavLink href="#about" onClick={handleNavClick}>About</NavLink>
            <NavLink href="#projects" onClick={handleNavClick}>Projects</NavLink>
            <NavLink href="#reading-list" onClick={handleNavClick}>Reading List</NavLink>
            <NavLink href="#blog" onClick={handleNavClick}>Blog</NavLink>
            <NavLink href="#contact" onClick={handleNavClick}>Contact</NavLink>
          </NavGroup>
          {/* Mobile Nav (Dropdown) */}
          <MobileNavGroup>
            <DropdownContainer
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <DropdownButton
                onClick={() => setDropdownOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                tabIndex={0}
              >
                Pages ▼
              </DropdownButton>
              <DropdownMenu open={dropdownOpen}>
                <DropdownItem href="#about" onClick={handleDropdownItemClick}>About</DropdownItem>
                <DropdownItem href="#projects" onClick={handleDropdownItemClick}>Projects</DropdownItem>
                <DropdownItem href="#reading-list" onClick={handleDropdownItemClick}>Reading List</DropdownItem>
                <DropdownItem href="#blog" onClick={handleDropdownItemClick}>Blog</DropdownItem>
                <DropdownItem href="#contact" onClick={handleDropdownItemClick}>Contact</DropdownItem>
              </DropdownMenu>
            </DropdownContainer>
          </MobileNavGroup>
          <SettingsButton
            onClick={handleSettingsClick}
            className={logoHover ? 'logo-hover' : ''}
          >
            ⚙️
          </SettingsButton>
        </NavContainer>
      </Nav>
      {/* Modals */}
      
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Navbar;
