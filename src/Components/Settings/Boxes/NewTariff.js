// libs

// hooks
import { useState } from 'react';
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import InfoType from '../../Authorization/Signin/UI/InfoType';
import StyledInput from '../../UI/authorization/StyledInput';

// scss

function NewTariff({ api, onNewTariff, isAdding }) {
  const user = useToken();

  const [index, setIndex] = useState(0);
  const PANEL_NUMBERS = 3;
  const isSaveBtn = index < PANEL_NUMBERS ? false : true;
  const [tariffName, setTariffName] = useState('');
  const [isActiveDay, setIsActiveDay] = useState({
    workingDays: false,
    weekend: false,
  });
  const [fromHour, setFromHour] = useState(0);
  const [toHour, setToHour] = useState(24);
  const [tariffPrice, setTariffPrice] = useState(0.0);
  const [errors, setErrors] = useState({});

  const activeDayHandler = (day) => {
    setIsActiveDay((prevState) => ({
      ...prevState,
      [day]: !prevState[day], // change the value to the opposite
    }));

    const activeDay = document.getElementById(`${day}`);
    activeDay.classList.toggle('active');
  };

  const saveTariffApiCall = async (tarriffID = null) => {
    const tariffData = {
      tarriffID: tarriffID,
      name: tariffName,
      weekDay: {
        hours: {
          from: fromHour,
          to: toHour,
        },
        workingDays: isActiveDay.workingDays,
        weekend: isActiveDay.weekend,
      },
      price: tariffPrice,
    };

    console.log(tariffData);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(tariffData),
    };

    try {
      const response = await fetch(
        `${api.ip}${api.settingTariffs}`,
        requestOptions
      );

      if (response.status === 200) {
        return alert('Succesfully tariff added.');
      }

      if (response.status === 404) {
        const res404 = await response.json();
        return res404.message
          ? alert(res404.message)
          : alert('Something went bad.');
      }
    } catch (error) {
      console.log(error);
      alert(
        'An unpredictable problem has been encountered. \nPlease add tariff again.'
      );
    }
  };

  const saveTariffHandler = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (tariffName.trim() === '') {
      newErrors.name = 'Tariff name is required!';
    }

    if (isActiveDay.workingDays === false && isActiveDay.weekend === false) {
      newErrors.days = 'You must choose tariff days!';
    }

    if (fromHour < 0) {
      newErrors.hours = 'Start hour must be greater or equal 0!';
    } else if (toHour > 24) {
      newErrors.hours = 'End hour must be smaller or equal 24!';
    } else if (parseInt(fromHour, 10) >= parseInt(toHour, 10)) {
      newErrors.hours = 'Start hour must be smaller than end hour!';
    }

    if (tariffPrice <= 0) {
      newErrors.price = 'Price value must be greater than 0!';
    }

    setErrors(newErrors);
    alert(
      `${newErrors.name}\n${newErrors.days}\n${newErrors.hours}\n${newErrors.price}`
    ); // create alert box

    if (Object.keys(newErrors).length === 0) {
      saveTariffApiCall();
    }
  };

  const newTariffPanels = () => {
    return (
      <div
        className='panel'
        style={{ transform: `translateX(${index * -100}%)` }}
      >
        <div className='panel-name'>
          <InfoType text={'Set name'} />
          <div className='name-input'>
            <label htmlFor='price'>Tariff name</label>
            <input
              className='input-style name-value'
              name='name'
              id='name'
              type='text'
              value={tariffName}
              onChange={(event) => {
                setTariffName(event.target.value);
              }}
            />
          </div>
        </div>

        <div className='panel-week'>
          <InfoType text={'Tariff days'} />

          <button
            type='button'
            id='workingDays'
            className='week-day'
            onClick={() => activeDayHandler('workingDays')}
          >
            Monday - Friday
          </button>
          <button
            type='button'
            id='weekend'
            className='week-day'
            onClick={() => activeDayHandler('weekend')}
          >
            Saturday - Sunday
          </button>
        </div>

        <div className='panel-hours'>
          <InfoType text={'Set hours'} />
          <div className='hours-inputs'>
            <div className='hour-input'>
              <label htmlFor='from-hour'>From hour</label>
              <input
                className='input-style'
                name='from-hour'
                id='from-hour'
                type='number'
                value={fromHour}
                onChange={(event) => {
                  setFromHour(event.target.value);
                }}
              />
            </div>

            <div className='hour-input'>
              <label htmlFor='to-hour'>To hour</label>
              <input
                className='input-style'
                name='to-hour'
                id='to-hour'
                type='number'
                value={toHour}
                onChange={(event) => {
                  setToHour(event.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className='panel-price'>
          <InfoType text={'Set price'} />
          <div className='price-input'>
            <label htmlFor='price'>Tariff price</label>
            <input
              className='input-style price-value'
              name='price'
              id='price'
              type='number'
              step={0.01}
              value={tariffPrice}
              onChange={(event) => {
                setTariffPrice(event.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <InfoType text={'Code error!'} />
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={saveTariffHandler}
      className='new-tariff'
    >
      {newTariffPanels()}
      <button
        type='button'
        className='tarrif-close-btn'
        onClick={() => isAdding(false)}
      >
        <i className='icon-cancel' />
      </button>
      <div className='tariff-panels'>
        <button
          type='button'
          className='panel-btn'
          onClick={() => {
            if (index > 0) setIndex(index - 1);
          }}
        >
          <i className='icon-left-open' />
        </button>
        {!isSaveBtn && (
          <button
            type='button'
            className='panel-btn'
            onClick={() => {
              if (index < PANEL_NUMBERS) setIndex(index + 1);
            }}
          >
            <i className='icon-right-open' />
          </button>
        )}
        {isSaveBtn && (
          <button
            className='panel-btn save-btn'
            type='submit'
          >
            <i className='icon-floppy' />
          </button>
        )}
      </div>
    </form>
  );
}

export default NewTariff;
