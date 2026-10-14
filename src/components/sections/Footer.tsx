"use client";

import { MonoLabel, TapeDivider } from "@/components/RW";
import { MarcaRW } from "@/components/Logo";
import { useLang } from "@/i18n/LangProvider";
import {
  EMAIL,
  INSTAGRAM,
  INSTAGRAM_HANDLE,
  TIKTOK,
  TIKTOK_HANDLE,
} from "@/lib/site";

const ANCORAS = [
  { id: "training", chave: "training" },
  { id: "technique", chave: "technique" },
  { id: "about", chave: "about" },
  { id: "gear", chave: "gear" },
] as const;

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="rw-rodape">
      <div className="wrap">
        <div className="rw-rodape-grade">
          <div className="rw-rodape-marca">
            <div
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <MarcaRW tamanho={24} cor="var(--sinal)" />
              <span className="chivo" style={{ fontSize: 20 }}>
                Real World
              </span>
            </div>
            <p className="rw-rodape-local">{t.footer.location}</p>
          </div>

          <nav className="rw-rodape-nav" aria-label="Sections">
            <MonoLabel texto={t.footer.navTitle} cor="var(--cinza-escuro)" />
            <ul>
              {ANCORAS.map(({ id, chave }) => (
                <li key={id}>
                  <a href={`#${id}`}>{t.nav[chave]}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rw-rodape-contato">
            <MonoLabel texto={t.footer.contactTitle} cor="var(--cinza-escuro)" />
            <ul>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a href={TIKTOK} target="_blank" rel="noopener noreferrer">
                  {TIKTOK_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ opacity: 0.4, margin: "40px 0 24px" }}>
          <TapeDivider largura="100%" />
        </div>

        <p className="rw-rodape-copy">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
