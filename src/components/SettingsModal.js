
'use client';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';

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
  background: rgba(31, 30, 30, 0.8);
  opacity: 1;
  backdrop-filter: blur(400px) saturate(1.8);
  -webkit-backdrop-filter: blur(400px) saturate(1.8);
  border-radius: 2.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  border: 1.5px solid rgba(255,255,255,0.13);
  padding: 2rem;
  text-align: center;
  color: #fff;
  max-width: 400px;
  width: 90%;
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  font-family: 'Pixelify Sans', system-ui;
`;

const SettingsGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;

const SettingLabel = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const ColorOption = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${props => props.isSelected ? '#fff' : 'transparent'};
  background-color: ${props => props.color};
  cursor: pointer;
  box-shadow: ${props => props.isSelected ? '0 0 0 2px var(--primary-color)' : 'none'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const OptionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  background: ${props => props.primary
    ? 'var(--primary-color)'
    : 'rgba(31, 30, 30, 0.8)'};
  color: ${props => props.primary
    ? '#fff'
    : 'var(--primary-color)'};
  border: ${props => props.primary
    ? 'none'
    : '1.5px solid var(--primary-color)'};
  padding: 0.5rem 1.5rem;
  border-radius: 2.5rem;
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.10);
  font-family: var(--font-family);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 0.2rem;
  &:hover {
    background: ${props => props.primary
    ? 'var(--primary-color-dark)'
    : 'rgba(0, 102, 255, 0.13)'};
    color: #fff;
  }
`;

const SettingsModal = ({ isOpen, onClose }) => {
  const {
    ledColor,
    setLedColor,
    ledPattern,
    setLedPattern,
  } = useContext(ThemeContext);

  const [localLedColor, setLocalLedColor] = useState(ledColor);
  const [localLedPattern, setLocalLedPattern] = useState(ledPattern || 'wave');

  const colorOptions = [
    { name: 'Kiro AI Purple', value: '#8D45FF' },
    { name: 'Matrix Green', value: '#00FF41' },
    { name: 'Ocean Blue', value: '#00CFFF' },
  ];

  const handleSave = () => {
    setLedColor(localLedColor);
    setLedPattern(localLedPattern);
    onClose();
  };

  const handleCancel = () => {
    setLocalLedColor(ledColor);
    setLocalLedPattern(ledPattern || 'wave');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleCancel}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>⚙️ Settings</Title>

        <SettingsGroup>
          <SettingLabel>LED Color</SettingLabel>
          <ColorOptions>
            {colorOptions.map(color => (
              <ColorOption
                key={color.value}
                color={color.value}
                isSelected={localLedColor === color.value}
                onClick={() => setLocalLedColor(color.value)}
                title={color.name}
              />
            ))}
          </ColorOptions>
        </SettingsGroup>

        <SettingsGroup>
          <SettingLabel>LED Animation</SettingLabel>
          <OptionRow>
            <Button
              primary={localLedPattern === 'cursor'}
              onClick={() => setLocalLedPattern('cursor')}
            >
              Cursor (desktop only)
            </Button>
            <Button
              primary={localLedPattern === 'matrix'}
              onClick={() => setLocalLedPattern('matrix')}
            >
              Matrix
            </Button>
            <Button
              primary={localLedPattern === 'wave'}
              onClick={() => setLocalLedPattern('wave')}
            >
              Wave
            </Button>
            <Button
              primary={localLedPattern === 'none'}
              onClick={() => setLocalLedPattern('none')}
            >
              No Animation
            </Button>
          </OptionRow>
        </SettingsGroup>

        <ButtonGroup>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button primary onClick={handleSave}>
            Save
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingsModal;