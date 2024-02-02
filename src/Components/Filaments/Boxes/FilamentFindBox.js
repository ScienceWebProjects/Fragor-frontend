// libs

// hooks
import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import useToken from '../../../Hooks/useToken';

// components
import { FormattedMessage } from 'react-intl';
import CustomSelect from '../../_shared/CustomSelect';

// UI elements
import Button from '../../UI/shared/buttons/Button';

// scss
import '../../UI/shared/_box.scss';

function FilamentFindBox({ api, onFilamentFindBox }) {
  const user = useToken();
  const intl = useIntl();

  // variabels for filament find
  const [findingDevices, setFindingDevices] = useState([]);
  const [findingDeviceSelected, setFindingDeviceSelected] = useState('');
  const [filamentFindData, setFilamentFindData] = useState([]);

  // // devices options conditions for CustomSelect
  // const devicesOptionsId = [];
  // const devicesOptionsName = [];
  // for (const option of findingDevices) {
  //   devicesOptionsId.push(option.id);
  //   devicesOptionsName.push(option.name);
  // }

  const devicesApiCall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await fetch(
        `${api.ip}${api.devicesAddingList}`,
        requestOptions
      );

      const devicesList = await response.json();
      console.log(devicesList);
      setFindingDevices(devicesList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    devicesApiCall();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findFilamentHandler = async () => {
    const btn = document.getElementById('findBtn');
    btn.textContent = intl.formatMessage({
      id: 'waiting',
      defaultMessage: 'Waiting...',
    });

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${api.ip}${api.filamentFind_id}/${findingDeviceSelected.id}/`,
        requestOptions
      );

      if (response.status === 200) {
        const resData = await response.json();
        setFilamentFindData(resData);
      }

      if (response.status === 404 || response.status === 504) {
        alert(response.message);
      }

      btn.textContent = intl.formatMessage({
        id: 'filaments.find',
        defaultMessage: 'Find',
      });
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        btn.textContent = intl.formatMessage({
          id: 'filaments.find',
          defaultMessage: 'Find',
        });
      }, 300);
    }
  };

  return (
    <div className='shadow'>
      <div className='box'>
        {/* <CustomSelect
          options={findingDevices}
          onCustomSelect={(selectedValue) =>
            setFindingDeviceSelected(selectedValue)
          }
          labelKey='name' // Klucz do pobierania nazw
          valueKey='id'
        /> */}

        <section className=''>
          <h3>Quantity: {filamentFindData.quantity} g</h3>
          <div>Material: {filamentFindData.material}</div>
          <div>Color: {filamentFindData.color}</div>
          <div>Brand: {filamentFindData.brand}</div>
          <div>Diameter: {filamentFindData.diameter}</div>
        </section>

        <div className='box-btns'>
          <Button
            id='findBtn'
            className='btns-btn'
            color='blue'
            type='button'
            onClick={() => findFilamentHandler()}
          >
            <FormattedMessage
              id='filaments.find'
              defaultMessage='Find'
            />
          </Button>

          <Button
            className='btns-btn'
            color='yellow'
            type='button'
            onClick={() => onFilamentFindBox(false)}
          >
            <FormattedMessage
              id='back'
              defaultMessage='Back'
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilamentFindBox;
