"use client";

import {
  IconeAlvo,
  IconeGuarda,
  IconeKimono,
  IconeLuva,
  IconePerna,
  IconeSetaDiagonal,
  MonoLabel,
  Reveal,
  TapeDivider,
} from "@/components/RW";
import { useLang } from "@/i18n/LangProvider";

// Cinco disciplinas, nao tres. Cinco quebra o grid de tres cards iguais que
// denuncia template — e por isso o layout e uma LISTA de linhas largura
// total, nao um grid de cards.
const ICONES = [IconeGuarda, IconeLuva, IconePerna, IconeKimono, IconeAlvo];

export function Disciplines() {
  const { t } = useLang();

  return (
    <section id="training" className="secao bg-grafite">
      <div className="wrap">
        <Reveal>
          <MonoLabel texto={t.disciplines.label} />
        </Reveal>

        <Reveal delay={60}>
          <h2 className="chivo lh-secao rw-titulo-secao">
            {t.disciplines.title}
          </h2>
        </Reveal>

        <TapeDivider largura={220} delay={140} />

        <Reveal delay={200}>
          <p className="rw-texto-abertura">{t.disciplines.intro}</p>
        </Reveal>

        <ul className="rw-disc-lista">
          {t.disciplines.items.map((item, i) => {
            const Icone = ICONES[i];
            return (
              <Reveal as="li" key={item.name} delay={i * 80} className="rw-disc-li">
                <div className="rw-disc-linha">
                  <span className="chivo rw-disc-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="rw-disc-texto">
                    <h3 className="chivo rw-disc-nome">{item.name}</h3>
                    <p className="rw-disc-desc">{item.desc}</p>
                  </div>

                  <div className="rw-disc-fim">
                    <Icone s={24} cor="var(--cinza-escuro)" className="rw-disc-icone" />
                    <span className="rw-disc-seta" aria-hidden="true">
                      <IconeSetaDiagonal s={18} cor="var(--sinal)" />
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
