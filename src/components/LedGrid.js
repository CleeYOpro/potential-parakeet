import React, {
    useEffect,
    useState,
    useCallback,
    useContext,
    useMemo,
    useRef,
  } from 'react';
  import { ThemeContext } from '../contexts/ThemeContext';
  
  const LedGrid = () => {
    const [pixels, setPixels] = useState([]);
    const [opacity, setOpacity] = useState(1);
    const { ledColor, ledPattern } = useContext(ThemeContext);
    const matrixRef = useRef({ drops: [] });
  
    const gridSize = 50;
    const totalPixels = useMemo(() => gridSize * gridSize, [gridSize]);
  
    const handleScroll = useCallback(() => {
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
  
    const updateWavePattern = useCallback(() => {
      const time = Date.now() / 1000;
      const cols = gridSize;
      const rows = gridSize;
  
      setPixels((prev) => {
        const newPixels = [...prev];
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const index = row * cols + col;
            const distFromCenter = Math.sqrt(
              Math.pow((row - rows / 2) / rows, 2) + Math.pow((col - cols / 2) / cols, 2)
            );
            const wave = Math.sin(distFromCenter * 10 - time * 2);
            newPixels[index] = wave > 0.7;
          }
        }
        return newPixels;
      });
    }, [gridSize]);
  
    const updateMatrixPattern = useCallback(() => {
      const columns = gridSize;
      const rows = gridSize;
      const matrix = matrixRef.current;
  
      // drop if not exist
      if (!matrix.drops || matrix.drops.length !== columns) {
        matrix.drops = [];
        for (let col = 0; col < columns; col++) {
          matrix.drops.push({
            col,
            headY: 0,
            speed: 0.5 + Math.random() * 0.5, //change speed later???
            length: Math.floor(Math.random() * 20) + 9, //10-30
          });
        }
      }
  
      const newPixels = Array(totalPixels).fill(false);
  
      matrix.drops.forEach((stream) => {
        stream.headY += stream.speed;
  
        const headRow = Math.floor(stream.headY);
        for (let j = 0; j < stream.length; j++) {
          const row = headRow - j;
          if (row >= 0 && row < rows) {
            const index = row * columns + stream.col;
            newPixels[index] = true;
          }
        }
  
        if (stream.headY - stream.length > rows) {
          stream.headY = 0;
          stream.length = Math.floor(Math.random() * 20) + 9;
          stream.speed = 0.5 + Math.random() * 0.5;
        }
      });
  
      setPixels(newPixels);
    }, [gridSize, totalPixels]);
    
  const updateIndiaPattern = useCallback(() => {
    const columns = gridSize;
    const rows = gridSize;
    
    // Create a new array for the pixels
    const newPixels = Array(totalPixels).fill(false);
    
    // Define the outline of India as coordinates in the grid
    // These are approximate coordinates to create India's shape
    const indiaCoordinates = [
      // Northern region (Kashmir, Himachal, etc.)
      [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5],
      [14, 6], [15, 6], [16, 6], [17, 6], [18, 6], [19, 6], [20, 6], [21, 6], [22, 6], [23, 6],
      [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7], [20, 7], [21, 7], [22, 7], [23, 7], [24, 7],
      [13, 8], [14, 8], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8], [20, 8], [21, 8], [22, 8], [23, 8], [24, 8], [25, 8],
      
      // Northeast region
      [25, 9], [26, 9], [27, 9], [28, 9], [29, 9], [30, 9],
      [25, 10], [26, 10], [27, 10], [28, 10], [29, 10], [30, 10], [31, 10],
      [26, 11], [27, 11], [28, 11], [29, 11], [30, 11], [31, 11], [32, 11],
      [27, 12], [28, 12], [29, 12], [30, 12], [31, 12], [32, 12],
      [28, 13], [29, 13], [30, 13], [31, 13], [32, 13],
      [29, 14], [30, 14], [31, 14], [32, 14],
      
      // Eastern region
      [30, 15], [31, 15],
      [29, 16], [30, 16], [31, 16],
      [28, 17], [29, 17], [30, 17],
      [27, 18], [28, 18], [29, 18],
      [26, 19], [27, 19], [28, 19],
      [25, 20], [26, 20], [27, 20],
      [24, 21], [25, 21], [26, 21],
      [23, 22], [24, 22], [25, 22],
      
      // Southern region
      [22, 23], [23, 23], [24, 23],
      [21, 24], [22, 24], [23, 24],
      [20, 25], [21, 25], [22, 25],
      [19, 26], [20, 26], [21, 26],
      [18, 27], [19, 27], [20, 27],
      [17, 28], [18, 28], [19, 28],
      [16, 29], [17, 29], [18, 29],
      [15, 30], [16, 30], [17, 30],
      [14, 31], [15, 31], [16, 31],
      [13, 32], [14, 32], [15, 32],
      
      // Western region
      [12, 31], [13, 31],
      [11, 30], [12, 30],
      [10, 29], [11, 29],
      [10, 28], [11, 28],
      [9, 27], [10, 27],
      [9, 26], [10, 26],
      [8, 25], [9, 25],
      [8, 24], [9, 24],
      [7, 23], [8, 23],
      [7, 22], [8, 22],
      [7, 21], [8, 21],
      [7, 20], [8, 20],
      [8, 19], [9, 19],
      [8, 18], [9, 18],
      [9, 17], [10, 17],
      [9, 16], [10, 16],
      [10, 15], [11, 15],
      [10, 14], [11, 14],
      [11, 13], [12, 13],
      [11, 12], [12, 12],
      [12, 11], [13, 11],
      [12, 10], [13, 10],
      [13, 9], [14, 9],
    ];
    
    // Fill in the India shape
    indiaCoordinates.forEach(([col, row]) => {
      if (row >= 0 && row < rows && col >= 0 && col < columns) {
        const index = row * columns + col;
        newPixels[index] = true;
      }
    });
    
    // Add some random twinkling effect inside India
    for (let i = 0; i < 20; i++) {
      // Pick a random coordinate within India's shape
      const randomCoord = indiaCoordinates[Math.floor(Math.random() * indiaCoordinates.length)];
      const [baseCol, baseRow] = randomCoord;
      
      // Add a small cluster of lit LEDs around this point
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          const row = baseRow + r;
          const col = baseCol + c;
          if (row >= 0 && row < rows && col >= 0 && col < columns) {
            const index = row * columns + col;
            if (Math.random() < 0.7) { // 70% chance to light up
              newPixels[index] = true;
            }
          }
        }
      }
    }
    
    setPixels(newPixels);
  }, [gridSize, totalPixels]);
  
    const getUpdateFunction = useCallback(() => {
      switch (ledPattern) {
        case 'matrix':
          return updateMatrixPattern;
        case 'india':
          return updateIndiaPattern;
        case 'wave':
        default:
          return updateWavePattern;
      }
    }, [ledPattern, updateMatrixPattern, updateWavePattern, updateIndiaPattern]);
  
    useEffect(() => {
      const initialPixels = Array(totalPixels).fill(false);
      setPixels(initialPixels);
      matrixRef.current.drops = []; //reset drops
  
      const updateFunction = getUpdateFunction();
      updateFunction();
  
      const interval = setInterval(() => {
        const updateFn = getUpdateFunction();
        updateFn();
      }, 100);
  
      window.addEventListener('scroll', handleScroll, { passive: true });
  
      return () => {
        clearInterval(interval);
        window.removeEventListener('scroll', handleScroll);
      };
    }, [handleScroll, getUpdateFunction, totalPixels]);
  
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
          bottom: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {pixelElements}
      </div>
    );
  };
  
  export default LedGrid;
  