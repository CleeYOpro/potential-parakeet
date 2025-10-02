'use client';
import { useRef, useEffect, useCallback, useMemo, useContext } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ThemeContext } from '../contexts/ThemeContext';
import "./DotGrid.css";

gsap.registerPlugin(InertiaPlugin);

const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

const LedGrid = ({
  dotSize = 32,
  gap = 13,
  proximity = 200,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
}) => {
  const { ledColor, ledPattern } = useContext(ThemeContext);
  const isMobileOrTablet = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 1024;
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['mobile', 'tablet', 'android', 'iphone', 'ipad', 'ipod'];
    const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
    return hasTouchScreen && (isSmallScreen || isMobileUA);
  }, []);
  const isMatrix = ledPattern === 'matrix';
  const isWave = ledPattern === 'wave';
  const effectiveCursorInteractions = (ledPattern === 'cursor') && !isMobileOrTablet;
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });
  const gridInfoRef = useRef({ cols: 0, rows: 0, cell: 0, startX: 0, startY: 0 });
  const streamsRef = useRef([]);
  const lastFrameTimeRef = useRef(0);
  const baseRgb = useMemo(() => hexToRgb("#1a1a1a"), []);
  const activeRgb = useMemo(() => hexToRgb(ledColor || "#5227FF"), [ledColor]);
  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;
    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const extraX = width - gridW;
    const extraY = height - gridH;
    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;
    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
    gridInfoRef.current = { cols, rows, cell, startX, startY };
  }, [dotSize, gap]);

  useEffect(() => {
    if (!isMatrix) return;
    const { cols, rows } = gridInfoRef.current;
    if (!cols || !rows) return;
    streamsRef.current = new Array(cols).fill(0).map(() => ({
      head: Math.random() * rows,
      speed: 5 + Math.random() * 10,
      length: 6 + Math.floor(Math.random() * 10),
    }));
    lastFrameTimeRef.current = performance.now();
  }, [isMatrix, dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;
    let rafId;
    const proxSq = proximity * proximity;
    const draw = (time) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isWave) {
        const { cols, rows, cell, startX, startY } = gridInfoRef.current;
        const centerX = canvas.width / (2 * (window.devicePixelRatio || 1));
        const centerY = canvas.height / (2 * (window.devicePixelRatio || 1));
        const t = time * 0.002;
        const waveLength = 100;
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const cx = startX + x * cell;
            const cy = startY + y * cell;
            const dist = Math.hypot(cx - centerX, cy - centerY);
            const wave = Math.sin((dist / waveLength) - t);
            const brightness = Math.max(0, wave);
            const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * brightness);
            const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * brightness);
            const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * brightness);
            ctx.save();
            ctx.translate(cx, cy);
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fill(circlePath);
            ctx.restore();
          }
        }
        rafId = requestAnimationFrame(draw);
        return;
      }

      if (isMatrix) {
        const { cols, rows, cell, startX, startY } = gridInfoRef.current;
        if (cols && rows) {
          const prev = lastFrameTimeRef.current || time;
          const dt = Math.min(0.05, (time - prev) / 1000);
          lastFrameTimeRef.current = time;
          for (let c = 0; c < streamsRef.current.length; c++) {
            const s = streamsRef.current[c];
            s.head += s.speed * dt;
            if (s.head - s.length > rows + 2) {
              s.head = -Math.random() * rows * 0.3;
              s.speed = 5 + Math.random() * 10;
              s.length = 6 + Math.floor(Math.random() * 10);
            }
          }
          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const cx = startX + x * cell;
              const cy = startY + y * cell;
              const s = streamsRef.current[x];
              let style = "#1a1a1a";
              if (s) {
                const dToHead = s.head - y;
                if (dToHead >= 0 && dToHead <= s.length) {
                  const t = 1 - dToHead / (s.length + 0.0001);
                  const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
                  const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
                  const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
                  style = `rgb(${r},${g},${b})`;
                }
              }
              ctx.save();
              ctx.translate(cx, cy);
              ctx.fillStyle = style;
              ctx.fill(circlePath);
              ctx.restore();
            }
          }
        }
        rafId = requestAnimationFrame(draw);
        return;
        }
        
        // Cursor mode
        const { x: px, y: py } = pointerRef.current;
        for (const dot of dotsRef.current) {
          const ox = dot.cx + dot.xOffset;
          const oy = dot.cy + dot.yOffset;
          const dx = dot.cx - px;
          const dy = dot.cy - py;
          const dsq = dx * dx + dy * dy;
          let style = "#1a1a1a";
          if (effectiveCursorInteractions && dsq <= proxSq) {
            const dist = Math.sqrt(dsq);
            const t = 1 - dist / proximity;
            const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
            const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
            const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
            style = `rgb(${r},${g},${b})`;
          }
          ctx.save();
          ctx.translate(ox, oy);
          ctx.fillStyle = style;
          ctx.fill(circlePath);
          ctx.restore();
        }
        rafId = requestAnimationFrame(draw);
      };
      rafId = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(rafId);
    }, [proximity, activeRgb, baseRgb, circlePath, effectiveCursorInteractions, isMatrix, isWave]);
    
    useEffect(() => {
      buildGrid();
      let ro = null;
      if ("ResizeObserver" in window) {
        ro = new ResizeObserver(buildGrid);
        wrapperRef.current && ro.observe(wrapperRef.current);
      } else {
        window.addEventListener("resize", buildGrid);
      }
      return () => {
        if (ro) ro.disconnect();
        else window.removeEventListener("resize", buildGrid);
      };
    }, [buildGrid]);
    
    useEffect(() => {
      if (!effectiveCursorInteractions) return;
      const onMove = (e) => {
        const now = performance.now();
        const pr = pointerRef.current;
        const dt = pr.lastTime ? now - pr.lastTime : 16;
        const dx = e.clientX - pr.lastX;
        const dy = e.clientY - pr.lastY;
        let vx = (dx / dt) * 1000;
        let vy = (dy / dt) * 1000;
        let speed = Math.hypot(vx, vy);
        if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          vx *= scale;
          vy *= scale;
          speed = maxSpeed;
        }
        pr.lastTime = now;
        pr.lastX = e.clientX;
        pr.lastY = e.clientY;
        pr.vx = vx;
        pr.vy = vy;
        pr.speed = speed;
        const rect = canvasRef.current.getBoundingClientRect();
        pr.x = e.clientX - rect.left;
        pr.y = e.clientY - rect.top;
        
        // Add inertia-based dot movement
        for (const dot of dotsRef.current) {
          const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
          if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
            dot._inertiaApplied = true;
            gsap.killTweensOf(dot);
            const pushX = (dot.cx - pr.x) + (vx * 0.005);
            const pushY = (dot.cy - pr.y) + (vy * 0.005);
            gsap.to(dot, {
              inertia: { xOffset: pushX, yOffset: pushY, resistance },
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: 'elastic.out(1,0.75)',
                  onComplete: () => {
                    dot._inertiaApplied = false;
                  }
                });
              }
            });
          }
        }
      };
      
      const onClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        for (const dot of dotsRef.current) {
          const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
          if (dist < shockRadius && !dot._inertiaApplied) {
            dot._inertiaApplied = true;
            gsap.killTweensOf(dot);
            const falloff = Math.max(0, 1 - dist / shockRadius);
            const pushX = (dot.cx - cx) * shockStrength * falloff;
            const pushY = (dot.cy - cy) * shockStrength * falloff;
            gsap.to(dot, {
              inertia: { xOffset: pushX, yOffset: pushY, resistance },
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: 'elastic.out(1,0.75)',
                  onComplete: () => {
                    dot._inertiaApplied = false;
                  }
                });
              }
            });
          }
        }
      };
      
      const throttledMove = throttle(onMove, 50);
      window.addEventListener("mousemove", throttledMove, { passive: true });
      window.addEventListener("click", onClick);
      return () => {
        window.removeEventListener("mousemove", throttledMove);
        window.removeEventListener("click", onClick);
      };
    }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength, effectiveCursorInteractions]);
    
    return (
      <section
        className={`dot-grid ${className}`}
        style={{
          ...style,
          height: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <div ref={wrapperRef} className="dot-grid__wrap">
          <canvas ref={canvasRef} className="dot-grid__canvas" />
        </div>
      </section>
    );
};

export default LedGrid;