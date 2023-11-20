// libs

// hooks
import { useContext, useState } from 'react';

// components
import { Context } from '../../_shared/LanguageWrapper';

// UI elements
import LanguageSelectedStyle from './UI/LanguageSelectedStyle';

// scss
import '../scss/_SelectLanguage.scss';

function SelectLanguage() {
  const context = useContext(Context);

  // variables for change language
  const [currentLang, setCurrentLang] = useState(context.locale);
  const [isOpen, setIsOpen] = useState(false);

  // variables for current language change
  const languageSelectedText = currentLang === 'en' ? 'English' : 'Polski';
  const languageSelectedFlag =
    currentLang === 'en'
      ? 'url(https://flagsapi.com/US/flat/32.png)'
      : 'url(https://flagsapi.com/PL/flat/32.png)';

  return (
    <div className='lang-menu'>
      <LanguageSelectedStyle
        className='selected-lang'
        $flagimage={languageSelectedFlag}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {languageSelectedText}
      </LanguageSelectedStyle>
      <ul style={{ display: isOpen ? 'block' : 'none' }}>
        <li>
          <a
            href='#'
            className='en'
            onClick={() => {
              context.selectLang('en');
              setCurrentLang('en');
              localStorage.setItem('language', 'en');
              setIsOpen(false);
            }}
          >
            English
          </a>
        </li>
        <li>
          <a
            href='#'
            className='pl'
            onClick={() => {
              context.selectLang('pl');
              setCurrentLang('pl');
              localStorage.setItem('language', 'pl');
              setIsOpen(false);
            }}
          >
            Polski
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SelectLanguage;
