'use client';

import { useEffect, useRef, useState } from 'react';

function FloatingAssistantIcon() {
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    let lastTime = 0;
    const speed = 0.00018; // ~55s per full cycle

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      if (!isHovered) {
        tRef.current += dt * speed;
        const t = tRef.current;

        const cloud1 = document.querySelector('.cloud');
        const cloud2 = document.querySelector('.cloud-2');
        if (!cloud1 || !cloud2) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }

        const c1Rect = cloud1.getBoundingClientRect();
        const c2Rect = cloud2.getBoundingClientRect();

        // Icon radius for positioning
        const iconRadius = 18;

        // Cloud positions: top center of each cloud
        const c1Left = c1Rect.left + iconRadius;
        const c1Right = c1Rect.right - iconRadius;
        const c1Top = c1Rect.top - iconRadius;

        const c2Left = c2Rect.left + iconRadius;
        const c2Right = c2Rect.right - iconRadius;
        const c2Top = c2Rect.top - iconRadius;

        // Cycle: cloud1(left→right) → cloud2(left→right) → cloud1 again
        const cycleDuration = 2; // 0-1: cloud1, 1-2: cloud2
        const normalizedT = t % cycleDuration;

        // Smooth easing with sine
        const eased = (Math.sin(normalizedT * Math.PI - Math.PI / 2) + 1) / 2;

        if (normalizedT < 1) {
          // Phase 1: cloud1 left → right
          setPos({
            x: c1Left + (c1Right - c1Left) * eased,
            y: c1Top,
          });
        } else {
          // Phase 2: cloud2 left → right
          setPos({
            x: c2Left + (c2Right - c2Left) * eased,
            y: c2Top,
          });
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered]);

  return (
    <a
      href="http://assistant.10012049.xyz/"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-assistant-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
    >
      <i className="ri-target-line floating-assistant-icon__inner"></i>
    </a>
  );
}

export default FloatingAssistantIcon;
