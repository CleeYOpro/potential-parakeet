import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00ffcc;
  }
`;

const HireButton = styled.button`
  background: #4169ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2d4bb9;
  }
`;

const Navbar = () => {
    return (
        <Nav>
            <Logo>SEANOBRIEN</Logo>
            <NavLinks>
                <NavLink href="#windsurfing">WINDSURFING</NavLink>
                <NavLink href="#media">MEDIA</NavLink>
                <NavLink href="#blog">BLOG</NavLink>
                <NavLink href="#marketing">MARKETING</NavLink>
                <NavLink href="#contact">CONTACT</NavLink>
                <HireButton>HIRE ME</HireButton>
            </NavLinks>
        </Nav>
    );
};

export default Navbar; 