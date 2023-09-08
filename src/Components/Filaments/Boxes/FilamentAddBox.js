// libs

// hooks
import { useState } from 'react';
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';

// scss
import '../../UI/shared/_box.scss';

function FilamentAddBox(props) {
  const { onFilamentAddBox } = props;

  const user = useToken();

  const [materialSelected, setMaterialSelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');
  const [brandSelected, setBrandSelected] = useState('');
  const [diameterEntered, setDiameterEntered] = useState(1.75);
  const [uidScanned, setUidScanned] = useState(0);

  const confirmAddApiCall = async (e) => {
    e.preventDefault();

    const addData = {
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

      if (response.status === 200) {
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
          <StyledLabel htmlFor='material'>Diameter</StyledLabel>
          <StyledInput
            name='material'
            id='material'
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
