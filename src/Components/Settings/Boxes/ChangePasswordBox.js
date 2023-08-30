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

function ChangePasswordBox(props) {
  const user = useToken();

  const { setChangePasswordBox } = props;
  const [oldPasswordEntered, setOldPasswordEntered] = useState('');
  const [newPasswordEntered, setNewPasswordEntered] = useState('');
  const [confirmPasswordEntered, setConfirmPasswordEntered] = useState('');

  const changePasswordApiCall = async (e) => {
    e.preventDefault();

    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

    const passwordData = {
      oldPassword: oldPasswordEntered,
      password: newPasswordEntered,
      password2: confirmPasswordEntered,
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(passwordData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.settingPasswordChange}`,
        requestOptions
      );

      if (response.status === 200) {
        setChangePasswordBox(false);
        alert('Successful password change');
      }
      if (response.status === 400) {
        const res400 = await response.json();
        console.log(res400);
        btn.textContent = 'Confirm';
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <form onSubmit={changePasswordApiCall}>
          <StyledLabel htmlFor='old-password'>Old password</StyledLabel>
          <StyledInput
            name='old-password'
            id='old-password'
            type='password'
            value={oldPasswordEntered}
            onChange={(event) => {
              setOldPasswordEntered(event.target.value);
            }}
            required
          />

          <StyledLabel htmlFor='new-password'>New password</StyledLabel>
          <StyledInput
            name='new-password'
            id='new-password'
            type='password'
            value={newPasswordEntered}
            onChange={(event) => {
              setNewPasswordEntered(event.target.value);
            }}
            required
          />

          <StyledLabel htmlFor='confirm-password'>Confirm new password</StyledLabel>
          <StyledInput
            name='confirm-password'
            id='confirm-password'
            type='password'
            value={confirmPasswordEntered}
            onChange={(event) => {
              setConfirmPasswordEntered(event.target.value);
            }}
            required
          />

          <div className='box-btns'>
            <Button
              className='btns-btn'
              color='yellow'
              type='button'
              onClick={() => setChangePasswordBox(false)}
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

export default ChangePasswordBox;
