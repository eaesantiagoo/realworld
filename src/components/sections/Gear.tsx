"use client";

import {
  IconeBandagem,
  IconeKettlebell,
  IconeLuva,
  IconePerna,
  IconeSetaDiagonal,
  MonoLabel,
  Reveal,
  TapeDivider,
} from "@/components/RW";
import { useLang } from "@/i18n/LangProvider";
import { AMAZON_SHOP } from "@/lib/site";

// A loja da Amazon e AFILIADO, nao produto dele: tratada como recomendacao,
// nunca como loja propria. A transparencia sobre ser afiliado e obrigatoria
// em varias jurisdicoes e aumenta a confianca — por isso o aviso aparece
// duas vezes: no texto de abertura e no rodape do bloco.
const ICONES = [IconeLuva, IconePerna, IconeBandagem, IconeKettlebell];

// PENDENTE: deep links por produto. Hoje as quatro categorias apontam todas
// para a vitrine (amazon.com/shop/mmarealworld), que e o unico link de
// afiliado confirmado. Quando houver a lista de produtos com as tags de
// afiliado dele, basta trocar o href de cada card por um link direto — a
// estrutura abaixo ja esta pronta para isso.
export function Gear() {
  const { t } = useLang();

  return (
    <section id="gear" className="bg-grafite rw-gear">
      <div className="wrap">
        <div className="rw-gear-topo">
          <div>
            <Reveal>
              <MonoLabel texto={t.gear.label} />
            </Reveal>

            <Reveal delay={60}>
              <h2 className="chivo lh-secao rw-gear-titulo">{t.gear.title}</h2>
            </Reveal>

            <TapeDivider largura={140} delay={140} />

            <Reveal delay={200}>
              <p className="rw-gear-texto">{t.gear.body}</p>
            </Reveal>
          </div>

          <Reveal delay={260} className="rw-gear-cta-topo">
            <a
              href={AMAZON_SHOP}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn btn-linha"
            >
              {t.gear.cta}
              <IconeSetaDiagonal s={16} />
            </a>
          </Reveal>
        </div>

        <ul className="rw-gear-cats">
          {t.gear.cats.map((c, i) => {
            const Icone = ICONES[i];
            return (
              <Reveal
                as="li"
                key={c.name}
                delay={300 + i * 70}
                className="rw-gear-cat"
              >
                <a
                  href={AMAZON_SHOP}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="rw-gear-card"
                >
                  <Icone s={28} cor="var(--sinal)" />
                  <div className="rw-gear-card-texto">
                    <h3 className="rw-gear-cat-nome">{c.name}</h3>
                    <p className="rw-gear-cat-desc">{c.desc}</p>
                  </div>
                  <span className="rw-gear-card-ir">
                    <span className="mono">{t.gear.shop}</span>
                    <IconeSetaDiagonal s={14} cor="var(--sinal)" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={600}>
          <p className="rw-gear-aviso">{t.gear.disclosure}</p>
        </Reveal>
      </div>
    </section>
  );
}
