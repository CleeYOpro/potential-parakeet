import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  opacity: ${props => props.isOpen ? 1 : 0};
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(1.5);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  color: white;
  animation: slideIn 0.4s ease-out;

  @keyframes slideIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 16px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0 0 1rem 0;
  font-weight: 700;
  background: linear-gradient(135deg, #0066ff 0%, #00ffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin: 1rem 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CloseButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  background: rgba(0, 102, 255, 0.3);
  border: 1.5px solid rgba(0, 102, 255, 0.6);
  color: #00ddff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 102, 255, 0.5);
    border-color: rgba(0, 102, 255, 0.9);
    box-shadow: 0 0 20px rgba(0, 102, 255, 0.4);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const DeprecationModal = ({ isOpen, onClose }) => {
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>🚀 Website Deprecation</Title>
        <Description>
          This website is getting deprecated and rebuilt.
        </Description>
        <Description>
          Please check back soon for the new version!
        </Description>
        <CloseButton onClick={onClose}>
          Got it
        </CloseButton>
      </ModalContent>
    </Overlay>
  );
};

export default DeprecationModal;
