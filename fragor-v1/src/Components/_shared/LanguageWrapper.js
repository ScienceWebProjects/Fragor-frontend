// libs
import React from 'react';
import { IntlProvider } from 'react-intl';

// hooks
import { useState } from 'react';

// components

// UI elements

// tanslations
import English from '../../JSONs/en.json';
import Polish from '../../JSONs/pl.json';

// scss

export const Context = React.createContext();

const local = localStorage.getItem('language') || 'pl';
const lang = local === 'pl' ? Polish : English;

function LanguageWrapper(props) {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);

  function selectLang(langSelected) {
    const newLocale = langSelected;
    setLocale(newLocale);

    if (newLocale === 'pl') {
      setMessages(Polish);
    } else {
      setMessages(English);
    }
  }

  return (
    <Context.Provider value={{ locale, selectLang }}>
      <IntlProvider
        messages={messages}
        locale={locale}
      >
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
}

export default LanguageWrapper;
