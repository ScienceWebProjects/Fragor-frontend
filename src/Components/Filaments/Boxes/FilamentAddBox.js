// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';
import CustomSelect from '../../_shared/CustomSelect';

// scss
import '../../UI/shared/_box.scss';
import '../scss/_select--disabled.scss';
import '../scss/_filament-add-box.scss';

function FilamentAddBox(props) {
  const { onFilamentAddBox } = props;

  const user = useToken();

  // variables for filters
  const [filters, setFilters] = useState([]);
  const [devicesList, setDevicesList] = useState([
    {
      id: 0,
      name: 'A 07-15',
      model: 'FG-a1',
    },
    {
      id: 1,
      name: 'A 08-27',
      model: 'FG-a1',
    },
  ]);
  const [deviceSelected, setDeviceSelected] = useState('');
  const [materialSelected, setMaterialSelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');
  const [brandSelected, setBrandSelected] = useState('');

  // variables for new filament
  const [diameterEntered, setDiameterEntered] = useState(1.75);
  const [priceEntered, setPriceEntered] = useState(0);
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
      const response = await fetch(
        `${props.api.ip}${props.api.devicesList}`,
        requestOptions
      );

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFilamentUID = async () => {
    setUidScanned(null);

    // add some logic about scan filament spool
  };

  const confirmAddSubmitHandler = async (e) => {
    e.preventDefault();

    setFilamentUID();

    const addData = {
      device: deviceSelected,
      material: materialSelected,
      color: colorSelected,
      brand: brandSelected,
      diameter: diameterEntered,
      price: priceEntered,
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
      const response = await fetch(
        `${props.api.ip}${props.api.filamentAdd}`,
        requestOptions
      );

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

        <form onSubmit={confirmAddSubmitHandler}>
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

          <div className='number-inputs'>
            <div className='input-number'>
              <StyledLabel htmlFor='diameter'>Diameter</StyledLabel>
              <StyledInput
                style={{ textAlign: 'center' }}
                name='diameter'
                id='diameter'
                type='number'
                min='1'
                max='4'
                step='0.01'
                value={diameterEntered}
                onChange={(event) => {
                  setDiameterEntered(event.target.value);
                }}
                required
              />
            </div>

            <div className='input-number'>
              <StyledLabel htmlFor='price'>Price per kilogram</StyledLabel>
              <StyledInput
                style={{ textAlign: 'center' }}
                name='price'
                id='price'
                type='number'
                min='1'
                step='0.01'
                value={priceEntered}
                onChange={(event) => {
                  setPriceEntered(event.target.value);
                }}
                required
              />
            </div>
          </div>

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
