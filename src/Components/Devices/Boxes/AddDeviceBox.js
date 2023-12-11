// libs

// hooks
import { useState } from 'react';
import useToken from '../../../Hooks/useToken';

// components
import StyledInput from '../../UI/authorization/StyledInput';

// UI elements
import Button from '../../UI/shared/buttons/Button';
import StyledLabel from '../../UI/authorization/StyledLabel';

// scss
import '../../UI/shared/_box.scss';

function AddDeviceBox(props) {
  const user = useToken();

  const { onAddDeviceBox } = props;

  const [deviceName, setDeviceName] = useState('');

  const addConfirmApiCall = async (e) => {
    e.preventDefault();

    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

    const deviceData = {
      name: deviceName,
    };

    console.log(deviceData);

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(deviceData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.deviceNewAdd}`,
        requestOptions
      );

      if (response.status === 201) {
        onAddDeviceBox(false);
        alert(`Succesfull device added.`);
        window.location.reload();
      }
      if (response.status === 400 || response.status === 404) {
        const res = await response.json();
        alert(res.message);
      }

      btn.textContent = 'Confirm';
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        btn.textContent = 'Confirm';
      }, 500);
    }
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>Add new device?</h2>
        <form onSubmit={addConfirmApiCall}>
          <StyledLabel htmlFor='device-name'>Device name</StyledLabel>
          <StyledInput
            name='device-name'
            id='device-name'
            type='text'
            value={deviceName}
            onChange={(event) => {
              setDeviceName(event.target.value);
            }}
            isRequired={true}
          />

          <div className='box-btns'>
            <Button
              className='btns-btn'
              color='yellow'
              type='button'
              onClick={() => onAddDeviceBox(false)}
            >
              Back
            </Button>
            <Button
              className='btns-btn'
              color='green'
              type='submit'
              id='confirmBtn'
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDeviceBox;
