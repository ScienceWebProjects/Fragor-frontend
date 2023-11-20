// libs

// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import { FormattedMessage } from 'react-intl';
import ChangePinBox from '../../Settings/Boxes/ChangePinBox';

// UI elements
import logo from '../../../Images/logo-black.png';
import Button from '../../UI/shared/buttons/Button';
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';
import StyledLink from '../../UI/shared/StyledLink';

// scss

function ForgetPin(props) {
  // variables for login by password
  const [emailEntered, setEmailEntered] = useState('');
  const [passwordEntered, setPasswordEntered] = useState('');

  // variables for change pin
  const [changePinBox, setChangePinBox] = useState(false);

  const navigate = useNavigate();

  const makeAPIPost = async () => {
    const loginData = {
      email: emailEntered,
      password: passwordEntered,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    };

    try {
      const response = await fetch(`${props.api.ip}${props.api.loginPassword}`, requestOptions);

      if (response.status === 404) {
        console.log(`error ${response.status} fetch POST SigninPage.js`);
        return false;
      }
      if (response.status === 400) {
        console.log('Unable to login'); // in this line must add some UI info about failure
        return false;
      }

      const user = await response.json();

      const encodedToken = btoa(JSON.stringify(user));
      sessionStorage.setItem('token', encodedToken);

      return true;
    } catch (error) {
      alert(`
      Post error! Failed attempt to login. 
      Try again.`);
      console.log('LoginPage.js', error);
    }
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const successful = await makeAPIPost();

    if (successful) {
      setChangePinBox(true);
      // navigate(props.api.home);
    }
  };

  return (
    <div className='App'>
      <header className='header_logo'>
        <h1 className='logo_txt'>
          3D printing assistant
          <br />
          Project by:
          <br />
          Piotr Goraj & Dawid Franczak
          <br />
        </h1>
        <div className='logo_img'>
          <a href='https://github.com/ScienceWebProjects/filament-measurement'>
            <img
              src={logo}
              alt='Logo'
            />
          </a>
        </div>
      </header>

      <main className='App-header'>
        <form onSubmit={submitFormHandler}>
          <div style={{ width: '85vw', margin: '0 auto' }}>
            <StyledLabel htmlFor='user-email'>E-mail</StyledLabel>
            <StyledInput
              name='user-email'
              id='user-email'
              type='email'
              value={emailEntered}
              onChange={(event) => {
                setEmailEntered(event.target.value);
              }}
              required
            ></StyledInput>
          </div>
          <StyledLabel htmlFor='user-password'>
            <FormattedMessage
              id='login.password'
              defaultMessage='Password'
            />
          </StyledLabel>
          <StyledInput
            name='user-password'
            id='user-password'
            type='password'
            value={passwordEntered}
            onChange={(event) => {
              setPasswordEntered(event.target.value);
            }}
            required
          />

          <Button
            color='green'
            type='submit'
          >
            <FormattedMessage
              id='login.loginBtn'
              defaultMessage='Log in'
            />
          </Button>
        </form>

        <StyledLink to={props.api.home}>
          <Button color='red'>
            <FormattedMessage
              id='back'
              defaultMessage='Back'
            />
          </Button>
        </StyledLink>
      </main>

      {changePinBox && (
        <ChangePinBox
          api={props.api}
          setChangePinBox={setChangePinBox}
          hideCancelBtn={true}
          onSuccess={() => {
            setChangePinBox(false);
            alert('Succesfull PIN changed.');
            navigate(props.api.home);
          }}
        />
      )}
    </div>
  );
}

export default ForgetPin;
