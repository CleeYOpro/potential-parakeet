import {
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
  const randomRef = useRef({ timers: [] });
  const lastMouseCell = useRef({ row: -1, col: -1 });
  const [cursorCenter, setCursorCenter] = useState({ row: -1, col: -1 });

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
          length: Math.floor(Math.random() * 20),
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
        stream.length = Math.floor(Math.random() * 20);
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

  // Cursor effect: solid circle, no fade
  useEffect(() => {
    if (ledPattern !== 'cursor') return;

    const grid = document.querySelector('.led-grid');
    if (!grid) return;

    const handleMouseMove = (e) => {
      const rect = grid.getBoundingClientRect();

      const totalPaddingX = 8 * 2;
      const totalPaddingY = 8 * 2;

      const totalGapX = (gridSize - 1) * 8;
      const totalGapY = (gridSize - 1) * 8;

      const usableWidth = rect.width - totalPaddingX - totalGapX;
      const usableHeight = rect.height - totalPaddingY - totalGapY;

      const cellWidth = usableWidth / gridSize;
      const cellHeight = usableHeight / gridSize;

      const x = e.clientX - rect.left - 8;
      const y = e.clientY - rect.top - 8;

      const col = Math.floor(x / (cellWidth + 8));
      const row = Math.floor(y / (cellHeight + 8));

      const clampedCol = Math.min(Math.max(col, 0), gridSize - 1);
      const clampedRow = Math.min(Math.max(row, 0), gridSize - 1);

      if (
        lastMouseCell.current &&
        lastMouseCell.current.row === clampedRow &&
        lastMouseCell.current.col === clampedCol
      )
        return;

      lastMouseCell.current = { row: clampedRow, col: clampedCol };

      setCursorCenter({ row: clampedRow, col: clampedCol });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gridSize, ledPattern]);

  const radius = 15; // solid circle radius

  const pixelElements = useMemo(() => {
    if (ledPattern === 'cursor') {
      if (cursorCenter.row === -1) {
        return Array(totalPixels)
          .fill(0)
          .map((_, index) => <div key={index} className="led-pixel" />);
      }

      return Array(totalPixels)
        .fill(0)
        .map((_, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;

          const dist = Math.sqrt(
            (row - cursorCenter.row) ** 2 + (col - cursorCenter.col) ** 2
          );

          // Just ON/OFF circle, no opacity fade
          if (dist <= radius) {
            return (
              <div
                key={index}
                className="led-pixel on"
                style={{ backgroundColor: ledColor }}
              />
            );
          } else {
            return <div key={index} className="led-pixel" />;
          }
        });
    }

    return pixels.map((isOn, index) => (
      <div
        key={index}
        className={`led-pixel${isOn ? ' on' : ''}`}
        style={isOn ? { backgroundColor: ledColor } : {}}
      />
    ));
  }, [pixels, ledColor, cursorCenter, ledPattern, totalPixels]);

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
