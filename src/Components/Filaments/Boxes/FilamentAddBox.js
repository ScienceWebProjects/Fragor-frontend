// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';
import CustomSelect from '../UI/CustomSelect';

// scss
import '../../UI/shared/_box.scss';
import '../scss/_select--disabled.scss';

function FilamentAddBox(props) {
  const { onFilamentAddBox } = props;

  const user = useToken();

  const [filters, setFilters] = useState([]);
  const [devicesList, setDevicesList] = useState([
    {
      id: 0,
      name: 'A 07-23',
      model: 'FG-a1',
    },
    {
      id: 1,
      name: 'A 08-23',
      model: 'FG-a1',
    },
  ]);
  const [deviceSelected, setDeviceSelected] = useState('');
  const [materialSelected, setMaterialSelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');
  const [brandSelected, setBrandSelected] = useState('');
  const [diameterEntered, setDiameterEntered] = useState(1.75);
  const [uidScanned, setUidScanned] = useState(0);

  const filtersGetAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await fetch(
        `${props.api.ip}${props.api.filamentsFiltersGet}`,
        requestOptions
      );

      const filtersList = await response.json();
      setFilters(filtersList);
      console.log(filtersList);
    } catch (error) {
      console.log(error);
    }
  };

  const devicesListApiCall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(`${props.api.ip}${props.api.devicesList}`, requestOptions);

      if (response.status === 200) {
        const responseData = await response.json();
        setDevicesList(responseData);
      }

      if (response.status === 404) {
        const res = await response.json();
        console.log(res);
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filtersGetAPICall();
    devicesListApiCall();
  }, []);

  const confirmAddApiCall = async (e) => {
    e.preventDefault();

    const addData = {
      device: deviceSelected,
      material: materialSelected,
      color: colorSelected,
      brand: brandSelected,
      diameter: diameterEntered,
      uid: uidScanned,
    };

    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(addData),
    };

    try {
      const response = await fetch(`${props.api.ip}${props.api.filamentAdd}`, requestOptions);

      if (response.status === 201) {
        onFilamentAddBox(false);
        alert('Successfull add filament.');
        window.location.reload();
      }
      if (response.status === 400 || response.status === 404) {
        alert(response.message);
      }

      btn.textContent = 'Confirm';
    } catch (error) {
      console.log(error);
      alert('Somethint went bad.');
    }
  };

  // devices options conditions for CustomSelect
  const devicesOptions = [];
  for (const option of devicesList) {
    if (option.hasOwnProperty('name')) {
      devicesOptions.push(option.name);
    }
  }

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>Add new filament</h2>

        <form onSubmit={confirmAddApiCall}>
          <StyledLabel htmlFor='device-select'>Device</StyledLabel>
          <CustomSelect
            options={devicesOptions || []}
            onCustomSelect={setDeviceSelected}
          />

          <StyledLabel htmlFor='material-select'>Material</StyledLabel>
          <CustomSelect
            selectClass={deviceSelected ? '' : 'select-disabled'}
            options={filters.material || []}
            onCustomSelect={setMaterialSelected}
          />

          <StyledLabel htmlFor='color-select'>Color</StyledLabel>
          <CustomSelect
            selectClass={deviceSelected ? '' : 'select-disabled'}
            options={filters.color || []}
            onCustomSelect={setColorSelected}
          />

          <StyledLabel htmlFor='brand-select'>Brand</StyledLabel>
          <CustomSelect
            selectClass={deviceSelected ? '' : 'select-disabled'}
            options={filters.brand || []}
            onCustomSelect={setBrandSelected}
          />

          <StyledLabel htmlFor='material'>Diameter</StyledLabel>
          <StyledInput
            name='material'
            id='material'
            type='number'
            min='1'
            max='4'
            step='0.01'
            value={diameterEntered}
            className={deviceSelected ? '' : 'select-disabled'}
            onChange={(event) => {
              setDiameterEntered(event.target.value);
            }}
            required
          />

          <div className='box-btns'>
            <Button
              className='btns-btn'
              color='yellow'
              type='button'
              onClick={() => onFilamentAddBox(false)}
            >
              Back
            </Button>
            <Button
              id='confirmBtn'
              className='btns-btn'
              color='green'
              type='submit'
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilamentAddBox;
