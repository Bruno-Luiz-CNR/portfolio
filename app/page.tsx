import Starfield from "./Starfield";
import ProjectGrid from "./ProjectGrid";
import Reveal from "./Reveal";
import { education, experiences } from "./projects";

const GH = "https://github.com/Bruno-Luiz-CNR";
const LI = "https://www.linkedin.com/in/brunoluizft/";
const IG = "https://www.instagram.com/brunolu1z/";
const MAIL = "bluizft@gmail.com";
const CV = "/Bruno_Luiz_Curriculo.pdf";

const steps = [
  { t: "Entender o problema", d: "Antes do código, entendo o chamado, o requisito e o impacto. Bug ou melhoria, começo pela causa raiz." },
  { t: "Modelar dados e contratos", d: "Defino entidades, consultas SQL e contratos de API (DTOs, rotas, status HTTP) para o sistema conversar bem com os outros." },
  { t: "Implementar em camadas", d: "Controller, Service e Repository com responsabilidades separadas — código fácil de testar, manter e evoluir." },
  { t: "Testar e homologar", d: "Valido os cenários, os dados e os casos de erro antes de qualquer deploy em produção." },
  { t: "Publicar e monitorar", d: "Deploy versionado com Git, acompanhamento de logs no Linux e monitoramento em AWS." },
  { t: "Automatizar e documentar", d: "O que é repetitivo vira script em Python ou Java; o que é importante vira documentação técnica." },
];

const skillGroups = [
  { icon: "{ }", t: "Back-end & APIs", items: ["Node.js", "TypeScript", "NestJS", "Python", "Django", "Java", "APIs REST", "Swagger / OpenAPI", "DTOs & validação", "Integrações entre sistemas"] },
  { icon: "▤", t: "Dados & SQL", items: ["MySQL", "SQL Server", "Oracle", "IBM DB2", "Otimização de consultas", "Tratamento de dados", "Pandas", "Relatórios gerenciais", "DBeaver"] },
  { icon: "⚙", t: "Automação", items: ["Python + Selenium", "Scripts em Java", "Google Sheets API", "Envio de SMS / e-mail", "Extração de dados web", "Geração de Excel"] },
  { icon: "☁", t: "Infra & Práticas", items: ["Linux (logs e serviços)", "AWS", "Git / GitHub", "Sustentação N1–N3", "Análise de causa raiz", "Testes e homologação", "Documentação técnica", "IAM"] },
];

const contacts = [
  { k: "E-mail", v: MAIL, href: `mailto:${MAIL}`, icon: "✉" },
  { k: "LinkedIn", v: "/in/brunoluizft", href: LI, icon: "in" },
  { k: "GitHub", v: "Bruno-Luiz-CNR", href: GH, icon: "</>" },
  { k: "Instagram", v: "@brunolu1z", href: IG, icon: "◎" },
];

function SectionHead({ n, kicker, title, text }: { n: string; kicker: string; title: string; text?: string }) {
  return (
    <div className="section-head">
      <span className="kicker"><b>// {n}</b> {kicker}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Starfield />
      <Reveal />
      <div className="grid-floor" aria-hidden />
      <header className="nav">
        <a href="#top" className="logo">BL<span>_</span></a>
        <nav>
          <a href="#sobre">Sobre</a>
          <a href="#metodo">Método</a>
          <a href="#competencias">Competências</a>
          <a href="#projetos">Projetos</a>
          <a href="#experiencia">Experiência</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="nav-cta" href={CV} download>Currículo ↓</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="kicker">BACK-END · DADOS · AUTOMAÇÃO</p>
            <h1 className="glitch" data-text="Bruno Luiz">Bruno Luiz</h1>
            <h2>Desenvolvedor <span className="grad">Back-End</span></h2>
            <p className="lead">
              Do chamado ao deploy: construo e sustento APIs, automações e consultas SQL que
              mantêm sistemas críticos de pé — hoje, numa plataforma usada por DETRAN, PRF e DNIT.
            </p>
            <p className="mono techline">Node.js · TypeScript · NestJS · Python · Java · SQL · Linux · AWS</p>
            <div className="cta">
              <a className="btn primary" href={CV} download>Baixar currículo ↓</a>
              <a className="btn ghost" href="#projetos">Ver projetos</a>
              <a className="btn ghost" href={LI} target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="btn ghost" href={GH} target="_blank" rel="noreferrer">GitHub</a>
              <a className="btn ghost" href="#contato">Vamos conversar</a>
            </div>
            <p className="loc mono">⌖ Colombo — PR, Brasil · presencial / híbrido</p>
          </div>

          <aside className="profile">
            <div className="avatar-ring"><img src={`${GH}.png?size=320`} alt="Foto de Bruno Luiz" /></div>
            <h3>Bruno Luiz</h3>
            <p>Analista de Soluções Técnicas<br />Desenvolvimento Back-End</p>
            <span className="status mono"><span className="dot" /> aberto a oportunidades</span>
          </aside>
        </section>

        <div className="stats reveal">
          <div><b>3+ anos</b><span>desenvolvendo sistemas, APIs e automações</span></div>
          <div><b>23+ fontes</b><span>governamentais mineradas na plataforma em que atuo</span></div>
          <div><b>30+ repos</b><span>projetos públicos no GitHub</span></div>
        </div>

        <section id="sobre" className="section about reveal">
          <SectionHead n="01" kicker="SOBRE MIM" title="Da operação ao código" />
          <div className="about-cols">
            <div className="about-text">
              <p>
                Comecei na logística e no varejo — conferência de mercadorias, estoque, operação.
                Esse começo me ensinou a enxergar processos e gargalos antes de pensar em sistema,
                e foi isso que me levou para o desenvolvimento.
              </p>
              <p>
                Formado em Análise e Desenvolvimento de Sistemas, pós-graduado em Programação Back-End
                e cursando especialização em Java na UTFPR. Hoje, na <b>LW Tecnologia</b>, sustento e evoluo
                aplicações em TypeScript/Node.js, desenvolvo automações em Python e Java e otimizo
                consultas SQL no <b>LW Análise</b>, plataforma de gestão de infrações de trânsito.
              </p>
              <p>
                Antes disso, criei um sistema interno de relatórios que <b>substituiu um serviço externo pago</b>,
                um sistema em Django para odômetro de frotas e uma automação com Selenium que
                <b> eliminou retrabalho manual</b> na geração de relatórios para clientes.
              </p>
            </div>
            <div className="terminal">
              <div className="term-bar"><i /><i /><i /><span>bruno@dev ~ </span></div>
              <pre>{`> whoami
Bruno Luiz — Dev Back-End

> cat stack.txt
Node.js · TypeScript · NestJS
Python · Django · Java · SQL

> cat foco.txt
• APIs REST e integrações
• Automação de processos
• Dados e consultas SQL

> echo $STATUS
Aberto a oportunidades_`}</pre>
            </div>
          </div>
        </section>

        <section id="metodo" className="section reveal">
          <SectionHead n="02" kicker="MÉTODO" title="Como resolvo problemas"
            text="Um ciclo que começa no problema real e termina em sistema estável em produção." />
          <ol className="timeline">
            {steps.map((s, i) => (
              <li key={s.t} className={i % 2 ? "right" : "left"}>
                <div className="step">
                  <span className="kicker">ETAPA {String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="competencias" className="section reveal">
          <SectionHead n="03" kicker="COMPETÊNCIAS" title="O que eu trago para o time"
            text="Quatro frentes que se complementam: construir a API, cuidar do dado, automatizar o repetitivo e manter tudo rodando." />
          <div className="skill-grid">
            {skillGroups.map((g) => (
              <div key={g.t} className="skill-card">
                <h3><span className="ico">{g.icon}</span>{g.t}</h3>
                <ul className="skills">{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projetos" className="section">
          <SectionHead n="04" kicker="CASES" title="Projetos e resultados"
            text="Cada case segue a mesma lógica: qual era o problema, o que foi construído, com quais tecnologias e o que mudou. Clique em um projeto para abrir." />
          <ProjectGrid />
        </section>

        <section id="experiencia" className="section reveal">
          <SectionHead n="05" kicker="TRAJETÓRIA" title="Experiência profissional"
            text="Do suporte técnico ao desenvolvimento back-end — cada etapa somou uma camada de visão sobre sistemas." />
          <div className="xp-list">
            {experiences.map((x) => (
              <article key={x.company} className="xp">
                <header>
                  <div>
                    <h3>{x.role}</h3>
                    <span className="company">{x.company} · {x.place}</span>
                  </div>
                  <span className="period mono">{x.period}</span>
                </header>
                <p>{x.summary}</p>
                <ul>{x.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              </article>
            ))}
            <p className="xp-before mono">Antes da tecnologia: logística e varejo (FrigoNepi, Sodimac, Tenda Atacado · 2019–2022).</p>
          </div>
        </section>

        <section id="formacao" className="section reveal">
          <SectionHead n="06" kicker="FORMAÇÃO" title="Formação acadêmica" />
          <div className="edu-grid">
            {education.map((e) => (
              <div key={e.course} className="edu">
                <span className="period mono">{e.period}</span>
                <h3>{e.course}</h3>
                <p>{e.school}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contato" className="section reveal">
          <SectionHead n="07" kicker="CONTATO" title="Vamos conversar?"
            text="Precisa de alguém para construir APIs, automatizar processos ou cuidar dos seus dados? Me chame — respondo rápido." />
          <div className="contact-grid">
            {contacts.map((c) => (
              <a key={c.k} className="contact" href={c.href} target="_blank" rel="noreferrer">
                <span className="ico">{c.icon}</span>
                <span><small>{c.k}</small><b>{c.v}</b></span>
              </a>
            ))}
          </div>
          <div className="cv-box">
            <div>
              <h3>Prefere ler o currículo completo?</h3>
              <p>PDF atualizado, 2 páginas.</p>
            </div>
            <div className="cta" style={{ marginTop: 0 }}>
              <a className="btn ghost" href={LI} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="btn primary" href={CV} download>Baixar currículo ↓</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Bruno Luiz · Colombo — PR, Brasil</p>
        <p className="mono">Next.js + TypeScript</p>
      </footer>
    </>
  );
}
