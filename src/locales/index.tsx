import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { uzLatn } from './uz-Latn';
import { uzCyrl } from './uz-Cyrl';
import { ru } from './ru';
import { en } from './en';

export const translations = {
  'uz-Latn': uzLatn,
  'uz-Cyrl': uzCyrl,
  'ru': ru,
  'en': en,
};

export type TranslationKey = keyof typeof uzLatn;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'uz-Latn',
  setLanguage: () => {},
  t: (key) => uzLatn[key] || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('biolab_lang') as Language;
      if (saved && ['uz-Latn', 'uz-Cyrl', 'ru', 'en'].includes(saved)) {
        return saved;
      }
    }
    return 'uz-Latn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('biolab_lang', lang);
    }
  };

  const t = (key: TranslationKey, fallback?: string): string => {
    const currentDict = translations[language] || translations['uz-Latn'];
    return (currentDict as any)[key] || (translations['uz-Latn'] as any)[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
