"use client";

import {
  IconeAlvo,
  IconeCheck,
  IconeMapa,
  IconeRelogio,
  MonoLabel,
  PlayerVideo,
  Reveal,
  TapeDivider,
  TechMark,
} from "@/components/RW";
import { useLang } from "@/i18n/LangProvider";
import { mailto } from "@/lib/site";

const ICONES = [IconeCheck, IconeRelogio, IconeAlvo, IconeMapa];

export function Private() {
  const { t } = useLang();

  return (
    <section id="booking-info" className="secao bg-claro rw-priv">
      {/* TechMark 2 de 4 — seta grande e discreta apontando para o CTA.
          Em BREU, nao em vermelho: sobre o osso, vermelho a 0,1 de opacidade
          vira rosa lavado e parece sujeira na tela. O vermelho fica reservado
          para as duas marcacoes nitidas (hero e sobre). */}
      <TechMark
        tipo="seta"
        tamanho={280}
        rotacao={130}
        cor="var(--breu)"
        opacidade={0.1}
        espessura={3}
        className="rw-priv-seta"
      />

      <div className="wrap rw-priv-grade">
        <div>
          <Reveal>
            <MonoLabel texto={t.private.label} />
          </Reveal>

          <Reveal delay={60}>
            <h2 className="chivo lh-secao rw-titulo-secao">{t.private.title}</h2>
          </Reveal>

          <TapeDivider largura={160} delay={140} cor="var(--breu)" />

          <Reveal delay={200}>
            <p className="rw-priv-texto">{t.private.body}</p>
          </Reveal>

          <ul className="rw-priv-pontos">
            {t.private.points.map((p, i) => {
              const Icone = ICONES[i];
              return (
                <Reveal as="li" key={p} delay={260 + i * 70} className="rw-priv-ponto">
                  <Icone s={18} cor="var(--sinal)" />
                  <span>{p}</span>
                </Reveal>
              );
            })}
          </ul>

          {/* PENDENTE: preco, moeda, pacotes, onde exatamente a aula acontece,
              se ele vai ate o aluno, e se atende grupo ou casal. Nada disso
              foi confirmado, entao nada disso aparece no site. */}

          <Reveal delay={560}>
            <a
              href={mailto(t.private.mailSubject, t.private.mailBody)}
              className="btn btn-sinal rw-priv-cta"
            >
              {t.private.cta}
            </a>
          </Reveal>
        </div>

        <Reveal delay={160} className="rw-priv-video">
          <PlayerVideo
            src="/assets/training.mp4"
            poster="/assets/poster-training.webp"
            legenda={t.private.caption}
            rotuloPlay={t.private.play}
          />
        </Reveal>
      </div>
    </section>
  );
}
