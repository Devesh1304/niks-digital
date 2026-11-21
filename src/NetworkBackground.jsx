import { useEffect, useRef } from 'react';

/*
 * Animated 3D network ("plexus") background for the hero section.
 * Canvas drawing only: no images, no extra libraries.
 * Pauses when off-screen or the tab is hidden, and respects reduced motion.
 */
const CONFIG = {
  density: 0.00024,
  minNodes: 120,
  maxNodes: 280,
  linkDist: 0.5,
  speed: 0.00012,
  waveAmp: 0.09,
  bokehCount: 34,
  colors: {
    node: [34, 211, 238],
    nodeHot: [210, 245, 255],
    link: [56, 150, 255],
    bokeh: [[34, 211, 238], [59, 130, 246], [125, 211, 252]],
  },
};

// fixed: one layer that covers the whole viewport behind every page.
// Without it, the animation fills its parent section only.
export default function NetworkBackground({ fixed = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const host = canvas.parentElement;
    const pointerTarget = fixed ? window : host;
    const boxOf = () => (fixed
      ? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
      : host.getBoundingClientRect());

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, DPR = 1, nodes = [], bokeh = [], running = true, visible = true, frameId = 0;
    let mouseX = 0, mouseY = 0, camX = 0, camY = 0;
    const rand = (a, b) => a + Math.random() * (b - a);

    // Pre-rendered glow sprite, drawn for every node
    const sprite = document.createElement('canvas');
    (function buildSprite() {
      const s = 64;
      sprite.width = sprite.height = s;
      const g = sprite.getContext('2d');
      const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      const [r, gg, b] = CONFIG.colors.node;
      grd.addColorStop(0, 'rgba(255,255,255,1)');
      grd.addColorStop(0.12, `rgba(${CONFIG.colors.nodeHot.join(',')},0.95)`);
      grd.addColorStop(0.3, `rgba(${r},${gg},${b},0.55)`);
      grd.addColorStop(1, `rgba(${r},${gg},${b},0)`);
      g.fillStyle = grd;
      g.fillRect(0, 0, s, s);
    })();

    function init() {
      const count = Math.max(CONFIG.minNodes, Math.min(CONFIG.maxNodes, Math.round(W * H * CONFIG.density)));
      nodes = Array.from({ length: count }, () => ({
        x: rand(-1.6, 1.6) * Math.max(1, (W / H) * 0.8),
        y: rand(-0.16, 0.16),
        z: rand(0.35, 3.2),
        vx: rand(-1, 1),
        vz: rand(-1, 1),
        phase: rand(0, Math.PI * 2),
        twinkle: rand(0.6, 1.4),
      }));
      bokeh = Array.from({ length: CONFIG.bokehCount }, () => {
        const front = Math.random() < 0.35;
        return {
          x: rand(0, 1),
          y: front ? rand(0.55, 1.05) : rand(0.0, 0.5),
          r: front ? rand(18, 46) : rand(6, 22),
          a: front ? rand(0.12, 0.28) : rand(0.15, 0.4),
          c: CONFIG.colors.bokeh[(Math.random() * 3) | 0],
          drift: rand(-0.00002, 0.00002),
          depth: front ? 1.6 : 0.4,
          phase: rand(0, Math.PI * 2),
        };
      });
    }

    function resize() {
      const rect = boxOf();
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      init();
    }

    // Camera looks slightly down onto a plane of nodes
    const TILT = 0.38;
    const COS_T = Math.cos(TILT);
    const SIN_T = Math.sin(TILT);
    function project(n, t) {
      const wave =
        Math.sin(n.x * 2.2 + t * 0.0006 + n.phase * 0.3) * CONFIG.waveAmp +
        Math.cos(n.z * 1.7 + t * 0.0004) * CONFIG.waveAmp * 0.6;
      const x = n.x + camX * 0.25;
      const y0 = n.y + wave + 0.1 + camY * 0.08;
      const z0 = n.z;
      const y = y0 * COS_T - z0 * SIN_T * 0.18;
      const z = z0 * COS_T + y0 * SIN_T + 0.25;
      const f = Math.max(Math.min(W, H * 1.6) * 0.62, H * 0.42);
      return { sx: W / 2 + (x * f) / z, sy: H * 0.5 + (y * f) / z + H * 0.04, z, wx: x, wy: y0, wz: z0 };
    }

    function drawBokeh(t, layerFront) {
      for (const b of bokeh) {
        if ((b.depth > 1) !== layerFront) continue;
        const px = (((b.x + b.drift * t + camX * 0.02 * b.depth) % 1.1) + 1.1) % 1.1 - 0.05;
        const py = b.y + Math.sin(t * 0.0003 + b.phase) * 0.01 + camY * 0.01 * b.depth;
        const x = px * W;
        const y = py * H;
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        const [r, gg, bb] = b.c;
        const a = b.a * (0.75 + 0.25 * Math.sin(t * 0.001 + b.phase));
        g.addColorStop(0, `rgba(${r},${gg},${bb},${a})`);
        g.addColorStop(0.7, `rgba(${r},${gg},${bb},${a * 0.6})`);
        g.addColorStop(1, `rgba(${r},${gg},${bb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(t) {
      if (!running) return;
      camX += (mouseX - camX) * 0.04;
      camY += (mouseY - camY) * 0.04;

      ctx.clearRect(0, 0, W, H);
      drawBokeh(t, false);

      if (!reduceMotion) {
        for (const n of nodes) {
          n.x += n.vx * CONFIG.speed * 16;
          n.z += n.vz * CONFIG.speed * 10;
          const XR = 1.7 * Math.max(1, (W / H) * 0.8);
          if (n.x < -XR) n.x = XR;
          else if (n.x > XR) n.x = -XR;
          if (n.z < 0.3) n.z = 3.2;
          else if (n.z > 3.3) n.z = 0.35;
        }
      }

      const P = nodes.map((n) => project(n, t));

      // Links between nearby nodes
      const LD = CONFIG.linkDist;
      const LD2 = LD * LD;
      const [lr, lg, lb] = CONFIG.colors.link;
      ctx.lineCap = 'round';
      for (let i = 0; i < P.length; i++) {
        const a = P[i];
        for (let j = i + 1; j < P.length; j++) {
          const b = P[j];
          const dx = a.wx - b.wx;
          const dy = a.wy - b.wy;
          const dz = a.wz - b.wz;
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 > LD2) continue;
          const zAvg = (a.z + b.z) / 2;
          const depthFade = Math.max(0, Math.min(1, 1.6 - zAvg * 0.36));
          const alpha = (1 - Math.sqrt(d2) / LD) * 0.7 * depthFade;
          if (alpha < 0.02) continue;
          ctx.strokeStyle = `rgba(${lr},${lg},${lb},${alpha})`;
          ctx.lineWidth = Math.max(0.4, 1.3 / zAvg);
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }

      // Glowing nodes, sharper near the focus depth
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const n = nodes[i];
        if (p.sx < -50 || p.sx > W + 50 || p.sy < -50 || p.sy > H + 50) continue;
        const tw = 0.7 + 0.3 * Math.sin(t * 0.002 * n.twinkle + n.phase);
        const focus = Math.abs(p.z - 1.3);
        const size = (22 / p.z) * (1 + focus * 0.9);
        const alpha = Math.max(0.08, Math.min(1, 1.4 - focus * 0.32)) * tw;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, p.sx - size / 2, p.sy - size / 2, size, size);
      }
      ctx.globalAlpha = 1;

      drawBokeh(t, true);
      ctx.globalCompositeOperation = 'source-over';

      if (!reduceMotion) frameId = requestAnimationFrame(frame);
    }

    function setRunning(on) {
      const should = on && visible && !document.hidden;
      if (should && !running) {
        running = true;
        frameId = requestAnimationFrame(frame);
      } else if (!should) {
        running = false;
        cancelAnimationFrame(frameId);
      }
    }

    const onPointerMove = (e) => {
      const r = boxOf();
      mouseX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouseY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };
    const onVisibility = () => setRunning(true);

    pointerTarget.addEventListener('pointermove', onPointerMove);
    if (!fixed) host.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setRunning(true);
    });
    observer.observe(canvas);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    // Re-size when the layout changes, so the canvas is correct once the page has laid out
    let resizeObserver = null;
    if (fixed) {
      window.addEventListener('resize', onResize);
    } else {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(host);
    }

    resize();
    frameId = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      clearTimeout(resizeTimer);
      pointerTarget.removeEventListener('pointermove', onPointerMove);
      if (!fixed) host.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={fixed ? 'net-bg net-bg-fixed' : 'net-bg'} aria-hidden="true" />;
}
