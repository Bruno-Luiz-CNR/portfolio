"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "./projects";

type Item = { id: string; group: string; label: string; hint?: string; run: () => void };
type Links = { gh: string; li: string; mail: string; cv: string };

const SECTIONS: [string, string][] = [
  ["sobre", "Sobre"], ["metodo", "Método"], ["competencias", "Competências"], ["projetos", "Projetos"],
  ["experiencia", "Experiência"], ["formacao", "Formação"], ["contato", "Contato"],
];

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function CommandPalette({ links }: { links: Links }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const items: Item[] = useMemo(
    () => [
      ...SECTIONS.map(([id, label]) => ({ id: `s-${id}`, group: "Navegar", label: `Ir para ${label}`, hint: `#${id}`, run: () => goTo(id) })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`, group: "Projetos", label: p.title, hint: p.category,
        run: () => { goTo("projetos"); window.dispatchEvent(new CustomEvent("open-project", { detail: p.slug })); },
      })),
      { id: "cv", group: "Ações", label: "Baixar currículo (PDF)", hint: "↓", run: () => { const a = document.createElement("a"); a.href = links.cv; a.download = ""; a.click(); } },
      { id: "gh", group: "Ações", label: "Abrir GitHub", hint: "↗", run: () => window.open(links.gh, "_blank", "noopener") },
      { id: "li", group: "Ações", label: "Abrir LinkedIn", hint: "↗", run: () => window.open(links.li, "_blank", "noopener") },
      {
        id: "mail", group: "Ações", label: "Copiar e-mail", hint: links.mail,
        run: async () => {
          try { await navigator.clipboard.writeText(links.mail); setToast("E-mail copiado ✓"); }
          catch { location.href = `mailto:${links.mail}`; }
        },
      },
    ],
    [links]
  );

  const list = useMemo(() => {
    const n = norm(q.trim());
    return n ? items.filter((i) => norm(`${i.label} ${i.group} ${i.hint ?? ""}`).includes(n)) : items;
  }, [items, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-open-palette]")) setOpen(true);
    };
    addEventListener("keydown", onKey);
    addEventListener("click", onClick);
    if (/Mac|iPhone|iPad/.test(navigator.platform)) document.querySelectorAll("[data-kbd]").forEach((el) => (el.textContent = "⌘K"));
    return () => { removeEventListener("keydown", onKey); removeEventListener("click", onClick); };
  }, []);

  useEffect(() => {
    if (open) { setQ(""); setIdx(0); setTimeout(() => inputRef.current?.focus(), 0); }
  }, [open]);

  useEffect(() => setIdx(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (i?: Item) => {
    if (!i) return;
    setOpen(false);
    setTimeout(i.run, 60);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, list.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); run(list[idx]); }
  };

  return (
    <>
      {open && (
        <div className="pal-bg" onClick={() => setOpen(false)}>
          <div className="pal" role="dialog" aria-modal="true" aria-label="Paleta de comandos" onClick={(e) => e.stopPropagation()}>
            <div className="pal-input">
              <span className="mono">›</span>
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onInputKey}
                placeholder="Buscar seção, projeto ou ação…" aria-label="Buscar" />
              <kbd>esc</kbd>
            </div>
            <ul className="pal-list" ref={listRef} role="listbox">
              {list.length === 0 && <li className="pal-empty mono">nenhum resultado para “{q}”</li>}
              {list.map((it, i) => (
                <li key={it.id} role="option" aria-selected={i === idx} className={i === idx ? "on" : ""}
                  onMouseMove={() => setIdx(i)} onClick={() => run(it)}>
                  {(i === 0 || list[i - 1].group !== it.group) && <span className="pal-group mono">{it.group}</span>}
                  <div><span>{it.label}</span>{it.hint && <small className="mono">{it.hint}</small>}</div>
                </li>
              ))}
            </ul>
            <div className="pal-foot mono"><span>↑↓ navegar</span><span>↵ abrir</span><span>ctrl K fechar</span></div>
          </div>
        </div>
      )}
      {toast && <div className="toast mono" role="status">{toast}</div>}
    </>
  );
}
