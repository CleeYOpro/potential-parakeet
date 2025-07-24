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
  border-radius: 2.5rem 2.5rem 2.5rem 2.5rem / 2.2rem 2.2rem 2.2rem 2.2rem;
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

const PatternOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const PatternOption = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.isSelected
    ? 'var(--primary-color)'
    : 'rgba(0, 0, 0, 0.3)'};
  color: ${props => props.isSelected ? '#fff' : '#ddd'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-color-dark);
    color: #fff;
  }
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
  border-radius: 2.5rem 2.5rem 2.5rem 2.5rem / 2.2rem 2.2rem 2.2rem 2.2rem;
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

const Disclaimer = styled.div`
  color: #ffcc00;
  background: rgba(40,40,0,0.15);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  font-size: 0.95rem;
  text-align: center;
`;

const SettingsModal = ({ isOpen, onClose }) => {
  // Get theme context
  const {
    ledColor,
    setLedColor,
    ledPattern,
    setLedPattern
  } = useContext(ThemeContext);

  // Local state for settings (will be applied on save)
  const [localLedColor, setLocalLedColor] = useState(ledColor);
  const [localLedPattern, setLocalLedPattern] = useState(ledPattern);

  // Color options
  const colorOptions = [
    { name: 'Blue', value: '#0055ff' },
    { name: 'Green', value: '#00ff66' },
    { name: 'Red', value: '#ff3333' },
    { name: 'Yellow', value: '#ffcc00' },
    { name: 'Cyan', value: '#00ffff' },
    { name: 'Pink', value: '#ff66ff' }
  ];

  // Pattern options
  const patternOptions = [
    { name: 'Wave', value: 'wave' },
    { name: 'Matrix', value: 'matrix' },
    { name: 'Random', value: 'random' },
    { name: 'Cursor', value: 'cursor' }
  ];

  // Handle save
  const handleSave = () => {
    setLedColor(localLedColor);
    setLedPattern(localLedPattern);
    onClose();
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset local state to current settings
    setLocalLedColor(ledColor);
    setLocalLedPattern(ledPattern);
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
          <SettingLabel>LED Pattern</SettingLabel>
          <PatternOptions>
            {patternOptions.map(pattern => (
              <PatternOption
                key={pattern.value}
                isSelected={localLedPattern === pattern.value}
                onClick={() => setLocalLedPattern(pattern.value)}
              >
                {pattern.name}
              </PatternOption>
            ))}
          </PatternOptions>
          {localLedPattern === 'cursor' && (
            <Disclaimer>
              The Cursor pattern is still under development and may not work perfectly yet.
            </Disclaimer>
          )}
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
