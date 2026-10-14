"use client";

import { useCallback, useState } from "react";
import {
  Drawer,
  IconeEmail,
  IconeFechar,
  IconeInstagram,
  IconeMenu,
  IconeTikTok,
  LangSwitch,
  TapeDivider,
} from "@/components/RW";
import { MarcaRW } from "@/components/Logo";
import { useScrolledPast } from "@/hooks/useScrollEffects";
import { useLang } from "@/i18n/LangProvider";
import {
  EMAIL,
  INSTAGRAM,
  INSTAGRAM_HANDLE,
  TIKTOK,
  TIKTOK_HANDLE,
  mailto,
} from "@/lib/site";

const ANCORAS = [
  { id: "training", chave: "training" },
  { id: "technique", chave: "technique" },
  { id: "about", chave: "about" },
  { id: "gear", chave: "gear" },
] as const;

export function Header() {
  const { t } = useLang();
  const ativo = useScrolledPast(70);
  const [menu, setMenu] = useState(false);
  const fechar = useCallback(() => setMenu(false), []);

  const linkAgenda = mailto(t.private.mailSubject, t.private.mailBody);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: ativo ? "rgba(11,11,12,0.9)" : "transparent",
          backdropFilter: ativo ? "blur(14px)" : "none",
          WebkitBackdropFilter: ativo ? "blur(14px)" : "none",
          borderBottom: `1px solid ${
            ativo ? "rgba(255,210,31,0.18)" : "transparent"
          }`,
          transition:
            "background 320ms ease, border-color 320ms ease, backdrop-filter 320ms ease",
        }}
      >
        <div
          className="wrap rw-header-barra"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            height: ativo ? "var(--h-ativo)" : "var(--h-base)",
            transition: "height 320ms ease",
          }}
        >
          {/* marca */}
          <a
            href="#topo"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
            aria-label="Real World"
          >
            <MarcaRW tamanho={22} cor="var(--sinal)" />
            <span
              className="chivo rw-marca"
              style={{ color: "var(--osso)", letterSpacing: "0.02em" }}
            >
              Real World
            </span>
          </a>

          {/* nav desktop */}
          <nav className="rw-nav-desktop" aria-label="Sections">
            {ANCORAS.map(({ id, chave }) => (
              <a key={id} href={`#${id}`} className="rw-nav-link">
                {t.nav[chave]}
                <span className="rw-nav-fita" aria-hidden="true" />
              </a>
            ))}
          </nav>

          {/* direita */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div className="rw-lang-desktop">
              <LangSwitch />
            </div>

            <a
              href={linkAgenda}
              className="btn btn-sinal rw-book-desktop"
              style={{ minHeight: 0, padding: "12px 22px", fontSize: 12 }}
            >
              {t.nav.book}
            </a>

            <button
              type="button"
              className="rw-menu-botao"
              onClick={() => setMenu(true)}
              aria-label={t.nav.menu}
              aria-expanded={menu}
            >
              <IconeMenu s={26} cor="var(--osso)" />
            </button>
          </div>
        </div>
      </header>

      <Drawer aberto={menu} aoFechar={fechar}>
        {/* LangSwitch no topo do drawer, conforme especificado */}
        <div
          className="wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 58,
            flexShrink: 0,
          }}
        >
          <LangSwitch grande />
          <button
            type="button"
            onClick={fechar}
            aria-label={t.nav.close}
            style={{ padding: 8, margin: -8 }}
          >
            <IconeFechar s={26} cor="var(--osso)" />
          </button>
        </div>

        <TapeDivider largura="100%" />

        <nav
          className="wrap"
          aria-label="Sections"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            paddingTop: 40,
            paddingBottom: 40,
            flex: 1,
          }}
        >
          {ANCORAS.map(({ id, chave }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={fechar}
              className="chivo"
              style={{
                fontSize: 32,
                lineHeight: 1.35,
                color: "var(--osso)",
              }}
            >
              {t.nav[chave]}
            </a>
          ))}
        </nav>

        {/* O contato fecha o drawer: sem ele sobrava meia tela vazia entre os
            links e o CTA. */}
        <div
          className="wrap"
          style={{
            paddingBottom: "calc(28px + env(safe-area-inset-bottom))",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <li>
              <a href={`mailto:${EMAIL}`} className="rw-social-link">
                <IconeEmail s={18} />
                <span>{EMAIL}</span>
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="rw-social-link"
              >
                <IconeInstagram s={18} />
                <span>{INSTAGRAM_HANDLE}</span>
              </a>
            </li>
            <li>
              <a
                href={TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                className="rw-social-link"
              >
                <IconeTikTok s={18} />
                <span>{TIKTOK_HANDLE}</span>
              </a>
            </li>
          </ul>

          <a
            href={linkAgenda}
            onClick={fechar}
            className="btn btn-sinal"
            style={{ width: "100%" }}
          >
            {t.nav.book}
          </a>
        </div>
      </Drawer>
    </>
  );
}
