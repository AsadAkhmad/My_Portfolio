"use client";

import { useEffect, useRef } from "react";

const CHARS = "SELECT FROM WHERE JOIN GROUP ORDER LIMIT 01 {} () => null true false 0x9F 0xA3".split("");

export function CodeRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fontSize = 15;
    let columns = 0;
    let drops: number[] = [];
    let animationFrame: number;
    let running = true;

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      columns = Math.floor(canvas!.width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    }

    function drawStaticFrame() {
      ctx!.fillStyle = "#050709";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.font = `${fontSize}px var(--font-jetbrains-mono, monospace)`;
      ctx!.fillStyle = "rgba(52, 211, 153, 0.12)";
      for (let x = 0; x < columns; x++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)][0];
        ctx!.fillText(char, x * fontSize, ((x * 37) % 20) * fontSize);
      }
    }

    function draw() {
      ctx!.fillStyle = "rgba(5, 7, 9, 0.08)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.font = `${fontSize}px var(--font-jetbrains-mono, monospace)`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)][0];
        const isHead = Math.random() > 0.985;
        ctx!.fillStyle = isHead ? "rgba(186, 247, 205, 0.85)" : "rgba(52, 211, 153, 0.35)";
        ctx!.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    function loop() {
      if (!running) return;
      draw();
      animationFrame = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      drawStaticFrame();
    } else {
      loop();
    }

    function handleVisibility() {
      running = document.visibilityState === "visible" && !prefersReducedMotion;
      if (running) loop();
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-60"
    />
  );
}
