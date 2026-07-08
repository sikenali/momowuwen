'use client';

import { useEffect, useRef, useCallback } from 'react';

interface MountainLayer {
  points: { x: number; y: number }[];
  color: string;
  speed: number;
}

export function MountainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const scrollRef = useRef<number>(0);

  const generateMountains = useCallback((): MountainLayer[] => {
    const width = 1920;
    const baseY = 0.7;

    const makeLayer = (step: number, offset: number, color: string, speed: number): MountainLayer => {
      const points: { x: number; y: number }[] = [];
      for (let x = 0; x <= width; x += step) {
        points.push({
          x,
          y: (baseY - 0.1 + Math.sin(x * 0.005 + offset) * 0.06 + Math.sin(x * 0.012) * 0.04) * 540,
        });
      }
      return { points, color, speed };
    };

    return [
      makeLayer(60, 0, 'rgba(107, 163, 190, 0.15)', 0.1),
      makeLayer(50, 1, 'rgba(43, 43, 43, 0.1)', 0.2),
      makeLayer(40, 2, 'rgba(194, 59, 34, 0.08)', 0.4),
    ];
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, layers: MountainLayer[], scrollY: number, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);
    layers.forEach((layer) => {
      ctx.beginPath();
      ctx.moveTo(0, h);
      layer.points.forEach((p, i) => {
        const py = p.y + scrollY * layer.speed;
        if (i === 0) ctx.lineTo((p.x / 1920) * w, py);
        else {
          const prev = layer.points[i - 1];
          const ppx = (prev.x / 1920) * w;
          const px = (p.x / 1920) * w;
          ctx.quadraticCurveTo(ppx, prev.y + scrollY * layer.speed, (ppx + px) / 2, (prev.y + py) / 2);
        }
      });
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = layer.color;
      ctx.fill();
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const layers = generateMountains();
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 540;
    };
    setSize();
    const onScroll = () => { scrollRef.current = window.scrollY; };
    const onResize = () => { setSize(); };
    const animate = () => {
      draw(ctx, layers, scrollRef.current, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    animate();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [generateMountains, draw]);

  return <canvas ref={canvasRef} className="absolute bottom-0 left-0 right-0 pointer-events-none" />;
}