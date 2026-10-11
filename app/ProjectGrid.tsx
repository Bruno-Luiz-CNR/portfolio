"use client";
import { useEffect, useState } from "react";
import { categories, projects, type Project } from "./projects";

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
  const list = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

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
          <article key={p.slug} className={p.featured ? "card featured" : "card"} style={{ animationDelay: `${i * 70}ms` }}
            onClick={() => setOpen(p)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setOpen(p)}>
            <div className="card-media">
              <Media p={p} />
              <span className="badge">{p.featured ? "★ Destaque" : p.category}</span>
              <div className="scan" />
            </div>
            <div className="card-body">
              <span className="role">{p.role}</span>
              <h3>{p.title}</h3>
              <p>{p.tagline}</p>
              <ul className="stack">{p.stack.slice(0, 4).map((s) => <li key={s}>{s}</li>)}</ul>
              <span className="more">Ver case →</span>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div className="modal-bg" onClick={() => setOpen(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpen(null)} aria-label="Fechar">✕</button>
            <div className="modal-media"><Media p={open} /></div>
            <div className="modal-body">
              <span className="eyebrow">{open.role}</span>
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
              <a className="btn primary" href={open.repo} target="_blank" rel="noreferrer">Ver código no GitHub →</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
