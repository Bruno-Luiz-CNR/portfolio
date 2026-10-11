import type { Metadata } from "next";
import "./globals.css";

const description =
  "Desenvolvedor Back-End: APIs REST, automação de processos e dados com Node.js, TypeScript, NestJS, Python, Java e SQL.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bruno-luiz-portfolio.vercel.app"),
  title: "Bruno Luiz — Desenvolvedor Back-End",
  description,
  openGraph: {
    title: "Bruno Luiz — Desenvolvedor Back-End",
    description,
    url: "https://bruno-luiz-portfolio.vercel.app",
    siteName: "Portfólio Bruno Luiz",
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Bruno Luiz — Desenvolvedor Back-End", description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
