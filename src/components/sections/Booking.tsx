"use client";

import { MonoLabel, Reveal, RevealLines, TechMark } from "@/components/RW";
import { useLang } from "@/i18n/LangProvider";
import { EMAIL, mailto } from "@/lib/site";

// UNICO BLOCO DE AMARELO CHAPADO DO SITE INTEIRO.
export function Booking() {
  const { t } = useLang();

  return (
    <section className="rw-agenda">
      {/* TechMark 4 de 4 — circulo em breu, bem apagado, atras do conteudo */}
      <TechMark
        tipo="circulo"
        tamanho={480}
        cor="var(--breu)"
        opacidade={0.07}
        espessura={2}
        rotacao={-6}
        className="rw-agenda-marca"
      />

      <div className="rw-agenda-conteudo">
        <Reveal>
          <MonoLabel texto={t.booking.label} cor="rgba(11,11,12,0.62)" />
        </Reveal>

        <RevealLines
          className="chivo rw-agenda-titulo"
          linhas={[t.booking.l1, t.booking.l2]}
          delayInicial={80}
        />

        <Reveal delay={320}>
          <p className="rw-agenda-texto">{t.booking.body}</p>
        </Reveal>

        <Reveal delay={400}>
          <a
            href={mailto(t.private.mailSubject, t.private.mailBody)}
            className="btn btn-breu rw-agenda-cta"
          >
            {t.booking.cta}
          </a>
        </Reveal>

        <Reveal delay={460}>
          <a href={`mailto:${EMAIL}`} className="rw-agenda-email">
            {EMAIL}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
