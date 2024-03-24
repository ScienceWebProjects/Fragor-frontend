// libs
// import React from 'react';

// hooks
import { useContext, useState } from 'react';

// components
import ButtonLang from './ButtonLang';
import OptionLang from './OptionLang';

// data
import { LangContext } from 'store/LanguageContext';

// utils

// assets
import plFlag from 'assets/images/pl.png';
import enFlag from 'assets/images/en.png';

function SelectLanguage(): JSX.Element {
  const langContext = useContext(LangContext)!;

  const [currentLang, setCurrentLang] = useState<string>(langContext.locale);
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  const languageSelectedText: string =
    currentLang === 'en' ? 'English' : 'Polski';

  const languageSelectedFlag = currentLang === 'en' ? enFlag : plFlag;

  const items = [
    {
      key: '1',
      label: (
        <OptionLang
          onClick={() => {
            langContext.selectLang('en');
            setCurrentLang('en');
          }}
          className='dropdown__option'
        >
          <img
            src={enFlag}
            alt='flag'
          />
          English
        </OptionLang>
      ),
    },
    {
      key: '2',
      label: (
        <OptionLang
          onClick={() => {
            langContext.selectLang('pl');
            setCurrentLang('pl');
          }}
          className='dropdown__option'
        >
          <img
            src={plFlag}
            alt='flag'
          />
          Polski
        </OptionLang>
      ),
    },
  ];

  return (
    <ButtonLang
      menu={{
        items,
        theme: 'dark',
      }}
    >
      <div>
        <img
          src={languageSelectedFlag}
          alt='flag'
        />
        {languageSelectedText}
      </div>
    </ButtonLang>
  );
}

export default SelectLanguage;
