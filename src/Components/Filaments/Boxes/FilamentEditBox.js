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

function FilamentEditBox(props) {
  const { onFilamentEditBox } = props;

  const user = useToken();

  const [materialEntered, setMaterialEntered] = useState('');
  const [colorEntered, setColorEntered] = useState('');

  const confirmEditApiCall = async (e) => {
    e.preventDefault();

    const editData = {
      material: materialEntered,
      color: colorEntered,
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
          <StyledLabel htmlFor='material'>Material</StyledLabel>
          <StyledInput
            name='material'
            id='material'
            type='material'
            value={materialEntered}
            onChange={(event) => {
              setMaterialEntered(event.target.value);
            }}
            required
          />
          <StyledLabel htmlFor='color'>Color</StyledLabel>
          <StyledInput
            name='color'
            id='color'
            type='text'
            value={colorEntered}
            onChange={(event) => {
              setColorEntered(event.target.value);
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
