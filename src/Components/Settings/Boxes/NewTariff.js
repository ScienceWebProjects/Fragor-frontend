// libs

// hooks
import { useState } from 'react';
import useToken from '../../../Hooks/useToken';

// components
import HourInput from './HourInput';
import CustomError from '../../_shared/CustomError';

// UI elements
import InfoType from '../../Authorization/Signin/UI/InfoType';

// scss

function NewTariff({
  api,
  isAdding,
  isEditing,
  isNew,
  id,
  name,
  hourFrom,
  hourTo,
  workingDays,
  weekend,
  price,
}) {
  const user = useToken();

  const [index, setIndex] = useState(0);
  const PANEL_NUMBERS = 3;
  const isSaveBtn = index < PANEL_NUMBERS ? false : true;
  const [tariffName, setTariffName] = useState(name || '');
  const [isActiveDay, setIsActiveDay] = useState({
    workingDays: workingDays || false,
    weekend: weekend || false,
  });
  const [fromHour, setFromHour] = useState(hourFrom || 0);
  const [toHour, setToHour] = useState(hourTo || 0);
  const [tariffPrice, setTariffPrice] = useState(price || 0);

  // hour set values options
  const [onHourInput, setOnHourInput] = useState(false);
  const [whatHour, setWhatHour] = useState('');

  // custom error
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorCallback, setErrorCallback] = useState(() => {});

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
      id: tarriffID,
      name: tariffName,
      hourFrom: fromHour,
      hourTo: toHour,
      workingDays: isActiveDay.workingDays,
      weekend: isActiveDay.weekend,
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
        `${api.ip}${api.settingTariffUpdate}`,
        requestOptions
      );

      console.log(
        'request :',
        `${api.ip}${api.settingTariffUpdate}`,
        'json: ',
        tariffData
      );

      if (response.status === 201) {
        setErrorMessage(
          id ? 'Succesfully edited data.' : 'Succesfully tariff added.'
        );
        setIsError(true);
        setErrorCallback(() => {
          return () => {
            window.location.reload();
          };
        });
      } else {
        const resMessage = await response.json();
        resMessage
          ? console.error(resMessage)
          : setErrorMessage('Something went bad.');
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        'An unpredictable problem has been encountered. \nPlease add tariff again.'
      );
      setIsError(true);
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

    // time errors:
    if (fromHour < 0) {
      newErrors.hours = 'Start hour must be greater or equal 0!';
    } else if (toHour > 24) {
      newErrors.hours = 'End hour must be smaller or equal 23!';
    } else if (fromHour === 0 && toHour === 0) {
      // exception - do nothing
    } else if (fromHour >= toHour) {
      newErrors.hours = 'Start hour must be earlier than end hour!';
    }

    if (tariffPrice <= 0) {
      newErrors.price = 'Price value must be greater than 0!';
    }

    if (
      newErrors.name ||
      newErrors.days ||
      newErrors.hours ||
      newErrors.price
    ) {
      setErrorMessage(
        `${newErrors.name ? newErrors.name + '\n' : ''}${
          newErrors.days ? newErrors.days + '\n' : ''
        }${newErrors.hours ? newErrors.hours + '\n' : ''}${
          newErrors.price ? newErrors.price + '\n' : ''
        }`
      );
      setIsError(true);
    }

    if (Object.keys(newErrors).length === 0) {
      saveTariffApiCall(id);
    }
  };

  const deleteTariffHandler = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${api.ip}${api.settingTariffDelete_id}${id}/`,
        requestOptions
      );

      if (response.status === 204) {
        isEditing(false);
        setErrorMessage('Succesfully tariff deleted.');
        setIsError(true);
        setErrorCallback(() => {
          return () => {
            window.location.reload();
          };
        });
      }

      if (response.status === 404) {
        const res404 = await response.json();
        res404.message
          ? setErrorMessage(res404.message)
          : setErrorMessage('Something went bad.');
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        'An unpredictable problem has been encountered. \nPlease delete tariff later.'
      );
      setIsError(true);
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
            className={`week-day ${workingDays ? 'active' : ''}`}
            onClick={() => activeDayHandler('workingDays')}
          >
            Monday - Friday
          </button>
          <button
            type='button'
            id='weekend'
            className={`week-day ${weekend ? 'active' : ''}`}
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
              <button
                className='hour-select'
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  setWhatHour('from hour');
                  setOnHourInput(true);
                }}
              >
                {(fromHour < 10 ? '0' : '') + fromHour + ':00'}
              </button>
            </div>

            <div className='hour-input'>
              <label htmlFor='to-hour'>To hour</label>
              <button
                className='hour-select'
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  setWhatHour('to hour');
                  setOnHourInput(true);
                }}
              >
                {(toHour < 10 ? '0' : '') + toHour + ':00'}
              </button>
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
        onClick={() => {
          isEditing(false);
          isAdding(false);
        }}
      >
        <i className='icon-cancel' />
      </button>

      {!isNew && (
        <button
          type='button'
          className='tarrif-trash-btn'
          onClick={() => {
            deleteTariffHandler();
          }}
        >
          <i className='icon-trash' />
        </button>
      )}

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

      {onHourInput && (
        <HourInput
          onHourInput={setOnHourInput}
          whatHour={whatHour}
          fromHourSelected={setFromHour}
          toHourSelected={setToHour}
        />
      )}

      {isError && (
        <CustomError
          message={errorMessage}
          onErrorBox={setIsError}
          callback={errorCallback}
        />
      )}
    </form>
  );
}

export default NewTariff;
