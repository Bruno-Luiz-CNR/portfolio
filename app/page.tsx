import Starfield from "./Starfield";
import ProjectGrid from "./ProjectGrid";
import { projects } from "./projects";

const GH = "https://github.com/Bruno-Luiz-CNR";
const skills = ["TypeScript", "NestJS", "Java", "Android", "C#", ".NET", "Python", "PyQt", "Kivy", "SQL", "HTML", "CSS"];

export default function Home() {
  const langs = new Set(projects.flatMap((p) => p.stack)).size;
  return (
    <>
      <Starfield />
      <div className="grid-floor" aria-hidden />
      <header className="nav">
        <a href="#top" className="logo">BL<span>_</span></a>
        <nav>
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
          <a href={GH} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="mono status"><span className="dot" /> disponível para novos projetos</p>
          <h1 className="glitch" data-text="BRUNO LUIZ">BRUNO LUIZ</h1>
          <h2>Desenvolvedor de Software <span className="grad">Mobile · Desktop · Web</span></h2>
          <p className="lead">
            Transformo ideias em aplicações reais — de apps Android para salões a sistemas de
            estoque e APIs em NestJS. Código limpo, interfaces caprichadas e foco no usuário.
          </p>
          <div className="cta">
            <a className="btn primary" href="#projetos">Explorar projetos</a>
            <a className="btn ghost" href={GH} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <div className="stats">
            <div><b>{projects.length}</b><span>projetos em destaque</span></div>
            <div><b>30+</b><span>repositórios</span></div>
            <div><b>{langs}</b><span>tecnologias</span></div>
          </div>
        </section>

        <section id="projetos" className="section">
          <div className="section-head">
            <span className="mono">// 01</span>
            <h2>Projetos</h2>
            <p>Uma seleção de trabalhos com interface visual. Clique em um card para ver detalhes.</p>
          </div>
          <ProjectGrid />
        </section>

        <section id="sobre" className="section about">
          <div className="section-head">
            <span className="mono">// 02</span>
            <h2>Sobre mim</h2>
          </div>
          <div className="about-grid">
            <div className="terminal">
              <div className="term-bar"><i /><i /><i /><span>bruno@dev ~ </span></div>
              <pre>{`> whoami
Bruno Luiz — dev full stack em formação contínua

> cat foco.txt
• Apps Android e desktop com UI caprichada
• APIs REST com NestJS + TypeScript
• Automação e dados com Python

> echo $STATUS
Aberto a oportunidades e freelas_`}</pre>
            </div>
            <div>
              <h3 className="skills-title">Stack</h3>
              <ul className="skills">{skills.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Bruno Luiz · Feito com Next.js + TypeScript</p>
        <a href={GH} target="_blank" rel="noreferrer">github.com/Bruno-Luiz-CNR</a>
      </footer>
    </>
  );
}
