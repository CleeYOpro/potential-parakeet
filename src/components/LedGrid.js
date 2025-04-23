import React, { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const LedGrid = () => {
    const [pixels, setPixels] = useState([]);
    const [opacity, setOpacity] = useState(1);
    const { ledColor, ledPattern } = useContext(ThemeContext);
    
    // Reduce grid size for better performance
    const gridSize = 50; // Reduced from 60
    const totalPixels = useMemo(() => gridSize * gridSize, [gridSize]);

    // Handle scroll with throttling
    const handleScroll = useCallback(() => {
        // Skip calculations if we've scrolled in the last 20ms (throttling)
        if (handleScroll.timeout) return;
        
        handleScroll.timeout = setTimeout(() => {
            handleScroll.timeout = null;
        }, 20);
        
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

    // Function to randomly turn pixels on/off
    const updateRandomPattern = useCallback(() => {
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
    }, [totalPixels]);

    // Function for pulse pattern
    const updatePulsePattern = useCallback(() => {
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
    }, [totalPixels]);

    // Function for wave pattern
    const updateWavePattern = useCallback(() => {
        const time = Date.now() / 1000;
        const cols = 60;
        const rows = 60;
    
        setPixels(prev => {
            const newPixels = [...prev];
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const index = row * cols + col;
                    const distFromCenter = Math.sqrt(
                        Math.pow((row - rows / 2) / rows, 2) + 
                        Math.pow((col - cols / 2) / cols, 2)
                    );
                    const wave = Math.sin(distFromCenter * 10 - time * 2);
                    newPixels[index] = wave > 0.7;
                }
            }
            return newPixels;
        });
    }, []);

    // Function for sparkle pattern
    const updateSparklePattern = useCallback(() => {
    const newPixels = Array(totalPixels).fill(false);
    for (let i = 0; i < totalPixels * 0.01; i++) {
        const randomIndex = Math.floor(Math.random() * totalPixels);
        newPixels[randomIndex] = true;
    }
    setPixels(newPixels);
}, [totalPixels]);


    // Select update function based on pattern
    const getUpdateFunction = useCallback(() => {
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
    }, [ledPattern, updatePulsePattern, updateRandomPattern, updateSparklePattern, updateWavePattern]);

    useEffect(() => {
        // Create initial grid
        const initialPixels = Array(totalPixels).fill(false);
        setPixels(initialPixels);

        // Initial update
        const updateFunction = getUpdateFunction();
        updateFunction();

        // Update pixels every 100ms instead of 50ms for better performance
        const interval = setInterval(() => getUpdateFunction()(), 100);

        // Add scroll listener with passive option for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, getUpdateFunction, totalPixels]);

    // Memoize the pixel elements to prevent unnecessary re-renders
    const pixelElements = useMemo(() => {
        return pixels.map((isOn, index) => (
            <div
                key={index}
                className={`led-pixel ${isOn ? 'on' : ''}`}
                style={isOn ? { backgroundColor: ledColor } : {}}
            />
        ));
    }, [pixels, ledColor]);

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
            {pixelElements}
        </div>
    );
};

export default LedGrid;