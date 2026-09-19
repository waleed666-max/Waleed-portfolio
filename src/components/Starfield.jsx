import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, stars, band, shootingStars = [];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function buildBand() {
  band = [];
  const bandCount = Math.min(Math.floor((w * h) / 12000), 130);
      for (let i = 0; i < bandCount; i++) {
        const t = Math.random();
        const alongX = t * w * 1.4 - w * 0.2;
        const spread = (Math.random() - 0.5) * 260;
        const alongY = alongX * 0.55 + h * 0.15 + spread;
        band.push({
          x: alongX,
          y: alongY,
          r: Math.random() * 60 + 20,
          o: Math.random() * 0.035 + 0.01
        });
      }
    }

function buildStars() {
  const count = Math.min(Math.floor((w * h) / 1400), 650);
  stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.3 + 0.25,
          baseAlpha: Math.random() * 0.6 + 0.25,
          twinkleSpeed: Math.random() * 0.015 + 0.003,
          phase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.12,
          driftY: (Math.random() - 0.5) * 0.12
        });
      }
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      buildBand();
      buildStars();
    }

    function maybeSpawnShootingStar() {
  if (!prefersReducedMotion && Math.random() < 0.0035 && shootingStars.length < 2) {
    const speed = Math.random() * 9 + 10;
    const angle = Math.random() * Math.PI * 2; // koi bhi direction, 0-360 degree
    const margin = 60;
    let startX, startY;

    // Screen ke bahar kisi bhi ek side se shuru karo (upar/neeche/left/right)
    const side = Math.floor(Math.random() * 4);
    if (side === 0) { startX = Math.random() * w; startY = -margin; }
    else if (side === 1) { startX = w + margin; startY = Math.random() * h; }
    else if (side === 2) { startX = Math.random() * w; startY = h + margin; }
    else { startX = -margin; startY = Math.random() * h; }

    // Target: screen ke andar kisi random point ki taraf
    const targetX = Math.random() * w;
    const targetY = Math.random() * h;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    shootingStars.push({
      x: startX,
      y: startY,
      vx: (dx / dist) * speed,
      vy: (dy / dist) * speed,
      life: 1,
      trail: []
    });
  }
}

   let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
let mouseMoveScheduled = false;
function handleMouseMove(e) {
  if (mouseMoveScheduled) return;
  mouseMoveScheduled = true;
  requestAnimationFrame(() => {
    targetX = (e.clientX / w - 0.5) * 14;
    targetY = (e.clientY / h - 0.5) * 14;
    mouseMoveScheduled = false;
  });
}
window.addEventListener("mousemove", handleMouseMove);

    let raf;
    function draw() {
      ctx.clearRect(0, 0, w, h);

      mouseX += (targetX - mouseX) * 0.02;
      mouseY += (targetY - mouseY) * 0.02;

      ctx.save();
      ctx.translate(mouseX * 0.3, mouseY * 0.3);
      band.forEach((b) => {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(150,130,240,${b.o})`);
        g.addColorStop(1, "rgba(150,130,240,0)");
        ctx.fillStyle = g;
        ctx.fillRect(b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
      });
      ctx.restore();

      ctx.save();
      ctx.translate(mouseX, mouseY);
      stars.forEach((s) => {
        if (!prefersReducedMotion) {
          s.phase += s.twinkleSpeed;
          s.x += s.driftX;
          s.y += s.driftY;
          if (s.x < -5) s.x = w + 5;
          if (s.x > w + 5) s.x = -5;
          if (s.y < -5) s.y = h + 5;
          if (s.y > h + 5) s.y = -5;
        }
        const alpha = s.baseAlpha + Math.sin(s.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(238,241,251,${Math.max(0, alpha)})`;
        ctx.fill();
      });
      ctx.restore();

      maybeSpawnShootingStar();
      shootingStars = shootingStars.filter((s) => s.life > 0);
      shootingStars.forEach((s) => {
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 14) s.trail.shift();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;

        ctx.save();
        for (let i = 0; i < s.trail.length; i++) {
          const p = s.trail[i];
          const t = i / s.trail.length;
          ctx.beginPath();
          ctx.arc(p.x, p.y, t * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(238,241,251,${t * s.life * 0.9})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.life})`;
        ctx.shadowColor = "rgba(139,124,246,0.9)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="stars-canvas" />;
}
