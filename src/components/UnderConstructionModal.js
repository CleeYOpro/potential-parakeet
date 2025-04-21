import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: rgba(61, 61, 61, 0.9);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: #fff;
  max-width: 400px;
  width: 90%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #0066ff;
  font-family: 'Pixelify Sans', system-ui;
`;

const Message = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background: #0066ff;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Pixelify Sans', system-ui;
  transition: background 0.3s ease;

  &:hover {
    background: #0052cc;
  }
`;

const UnderConstructionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>🚧 Under Construction 🚧</Title>
        <Message>
          This section is currently under development. Check back soon for updates!
        </Message>
        <CloseButton onClick={onClose}>Got it!</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UnderConstructionModal;
