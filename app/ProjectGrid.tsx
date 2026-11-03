"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { categories, projects, type Project } from "./projects";

const pad = (n: number) => String(n).padStart(2, "0");

function CodeVisual() {
  return (
    <div className="code-visual" aria-hidden>
      <pre>
        <span className="c-k">@Controller</span>(<span className="c-s">&apos;orders&apos;</span>){"\n"}
        <span className="c-k">export class</span> <span className="c-t">OrdersController</span> {"{"}{"\n"}
        {"  "}<span className="c-k">constructor</span>(<span className="c-k">private</span> svc: <span className="c-t">OrdersService</span>) {"{}"}{"\n\n"}
        {"  "}<span className="c-k">@Post</span>(){"\n"}
        {"  "}create(<span className="c-k">@Body</span>() dto: <span className="c-t">CreateOrderDto</span>) {"{"}{"\n"}
        {"    "}<span className="c-k">return this</span>.svc.create(dto);{"\n"}
        {"  }"}{"\n"}
        {"}"}
      </pre>
      <div className="flow">
        <span>Controller</span><i>→</i><span>Service</span><i>→</i><span>Repository</span>
      </div>
    </div>
  );
}

function Media({ p }: { p: Project }) {
  return p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : <CodeVisual />;
}

export default function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Todos");
  const [open, setOpen] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const list = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);
  const count = (c: (typeof categories)[number]) => (c === "Todos" ? projects.length : projects.filter((p) => p.category === c).length);

  const step = useCallback((d: number) => {
    setOpen((o) => (o ? projects[(projects.findIndex((p) => p.slug === o.slug) + d + projects.length) % projects.length] : o));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (open && e.key === "ArrowRight") step(1);
      else if (open && e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const p = projects.find((x) => x.slug === (e as CustomEvent<string>).detail);
      if (p) { setFilter("Todos"); setOpen(p); }
    };
    window.addEventListener("open-project", onOpen);
    return () => window.removeEventListener("open-project", onOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // entrada em cascata quando os cards aparecem na tela
  useEffect(() => {
    const cards = Array.from(gridRef.current?.querySelectorAll<HTMLElement>(".card") ?? []);
    if (!("IntersectionObserver" in window)) { cards.forEach((c) => c.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          io.unobserve(el);
          setTimeout(() => el.classList.add("in"), (Number(el.dataset.i) % 3) * 110);
        }),
      { threshold: 0.12 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [filter]);

  const onTilt = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${px * 9}deg`);
    el.style.setProperty("--rx", `${-py * 9}deg`);
    el.style.setProperty("--px", String(px));
    el.style.setProperty("--py", String(py));
  };
  const onLeave = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    ["--rx", "--ry", "--px", "--py"].forEach((v) => el.style.removeProperty(v));
  };

  const idx = open ? projects.findIndex((p) => p.slug === open.slug) : 0;

  return (
    <>
      <div className="hud mono">
        <span><i className="dot" /> sys.projects</span>
        <span>exibindo <b key={list.length} className="tick">{pad(list.length)}</b> / {pad(projects.length)}</span>
        <span className="hud-line" />
        <span>filtro: <b>{filter.toLowerCase()}</b><i className="caret" /></span>
      </div>

      <div className="filters" role="tablist">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={filter === c}
            className={filter === c ? "chip active" : "chip"} onClick={() => setFilter(c)}>
            {c}<sup>{count(c)}</sup>
          </button>
        ))}
      </div>

      <div className="grid" ref={gridRef}>
        {list.map((p, i) => (
          <article key={`${filter}-${p.slug}`} data-i={i} className={p.featured ? "card featured" : "card"}
            onClick={() => setOpen(p)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setOpen(p)}
            onPointerMove={onTilt} onPointerLeave={onLeave}>
            <div className="card-media">
              <Media p={p} />
              <div className="lines" />
              <div className="scan" />
              <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
              <span className="badge">{p.featured ? "★ Destaque" : p.category}</span>
              <span className="pid mono">{pad(projects.indexOf(p) + 1)}</span>
            </div>
            <div className="card-body">
              <span className="role">{p.role}</span>
              <h3>{p.title}</h3>
              <p>{p.tagline}</p>
              <ul className="stack">{p.stack.slice(0, 4).map((s) => <li key={s}>{s}</li>)}</ul>
              <span className="more">Abrir case →</span>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div className="modal-bg" onClick={() => setOpen(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpen(null)} aria-label="Fechar">✕</button>
            <div className="modal-media" key={`m-${open.slug}`}><Media p={open} /></div>
            <div className="modal-body" key={`b-${open.slug}`}>
              <div className="modal-top">
                <span className="eyebrow">{open.role}</span>
                <div className="modal-nav mono">
                  <button onClick={() => step(-1)} aria-label="Projeto anterior">←</button>
                  <span>{pad(idx + 1)} / {pad(projects.length)}</span>
                  <button onClick={() => step(1)} aria-label="Próximo projeto">→</button>
                </div>
              </div>
              <h3>{open.title}</h3>
              <div className="case">
                <h4>Problema</h4>
                <p>{open.problem}</p>
                <h4>Solução</h4>
                <p>{open.solution}</p>
                <ul className="stack">{open.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                <h4>Resultados</h4>
                <ul className="hl">{open.results.map((h) => <li key={h}>{h}</li>)}</ul>
              </div>
              {open.repo && <a className="btn primary" href={open.repo} target="_blank" rel="noreferrer">Ver código no GitHub →</a>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
