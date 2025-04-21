import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
  flex: 2;
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  background: linear-gradient(
    45deg,
    rgb(132, 175, 224),
    rgb(205, 78, 78),
    rgb(69, 71, 209),
    rgb(0, 81, 255),
    rgb(72, 76, 116)
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradientAnimation} 8s ease infinite;

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
    color: rgb(205, 78, 78);
    text-decoration: underline;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
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

  @media (max-width: 768px) {
    display: flex;
  }
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <NavGroup>
            <NavLink href="#home">HOME</NavLink>
            <NavLink href="#about">ABOUT</NavLink>
          </NavGroup>
          <Logo>CLEO BALARANJITH</Logo>
          <NavGroup>
            <NavLink href="#projects">PROJECTS</NavLink>
            <NavLink href="#contact">CONTACT</NavLink>
          </NavGroup>
          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>

        </NavContainer>
      </Nav>
      <MobileMenu isOpen={isMobileMenuOpen}>
        <NavLink href="#home" onClick={toggleMobileMenu}>
          HOME
        </NavLink>
        <NavLink href="#about" onClick={toggleMobileMenu}>
          ABOUT
        </NavLink>
        <NavLink href="#projects" onClick={toggleMobileMenu}>
          PROJECTS
        </NavLink>
        <NavLink href="#contact" onClick={toggleMobileMenu}>
          CONTACT
        </NavLink>
      </MobileMenu>
    </>
  );
};

export default Navbar;
