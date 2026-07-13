"use client";

import { useEffect, useRef } from "react";

type Particle = {
  baseX: number;
  baseY: number;
  angle: number;
  length: number;
  color: string;
  phase: number;
};

const colors = [
  "rgba(255, 165, 0, 0.52)",
  "rgba(255, 198, 94, 0.42)",
  "rgba(228, 228, 228, 0.28)",
  "rgba(160, 160, 160, 0.24)",
  "rgba(95, 88, 72, 0.26)",
];

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      active: false,
    };
    const ripple = {
      strength: 0,
      targetStrength: 0,
    };

    const createParticles = () => {
      const spacing = width < 760 ? 72 : 86;
      const columns = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const nextParticles: Particle[] = [];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const index = row * columns + column;
          const offset = row % 2 ? spacing * 0.5 : 0;
          const jitterX = Math.sin(index * 12.9898) * 5;
          const jitterY = Math.cos(index * 78.233) * 5;
          nextParticles.push({
            baseX: column * spacing - spacing + offset + jitterX,
            baseY: row * spacing - spacing + jitterY,
            angle: -0.35,
            length: 3.5,
            color: colors[index % colors.length],
            phase: (index % 24) * 0.27,
          });
        }
      }

      particles = nextParticles;
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.active = true;
      ripple.targetStrength = 1;
    };

    const drawParticle = (particle: Particle, time: number) => {
      const dx = particle.baseX - pointer.x;
      const dy = particle.baseY - pointer.y;
      const distance = Math.hypot(dx, dy);
      const radius = 190;
      const falloff = pointer.active ? Math.max(0, 1 - distance / radius) : 0;
      const influence = falloff * falloff * ripple.strength;
      const wave = Math.sin(distance * 0.04 - time * 0.0016 + particle.phase) * influence;
      const pull = influence * (12 + wave * 4);
      const angleToPointer = Math.atan2(dy, dx);
      const orbit = angleToPointer + Math.PI / 2;
      const x = particle.baseX - Math.cos(angleToPointer) * pull + Math.cos(orbit) * wave * 2.5;
      const y = particle.baseY - Math.sin(angleToPointer) * pull + Math.sin(orbit) * wave * 2.5;
      const angle = particle.angle + (angleToPointer - particle.angle) * influence * 0.42 + wave * 0.14;
      const alpha = 0.22 + influence * 0.35;
      const length = particle.length + influence * 2.2;

      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.globalAlpha = alpha;
      context.strokeStyle = particle.color;
      context.lineWidth = 1.45;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(-length / 2, 0);
      context.lineTo(length / 2, 0);
      context.stroke();
      context.restore();
    };

    const animate = (time: number) => {
      context.clearRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;
      ripple.strength += (ripple.targetStrength - ripple.strength) * 0.08;
      ripple.targetStrength *= 0.992;

      particles.forEach((particle) => {
        if (reducedMotion) ripple.strength = 0;
        drawParticle(particle, time);
      });

      frame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-particles" aria-hidden="true" />;
}
