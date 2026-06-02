import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Language, type Translations } from "./translations";

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "bv_lang";

function detectLang(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && translations[stored]) return stored;
    const browser = navigator.language.split("-")[0] as Language;
    if (translations[browser]) return browser;
  } catch {}
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(detectLang);

  const setLang = (l: Language) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT(): Translations {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx.t;
}

export function useLang(): { lang: Language; setLang: (l: Language) => void } {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return { lang: ctx.lang, setLang: ctx.setLang };
}
