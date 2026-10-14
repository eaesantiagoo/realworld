"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  usePrefersReducedMotion,
  useRevealOnScroll,
} from "@/hooks/useScrollEffects";
import { useLang } from "@/i18n/LangProvider";

/* ============================================================
   1 — TapeDivider
   Bloco amarelo inclinado, referencia a fita de tatame e a bandagem.
   Nunca uma linha reta simples.
   ============================================================ */

export function TapeDivider({
  largura = 180,
  cor = "var(--sinal)",
  delay = 0,
  className,
}: {
  largura?: number | string;
  cor?: string;
  delay?: number;
  className?: string;
}) {
  const { ref, visivel } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{
        width: typeof largura === "number" ? `${largura}px` : largura,
        maxWidth: "100%",
        height: 6,
        background: cor,
        transform: "skewY(-2deg)",
        transformOrigin: "left center",
        scale: visivel ? "1 1" : "0 1",
        transition: `scale 700ms var(--ease-rw) ${delay}ms`,
      }}
    />
  );
}

/* ============================================================
   2 — TechMark
   A marcacao dele: circulo tracejado vermelho e seta curva.
   O traco se desenha ao entrar na viewport.

   USO NO SITE INTEIRO (4 ocorrencias, o teto definido no briefing):
     1. hero      — circulo sobre a mao enfaixada
     2. particulares — seta grande, opacity 0.08, apontando o CTA
     3. sobre     — circulo sobre a faixa preta
     4. agendamento — circulo em breu, 480px, opacity 0.07
   ============================================================ */

export function TechMark({
  tipo = "circulo",
  tamanho = 120,
  rotacao = 0,
  cor = "var(--marca)",
  opacidade = 1,
  espessura = 2.4,
  style,
  className,
}: {
  tipo?: "circulo" | "seta";
  tamanho?: number;
  rotacao?: number;
  cor?: string;
  opacidade?: number;
  espessura?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const { ref, visivel } = useRevealOnScroll<HTMLSpanElement>();
  const reduz = usePrefersReducedMotion();
  const uid = useId().replace(/:/g, "");
  const pronto = visivel || reduz;

  // Circulo de marcador: levemente irregular e aberto no fim da volta,
  // como um traco feito a mao por cima do video — nao um circle() perfeito.
  const dCirculo =
    "M53.5 5.5 C76 6.5 94.5 25.5 95 48.5 C95.5 73 75.5 94 51 94.5 " +
    "C26.5 95 5.5 75.5 5 50.5 C4.5 26 24 6.5 47.5 5.2";

  // Seta curva, como a que ele desenha apontando o detalhe que decide.
  const dSeta = "M8 78 C20 40 44 16 84 13";

  return (
    <span
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{
        display: "block",
        width: tamanho,
        height: tamanho,
        transform: `rotate(${rotacao}deg)`,
        opacity: opacidade,
        pointerEvents: "none",
        ...style,
      }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
        <defs>
          {/* A mascara revela o traco tracejado progressivamente. Animar
              stroke-dashoffset direto no path tracejado so faria as marcas
              andarem em volta ("formiguinhas"); com mascara ele desenha.

              O desenho e feito com o atributo SVG nativo pathLength={1} +
              transicao CSS, NAO com o pathLength do framer-motion: aquele
              assume o controle de strokeDasharray/strokeDashoffset e
              sobrescreve a animacao, deixando a marcacao invisivel. */}
          <mask id={`m-${uid}`}>
            <path
              d={tipo === "circulo" ? dCirculo : dSeta}
              stroke="#fff"
              strokeWidth={espessura * 4}
              strokeLinecap="round"
              fill="none"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={pronto ? 0 : 1}
              style={{
                transition: reduz
                  ? "none"
                  : "stroke-dashoffset 800ms var(--ease-rw)",
              }}
            />
          </mask>
        </defs>

        <g mask={`url(#m-${uid})`}>
          <path
            d={tipo === "circulo" ? dCirculo : dSeta}
            stroke={cor}
            strokeWidth={espessura}
            strokeLinecap="round"
            strokeDasharray={tipo === "circulo" ? "7 6.5" : "8 6"}
            fill="none"
          />
        </g>

        {tipo === "seta" && (
          <path
            d="M84 13 L70 10.5 M84 13 L79.5 25.5"
            stroke={cor}
            strokeWidth={espessura}
            strokeLinecap="round"
            fill="none"
            opacity={pronto ? 1 : 0}
            style={{
              transition: reduz ? "none" : "opacity 300ms ease 600ms",
            }}
          />
        )}
      </svg>
    </span>
  );
}

/* ============================================================
   3 — MonoLabel
   Rotulo tecnico, como anotacao de laboratorio.
   ============================================================ */

export function MonoLabel({
  texto,
  cor = "var(--cinza)",
  className,
  as: Tag = "p",
}: {
  texto: string;
  cor?: string;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag className={`mono ${className ?? ""}`} style={{ color: cor, margin: 0 }}>
      {texto}
    </Tag>
  );
}

/* ============================================================
   4 — PlayerVideo
   Os dois videos sao verticais (9:16) e curtos. Foram tratados como paineis
   verticais, nao forcados em container horizontal.
   ============================================================ */

export function PlayerVideo({
  src,
  poster,
  legenda,
  rotuloPlay,
}: {
  src: string;
  poster: string;
  legenda: string;
  rotuloPlay: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  const tocar = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    void v.play();
    setTocando(true);
  }, []);

  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          position: "relative",
          aspectRatio: "9 / 16",
          border: "1px solid var(--aco-claro)",
          background: "#000",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          controls={tocando}
          onEnded={() => setTocando(false)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {!tocando && (
          <button
            type="button"
            onClick={tocar}
            aria-label={rotuloPlay}
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background:
                "linear-gradient(to bottom, rgba(11,11,12,0.15), rgba(11,11,12,0.55))",
            }}
          >
            <span
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                border: "2px solid var(--sinal)",
                display: "grid",
                placeItems: "center",
                background: "rgba(11,11,12,0.42)",
                backdropFilter: "blur(2px)",
              }}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true">
                <path d="M2 1.5 L16 10 L2 18.5 Z" fill="var(--sinal)" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <figcaption
        className="mono"
        style={{ color: "var(--cinza-escuro)", marginTop: 14 }}
      >
        {legenda}
      </figcaption>
    </figure>
  );
}

/* ============================================================
   5 — Reveal
   ============================================================ */

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "section" | "article";
}) {
  const { ref, visivel } = useRevealOnScroll<HTMLDivElement>();

  return (
    <Tag
      // @ts-expect-error — a ref serve para qualquer um dos elementos aceitos
      ref={ref}
      className={className}
      style={{
        // O estado final e opacity 1 sem excecao: se o observer nunca
        // disparar (rolagem rapida, aba em background, navegador sem IO),
        // o hook ja marca visivel na checagem sincrona de bounding rect.
        opacity: visivel ? 1 : 0,
        transform: visivel ? "none" : `translateY(${y}px)`,
        transition: `opacity 700ms var(--ease-rw) ${delay}ms, transform 700ms var(--ease-rw) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   6 — RevealLines
   Revelacao linha a linha, 130ms entre linhas.
   ============================================================ */

export function RevealLines({
  linhas,
  className,
  style,
  intervalo = 130,
  delayInicial = 0,
  renderLinha,
}: {
  linhas: string[];
  className?: string;
  style?: CSSProperties;
  intervalo?: number;
  delayInicial?: number;
  renderLinha?: (linha: string, i: number) => ReactNode;
}) {
  const { ref, visivel } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div ref={ref} className={className} style={style}>
      {linhas.map((linha, i) => (
        <span
          key={i}
          style={{
            display: "block",
            // overflow hidden cortaria os diacriticos vietnamitas (ế, ộ, ữ);
            // por isso a mascara e so de opacidade + deslocamento.
            opacity: visivel ? 1 : 0,
            transform: visivel ? "none" : "translateY(22px)",
            transition: `opacity 700ms var(--ease-rw) ${
              delayInicial + i * intervalo
            }ms, transform 700ms var(--ease-rw) ${
              delayInicial + i * intervalo
            }ms`,
          }}
        >
          {renderLinha ? renderLinha(linha, i) : linha}
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   7 — GrainOverlay
   ============================================================ */

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        pointerEvents: "none",
        opacity: 0.04,
        mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%">
        <filter id="rw-grao">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#rw-grao)" />
      </svg>
    </div>
  );
}

/* ============================================================
   8 — LangSwitch
   ============================================================ */

export function LangSwitch({ grande = false }: { grande?: boolean }) {
  const { lang, setLang } = useLang();

  const base: CSSProperties = {
    fontFamily: "var(--font-corpo), sans-serif",
    fontWeight: 500,
    fontSize: grande ? 15 : 12,
    letterSpacing: "0.14em",
    // area tocavel de 44px mesmo com o rotulo de 12px
    padding: grande ? "12px 8px" : "13px 7px",
    transition: "color 200ms ease",
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: grande ? 12 : 9 }}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        style={{
          ...base,
          color: lang === "en" ? "var(--sinal)" : "var(--cinza)",
        }}
      >
        EN
      </button>
      <span
        aria-hidden="true"
        style={{
          width: 1,
          height: grande ? 16 : 12,
          background: "var(--aco-claro)",
        }}
      />
      <button
        type="button"
        onClick={() => setLang("vi")}
        aria-pressed={lang === "vi"}
        style={{
          ...base,
          color: lang === "vi" ? "var(--sinal)" : "var(--cinza)",
        }}
      >
        VI
      </button>
    </div>
  );
}

/* ============================================================
   9 — Icones
   Todos desenhados aqui, traco 1.6px. Sem biblioteca de icone.
   ============================================================ */

type IconProps = { s?: number; cor?: string; className?: string };

function Svg({
  s = 24,
  cor = "currentColor",
  className,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={cor}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Luva de boxe. */
export const IconeLuva = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 9.5a3.2 3.2 0 0 1 3.2-3.2h4.1a4.4 4.4 0 0 1 4.4 4.4v2.2a4 4 0 0 1-1.1 2.8l-1 1.1v1.4h-7.5v-1.6l-1.3-1.5a4.3 4.3 0 0 1-.8-2.6Z" />
    <path d="M17.2 8.1a2.2 2.2 0 0 1 2.3 2.2v1.3a2.2 2.2 0 0 1-2.1 2.2" />
    <path d="M9.4 11.9h4.8" />
    <path d="M7.2 18.2h7.5v1.4a1.4 1.4 0 0 1-1.4 1.4H8.6a1.4 1.4 0 0 1-1.4-1.4Z" />
  </Svg>
);

/** Kimono / gi cruzado. */
export const IconeKimono = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.6 3.2 4 6.1l1.7 3.6 1.6-1v9.4a1.7 1.7 0 0 0 1.7 1.7h6a1.7 1.7 0 0 0 1.7-1.7V8.7l1.6 1L20 6.1l-4.6-2.9" />
    <path d="M8.6 3.2 12 11l3.4-7.8" />
    <path d="M6.4 16.3h11.2" />
  </Svg>
);

/** Perna de chute. */
export const IconePerna = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.3 3.2v5.1a3 3 0 0 0 .9 2.1l3.3 3.3a2.4 2.4 0 0 1 .7 1.7v2.4" />
    <path d="M14.2 17.8h4.4l1.8 2.2" />
    <path d="M9.3 6.4 5.1 8.9" />
    <path d="M4 13.4l3.6 1.1" />
  </Svg>
);

/** Pessoa em guarda. */
export const IconeGuarda = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="5.1" r="2.3" />
    <path d="M12 7.4v5.4" />
    <path d="M12 9.2 8.4 7.6 6.6 9.9l2.6 1.6" />
    <path d="M12 9.2l3.6-1.6 1.8 2.3-2.6 1.6" />
    <path d="M12 12.8l-2.8 3.1v4.6" />
    <path d="M12 12.8l2.8 3.1v4.6" />
  </Svg>
);

/** Alvo. */
export const IconeAlvo = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <circle cx="12" cy="12" r="4.4" />
    <circle cx="12" cy="12" r="0.9" />
  </Svg>
);

/** Relogio. */
export const IconeRelogio = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 7.3V12l3.2 2" />
  </Svg>
);

/** Mapa / pino de local. */
export const IconeMapa = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s6.2-6 6.2-10.2A6.2 6.2 0 0 0 5.8 10.8C5.8 15 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.3" />
  </Svg>
);

/** E-mail. */
export const IconeEmail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.9" y="5.2" width="18.2" height="13.6" rx="1.4" />
    <path d="M3.4 6.4 12 12.7l8.6-6.3" />
  </Svg>
);

/** Instagram. */
export const IconeInstagram = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.3" y="3.3" width="17.4" height="17.4" rx="4.6" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
);

/** TikTok. */
export const IconeTikTok = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.3 3.2v10.9a3.8 3.8 0 1 1-3.8-3.8" />
    <path d="M14.3 5.1a4.6 4.6 0 0 0 4.4 3.4" />
  </Svg>
);

/** Seta diagonal (hover das disciplinas). */
export const IconeSetaDiagonal = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7.4 16.6 16.6 7.4" />
    <path d="M9 7.4h7.6V15" />
  </Svg>
);

/** Check. */
export const IconeCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.6 12.6 9.4 17.4 19.4 7" />
  </Svg>
);

/** Bandagem de mao. */
export const IconeBandagem = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.2 7.4h11.6a1.6 1.6 0 0 1 1.6 1.6v6a1.6 1.6 0 0 1-1.6 1.6H6.2a1.6 1.6 0 0 1-1.6-1.6V9a1.6 1.6 0 0 1 1.6-1.6Z" />
    <path d="M8.6 7.4 6.9 16.6" />
    <path d="M13 7.4l-1.7 9.2" />
    <path d="M17.4 7.4l-1.7 9.2" />
    <path d="M19.4 10.4h1.9a1 1 0 0 1 1 1v1.2a1 1 0 0 1-1 1h-1.9" />
  </Svg>
);

/** Kettlebell. */
export const IconeKettlebell = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.1 8.6a3.2 3.2 0 1 1 5.8 0" />
    <path d="M14.9 8.6c2.3 1.3 3.7 3.8 3.7 6.5a5 5 0 0 1-.3 1.8 1.5 1.5 0 0 1-1.4 1H7.1a1.5 1.5 0 0 1-1.4-1 5 5 0 0 1-.3-1.8c0-2.7 1.4-5.2 3.7-6.5" />
    <path d="M8.8 8.6h6.4" />
  </Svg>
);

/** Menu (hamburguer de duas barras, sem o terceiro traco generico). */
export const IconeMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.6 9h16.8" />
    <path d="M3.6 15h10.6" />
  </Svg>
);

/** Fechar. */
export const IconeFechar = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.6 5.6 18.4 18.4" />
    <path d="M18.4 5.6 5.6 18.4" />
  </Svg>
);

/* ============================================================
   Drawer mobile — usado pelo header
   ============================================================ */

export function Drawer({
  aberto,
  aoFechar,
  children,
}: {
  aberto: boolean;
  aoFechar: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoFechar();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", onKey);
    };
  }, [aberto, aoFechar]);

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            background: "var(--breu)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
