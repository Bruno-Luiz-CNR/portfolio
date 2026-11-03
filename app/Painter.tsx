"use client";
import { useEffect, useRef, useState } from "react";

const W = 720;
const SKETCH_MS = 2400;
const PAINT_MS = 4600;
const LEAVE_MS = 700;

type Phase = "sketch" | "paint" | "done";
type Cell = { x: number; y: number; gx: number; gy: number };

const mk = () => {
  const c = document.createElement("canvas");
  c.width = c.height = W;
  return c;
};

function line(x: CanvasRenderingContext2D, ax: number, ay: number, bx: number, by: number, w: number) {
  x.lineWidth = w;
  x.lineCap = "round";
  x.strokeStyle = "#fff";
  x.beginPath();
  x.moveTo(ax, ay);
  x.lineTo(bx, by);
  x.stroke();
}

// contornos (Sobel) da foto recortada: vira o "rascunho a lápis"
function buildSketch(px: Uint8ClampedArray) {
  const n = W * W;
  const lum = new Float32Array(n);
  const alpha = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const a = px[i * 4 + 3] / 255;
    lum[i] = (0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]) * a;
    alpha[i] = px[i * 4 + 3];
  }
  const blur = new Float32Array(n);
  for (let y = 1; y < W - 1; y++)
    for (let x = 1; x < W - 1; x++) {
      const i = y * W + x;
      blur[i] = (lum[i - W - 1] + lum[i - W] + lum[i - W + 1] + lum[i - 1] + lum[i] + lum[i + 1] + lum[i + W - 1] + lum[i + W] + lum[i + W + 1]) / 9;
    }
  const out = mk();
  const octx = out.getContext("2d")!;
  const img = octx.createImageData(W, W);
  const sobel = (s: Float32Array, i: number) => {
    const gx = -s[i - W - 1] - 2 * s[i - 1] - s[i + W - 1] + s[i - W + 1] + 2 * s[i + 1] + s[i + W + 1];
    const gy = -s[i - W - 1] - 2 * s[i - W] - s[i - W + 1] + s[i + W - 1] + 2 * s[i + W] + s[i + W + 1];
    return Math.hypot(gx, gy);
  };
  for (let y = 2; y < W - 2; y++)
    for (let x = 2; x < W - 2; x++) {
      const i = y * W + x;
      const m = sobel(blur, i) + sobel(alpha, i) * 1.5;
      if (m > 70) {
        img.data[i * 4] = 150;
        img.data[i * 4 + 1] = 240;
        img.data[i * 4 + 2] = 255;
        img.data[i * 4 + 3] = Math.min(255, (m - 70) * 3);
      }
    }
  octx.putImageData(img, 0, 0);
  return out;
}

export default function Painter({ src, children }: { src: string; children?: React.ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const hand = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("sketch");
  const [pct, setPct] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    let raf = 0;
    let dead = false;
    const ctx = cv.current!.getContext("2d")!;
    ctx.clearRect(0, 0, W, W);
    setPhase("sketch");
    setPct(0);

    const img = new Image();
    img.onload = () => {
      if (dead) return;
      const color = mk();
      const cctx = color.getContext("2d")!;
      cctx.drawImage(img, 0, 0, W, W);

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        ctx.drawImage(color, 0, 0);
        setPhase("done");
        setPct(100);
        return;
      }

      const px = cctx.getImageData(0, 0, W, W).data;
      const sketch = buildSketch(px);
      const m1 = mk(), m2 = mk(), tmp = mk();
      const x1 = m1.getContext("2d")!, x2 = m2.getContext("2d")!, xt = tmp.getContext("2d")!;

      // células de pincelada que cobrem só a área da pessoa
      const c = 24;
      const A = (x: number, y: number) => px[(Math.min(W - 1, Math.max(0, y | 0)) * W + Math.min(W - 1, Math.max(0, x | 0))) * 4 + 3];
      const cells: Cell[] = [];
      for (let gy = 0; gy * c < W + c; gy++)
        for (let gx = 0; gx * c < W + c; gx++) {
          const x = gx * c + c / 2, y = gy * c + c / 2;
          if (A(x, y) > 30 || A(x - c, y) > 30 || A(x + c, y) > 30 || A(x, y - c) > 30 || A(x, y + c) > 30) cells.push({ x, y, gx, gy });
        }

      const sketchOrder = [...cells].sort((a, b) => a.gy - b.gy || (a.gy % 2 ? b.gx - a.gx : a.gx - b.gx));
      const fx = W * 0.47, fy = W * 0.3;
      const paintOrder = cells
        .map((p) => ({ p, k: Math.hypot(p.x - fx, p.y - fy) + Math.random() * 130 }))
        .sort((a, b) => a.k - b.k)
        .map((o) => o.p);
      const N1 = sketchOrder.length, N2 = paintOrder.length;
      let i1 = 0, i2 = 0;
      let tipX = W * 0.3, tipY = 0;

      const stroke1 = (i: number) => {
        const p = sketchOrder[i];
        const d = p.gy % 2 ? -1 : 1;
        const wob = Math.sin(i * 0.7) * 3;
        line(x1, p.x - d * c * 0.9, p.y + wob, p.x + d * c * 0.9, p.y - wob, c * 1.6);
        tipX = p.x + d * c * 0.9;
        tipY = p.y - wob;
      };
      const stroke2 = (i: number) => {
        const p = paintOrder[i];
        const a = -0.6 + (Math.random() - 0.5) * 0.6;
        const dx = Math.cos(a) * c * 0.85, dy = Math.sin(a) * c * 0.85;
        line(x2, p.x - dx, p.y - dy, p.x + dx, p.y + dy, c * (1.8 + Math.random() * 0.4));
        tipX = p.x + dx;
        tipY = p.y + dy;
      };

      const layer = (s: HTMLCanvasElement, mask: HTMLCanvasElement, alpha: number) => {
        xt.globalCompositeOperation = "source-over";
        xt.clearRect(0, 0, W, W);
        xt.drawImage(mask, 0, 0);
        xt.globalCompositeOperation = "source-in";
        xt.drawImage(s, 0, 0);
        ctx.globalAlpha = alpha;
        ctx.drawImage(tmp, 0, 0);
        ctx.globalAlpha = 1;
      };

      const h = hand.current!;
      const fr = frame.current!;
      h.style.setProperty("--hs", String(Math.min(1, Math.max(0.55, fr.clientWidth / 520))));
      let hx = fr.clientWidth * 0.3, hy = -40;
      let leaveAt = 0;
      const t0 = performance.now();

      const tick = (now: number) => {
        if (dead) return;
        const e = now - t0;
        let k = 0;
        if (e < SKETCH_MS) {
          const n = Math.floor((e / SKETCH_MS) * N1);
          while (i1 < n) stroke1(i1++);
          setPct(Math.round((e / SKETCH_MS) * 35));
        } else {
          while (i1 < N1) stroke1(i1++);
          setPhase("paint");
          k = Math.min((e - SKETCH_MS) / PAINT_MS, 1);
          const n = Math.floor(k * N2);
          while (i2 < n) stroke2(i2++);
          setPct(35 + Math.round(k * 65));
          if (k >= 1) {
            while (i2 < N2) stroke2(i2++);
            if (!leaveAt) leaveAt = now;
            tipX = W * 1.2;
            tipY = -W * 0.3;
          }
        }

        ctx.clearRect(0, 0, W, W);
        layer(sketch, m1, 1 - k * 0.7);
        layer(color, m2, 1);

        const s = fr.clientWidth / W;
        hx += (tipX * s - hx) * 0.28;
        hy += (tipY * s - hy) * 0.28;
        h.style.transform = `translate(${hx}px, ${hy}px) rotate(${Math.sin(now / 90) * 3}deg)`;

        if (leaveAt && now - leaveAt > LEAVE_MS) {
          ctx.clearRect(0, 0, W, W);
          ctx.drawImage(color, 0, 0);
          setPhase("done");
          setPct(100);
          return;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    img.src = src;

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
    };
  }, [src, run]);

  const label = phase === "sketch" ? "esboçando…" : phase === "paint" ? "pintando…" : "bruno.png · render completo";

  return (
    <div className={`easel ${phase}`} data-tilt>
      <div
        ref={frame}
        className="canvas-frame"
        role="button"
        tabIndex={0}
        aria-label="Repintar o retrato"
        title="Clique para repintar"
        onClick={() => setRun((r) => r + 1)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setRun((r) => r + 1)}
      >
        <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
        <canvas ref={cv} width={W} height={W} className="paint" role="img" aria-label="Retrato de Bruno Luiz" />
        <noscript><img className="paint" src={src} alt="Retrato de Bruno Luiz" /></noscript>

        <div ref={hand} className="hand" aria-hidden>
          <svg width="300" height="300" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="hg" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#a855f7" />
                <stop offset="1" stopColor="#00e5ff" />
              </linearGradient>
            </defs>
            <g transform="translate(0 40)">
              {/* cabo, virola e cerdas */}
              <line x1="56" y1="204" x2="215" y2="45" stroke="url(#hg)" strokeWidth="11" strokeLinecap="round" />
              <line x1="36" y1="224" x2="58" y2="202" stroke="#cfd8e6" strokeWidth="16" />
              <line x1="42" y1="218" x2="46" y2="214" stroke="#7b869c" strokeWidth="17" />
              <path d="M6 254 Q10 236 30 218 L44 232 Q28 250 6 254Z" style={{ fill: "var(--tip)" }} />
              {/* manga */}
              <line x1="214" y1="52" x2="300" y2="-34" stroke="#141838" strokeWidth="46" />
              <line x1="198" y1="36" x2="230" y2="68" stroke="#00e5ff" strokeWidth="5" />
              {/* mão */}
              <line x1="190" y1="76" x2="212" y2="54" stroke="#8a5232" strokeWidth="28" strokeLinecap="round" />
              <line x1="190" y1="76" x2="212" y2="54" stroke="#f1b58f" strokeWidth="25" strokeLinecap="round" />
              <ellipse cx="186" cy="80" rx="27" ry="21" transform="rotate(-45 186 80)" fill="#f1b58f" stroke="#8a5232" strokeWidth="2.5" />
              {[[123, 137], [137, 123], [151, 109], [166, 94]].map(([x, y]) => (
                <g key={x}>
                  <line x1={x - 9} y1={y - 9} x2={x + 13} y2={y + 13} stroke="#8a5232" strokeWidth="16" strokeLinecap="round" />
                  <line x1={x - 9} y1={y - 9} x2={x + 13} y2={y + 13} stroke="#f1b58f" strokeWidth="13" strokeLinecap="round" />
                </g>
              ))}
              <line x1="140" y1="112" x2="176" y2="76" stroke="#8a5232" strokeWidth="13" strokeLinecap="round" />
              <line x1="140" y1="112" x2="176" y2="76" stroke="#f1b58f" strokeWidth="10" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      <div className="paint-status mono">
        <span className="dot" /> {label} <b>{pct}%</b>
        <span className="bar"><i style={{ width: `${pct}%` }} /></span>
      </div>

      {children}
    </div>
  );
}
