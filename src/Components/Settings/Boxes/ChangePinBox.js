// libs

// hooks
import { useState } from 'react';
import useToken from '../../../Hooks/useToken';

// components
import Pin from '../../_shared/Pin';

// UI elements
import Button from '../../UI/shared/buttons/Button';

// scss
import '../../UI/shared/_box.scss';

function ChangePinBox(props) {
  const user = useToken();

  const { setChangePinBox } = props;
  const [oldPinEntered, setOldPinEntered] = useState('');
  const [newPinEntered, setNewPinEntered] = useState('');
  const [confirmPinEntered, setConfirmPinEntered] = useState('');

  const changePinApiCall = async () => {
    const pinData = {
      oldPin: oldPinEntered,
      newPin: newPinEntered,
      newPin2: confirmPinEntered,
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(pinData),
    };

    try {
      const response = await fetch(`${props.api.ip}${props.api.settingPinChange}/`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

    const successful = await changePinApiCall();

    if (successful) {
      setChangePinBox(false);
      alert('Succesfull PIN changed.');
    }
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <form onSubmit={submitFormHandler}>
          <Pin
            text={'Old PIN:'}
            length={4}
            onPinEntered={(pin) => {
              setOldPinEntered(pin);
            }}
          />
          <Pin
            text={'New PIN:'}
            length={4}
            onPinEntered={(pin) => {
              setNewPinEntered(pin);
            }}
          />
          <Pin
            text={'Confirm new PIN:'}
            length={4}
            onPinEntered={(pin) => {
              setConfirmPinEntered(pin);
            }}
          />

          <section className='box-btns'>
            <Button
              className='btns-btn'
              color='yellow'
              id='cancelBtn'
              type='button'
              onClick={() => setChangePinBox(false)}
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
          </section>
        </form>
      </div>
    </div>
  );
}

export default ChangePinBox;
