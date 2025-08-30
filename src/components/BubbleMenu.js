import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const DEFAULT_ITEMS = [
  { label: "home", href: "#", rotation: -10, hoverStyles: { bgColor: "#3b82f6", textColor: "#fff" } },
  { label: "about", href: "#", rotation: 8, hoverStyles: { bgColor: "#10b981", textColor: "#fff" } },
  { label: "projects", href: "#", rotation: 12, hoverStyles: { bgColor: "#f59e0b", textColor: "#fff" } },
  { label: "blog", href: "#", rotation: -8, hoverStyles: { bgColor: "#ef4444", textColor: "#fff" } },
  { label: "contact", href: "#", rotation: 6, hoverStyles: { bgColor: "#8b5cf6", textColor: "#fff" } },
];

export default function BubbleMenu({ items, animationEase = "back.out(1.5)", animationDuration = 0.6, staggerDelay = 0.12 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const pillsRef = useRef([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  const toggleMenu = () => {
    const nextState = !isOpen;
    if (nextState) setShowOverlay(true);
    setIsOpen(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const pills = pillsRef.current.filter(Boolean);
    if (!overlay || !pills.length) return;

    if (isOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.set(pills, { y: -200, autoAlpha: 0, scale: 0 });
      pills.forEach((pill, i) => {
        gsap.to(pill, {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
          delay: i * staggerDelay,
        });
      });
    } else if (showOverlay) {
      gsap.to(pills, {
        y: -200,
        autoAlpha: 0,
        scale: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }
  }, [isOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  return (
    <>
      <style>{`
        .bubble-menu-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(12px);
          background: rgba(0,0,0,0.35);
          z-index: 999;
          pointer-events: auto;
        }
        .bubble-pill-list {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0 2rem;
          flex-wrap: nowrap;
        }
        .bubble-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 250px;
          min-height: 120px;
          font-size: clamp(2rem, 4vw, 4rem);
          border-radius: 9999px;
          background: #fff;
          color: #111;
          text-decoration: none;
          font-weight: 600;
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
          transform: rotate(var(--item-rot));
          transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
        }
        .bubble-pill:hover {
          transform: rotate(var(--item-rot)) scale(1.05);
          background: var(--hover-bg);
          color: var(--hover-color);
        }
        .bubble-pill:active {
          transform: rotate(var(--item-rot)) scale(0.95);
        }
        .menu-toggle-btn {
          position: fixed;
          top: 2rem;
          right: 2rem;
          padding: 0.75rem 1.5rem;
          border: none;
          background: #111;
          color: #fff;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          z-index: 1000;
        }
      `}</style>

      <button className="menu-toggle-btn" onClick={toggleMenu}>
        {isOpen ? "Close" : "Menu"}
      </button>

      {showOverlay && (
        <div ref={overlayRef} className="bubble-menu-overlay">
          <ul className="bubble-pill-list">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="bubble-pill"
                  style={{
                    "--item-rot": `${item.rotation ?? 0}deg`,
                    "--hover-bg": item.hoverStyles?.bgColor,
                    "--hover-color": item.hoverStyles?.textColor,
                  }}
                  ref={(el) => {
                    if (el) pillsRef.current[idx] = el;
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
