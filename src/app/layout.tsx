import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Chivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/i18n/LangProvider";
import { GrainOverlay } from "@/components/RW";

// Chivo 900 para titulo. Grotesca de personalidade forte e, ao contrario de
// Anton/Oswald/Bebas, tem o subset vietnamita completo.
const chivo = Chivo({
  variable: "--font-titulo",
  subsets: ["latin", "vietnamese"],
  weight: ["900"],
  display: "swap",
});

// ESCOLHA TECNICA, NAO ESTETICA: Be Vietnam Pro foi desenhada para
// vietnamita e latim simultaneamente. Inter, Manrope e similares renderizam
// mal os diacriticos vietnamitas (ế, ộ, ữ, ỹ). Num site bilingue isso
// aparece e denuncia descuido. NAO SUBSTITUIR.
const beVietnam = Be_Vietnam_Pro({
  variable: "--font-corpo",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-tec",
  subsets: ["latin", "vietnamese"],
  weight: ["500"],
  display: "swap",
});

// PENDENTE: dominio proprio. Enquanto nao houver, metadataBase aponta para o
// endereco de producao atual — ele e obrigatorio para o Next emitir URL
// ABSOLUTA no og:image. WhatsApp, iMessage e Slack descartam og:image relativa
// e o link vai sem preview nenhum.
const SITE = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://realworld-nu-eight.vercel.app",
);

const TITULO = "Real World — Technique that actually works";
const DESCRICAO =
  "BJJ black belt teaching MMA, boxing, kickboxing and self-defense in Ho Chi Minh City. Private sessions, one on one.";

export const metadata: Metadata = {
  metadataBase: SITE,
  // PENDENTE: o cliente usa "RealWorldMMA" no Instagram e "Real World Grappling"
  // no TikTok, e-mail e kimono. Confirmar qual e a marca oficial antes de
  // fechar title, dominio e open graph.
  title: "Real World — MMA, Boxing, Kickboxing & Self-Defense in Ho Chi Minh City",
  description: DESCRICAO,
  applicationName: "Real World",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Real World",
    title: TITULO,
    description: DESCRICAO,
    locale: "en_US",
    alternateLocale: ["vi_VN"],
    // JPEG, nao WebP: o WhatsApp nao renderiza preview de WebP.
    // 1200x630 e o formato que gera o cartao grande; 88 KB fica muito abaixo
    // do teto de ~600 KB que o WhatsApp aceita para buscar a imagem.
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Real World — technique that actually works. Ho Chi Minh City.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
    images: ["/og.jpg"],
  },
  // Os icones vem da convencao de arquivos do Next:
  //   src/app/favicon.ico    -> aba e favoritos (multi-tamanho, 16 a 256)
  //   src/app/icon.svg       -> navegadores modernos, vetorial
  //   src/app/apple-icon.png -> atalho na tela inicial do iOS (180x180)
  // Declarar metadata.icons a mao sobrescreveria isso, entao fica de fora.
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${chivo.variable} ${beVietnam.variable} ${jetbrains.variable}`}
    >
      <body>
        <LangProvider>
          {children}
          <GrainOverlay />
        </LangProvider>
      </body>
    </html>
  );
}
