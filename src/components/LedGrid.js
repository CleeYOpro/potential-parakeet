import {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const CURSOR_FADE_MS = 1200;

const LedGrid = () => {
  const [pixels, setPixels] = useState([]);
  const [opacity, setOpacity] = useState(1);
  const { ledColor, ledPattern } = useContext(ThemeContext);
  const matrixRef = useRef({ drops: [] });
  const randomRef = useRef({ timers: [] });
  const [cursorLeds, setCursorLeds] = useState({});
  const lastMouseCell = useRef({ row: -1, col: -1 });

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
    const matrix = matrixRef.current;

    if (!matrix.drops || matrix.drops.length !== gridSize) {
      matrix.drops = [];
      for (let col = 0; col < gridSize; col++) {
        matrix.drops.push({
          col,
          headY: 0,
          speed: 0.5 + Math.random() * 0.5,
          length: Math.floor(Math.random() * 20) + 9,
        });
      }
    }

    const newPixels = Array(totalPixels).fill(false);

    matrix.drops.forEach((stream) => {
      stream.headY += stream.speed;

      const headRow = Math.floor(stream.headY);
      for (let j = 0; j < stream.length; j++) {
        const row = headRow - j;
        if (row >= 0 && row < gridSize) {
          const index = row * gridSize + stream.col;
          newPixels[index] = true;
        }
      }

      if (stream.headY - stream.length > gridSize) {
        stream.headY = 0;
        stream.length = Math.floor(Math.random() * 20) + 9;
        stream.speed = 0.5 + Math.random() * 0.5;
      }
    });

    setPixels(newPixels);
  }, [gridSize, totalPixels]);

  const updateRandomPattern = useCallback(() => {
    const random = randomRef.current;

    if (!random.timers || random.timers.length !== totalPixels) {
      random.timers = Array(totalPixels).fill(null).map(() => ({
        onTime: Math.random() * 4000 + 3000,
        offTime: Math.random() * 4000 + 3000,
        lastToggle: Date.now(),
        isOn: false,
      }));
    }

    const newPixels = Array(totalPixels).fill(false);
    const currentTime = Date.now();

    random.timers.forEach((timer, index) => {
      const timeSinceLastToggle = currentTime - timer.lastToggle;
      const targetTime = timer.isOn ? timer.onTime : timer.offTime;

      if (timeSinceLastToggle >= targetTime) {
        timer.isOn = !timer.isOn;
        timer.lastToggle = currentTime;
        if (timer.isOn) {
          timer.onTime = Math.random() * 4000 + 3000;
        } else {
          timer.offTime = Math.random() * 4000 + 3000;
        }
      }

      newPixels[index] = timer.isOn;
    });

    setPixels(newPixels);
  }, [totalPixels]);

  const getUpdateFunction = useCallback(() => {
    switch (ledPattern) {
      case 'matrix':
        return updateMatrixPattern;
      case 'random':
        return updateRandomPattern;
      case 'wave':
      default:
        return updateWavePattern;
    }
  }, [ledPattern, updateMatrixPattern, updateWavePattern, updateRandomPattern]);

  useEffect(() => {
    const initialPixels = Array(totalPixels).fill(false);
    setPixels(initialPixels);
    matrixRef.current.drops = [];
    randomRef.current.timers = [];

    const updateFunction = getUpdateFunction();
    updateFunction();

    const interval = setInterval(() => {
      const updateFn = getUpdateFunction();
      updateFn();
    }, ledPattern === 'random' ? 200 : 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, getUpdateFunction, totalPixels, ledPattern]);

  // Cursor effect: trail centered and no flickering
  useEffect(() => {
    if (ledPattern !== 'cursor') return;

    const grid = document.querySelector('.led-grid');
    if (!grid) return;

    const handleMouseMove = (e) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const cellWidth = rect.width / gridSize;
      const cellHeight = rect.height / gridSize;

      const col = Math.floor(x / cellWidth);
      const row = Math.floor(y / cellHeight) - 9;

      if (
        lastMouseCell.current.row === row &&
        lastMouseCell.current.col === col
      )
        return;

      lastMouseCell.current = { row, col };

      const radius = 1;
      const now = Date.now();

      setCursorLeds((prev) => {
        const updated = { ...prev };
        for (let r = row - radius; r <= row + radius; r++) {
          for (let c = col - radius; c <= col + radius; c++) {
            if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
              const index = r * gridSize + c;
              updated[index] = now;
            }
          }
        }
        return updated;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gridSize, ledPattern]);

  // Cleanup old cursor trail pixels over time
  useEffect(() => {
    if (ledPattern !== 'cursor') return;

    let animationFrame;

    const clean = () => {
      const now = Date.now();
      setCursorLeds((prev) => {
        const next = {};
        for (const key in prev) {
          if (now - prev[key] < CURSOR_FADE_MS) {
            next[key] = prev[key];
          }
        }
        return next;
      });
      animationFrame = requestAnimationFrame(clean);
    };

    animationFrame = requestAnimationFrame(clean);
    return () => cancelAnimationFrame(animationFrame);
  }, [ledPattern]);

  const pixelElements = useMemo(() => {
    const now = Date.now();

    if (ledPattern === 'cursor') {
      return Array(totalPixels).fill(0).map((_, index) => {
        const litTime = cursorLeds[index];
        if (!litTime) return <div key={index} className="led-pixel" />;

        const elapsed = now - litTime;
        if (elapsed > CURSOR_FADE_MS) return <div key={index} className="led-pixel" />;

        const intensity = 1 - elapsed / CURSOR_FADE_MS;
        return (
          <div
            key={index}
            className="led-pixel on"
            style={{
              backgroundColor: ledColor,
              opacity: intensity,
            }}
          />
        );
      });
    }

    return pixels.map((isOn, index) => (
      <div
        key={index}
        className={`led-pixel${isOn ? ' on' : ''}`}
        style={isOn ? { backgroundColor: ledColor } : {}}
      />
    ));
  }, [pixels, ledColor, cursorLeds, ledPattern, totalPixels]);

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
