import React, { useEffect, useState, useCallback } from 'react';

const LedGrid = () => {
    const [pixels, setPixels] = useState([]);
    const [opacity, setOpacity] = useState(1);

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
        // Create initial grid (40x40)
        const totalPixels = 1600;
        const initialPixels = Array(totalPixels).fill(false);
        setPixels(initialPixels);

        // Function to randomly turn pixels on/off
        const updatePixels = () => {
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

        // Initial update
        updatePixels();

        // Update pixels every 600ms for a slower effect
        const interval = setInterval(updatePixels, 600);

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

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
                />
            ))}
        </div>
    );
};

export default LedGrid; 