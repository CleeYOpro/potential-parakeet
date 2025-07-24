import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9) rotate(-2deg);}
  to { opacity: 1; transform: scale(1) rotate(0);}
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 2000;
  inset: 0;
  background: rgba(20,20,20,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: rgba(31, 30, 30, 0.85);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  border: 1.5px solid rgba(255,255,255,0.13);
  padding: 2.5rem 2.2rem;
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
  animation: ${fadeIn} 0.5s cubic-bezier(0.4,0,0.2,1);
`;

const WipText = styled.h2`
  font-size: 2.2rem;
  color: var(--primary-color, #4f8cff);
  margin-bottom: 0.7rem;
  letter-spacing: 0.03em;
  font-family: var(--font-family-mono), monospace;
  animation: ${fadeIn} 0.7s cubic-bezier(0.4,0,0.2,1) alternate infinite;
`;

const AnimatedBar = styled.div`
  margin: 1.2rem auto 0.5rem auto;
  width: 60px;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--primary-color), #fff, var(--primary-color));
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
  @keyframes shimmer {
    0% { background-position: 0% 0; }
    100% { background-position: 200% 0; }
  }
`;

const CloseBtn = styled.button`
  margin-top: 1.5rem;
  background: var(--primary-color, #4f8cff);
  color: #fff;
  border: none;
  border-radius: 1.2rem;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-family: var(--font-family);
  cursor: pointer;
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.10);
  transition: background 0.2s;
  &:hover {
    background: var(--primary-color-dark, #0044aa);
  }
`;

const WorkInProgressModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <ModalBox>
        <WipText>🚧 Work in Progress 🚧</WipText>
        <AnimatedBar />
        <div style={{color:'#fff', fontSize:'1.1rem', marginTop:'0.7rem'}}>Check back soon for updates!</div>
        <CloseBtn onClick={onClose}>Close</CloseBtn>
      </ModalBox>
    </ModalOverlay>
  );
};

export default WorkInProgressModal;