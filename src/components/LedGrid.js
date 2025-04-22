import React, { useEffect, useState, useCallback, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const LedGrid = () => {
    const [pixels, setPixels] = useState([]);
    const [opacity, setOpacity] = useState(1);
    const { ledColor, ledPattern } = useContext(ThemeContext);

    // Handle scroll
    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const fadeStart = windowHeight * 0.1;
        const fadeEnd = windowHeight * 0.5;

        if (scrollPosition > fadeStart && scrollPosition < documentHeight - windowHeight) {
            const fadeRange = fadeEnd - fadeStart;
            const newOpacity = 1 - Math.min((scrollPosition - fadeStart) / fadeRange, 0.7);
            setOpacity(newOpacity);
        } else {
            setOpacity(1);
        }
    }, []);

    useEffect(() => {
        // Create initial grid (60x60) - increased from 40x40
        const totalPixels = 3600; // 60x60
        const initialPixels = Array(totalPixels).fill(false);
        setPixels(initialPixels);

        // Function to randomly turn pixels on/off
        const updateRandomPattern = () => {
            setPixels(prev => {
                const newPixels = [...prev];
                // Randomly update about 0.5% of pixels
                for (let i = 0; i < totalPixels * 0.005; i++) {
                    const randomIndex = Math.floor(Math.random() * totalPixels);
                    // Lower chance of turning on (15% on, 85% off) for more sparse effect
                    newPixels[randomIndex] = Math.random() < 0.15;
                }
                return newPixels;
            });
        };

        // Function for pulse pattern
        const updatePulsePattern = () => {
            const pulseRate = Date.now() / 1000; // Time-based pulse
            const pulseIntensity = (Math.sin(pulseRate) + 1) / 2; // Value between 0 and 1
            
            setPixels(prev => {
                const newPixels = [...prev];
                for (let i = 0; i < totalPixels; i++) {
                    // More pixels light up during pulse peak
                    newPixels[i] = Math.random() < (0.05 + pulseIntensity * 0.2);
                }
                return newPixels;
            });
        };

        // Function for wave pattern
        const updateWavePattern = () => {
            const time = Date.now() / 1000;
            const cols = 60; // Grid width
            const rows = 60; // Grid height
            
            setPixels(prev => {
                const newPixels = [...prev];
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const index = row * cols + col;
                        // Create a wave pattern based on position and time
                        const distFromCenter = Math.sqrt(
                            Math.pow((row - rows/2) / rows, 2) + 
                            Math.pow((col - cols/2) / cols, 2)
                        );
                        const wave = Math.sin(distFromCenter * 10 - time * 2);
                        newPixels[index] = wave > 0.7;
                    }
                }
                return newPixels;
            });
        };

        // Function for sparkle pattern
        const updateSparklePattern = () => {
            setPixels(prev => {
                const newPixels = [...prev];
                // Turn off all pixels first
                newPixels.fill(false);
                
                // Turn on a few random pixels for sparkle effect
                for (let i = 0; i < totalPixels * 0.01; i++) {
                    const randomIndex = Math.floor(Math.random() * totalPixels);
                    newPixels[randomIndex] = true;
                }
                return newPixels;
            });
        };

        // Select update function based on pattern
        const getUpdateFunction = () => {
            switch (ledPattern) {
                case 'pulse':
                    return updatePulsePattern;
                case 'wave':
                    return updateWavePattern;
                case 'sparkle':
                    return updateSparklePattern;
                case 'random':
                default:
                    return updateRandomPattern;
            }
        };

        // Initial update
        const updateFunction = getUpdateFunction();
        updateFunction();

        // Update pixels every 50ms for a slower effect
        const interval = setInterval(() => getUpdateFunction()(), 50);

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, ledPattern]);

    return (
        <div
            className="led-grid"
            style={{
                opacity,
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
        >
            {pixels.map((isOn, index) => (
                <div
                    key={index}
                    className={`led-pixel ${isOn ? 'on' : ''}`}
                    style={isOn ? { backgroundColor: ledColor } : {}}
                />
            ))}
        </div>
    );
};

export default LedGrid;