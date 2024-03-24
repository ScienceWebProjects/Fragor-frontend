// libs
import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

// hooks
import { useState } from 'react';
// components

// data
import English from 'data/en.json';
import Polish from 'data/pl.json';

// utils

interface LanguageContextType {
  locale: string;
  selectLang: (lang: string) => void;
}

export const LangContext = React.createContext<LanguageContextType | undefined>(
  undefined
);

const local = localStorage.getItem('language') || 'pl';
const lang = local === 'pl' ? Polish : English;

interface LanguageContextProps {
  children: ReactNode;
}

const LanguageContext: React.FC<LanguageContextProps> = ({ children }) => {
  const [locale, setLocale] = useState<string>(local);
  const [messages, setMessages] = useState<any>(lang);

  const selectLang = (langSelected: string): void => {
    const newLocale = langSelected;
    setLocale(newLocale);

    if (newLocale === 'pl') {
      setMessages(Polish);
    } else {
      setMessages(English);
    }
  };

  return (
    <LangContext.Provider value={{ locale, selectLang }}>
      <IntlProvider
        messages={messages}
        locale={locale}
      >
        {children}
      </IntlProvider>
    </LangContext.Provider>
  );
};

export default LanguageContext;
