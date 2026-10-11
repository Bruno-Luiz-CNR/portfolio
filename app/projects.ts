export type Category = "Mobile" | "Desktop" | "Web" | "Dados";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  repo: string;
  stack: string[];
  category: Category;
  highlights: string[];
}

const GH = "https://github.com/Bruno-Luiz-CNR";

export const projects: Project[] = [
  {
    slug: "barbearia",
    title: "Barbearia Online",
    tagline: "App Android de agendamento para salões",
    description:
      "Aplicativo Android nativo para barbearias e salões: login, cadastro de clientes, agenda de horários, controle de estoque, promoções e notificações.",
    image: "/projects/barbearia.webp",
    repo: `${GH}/android-salao-agendamento`,
    stack: ["Java", "Android", "SQLite"],
    category: "Mobile",
    highlights: ["Agenda de horários", "Estoque", "Notificações"],
  },
  {
    slug: "estoque",
    title: "Sistema de Vendas & Estoque",
    tagline: "ERP desktop com relatórios",
    description:
      "Sistema desktop para controle de estoque e vendas de mercadorias, com login, recuperação de senha, relatórios e persistência em SQL Server.",
    image: "/projects/estoque.webp",
    repo: `${GH}/csharp-controle-estoque-vendas`,
    stack: ["C#", ".NET WinForms", "SQL Server"],
    category: "Desktop",
    highlights: ["CRUD completo", "Relatórios", "Autenticação"],
  },
  {
    slug: "salao-desktop",
    title: "Salão Manager",
    tagline: "Agenda, estoque e promoções via WhatsApp",
    description:
      "Aplicação desktop em PyQt para salões: agendamentos por cliente ou funcionário, cálculo de valores, estoque de produtos e envio de promoções pelo WhatsApp.",
    image: "/projects/salao-desktop.webp",
    repo: `${GH}/python-salao-agendamento-desktop`,
    stack: ["Python", "PyQt / Qt Designer", "WhatsApp API"],
    category: "Desktop",
    highlights: ["Agendamentos", "Integração WhatsApp", "Estoque"],
  },
  {
    slug: "email",
    title: "BruTha Mail",
    tagline: "Cliente de envio de e-mails",
    description:
      "Aplicação com interface gráfica moderna para compor e enviar e-mails via SMTP do Gmail, com gerenciamento de destinatários.",
    image: "/projects/email.webp",
    repo: `${GH}/python-envio-emails`,
    stack: ["Python", "PySide6", "SMTP"],
    category: "Desktop",
    highlights: ["UI em Qt", "SMTP seguro", "Lista de contatos"],
  },
  {
    slug: "brutha-downloader",
    title: "BruTha Downloader",
    tagline: "App mobile para baixar vídeos",
    description:
      "Aplicativo mobile feito com Kivy/KivyMD, com navegação em drawer, para baixar vídeos e áudios do YouTube.",
    image: "/projects/brutha-downloader.webp",
    repo: `${GH}/python-kivy-app-android`,
    stack: ["Python", "Kivy", "KivyMD"],
    category: "Mobile",
    highlights: ["Material Design", "Download de mídia", "Android"],
  },
  {
    slug: "conversor",
    title: "Conversor MP4 → MP3",
    tagline: "Extração de áudio de vídeos",
    description:
      "Ferramenta desktop simples e rápida para converter arquivos de vídeo MP4 em áudio MP3.",
    image: "/projects/conversor.webp",
    repo: `${GH}/csharp-conversor-mp4-mp3`,
    stack: ["C#", ".NET", "WinForms"],
    category: "Desktop",
    highlights: ["Conversão de mídia", "Interface animada"],
  },
  {
    slug: "image-processing",
    title: "Image Processing",
    tagline: "Pacote Python de processamento de imagens",
    description:
      "Pacote Python publicável com módulos de correspondência de histograma, similaridade estrutural, redimensionamento e plotagem de imagens.",
    image: "/projects/image-processing.webp",
    repo: `${GH}/python-image-processing`,
    stack: ["Python", "scikit-image", "Matplotlib"],
    category: "Dados",
    highlights: ["Histogramas", "SSIM", "Pacote pip"],
  },
  {
    slug: "tecblog",
    title: "TecImobi",
    tagline: "Blog de imóveis responsivo",
    description:
      "Site de imobiliária com postagens de imóveis para aluguel e venda, barra lateral de anúncios e layout em HTML e CSS puros.",
    image: "/projects/tecblog.webp",
    repo: `${GH}/site-tecblog`,
    stack: ["HTML", "CSS"],
    category: "Web",
    highlights: ["Layout em grid", "Anúncios", "GitHub Pages"],
  },
  {
    slug: "gatos",
    title: "Raças de Gatos",
    tagline: "Site informativo sobre felinos",
    description:
      "Site sobre raças de gatos — Maine Coon, Persa, Savana, Siamês — com galeria, navegação e história de cada raça.",
    image: "/projects/gatos.webp",
    repo: `${GH}/site-racas-de-gatos`,
    stack: ["HTML", "CSS"],
    category: "Web",
    highlights: ["Galeria", "Layout semântico"],
  },
];

export const categories: ("Todos" | Category)[] = ["Todos", "Mobile", "Desktop", "Web", "Dados"];
