import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const TypingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
  font-family: 'Raleway', sans-serif;
  z-index: 10;
  position: relative;
  padding: 2rem 1rem;
  box-sizing: border-box;
`;

const QuoteText = styled.div`
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  font-weight: 600;
  font-style: italic;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 2rem;
  max-width: 900px;
  padding: 0 2rem;
  letter-spacing: 0.02em;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    font-size: clamp(1.6rem, 6vw, 2.4rem);
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    font-size: clamp(1.4rem, 7vw, 2rem);
  }
`;

const Attribution = styled.div`
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 400;
  font-style: italic;
  text-align: center;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 4rem;
  padding: 0 2rem;
  letter-spacing: 0.05em;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    margin-bottom: 2.5rem;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 3px;
  height: clamp(1.8rem, 5vw, 3rem);
  background-color: white;
  margin-left: 6px;
  animation: blink 1.2s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  @media (max-width: 768px) {
    width: 2px;
    margin-left: 4px;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  position: relative;
  z-index: 20;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 1.2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const ContactLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  padding: clamp(0.8rem, 2.5vw, 1.2rem);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(50px, 14vw, 70px);
  height: clamp(50px, 14vw, 70px);
  min-width: clamp(50px, 14vw, 70px);
  min-height: clamp(50px, 14vw, 70px);
  
  svg {
    width: 60%;
    height: 60%;
    color: white;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
    
    svg {
      transform: scale(1.1);
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`;

const TypingAnimation = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [showAttribution, setShowAttribution] = useState(false);

  const quote = '"The best time to plant a tree was 20 years ago. The second best time is now."';
  const attribution = '— Chinese Proverb';

  useEffect(() => {
    if (!isDeleting && currentIndex < quote.length) {
      // Typing phase
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + quote[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    } else if (!isDeleting && currentIndex >= quote.length) {
      // Finished typing, show attribution after a short delay
      if (!showAttribution) {
        const timer = setTimeout(() => {
          setShowAttribution(true);
        }, 500);
        return () => clearTimeout(timer);
      } else {
        // Wait a bit then start deleting
        const timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Wait 2 seconds before starting to delete

        return () => clearTimeout(timer);
      }
    } else if (isDeleting && displayText.length > 0) {
      // Deleting phase - clear all text immediately
      setDisplayText('');
      return;
    } else if (isDeleting && displayText.length === 0) {
      // Finished deleting, reset for next cycle
      setIsDeleting(false);
      setCurrentIndex(0);
      setShowAttribution(false);
      setCycleCount(prev => prev + 1);

      // After 3 cycles, show contact links
      if (cycleCount >= 2) {
        setIsTypingComplete(true);
      }
    }
  }, [currentIndex, quote, isDeleting, displayText, cycleCount, showAttribution]);

  return (
    <TypingContainer>
      <QuoteText>
        {displayText}
        {!isTypingComplete && <Cursor />}
      </QuoteText>

      {showAttribution && !isDeleting && (
        <Attribution>
          {attribution}
        </Attribution>
      )}

      <ContactLinks>
        <ContactLink href="https://instagram.com/cleobalaranjith" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </ContactLink>
        <ContactLink href="mailto:cbalaranjith@gmail.com">
          <FaEnvelope />
        </ContactLink>
        <ContactLink href="https://linkedin.com/in/cleofus123" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </ContactLink>
        <ContactLink href="https://github.com/CleeYOpro" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </ContactLink>
      </ContactLinks>
    </TypingContainer>
  );
};

export default TypingAnimation; 