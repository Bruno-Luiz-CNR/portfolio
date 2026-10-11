"use client";
import { useEffect, useState } from "react";
import { categories, projects, type Project } from "./projects";

export default function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Todos");
  const [open, setOpen] = useState<Project | null>(null);
  const list = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="filters" role="tablist">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={filter === c}
            className={filter === c ? "chip active" : "chip"} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid">
        {list.map((p, i) => (
          <article key={p.slug} className="card" style={{ animationDelay: `${i * 70}ms` }}
            onClick={() => setOpen(p)} tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setOpen(p)}>
            <div className="card-media">
              <img src={p.image} alt={p.title} loading="lazy" />
              <span className="badge">{p.category}</span>
              <div className="scan" />
            </div>
            <div className="card-body">
              <span className="idx">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.tagline}</p>
              <ul className="stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div className="modal-bg" onClick={() => setOpen(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpen(null)} aria-label="Fechar">✕</button>
            <div className="modal-media"><img src={open.image} alt={open.title} /></div>
            <div className="modal-body">
              <span className="eyebrow">{open.category}</span>
              <h3>{open.title}</h3>
              <p>{open.description}</p>
              <ul className="hl">{open.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              <ul className="stack">{open.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              <a className="btn primary" href={open.repo} target="_blank" rel="noreferrer">Ver código no GitHub →</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
