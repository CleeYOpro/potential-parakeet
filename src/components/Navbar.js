import React, { useState } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: fixed;
  width: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2px;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

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

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  flex-direction: column;
  gap: 2rem;
  z-index: 1001;

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
    color: #ff4d4d;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #ff4d4d;
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