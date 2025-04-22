import React, { useState, useContext } from 'react';
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
  background: ${props => props.isDarkMode ? 'rgba(32, 32, 32, 0.9)' : 'rgba(240, 240, 240, 0.9)'};
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: ${props => props.isDarkMode ? '#fff' : '#333'};
  max-width: 400px;
  width: 90%;
  position: relative;
  border: 1px solid ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${props => props.isDarkMode ? '#0066ff' : '#0044aa'};
  font-family: 'Pixelify Sans', system-ui;
`;

const SettingsGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;

const SettingLabel = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.isDarkMode ? '#fff' : '#333'};
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
  box-shadow: ${props => props.isSelected ? '0 0 0 2px #0066ff' : 'none'};
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
    ? (props.isDarkMode ? '#0066ff' : '#0044aa') 
    : (props.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)')};
  color: ${props => props.isSelected ? '#fff' : (props.isDarkMode ? '#ddd' : '#333')};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.isDarkMode ? '#0055dd' : '#0033aa'};
    color: #fff;
  }
`;

const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #0066ff;
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
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
    ? (props.isDarkMode ? '#0066ff' : '#0044aa') 
    : 'transparent'};
  color: ${props => props.primary 
    ? '#fff' 
    : (props.isDarkMode ? '#0066ff' : '#0044aa')};
  border: ${props => props.primary 
    ? 'none' 
    : (props.isDarkMode ? '1px solid #0066ff' : '1px solid #0044aa')};
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Pixelify Sans', system-ui;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary 
      ? (props.isDarkMode ? '#0052cc' : '#003399') 
      : (props.isDarkMode ? 'rgba(0, 102, 255, 0.1)' : 'rgba(0, 68, 170, 0.1)')};
  }
`;

const SettingsModal = ({ isOpen, onClose }) => {
  // Get theme context
  const { 
    isDarkMode, 
    toggleDarkMode, 
    ledColor, 
    setLedColor, 
    ledPattern, 
    setLedPattern 
  } = useContext(ThemeContext);
  
  // Local state for settings (will be applied on save)
  const [localDarkMode, setLocalDarkMode] = useState(isDarkMode);
  const [localLedColor, setLocalLedColor] = useState(ledColor);
  const [localLedPattern, setLocalLedPattern] = useState(ledPattern);
  
  // Color options
  const colorOptions = [
    { name: 'Blue', value: '#0055ff' },
    { name: 'Green', value: '#00ff66' },
    { name: 'Red', value: '#ff3333' },
    { name: 'Purple', value: '#9900ff' },
    { name: 'Cyan', value: '#00ffff' },
    { name: 'Pink', value: '#ff66ff' }
  ];
  
  // Pattern options
  const patternOptions = [
    { name: 'Random', value: 'random' },
    { name: 'Pulse', value: 'pulse' },
    { name: 'Wave', value: 'wave' },
    { name: 'Sparkle', value: 'sparkle' }
  ];
  
  // Handle save
  const handleSave = () => {
    toggleDarkMode(localDarkMode);
    setLedColor(localLedColor);
    setLedPattern(localLedPattern);
    onClose();
  };
  
  // Handle cancel
  const handleCancel = () => {
    // Reset local state to current settings
    setLocalDarkMode(isDarkMode);
    setLocalLedColor(ledColor);
    setLocalLedPattern(ledPattern);
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleCancel}>
      <ModalContent 
        onClick={e => e.stopPropagation()}
        isDarkMode={localDarkMode}
      >
        <Title isDarkMode={localDarkMode}>⚙️ Settings</Title>
        
        <SettingsGroup>
          <ThemeToggle>
            <SettingLabel isDarkMode={localDarkMode}>Dark Mode</SettingLabel>
            <ToggleSwitch>
              <ToggleInput 
                type="checkbox" 
                checked={localDarkMode}
                onChange={() => setLocalDarkMode(!localDarkMode)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </ThemeToggle>
        </SettingsGroup>
        
        <SettingsGroup>
          <SettingLabel isDarkMode={localDarkMode}>LED Color</SettingLabel>
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
          <SettingLabel isDarkMode={localDarkMode}>LED Pattern</SettingLabel>
          <PatternOptions>
            {patternOptions.map(pattern => (
              <PatternOption 
                key={pattern.value}
                isSelected={localLedPattern === pattern.value}
                isDarkMode={localDarkMode}
                onClick={() => setLocalLedPattern(pattern.value)}
              >
                {pattern.name}
              </PatternOption>
            ))}
          </PatternOptions>
        </SettingsGroup>
        
        <ButtonGroup>
          <Button 
            onClick={handleCancel}
            isDarkMode={localDarkMode}
          >
            Cancel
          </Button>
          <Button 
            primary 
            onClick={handleSave}
            isDarkMode={localDarkMode}
          >
            Save
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingsModal;
