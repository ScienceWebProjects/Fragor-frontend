// libs

// hooks
import { useState } from 'react';
import useToken from '../../../Hooks/useToken';

// components
import Pin from '../../_shared/Pin';

// UI elements
import Button from '../../UI/shared/buttons/Button';
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';

// scss
import '../../UI/shared/_box.scss';

function ChangePinBox(props) {
  const user = useToken();

  const { setChangePinBox, onSuccess, hideCancelBtn } = props;
  const [passwordEntered, setPasswordEntered] = useState('');
  const [newPinEntered, setNewPinEntered] = useState('');

  const changePinApiCall = async () => {
    const pinData = {
      password: passwordEntered,
      pin: newPinEntered,
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
      const response = await fetch(`${props.api.ip}${props.api.settingPinChange}`, requestOptions);

      if (response.status === 200) {
        return true;
      }
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
      // setChangePinBox(false);
      // alert('Succesfull PIN changed.');
      onSuccess();
    }
    btn.textContent = 'Confirm';
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <form onSubmit={submitFormHandler}>
          <StyledLabel htmlFor='password'>Password</StyledLabel>
          <StyledInput
            name='password'
            id='password'
            type='password'
            value={passwordEntered}
            onChange={(event) => {
              setPasswordEntered(event.target.value);
            }}
            required
          />

          <Pin
            text={'New PIN:'}
            length={4}
            style={{ width: '100%', margin: '0 auto' }}
            onPinEntered={(pin) => {
              setNewPinEntered(pin);
            }}
          />

          <section className='box-btns'>
            {!hideCancelBtn && (
              <Button
                className='btns-btn'
                color='yellow'
                id='cancelBtn'
                type='button'
                onClick={() => setChangePinBox(false)}
              >
                Back
              </Button>
            )}
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
