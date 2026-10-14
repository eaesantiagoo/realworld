"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import en from "./en.json";
import vi from "./vi.json";

// PENDENTE: o conteudo em vi.json precisa de revisao por falante nativo
// antes de publicar. Traducao automatica de termo tecnico de luta
// (takedown, guard pass, sparring) costuma sair errada.
// Em vietnamita, muitos termos de MMA e BJJ sao mantidos em ingles —
// por isso os nomes das tecnicas na biblioteca ficaram em ingles de
// proposito, e so a categoria foi traduzida.

export type Lang = "en" | "vi";
type Dict = typeof en;

const DICTS: Record<Lang, Dict> = { en, vi: vi as Dict };
const STORAGE_KEY = "rw-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LangCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: en });

// A preferencia vive no localStorage, que e uma fonte externa ao React.
// Lida com useSyncExternalStore em vez de "useState + useEffect": assim o
// servidor renderiza sempre em ingles (getServerSnapshot), o cliente pega a
// preferencia salva ja na hidratacao, e nao ha setState dentro de efeito.
let memoria: Lang | null = null;
const ouvintes = new Set<() => void>();

function ler(): Lang {
  if (memoria) return memoria;
  try {
    const salvo = window.localStorage.getItem(STORAGE_KEY);
    memoria = salvo === "vi" ? "vi" : "en";
  } catch {
    // localStorage bloqueado (aba privada, cookies desligados): fica em ingles
    memoria = "en";
  }
  return memoria;
}

function escrever(l: Lang) {
  memoria = l;
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    // sem persistencia: a troca ainda vale para a sessao atual
  }
  for (const fn of ouvintes) fn();
}

function assinar(fn: () => void) {
  ouvintes.add(fn);
  // outra aba trocou o idioma
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      memoria = e.newValue === "vi" ? "vi" : "en";
      fn();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    ouvintes.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(assinar, ler, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => escrever(l), []);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: DICTS[lang] }),
    [lang, setLang],
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
