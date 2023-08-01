// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// UI elements
// import Card from '../UI/shared/Card';
import './LoginPage.scss';
import logo from '../../../Images/logo-black.png';
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';

// components
import Button from '../../UI/shared/buttons/Button';
import Pin from '../Pin';
import StyledLink from '../../UI/shared/StyledLink';

function LoginPage(props) {
  const [emailEntered, setEmailEntered] = useState('');
  const [pinEntered, setPinEntered] = useState('');

  const navigate = useNavigate();

  const makeAPIPost = async () => {
    const loginData = {
      email: emailEntered,
      password: pinEntered, // change to pin in future
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    };

    try {
      const response = await fetch(`${props.api.ip}${props.api.loginPin}`, requestOptions);

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
      console.log(error);
    }
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const successful = await makeAPIPost();

    if (successful) {
      navigate(props.api.home);
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

      <main className='App-header login_form'>
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
          <div>
            <Pin
              onPinEntered={(pin) => {
                setPinEntered(pin);
              }}
            />
          </div>
          <Button
            color='green'
            type='submit'
          >
            Log in
          </Button>
        </form>

        <StyledLink to={props.api.signinPage}>
          <Button color='yellow'>Sign in</Button>
        </StyledLink>
        <div className='main_additionals'>
          <StyledLink
            to={'/'}
            className='additionals_reminder'
          >
            Forget PIN?
          </StyledLink>
          <StyledLink to={'/'}>Privacy</StyledLink>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
