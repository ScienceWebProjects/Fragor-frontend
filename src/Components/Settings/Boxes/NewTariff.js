// libs

// hooks
import { useState } from 'react';
// import useToken from '../../../Hooks/useToken';

// components

// UI elements

// scss

function NewTariff({ api, onNewTariff, isAdding }) {
  // const user = useToken();

  const [isActiveDay, setIsActiveDay] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const activeDayHandler = (day) => {
    setIsActiveDay((prevState) => ({
      ...prevState,
      [day]: !prevState[day], // Zmieniamy wartość na przeciwną
    }));

    const activeDay = document.getElementById(`${day}`);
    activeDay.classList.toggle('active');
  };

  const [index, setIndex] = useState(0);
  const newTariffPanels = () => {
    return (
      <div
        className='panel'
        style={{ transform: `translateX(${index * -100}%)` }}
      >
        <div className='panel-week'>
          <button
            id='mon'
            className='week-day'
            onClick={() => activeDayHandler('mon')}
          >
            Mon
          </button>
          <button
            id='tue'
            className='week-day'
            onClick={() => activeDayHandler('tue')}
          >
            Tue
          </button>
          <button
            id='wed'
            className='week-day'
            onClick={() => activeDayHandler('wed')}
          >
            Wed
          </button>
          <button
            id='thu'
            className='week-day'
            onClick={() => activeDayHandler('thu')}
          >
            Thu
          </button>
          <button
            id='fri'
            className='week-day'
            onClick={() => activeDayHandler('fri')}
          >
            Fri
          </button>
          <button
            id='sat'
            className='week-day'
            onClick={() => activeDayHandler('sat')}
          >
            Sat
          </button>
          <button
            id='sun'
            className='week-day'
            onClick={() => activeDayHandler('sun')}
          >
            Sun
          </button>
        </div>
        <div>Set hours</div>
        <div>Set price</div>
        <div>Code error!</div>
      </div>
    );
  };

  return (
    <div className='new-tariff'>
      {newTariffPanels()}
      <button
        className='tarrif-close-btn'
        onClick={() => isAdding(false)}
      >
        <i className='icon-cancel' />
      </button>
      <div className='tariff-panels'>
        <button
          className='panel-btn'
          onClick={() => {
            if (index > 0) setIndex(index - 1);
          }}
        >
          <i className='icon-left-open' />
        </button>
        <button
          className='panel-btn'
          onClick={() => {
            if (index < 2) setIndex(index + 1);
          }}
        >
          <i className='icon-right-open' />
        </button>
      </div>
    </div>
  );
}

export default NewTariff;
