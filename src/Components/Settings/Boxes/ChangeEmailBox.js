// libs

// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';

// scss
import '../../UI/shared/_box.scss';

function ChangeEmailBox(props) {
  const user = useToken();
  const navigate = useNavigate();

  const { setChangeEmailBox } = props;
  const [newEmailEntered, setNewEmailEntered] = useState('');

  const changeEmailApiCall = async (e) => {
    e.preventDefault();

    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

    const emailData = {
      email: newEmailEntered,
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(emailData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.settingEmailChange}`,
        requestOptions
      );

      if (response.status === 200) {
        setChangeEmailBox(false);
        alert('Successful email change');
        // delete token from local storage
        // navigate to login page
        sessionStorage.setItem('token', '');
        sessionStorage.clear();
        navigate(props.api.loginPage);
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
        <form onSubmit={changeEmailApiCall}>
          <StyledLabel htmlFor='new-email'>New E-mail</StyledLabel>
          <StyledInput
            name='new-email'
            id='new-email'
            type='email'
            value={newEmailEntered}
            onChange={(event) => {
              setNewEmailEntered(event.target.value);
            }}
            required
          />
          <div className='box-btns'>
            <Button
              className='btns-btn'
              color='yellow'
              type='button'
              onClick={() => setChangeEmailBox(false)}
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

export default ChangeEmailBox;
