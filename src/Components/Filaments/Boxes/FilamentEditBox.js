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

function FilamentEditBox(props) {
  const { details, onFilamentEditBox } = props;

  const user = useToken();

  const [filters, setFilters] = useState([
    {
      materials: ['materials no added', 'materials added', 'materials maybe added'],
      colors: ['colors no added', 'colors added', 'colors maybe added'],
      brands: ['brands no added', 'brands added', 'brands maybe added'],
    },
  ]);
  const [materialSelected, setMaterialSelected] = useState(details.material);
  const [colorSelected, setColorSelected] = useState(details.color);
  const [brandSelected, setBrandSelected] = useState(details.brand);
  const [diameterEntered, setDiameterEntered] = useState(details.diameter);

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
  }, []);

  const confirmEditApiCall = async (e) => {
    e.preventDefault();

    const editData = {
      material: materialSelected,
      color: colorSelected,
      brand: brandSelected,
      diameter: diameterEntered,
    };

    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(editData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.filamentEdit_id}${props.details.id}/`,
        requestOptions
      );

      if (response.status === 200) {
        onFilamentEditBox(false);
        alert('Successfull edit filament properties.');
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
        <h2>Edit filament properties</h2>

        <form onSubmit={confirmEditApiCall}>
          {/* <StyledLabel htmlFor='material-select'>Material</StyledLabel> */}

          {filters.map((filter) => (
            <div>
              <StyledLabel htmlFor='material-select'>Material</StyledLabel>
              <CustomSelect
                options={filter.materials}
                defaultSelected={details.material}
                onCustomSelect={setMaterialSelected}
              />

              <StyledLabel htmlFor='color-select'>Color</StyledLabel>
              <CustomSelect
                options={filter.colors}
                defaultSelected={details.color}
                onCustomSelect={setColorSelected}
              />

              <StyledLabel htmlFor='brand-select'>Brand</StyledLabel>
              <CustomSelect
                options={filter.brands}
                defaultSelected={details.brand}
                onCustomSelect={setBrandSelected}
              />
            </div>
          ))}

          <StyledLabel htmlFor='diameter'>Diameter</StyledLabel>
          <StyledInput
            name='diameter'
            id='diameter'
            type='number'
            step={0.01}
            value={diameterEntered}
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
              onClick={() => onFilamentEditBox(false)}
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

export default FilamentEditBox;
