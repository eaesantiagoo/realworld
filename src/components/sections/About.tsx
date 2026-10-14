"use client";

import Image from "next/image";
import {
  IconeInstagram,
  IconeTikTok,
  MonoLabel,
  Reveal,
  TapeDivider,
  TechMark,
} from "@/components/RW";
import { useLang } from "@/i18n/LangProvider";
import {
  INSTAGRAM,
  INSTAGRAM_HANDLE,
  TIKTOK,
  TIKTOK_HANDLE,
} from "@/lib/site";

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="secao bg-claro">
      <div className="wrap rw-sobre-grade">
        {/* O fundo branco da foto de estudio nao e escondido: a secao inteira
            vira clara e a foto assenta numa PLACA do mesmo branco exato do
            fundo dela (#fefefe), entao nao ha emenda nem figura flutuando.
            A placa e fechada por uma fita amarela na borda inferior. */}
        <div className="rw-sobre-placa">
          <Image
            src="/assets/gi-estudio.webp"
            alt={t.about.alt}
            width={650}
            height={914}
            sizes="(max-width: 1023px) 86vw, 40vw"
            style={{ width: "100%", height: "auto" }}
          />

          {/* TechMark 3 de 4 — circulo sobre a faixa preta.
              Coordenadas medidas na propria imagem recortada: o centro da
              regiao escura cai em x 46% / y 88%. */}
          <TechMark
            tipo="circulo"
            tamanho={92}
            rotacao={8}
            className="rw-sobre-circulo"
          />

          <div className="rw-sobre-placa-pe">
            <MonoLabel texto={t.about.plate} cor="var(--tinta-fraca)" />
            <MonoLabel texto={t.about.mark} cor="var(--marca)" />
          </div>
        </div>

        <div className="rw-sobre-texto">
          <Reveal>
            <MonoLabel texto={t.about.label} />
          </Reveal>

          {/* PENDENTE: nome completo do instrutor. Nao publicar nome deduzido —
              por isso o titulo e a marca, nao a pessoa. */}
          <Reveal delay={60}>
            <h2 className="chivo lh-secao rw-titulo-secao">{t.about.title}</h2>
          </Reveal>

          <TapeDivider largura={160} delay={140} cor="var(--breu)" />

          {/* PENDENTE E IMPORTANTE: linhagem da faixa preta (por quem, que ano,
              quantos graus), tempo de treino, tempo de ensino, cartel de luta,
              equipe ou associacao.
              Em artes marciais, credencial vaga custa autoridade. NAO INVENTAR
              NADA — os tres paragrafos abaixo so afirmam o que o cliente ja
              afirma publicamente.

              PENDENTE: a bio do TikTok dele diz "Law Enforcement". Se
              autorizado, isso vira o diferencial mais forte do site — alguem
              que ensina defesa pessoal e usa no trabalho. NAO PUBLICAR sem
              autorizacao explicita. Se autorizado, adicionar um bloco de
              destaque aqui. */}
          {[t.about.p1, t.about.p2, t.about.p3].map((p, i) => (
            <Reveal key={i} delay={200 + i * 70}>
              <p className="rw-sobre-p">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={440}>
            <ul className="rw-sobre-social">
              <li>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rw-social-link"
                >
                  <IconeInstagram s={20} />
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
                  <IconeTikTok s={20} />
                  <span>{TIKTOK_HANDLE}</span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
