import { useEffect, useRef, useState } from 'react';
import { SCENES } from './demo-data.js';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

export default function Atmosphere({ scene, paused, reduced }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    let context;
    try { context = canvas.getContext('2d'); } catch { return; }
    if (!context) return; // CSS sky remains a complete fallback.
    let width = 0;
    let height = 0;
    let particles = [];
    let frame = null;
    let last = null;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: width < 640 ? 28 : 75 }, (_, i) => ({
        x: ((i * 137 + 53) % 997) / 997 * width,
        y: ((i * 193 + 17) % 991) / 991 * height,
        size: 1 + i % 3,
      }));
      draw(0);
    };
    const draw = delta => {
      context.clearRect(0, 0, width, height);
      const rain = scene === 'rain' || scene === 'storm';
      if (!rain && scene !== 'snow' && scene !== 'night') return;
      context.fillStyle = scene === 'night' ? 'rgba(248,249,236,.75)' : 'rgba(255,255,255,.7)';
      context.strokeStyle = 'rgba(230,243,255,.45)';
      context.lineWidth = 1;
      particles.forEach((particle, i) => {
        if (scene !== 'night') {
          particle.y = (particle.y + delta * (rain ? 0.32 : 0.027) * particle.size) % (height + 20);
          particle.x = (particle.x + delta * (rain ? -0.04 : 0.009) + width) % width;
        }
        context.beginPath();
        if (rain) {
          context.moveTo(particle.x, particle.y);
          context.lineTo(particle.x - 4, particle.y + 12);
          context.stroke();
        } else {
          context.arc(particle.x, particle.y, scene === 'night' ? 0.7 + i % 2 : particle.size, 0, Math.PI * 2);
          context.fill();
        }
      });
    };
    const tick = time => {
      draw(last === null ? 0 : Math.min(time - last, 40));
      last = time;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      last = null;
    };
    const sync = () => {
      stop();
      if (!paused && !reduced && !document.hidden) frame = requestAnimationFrame(tick);
      else draw(0);
    };
    resize();
    sync();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', sync);
    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [scene, paused, reduced]);

  return <div className={`atmosphere ${reduced ? 'motion-reduced' : ''}`} aria-hidden="true">
    {SCENES.map(name => <div key={name} className={`sky sky-${name} ${scene === name ? 'is-visible' : ''}`} />)}
    <div className="cloud cloud-one" /><div className="cloud cloud-two" />
    <canvas ref={canvasRef} />
  </div>;
}
