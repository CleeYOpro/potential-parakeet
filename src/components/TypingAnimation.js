import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord, FaEnvelope } from 'react-icons/fa';

const TypingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  font-family: 'Pixelify Sans', sans-serif;
  z-index: 10;
  position: relative;
`;

const QuoteText = styled.div`
  font-size: clamp(2.2rem, 8vw, 3.5rem);
  font-weight: bold;
  font-style: italic;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 1rem;
  max-width: 800px;
  padding: 0 3.5rem;
  
  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const Attribution = styled.div`
  font-size: clamp(1.3rem, 4vw, 2rem);
  font-style: italic;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  padding: 0 2.5rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: clamp(2rem, 7vw, 3rem);
  background-color: white;
  margin-left: 4px;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  position: relative;
  z-index: 20;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const ContactLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: clamp(1.2rem, 3vw, 2rem);
  padding: clamp(0.6rem, 2vw, 1rem);
  border: 2px solid white;
  border-radius: 50%;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(45px, 12vw, 60px);
  height: clamp(45px, 12vw, 60px);
  min-width: clamp(45px, 12vw, 60px);
  min-height: clamp(45px, 12vw, 60px);
  
  svg {
    width: 100%;
    height: 100%;
    color: white;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
  }
`;

const TypingAnimation = () => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);
    const [showAttribution, setShowAttribution] = useState(false);

    const quote = '"Start where you are. Use what you have. Do what you can."';
    const attribution = '— Arthur Ashe';

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
                <ContactLink href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <FaDiscord />
                </ContactLink>
                <ContactLink href="mailto:cbalaranjith@gmail.com">
                    <FaEnvelope />
                </ContactLink>
                <ContactLink href="https://linkedin.com/in/cleofus123" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </ContactLink>
                <ContactLink href="https://github.com/cleobalaranjith" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </ContactLink>
            </ContactLinks>
        </TypingContainer>
    );
};

export default TypingAnimation; 