import { useState, useEffect } from 'react';

import Card from '../UI/shared/Card';

import './UI/_quotes.scss';

const Quotes = () => {
  const [quote, setQuote] = useState('A kto umarł ten nie żyje!');
  const [author, setAuthor] = useState('Rak Pieseł');

  const makeAPICall = async () => {
    const quoteFetch = await fetch('https://type.fit/api/quotes');
    const data = await quoteFetch.json();

    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    };

    const number = getRandomInt(16);

    if (data) {
      localStorage.setItem('quote', data[number].text);
      localStorage.setItem('author', data[number].author);
    }
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
        localStorage.getItem('rememberedHour') !== localStorage.getItem('currentHour')
      ) {
        rememberedHour();
        makeAPICall();
        currentQuote();
      } else {
        currentQuote();
      }
    };

    showQuote();
  }, []);

  return (
    <Card className='quote_wrapper'>
      <Card className='wrapper_quote'>{quote}</Card>
      <Card className='wrapper_author'>{author}</Card>
    </Card>
  );
};

export default Quotes;
