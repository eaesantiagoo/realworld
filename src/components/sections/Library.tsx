"use client";

import { MonoLabel, Reveal, TapeDivider } from "@/components/RW";
import { useLang } from "@/i18n/LangProvider";
import { INSTAGRAM } from "@/lib/site";

// EXPANSAO: esta secao foi estruturada para virar uma biblioteca real.
// Quando houver videos hospedados ou um produto digital, cada card
// pode abrir uma pagina propria (/technique/[slug]) em vez de mandar
// para o Instagram — so o href de cada card muda.

export function Library() {
  const { t } = useLang();

  return (
    <section id="technique" className="secao bg-breu">
      <div className="wrap">
        <Reveal>
          <MonoLabel texto={t.library.label} />
        </Reveal>

        <Reveal delay={60}>
          <h2 className="chivo lh-secao rw-titulo-secao">{t.library.title}</h2>
        </Reveal>

        <TapeDivider largura={200} delay={140} />

        <Reveal delay={200}>
          <p className="rw-texto-abertura" style={{ maxWidth: 560 }}>
            {t.library.body}
          </p>
        </Reveal>
      </div>

      {/* Grade em todas as larguras — 2 colunas no celular, 3 no tablet, 4 no
          desktop. Sem carrossel lateral: ele esconderia metade das tecnicas
          atras de um gesto que o visitante nao tem como adivinhar. */}
      <div className="rw-lib-trilho">
        <ul className="rw-lib-grade">
          {t.library.items.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 60} className="rw-lib-item">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="rw-lib-card"
              >
                <MonoLabel
                  texto={`${t.library.unit} / ${String(i + 1).padStart(2, "0")}`}
                  cor="var(--cinza-escuro)"
                />
                <h3 className="chivo rw-lib-nome">{item.name}</h3>
                <p className="rw-lib-cat">{item.cat}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Numeros baseados no Instagram em outubro de 2026. Confirmar e
          atualizar antes de publicar. */}
      <div className="wrap">
        <ul className="rw-lib-alcance">
          {t.library.stats.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 80} className="rw-lib-stat">
              <span className="chivo rw-lib-stat-num">{s.value}</span>
              <MonoLabel texto={s.label} cor="var(--cinza)" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
