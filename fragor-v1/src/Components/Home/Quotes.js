import { useState, useEffect } from 'react';

import './UI/_quotes.scss';
import quotes from '../../JSONs/quotes.json';

const Quotes = ({ className }) => {
  const [quote, setQuote] = useState('A kto umarł ten nie żyje!');
  const [author, setAuthor] = useState('Rak Pieseł');

  const randomQuote = () => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    };

    const number = getRandomInt(16);

    const lang = localStorage.getItem('language') || 'en';
    localStorage.setItem('quote', quotes[lang][number].text);
    localStorage.setItem('author', quotes[lang][number].author);
  };

  const currentQuote = () => {
    setQuote(localStorage.getItem('quote'));
    setAuthor(localStorage.getItem('author'));
  };

  const currentHour = () => {
    const date = new Date();
    const hour = date.getHours();
    localStorage.setItem('currentHour', hour);
  };

  const rememberedHour = () => {
    const newDate = new Date();
    const thisHour = newDate.getHours();
    localStorage.setItem('rememberedHour', thisHour);
  };

  useEffect(() => {
    setTimeout(() => {
      currentHour();
    }, 1000);

    const showQuote = () => {
      if (
        localStorage.getItem('rememberedHour') == null ||
        localStorage.getItem('rememberedHour') !==
          localStorage.getItem('currentHour')
      ) {
        rememberedHour();
        randomQuote();
        currentQuote();
      } else {
        currentQuote();
      }
    };

    showQuote();
  }, []);

  return (
    <div className={`quote_wrapper ${className}`}>
      <div className='wrapper_quote'>{quote}</div>
      <div className='wrapper_author'>{author}</div>
    </div>
  );
};

export default Quotes;
