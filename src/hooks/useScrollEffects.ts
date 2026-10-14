"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Rede de seguranca da revelacao.

   O IntersectionObserver usa rootMargin negativo embaixo para o conteudo
   revelar um pouco DEPOIS de encostar na borda — e o que da o ritmo. O preco
   e uma faixa morta: se o usuario para de rolar com um elemento dentro dessa
   faixa, ele esta visivel na tela e continua com opacity 0.

   Entao: enquanto rola, quem manda e o observer (ritmo preservado); quando a
   rolagem ASSENTA, esta varredura exige opacity 1 de tudo que esteja de fato
   dentro da viewport. Um unico listener serve todos os elementos.
   ------------------------------------------------------------------ */

type Pendente = { el: HTMLElement; mostrar: () => void };

const pendentes = new Set<Pendente>();
let instalado = false;
let timerAssenta = 0;

function varrer() {
  const h = window.innerHeight;
  for (const item of [...pendentes]) {
    const r = item.el.getBoundingClientRect();
    if (r.top < h && r.bottom > 0) {
      item.mostrar();
      pendentes.delete(item);
    }
  }
  if (pendentes.size === 0) desinstalar();
}

function aoRolar() {
  window.clearTimeout(timerAssenta);
  timerAssenta = window.setTimeout(varrer, 150);
}

function instalar() {
  if (instalado) return;
  instalado = true;
  window.addEventListener("scroll", aoRolar, { passive: true });
  window.addEventListener("resize", aoRolar);
  // Uma varredura logo apos a montagem fecha o caso em que a pagina ja abre
  // rolada (restauracao de scroll do navegador, link com ancora) e nenhum
  // evento de scroll chega a ser disparado.
  window.setTimeout(varrer, 400);
}

function desinstalar() {
  if (!instalado) return;
  instalado = false;
  window.clearTimeout(timerAssenta);
  window.removeEventListener("scroll", aoRolar);
  window.removeEventListener("resize", aoRolar);
}

/** Dispara uma unica vez quando o elemento entra na viewport. */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "0px 0px -12% 0px",
) {
  const ref = useRef<T>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const marcar = () => setVisivel(true);
    let raf = 0;

    // Sem IntersectionObserver o conteudo ja nasce visivel — o estado final
    // NUNCA pode depender da animacao.
    if (typeof IntersectionObserver === "undefined") {
      raf = requestAnimationFrame(marcar);
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            marcar();
            io.disconnect();
          }
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    io.observe(el);

    // registra na rede de seguranca ate ser revelado
    const item: Pendente = { el, mostrar: marcar };
    pendentes.add(item);
    instalar();

    // Rolagem muito rapida pode passar do elemento antes de o observer
    // registrar o cruzamento. Esta medicao garante o opacity 1. Roda um
    // frame depois: o layout ja assentou e nao ha setState sincrono dentro
    // do corpo do efeito.
    raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) marcar();
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      pendentes.delete(item);
      if (pendentes.size === 0) desinstalar();
    };
  }, [rootMargin]);

  return { ref, visivel };
}

/** Progresso de rolagem da pagina, 0 a 1. */
export function useScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let frame = 0;
    const calc = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return p;
}

/** true abaixo de 768px. */
export function useIsMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return mobile;
}

/** true depois de N pixels de rolagem — usado pelo header. */
export function useScrolledPast(px: number) {
  const [passou, setPassou] = useState(false);

  useEffect(() => {
    const onScroll = () => setPassou(window.scrollY > px);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [px]);

  return passou;
}

/** Respeita prefers-reduced-motion. */
export function usePrefersReducedMotion() {
  const [reduz, setReduz] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduz(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduz;
}
