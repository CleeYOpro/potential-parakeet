import React, { useState } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 1rem;
  z-index: 1000;
  background: rgba(32, 32, 32, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
    width: calc(100% - 2rem);
    margin: 0 1rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  width: fit-content;
  padding: 0.5rem 2rem;

  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100%;
    padding: 0 0.5rem;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2px;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
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
  margin-left: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(32, 32, 32, 0.95);
  backdrop-filter: blur(8px);
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 999;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  &:hover {
    color: #0055ff;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #0055ff;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
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
          <NavLinks>
            <NavLink href="#home">HOME</NavLink>
            <NavLink href="#about">ABOUT</NavLink>
          </NavLinks>
          <Logo>CLEO BALARANJITH</Logo>
          <NavLinks>
            <NavLink href="#projects">PROJECTS</NavLink>
            <NavLink href="#contact">CONTACT</NavLink>
          </NavLinks>
          <MobileMenuButton onClick={toggleMobileMenu}>
            ☰
          </MobileMenuButton>
        </NavContainer>
      </Nav>
      <MobileMenu isOpen={isMobileMenuOpen}>
        <NavLink href="#home" onClick={toggleMobileMenu}>HOME</NavLink>
        <NavLink href="#about" onClick={toggleMobileMenu}>ABOUT</NavLink>
        <NavLink href="#projects" onClick={toggleMobileMenu}>PROJECTS</NavLink>
        <NavLink href="#contact" onClick={toggleMobileMenu}>CONTACT</NavLink>
      </MobileMenu>
    </>
  );
};

export default Navbar; 