// libs

// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import { FormattedMessage } from 'react-intl';
import Pin from '../../_shared/Pin';
import SelectLanguage from './SelectLanguage';

// UI elements
import logo from '../../../Images/logo-black.png';

import Button from '../../UI/shared/buttons/Button';
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';
import StyledLink from '../../UI/shared/StyledLink';

// scss
import '../../UI/shared/_media-queries.scss';
import '../scss/LoginPage.scss';
import '../scss/_login-media-queries.scss';

function LoginPage(props) {
  const [emailEntered, setEmailEntered] = useState('');
  const [pinEntered, setPinEntered] = useState('');
  const [loginIsCorrect, setLoginIsCorrect] = useState(true);
  const [pinIsCorrect, setPinIsCorrect] = useState(true);

  const navigate = useNavigate();

  const makeAPIPost = async () => {
    setLoginIsCorrect(true);
    setPinIsCorrect(true);

    const loginData = {
      email: emailEntered,
      pin: pinEntered,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.loginPin}`,
        requestOptions
      );

      if (response.status === 404) {
        console.log(`error ${response.status} fetch POST SigninPage.js`);
        return false;
      }

      if (response.status === 400) {
        const eMess = await response.json();
        if (eMess.message === 'Login incorrect') {
          setLoginIsCorrect(false);
        } else if (eMess.message === 'Pin incorrect') {
          setPinIsCorrect(false);
        }
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
      navigate(props.api.home);
    }
  };

  return (
    <div className='media-background'>
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
          <SelectLanguage />
          <form onSubmit={submitFormHandler}>
            <div
              style={{ width: '85vw', margin: '0 auto' }}
              className='styled-input'
            >
              <StyledLabel htmlFor='user-email'>E-mail</StyledLabel>
              <StyledInput
                name='user-email'
                id='user-email'
                type='email'
                value={emailEntered}
                onChange={(event) => {
                  setEmailEntered(event.target.value);
                }}
                isRequired={true}
              ></StyledInput>
              {!loginIsCorrect && (
                <div className='login-error'>Login is incorrect</div>
              )}
            </div>

            <Pin
              text={'PIN'}
              length={4}
              style={{ width: '85%', margin: '0 auto' }}
              className='styled-pin'
              onPinEntered={(pin) => {
                setPinEntered(pin);
              }}
            />
            {!pinIsCorrect && (
              <div className='login-error'>Pin is incorrect</div>
            )}
            <Button
              className='log-btn'
              color='green'
              type='submit'
            >
              <FormattedMessage
                id='login.loginBtn'
                defaultMessage='Log in'
              />
            </Button>
          </form>

          <StyledLink to={props.api.signinPage}>
            <Button
              color='yellow'
              className='signin-button'
            >
              <FormattedMessage
                id='login.signinBtn'
                defaultMessage='Sign in'
              />
            </Button>
          </StyledLink>

          <div className='main_additionals'>
            <StyledLink
              to={props.api.forgetPin}
              className='additionals_reminder'
            >
              <FormattedMessage
                id='login.forgetPin'
                defaultMessage='Forget PIN?'
              />
            </StyledLink>
            <StyledLink to={'/'}>
              <FormattedMessage
                id='login.privacy'
                defaultMessage='Privacy policy'
              />
            </StyledLink>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LoginPage;
