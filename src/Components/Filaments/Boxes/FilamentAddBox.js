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
import '../scss/_filament-add-box.scss';

function FilamentAddBox(props) {
  const { onFilamentAddBox } = props;

  const user = useToken();

  // variables for filters
  const [filters, setFilters] = useState([]);
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    filtersGetAPICall();
  });

  const confirmAddApiCall = async (e) => {
    e.preventDefault();

    const addData = {
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

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>Add new filament</h2>

        <form onSubmit={confirmAddApiCall}>
          <StyledLabel htmlFor='material-select'>Material</StyledLabel>
          <CustomSelect
            options={filters.material || []}
            // defaultSelected={filters.material[0]}
            onCustomSelect={setMaterialSelected}
          />

          <StyledLabel htmlFor='color-select'>Color</StyledLabel>
          <CustomSelect
            options={filters.color || []}
            // defaultSelected={filters.color[0]}
            onCustomSelect={setColorSelected}
          />

          <StyledLabel htmlFor='brand-select'>Brand</StyledLabel>
          <CustomSelect
            options={filters.brand || []}
            // defaultSelected={filters.brand[0]}
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
