"use client";
import { useEffect } from "react";

const SPOT = ".card, .skill-card, .step, .xp, .edu, .contact, .stats > div, .cv-box";

export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;

    // barra de progresso + seção ativa no menu
    const bar = document.getElementById("progress");
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav nav a"));
    const sections = links
      .map((a) => document.querySelector<HTMLElement>(a.getAttribute("href") ?? ""))
      .filter((s): s is HTMLElement => !!s);
    const onScroll = () => {
      const max = root.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      let cur = "";
      for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = `#${s.id}`;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === cur));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });

    // brilho que segue o mouse + holofote nos cards + tilt no perfil
    const glow = document.getElementById("cursor-glow");
    const tilt = document.querySelector<HTMLElement>("[data-tilt]");
    const onMove = (e: PointerEvent) => {
      if (glow) glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const el = (e.target as Element).closest?.(SPOT) as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (tilt && !reduce) {
        const r = tilt.getBoundingClientRect();
        const inside = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
        tilt.style.transform = inside
          ? `perspective(800px) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 14}deg) rotateX(${(0.5 - (e.clientY - r.top) / r.height) * 14}deg)`
          : "";
      }
    };
    if (fine) addEventListener("pointermove", onMove, { passive: true });

    // contadores animados
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      counters.forEach((c) => (c.textContent = "0"));
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            io!.unobserve(en.target);
            const el = en.target as HTMLElement;
            const to = Number(el.dataset.count);
            const t0 = performance.now();
            const tick = (t: number) => {
              const k = Math.min((t - t0) / 1400, 1);
              el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
              if (k < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }),
        { threshold: 0.6 }
      );
      counters.forEach((c) => io!.observe(c));
    }

    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onMove);
      io?.disconnect();
    };
  }, []);

  return null;
}
