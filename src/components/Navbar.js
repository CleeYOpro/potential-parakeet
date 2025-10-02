import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SettingsModal from './SettingsModal';
import { gsap } from 'gsap';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 1000;
  padding: 0 1rem;

  @media (max-width: 768px) {
    top: 1rem;
    gap: 0.75rem;
  }
`;

const NavBubble = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px) saturate(1.5);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18),
    0 1.5px 8px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }
`;

const LogoImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const SettingsImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  z-index: 900;
  padding: 1rem;
`;

const PillsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Pill = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  min-height: 100px;
  padding: 1rem 2rem;
  font-size: clamp(1.8rem, 3vw, 3rem);
  border-radius: 9999px;
  background: rgba(255,255,255,0.1);
  color: white;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  transform: rotate(${props => props.rotation || 0}deg);
  transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;

  &:hover {
    transform: rotate(${props => props.rotation || 0}deg) scale(1.05);
    background: rgba(255,255,255,0.2);
  }

  &:active {
    transform: rotate(${props => props.rotation || 0}deg) scale(0.95);
  }

  @media(max-width: 768px){
    min-width: 120px;
    min-height: 80px;
    font-size: clamp(1.4rem, 4vw, 2rem);
    padding: 0.8rem 1.2rem;
  }
`;

const HamburgerLines = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  cursor: pointer;

  div {
    position: absolute;
    left: 0;
    width: 20px;
    height: 2px;
    background: white;
    border-radius: 2px;
    transition: all 0.4s ease;
  }

  div:nth-child(1) { top: 0; }
  div:nth-child(2) { top: 50%; transform: translateY(-50%); }
  div:nth-child(3) { bottom: 0; }

  &.open div:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  &.open div:nth-child(2) {
    opacity: 0;
  }

  &.open div:nth-child(3) {
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
  }
`;

const Navbar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pillsRef = useRef([]);

  const menuItems = [
    { label: "About", href: "#about", rotation: 8 },
    { label: "Projects", href: "#projects", rotation: -8 },
    { label: "Bookshelf", href: "#reading-list", rotation: 8 },
    { label: "Blog", href: "#blog", rotation: -8 },
    { label: "Contact", href: "#contact", rotation: 8 },
  ];

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleLogoClick = (e) => {
    e.stopPropagation();
    window.location.href = "/#home";
    setIsMenuOpen(false);
  };

  const handleSettingsClick = () => setIsSettingsOpen(true);

  const handlePillClick = (href) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      pillsRef.current.forEach((pill, i) => {
        const angleX = gsap.utils.random(-100, 100);
        const angleY = gsap.utils.random(-100, 100);
        const angleZ = gsap.utils.random(-30, 30);
        gsap.fromTo(pill, 
          { x: angleX, y: angleY, rotation: angleZ, scale: 0, autoAlpha: 0 },
          { x: 0, y: 0, rotation: pill.dataset.rotation, scale: 1, autoAlpha: 1, duration: 0.7, ease: "back.out(1.5)", delay: i*0.1 }
        );
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <NavbarContainer>
        <NavBubble aria-label="Home" onClick={handleLogoClick}>
          <LogoImage src="/CB (1).png" alt="Logo" />
        </NavBubble>

        <NavBubble onClick={handleSettingsClick} aria-label="Settings">
          <SettingsImage src="/lugu.png" alt="Settings" />
        </NavBubble>

        <NavBubble onClick={toggleMenu} aria-label="Menu">
          <HamburgerLines className={isMenuOpen ? 'open' : ''}>
            <div />
            <div />
            <div />
          </HamburgerLines>
        </NavBubble>
      </NavbarContainer>

      {isMenuOpen && (
        <Overlay>
          <PillsContainer>
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Pill
                  href={item.href}
                  data-rotation={item.rotation}
                  ref={el => pillsRef.current[idx] = el}
                  onClick={() => handlePillClick(item.href)}
                >
                  {item.label}
                </Pill>
              </li>
            ))}
          </PillsContainer>
        </Overlay>
      )}

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Navbar;