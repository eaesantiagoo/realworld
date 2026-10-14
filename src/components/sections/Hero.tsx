"use client";

import Image from "next/image";
import {
  MonoLabel,
  RevealLines,
  Reveal,
  TapeDivider,
  TechMark,
} from "@/components/RW";
import { useLang } from "@/i18n/LangProvider";
import { mailto } from "@/lib/site";

export function Hero() {
  const { t } = useLang();

  return (
    <section id="topo" className="rw-hero">
      {/* A foto enfaixando as maos ja tem fundo escuro e luz de recorte:
          integra ao breu sem filtro nenhum. No desktop ela SANGRA pela borda
          direita e inferior e encontra o texto num CORTE DURO, nao num
          degrade longo — a unica sombra e um encosto curto de 18% para o
          titulo nao brigar com a imagem onde ele atravessa. */}
      <div className="rw-hero-foto">
        <Image
          src="/assets/wraps.webp"
          alt={t.hero.alt}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 52vw"
          style={{ objectFit: "cover", objectPosition: "58% 34%" }}
        />
        <div className="rw-hero-veu" aria-hidden="true" />

        {/* TechMark 1 de 4 — circulo sobre a mao enfaixada */}
        <div className="rw-hero-marca">
          <TechMark tipo="circulo" tamanho={92} rotacao={-12} />
          <MonoLabel texto={t.hero.mark} cor="var(--marca)" />
        </div>
      </div>

      <div className="wrap rw-hero-grade">
        <div className="rw-hero-conteudo">
          <Reveal>
            <MonoLabel texto={t.hero.label} />
          </Reveal>

          <RevealLines
            className="chivo lh-tight rw-hero-titulo"
            delayInicial={120}
            linhas={[t.hero.l1, t.hero.l2, t.hero.l3]}
            renderLinha={(linha, i) => (
              <span style={{ color: i === 2 ? "var(--sinal)" : "var(--osso)" }}>
                {linha}
              </span>
            )}
          />

          <TapeDivider largura={180} delay={520} />

          <Reveal delay={600}>
            <p className="rw-hero-sub">{t.hero.sub}</p>
          </Reveal>

          <Reveal delay={680}>
            <div className="rw-hero-ctas">
              <a
                href={mailto(t.private.mailSubject, t.private.mailBody)}
                className="btn btn-sinal"
              >
                {t.hero.cta1}
              </a>
              <a href="#technique" className="btn btn-linha">
                {t.hero.cta2}
              </a>
            </div>
          </Reveal>

          <Reveal delay={740}>
            <p className="rw-hero-nota">{t.hero.note}</p>
          </Reveal>
        </div>
      </div>

      {/* Faixa tecnica no pe do hero. Da chao a composicao e ocupa o vazio
          que sobrava embaixo com informacao, nao com decoracao. */}
      <Reveal delay={820} className="rw-hero-faixa">
        <div className="wrap rw-hero-faixa-grade">
          {t.hero.strip.map((item) => (
            <div key={item.k} className="rw-hero-faixa-item">
              <MonoLabel texto={item.k} cor="var(--cinza-escuro)" />
              <span className="rw-hero-faixa-valor">{item.v}</span>
            </div>
          ))}
          <span className="rw-hero-scroll" aria-hidden="true" />
        </div>
      </Reveal>
    </section>
  );
}
