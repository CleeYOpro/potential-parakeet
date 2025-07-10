import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const loadingDots = keyframes`
  0%, 20% {
    color: rgba(255, 255, 255, 0.3);
    text-shadow: 0.25em 0 0 rgba(255, 255, 255, 0.3),
                 0.5em 0 0 rgba(255, 255, 255, 0.3);
  }
  40% {
    color: white;
    text-shadow: 0.25em 0 0 rgba(255, 255, 255, 0.3),
                 0.5em 0 0 rgba(255, 255, 255, 0.3);
  }
  60% {
    text-shadow: 0.25em 0 0 white,
                 0.5em 0 0 rgba(255, 255, 255, 0.3);
  }
  80%, 100% {
    text-shadow: 0.25em 0 0 white,
                 0.5em 0 0 white;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  color: white;
  font-family: 'Raleway', sans-serif;
  animation: ${slideIn} 0.4s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ModalMessage = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LoadingDots = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  animation: ${loadingDots} 1.4s infinite;
  
  &::after {
    content: '...';
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const InformationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent>
                <CloseButton onClick={onClose}>×</CloseButton>
                <ModalTitle>Hi! I'm Cleo.</ModalTitle>
                <ModalMessage>
                    cleof.us is currently undergoing a major overhaul from its original purpose.
                    You'll be notified as soon as it launches. Thanks for your patience!
                </ModalMessage>
                <LoadingDots />
            </ModalContent>
        </ModalOverlay>
    );
};

export default InformationModal; 