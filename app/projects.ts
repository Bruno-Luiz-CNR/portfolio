export type Category = "Back-end" | "Mobile" | "Desktop" | "Web" | "Dados";

export interface Project {
  slug: string;
  title: string;
  role: string;
  tagline: string;
  problem: string;
  solution: string;
  results: string[];
  image?: string;
  repo?: string;
  stack: string[];
  category: Category;
  featured?: boolean;
}

const GH = "https://github.com/Bruno-Luiz-CNR";

export const projects: Project[] = [
  {
    slug: "nestjs-api",
    title: "API REST com NestJS",
    role: "Back-end · Arquitetura em camadas",
    tagline: "CRUD de usuários, produtos e pedidos com Swagger",
    problem:
      "Sair da teoria e construir uma API funcional que mostrasse, na prática, o caminho completo de uma requisição — do Controller até a persistência.",
    solution:
      "API em NestJS + TypeScript organizada em Controller → Service → Repository, com módulos separados, DTOs validados com class-validator, tratamento de erros HTTP e documentação Swagger/OpenAPI.",
    results: [
      "CRUD completo de usuários, produtos e ordens",
      "Injeção de dependências e separação clara de responsabilidades",
      "Documentação interativa via Swagger/OpenAPI",
    ],
    repo: `${GH}/nestjs-api-auth`,
    stack: ["NestJS", "TypeScript", "Node.js", "Swagger", "class-validator"],
    category: "Back-end",
    featured: true,
  },
  {
    slug: "barbearia",
    title: "Barbearia Online",
    role: "Mobile · Android nativo",
    tagline: "App de agendamento para barbearias e salões",
    problem:
      "Salões pequenos controlam horários, clientes e estoque no papel ou no WhatsApp, gerando conflitos de agenda e perda de informação.",
    solution:
      "Aplicativo Android com login, cadastro de clientes, agendamento e cancelamento de horários, controle de estoque, promoções e notificações.",
    results: ["Agenda centralizada no celular", "Estoque e promoções no mesmo app", "Fluxo de login e recuperação de conta"],
    image: "/projects/barbearia.webp",
    repo: `${GH}/android-salao-agendamento`,
    stack: ["Java", "Android", "SQLite"],
    category: "Mobile",
  },
  {
    slug: "estoque",
    title: "Sistema de Vendas & Estoque",
    role: "Desktop · Banco relacional",
    tagline: "Controle de mercadorias com relatórios",
    problem: "Loja de materiais sem visão confiável de estoque e vendas, dependendo de controles manuais.",
    solution:
      "Sistema desktop em C# com autenticação, cadastro de produtos, registro de vendas, relatórios e persistência em SQL Server.",
    results: ["CRUD completo de produtos e vendas", "Relatórios gerenciais", "Login com recuperação de senha"],
    image: "/projects/estoque.webp",
    repo: `${GH}/csharp-controle-estoque-vendas`,
    stack: ["C#", ".NET WinForms", "SQL Server"],
    category: "Desktop",
  },
  {
    slug: "salao-desktop",
    title: "Salão Manager",
    role: "Desktop · Integração WhatsApp",
    tagline: "Agenda, estoque e promoções via WhatsApp",
    problem: "Agendamentos e divulgação de promoções feitos manualmente, um cliente por vez.",
    solution:
      "Aplicação PyQt com agenda por cliente ou funcionário, cálculo de valores, estoque de produtos e envio de agendamentos e promoções pelo WhatsApp.",
    results: ["Busca e edição de agendamentos", "Cálculo automático de totais", "Comunicação com clientes via WhatsApp"],
    image: "/projects/salao-desktop.webp",
    repo: `${GH}/python-salao-agendamento-desktop`,
    stack: ["Python", "PyQt", "Qt Designer", "WhatsApp API"],
    category: "Desktop",
  },
  {
    slug: "email",
    title: "BruTha Mail",
    role: "Desktop · Automação",
    tagline: "Cliente de envio de e-mails",
    problem: "Envio repetitivo de e-mails para listas de contatos sem uma ferramenta simples.",
    solution: "Aplicação com interface em PySide6 que compõe e envia e-mails via SMTP do Gmail, com gerenciamento de destinatários.",
    results: ["Envio em lote", "Interface moderna em Qt", "Autenticação segura por senha de app"],
    image: "/projects/email.webp",
    repo: `${GH}/python-envio-emails`,
    stack: ["Python", "PySide6", "SMTP"],
    category: "Desktop",
  },
  {
    slug: "image-processing",
    title: "Image Processing",
    role: "Dados · Pacote Python",
    tagline: "Pacote de processamento de imagens",
    problem: "Reaproveitar rotinas de tratamento de imagem em vários projetos sem copiar código.",
    solution:
      "Pacote Python distribuível com módulos de processamento (histogram matching, similaridade estrutural, redimensionamento) e utilitários de leitura e plotagem.",
    results: ["Código empacotado e reutilizável", "Comparação de imagens por SSIM", "Visualização de histogramas"],
    image: "/projects/image-processing.webp",
    repo: `${GH}/python-image-processing`,
    stack: ["Python", "scikit-image", "Matplotlib"],
    category: "Dados",
  },
  {
    slug: "brutha-downloader",
    title: "BruTha Downloader",
    role: "Mobile · Python",
    tagline: "App mobile para baixar vídeos",
    problem: "Baixar vídeos e áudios no celular de forma simples.",
    solution: "App multiplataforma em Kivy/KivyMD com menu lateral e download de mídia.",
    results: ["Interface Material Design", "Empacotável para Android"],
    image: "/projects/brutha-downloader.webp",
    repo: `${GH}/python-kivy-app-android`,
    stack: ["Python", "Kivy", "KivyMD"],
    category: "Mobile",
  },
  {
    slug: "conversor",
    title: "Conversor MP4 → MP3",
    role: "Desktop · Mídia",
    tagline: "Extração de áudio de vídeos",
    problem: "Converter vídeos em áudio sem depender de sites de terceiros.",
    solution: "Ferramenta desktop em C# que converte arquivos MP4 para MP3 localmente.",
    results: ["Conversão offline", "Interface simples e animada"],
    image: "/projects/conversor.webp",
    repo: `${GH}/csharp-conversor-mp4-mp3`,
    stack: ["C#", ".NET", "WinForms"],
    category: "Desktop",
  },
  {
    slug: "tecblog",
    title: "TecImobi",
    role: "Web · Front-end",
    tagline: "Blog de imóveis",
    problem: "Imobiliária precisava de uma vitrine simples para anúncios de aluguel e venda.",
    solution: "Site em HTML e CSS com postagens de imóveis, menu de navegação e barra lateral de anúncios.",
    results: ["Layout em colunas", "Publicado no GitHub Pages"],
    image: "/projects/tecblog.webp",
    repo: `${GH}/site-tecblog`,
    stack: ["HTML", "CSS"],
    category: "Web",
  },
  {
    slug: "gatos",
    title: "Raças de Gatos",
    role: "Web · Front-end",
    tagline: "Site informativo sobre felinos",
    problem: "Praticar estrutura semântica, tipografia e posicionamento em CSS.",
    solution: "Site com galeria e história de raças como Maine Coon, Persa, Savana e Siamês.",
    results: ["Layout semântico", "Galeria de imagens"],
    image: "/projects/gatos.webp",
    repo: `${GH}/site-racas-de-gatos`,
    stack: ["HTML", "CSS"],
    category: "Web",
  },
  {
    slug: "lw-portal",
    title: "Portal Soluções Técnicas",
    role: "Web · Back-end · LW Tecnologia",
    tagline: "Portal interno que reúne ferramentas de apoio à operação",
    problem:
      "Ferramentas de consulta, extração e automação ficavam espalhadas, dificultando o acesso da equipe técnica e a padronização dos processos.",
    solution:
      "Portal web que centraliza as ferramentas do time (consulta de veículos e multas, extração de imagens via API, mineração de dados, queries e documentos) em uma única interface, com busca, menu por categorias e indicadores de uso.",
    results: ["Acesso único às ferramentas da equipe", "Automação de tarefas manuais de consulta e extração", "Padronização de consultas e documentação"],
    image: "/projects/lw-portal.webp",
    stack: ["Node.js", "TypeScript", "MySQL", "Python", "Java"],
    category: "Web",
  },
  {
    slug: "calculadora",
    title: "Calculadora Flutter",
    role: "Mobile · Flutter",
    tagline: "Calculadora com visual neon e sombras suaves",
    problem: "Praticar Flutter e construir uma interface moderna e responsiva além do layout padrão.",
    solution:
      "App de calculadora em Flutter e Dart com display em neon, gradientes, botões com sombras e layout adaptável a diferentes tamanhos de tela.",
    results: ["Interface responsiva", "Visual personalizado com tema próprio", "Código 100% Flutter"],
    image: "/projects/calculadora.webp",
    repo: `${GH}/flutter-calculadora`,
    stack: ["Flutter", "Dart", "Material 3"],
    category: "Mobile",
  },
];

export const categories: ("Todos" | Category)[] = ["Todos", "Back-end", "Mobile", "Desktop", "Web", "Dados"];

export const experiences = [
  {
    role: "Analista de Soluções Técnicas — Desenvolvimento Back-End",
    company: "LW Tecnologia",
    period: "mar/2026 – atual",
    place: "Curitiba, PR · Híbrido",
    summary:
      "Desenvolvimento, sustentação e evolução do LW Análise — plataforma enterprise de gestão de infrações de trânsito usada por DETRAN, PRF e DNIT (Node.js, MySQL, IA com Google Gemini, Kubernetes).",
    bullets: [
      "Sustentação de aplicações TypeScript/Node.js: bugs, incidentes e melhorias",
      "APIs REST e integrações entre sistemas",
      "Automações em Python e Java que reduzem trabalho manual",
      "Consultas SQL otimizadas em MySQL e correção de inconsistências de dados",
      "Chamados N1 a N3 com análise de causa raiz",
      "Linux (logs e serviços), monitoramento em AWS, Git, testes e homologação",
    ],
  },
  {
    role: "Analista de Redes e Sistemas",
    company: "ASYG Informática",
    period: "jul/2024 – fev/2026",
    place: "Pinhais, PR · Híbrido",
    summary: "Gestão de identidades e acessos (IAM) e banco de dados na plataforma IBM Security Verify Governance.",
    bullets: [
      "Administração e suporte do IBM Security Verify Governance",
      "Integração de sistemas e políticas de controle de acesso",
      "Relatórios e consultas SQL em Oracle e DB2",
      "Automação em Python + Selenium que extrai dados da interface web e gera Excel para aprovação do cliente, eliminando retrabalho",
    ],
  },
  {
    role: "Suporte Técnico e Desenvolvimento",
    company: "Cllick Solutions",
    period: "jul/2023 – jul/2024",
    place: "Curitiba, PR",
    summary: "Desenvolvimento de ferramentas internas e automações para operação de rastreamento de frotas.",
    bullets: [
      "Sistema interno de relatórios que substituiu um serviço externo pago",
      "Sistema web em Django para atualização de odômetro de frotas, com Google Sheets API e SMS",
      "Integração de APIs para dashboards de estoque e ordens de serviço",
      "Automação web com Selenium e tratamento de dados com Pandas (SQL Server e MySQL)",
    ],
  },
  {
    role: "Estagiário de Desenvolvimento",
    company: "Orange Systems",
    period: "mar/2022 – jul/2022",
    place: "Peruíbe, SP",
    summary: "Primeiro contato profissional com desenvolvimento.",
    bullets: ["Sistemas desktop em COBOL", "Modelagem e manipulação de dados em MySQL"],
  },
];

export const education = [
  { course: "Especialização em Java", school: "UTFPR — Universidade Tecnológica Federal do Paraná", period: "2025 – 2026 · em andamento" },
  { course: "Pós-graduação em Programação Back-End", school: "UNICV — Centro Universitário Cidade Verde", period: "2023" },
  { course: "Análise e Desenvolvimento de Sistemas", school: "Universidade Cidade de São Paulo (Unicid)", period: "2020 – 2023" },
];
