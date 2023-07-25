// libs

// hooks
import React, { useState } from 'react';
import useWindowSize from '../../../Hooks/useWindowSize';

// components
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';
import Pin from '../Pin';

// downloaded components
import InfiniteScroll from 'react-infinite-scroll-component'; // v6.1.0

// UI elements
import logo from '../../../Images/logo-black.png';
import Button from '../../UI/shared/buttons/Button';
import InfoType from './UI/InfoType';

function SigninPage(props) {
  const [firstNameEntered, setFirstNameEntered] = useState('');
  const [lastNameEntered, setLastNameEntered] = useState('');
  const [emailEntered, setEmailEntered] = useState('');
  const [pinEntered, setPinEntered] = useState('');
  const [passwordEntered, setPasswordEntered] = useState('');
  const [passwrdConfirmEntered, setPasswordConfirmEntered] = useState('');
  const [productInformationEntered, setProductInformationEntered] = useState('');

  const firstNameChangeHandler = (event) => {
    setFirstNameEntered(event.target.value);
    console.log(firstNameEntered);
  };

  const lastNameChangeHandler = (event) => {
    setLastNameEntered(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmailEntered(event.target.value);
  };

  const pinChangeHandler = (event) => {
    setPinEntered(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPasswordEntered(event.target.value);
  };

  const passwordConfirmChangeHandler = (event) => {
    setPasswordConfirmEntered(event.target.value);
  };

  const productInformationChangeHandler = (event) => {
    setProductInformationEntered(event.target.value);
  };

  const windowSize = useWindowSize();

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

      <main
        className='App-header'
        style={{ minHeight: '77vh' }}
      >
        <InfiniteScroll
          dataLength={''}
          hasMore={false}
          height={windowSize * 0.5}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '85vw',
            textAlign: 'center',
            alignItems: 'center',
            padding: '0px 15px 0 15px',
            margin: '10px',
          }}
        >
          <InfoType text={'Personal information'} />

          <StyledLabel htmlFor='first-name'>First Name</StyledLabel>
          <StyledInput
            name='first-name'
            id='first-name'
            type='text'
            value={firstNameEntered}
            onChange={firstNameChangeHandler}
          ></StyledInput>

          <StyledLabel htmlFor='last-name'>Last Name</StyledLabel>
          <StyledInput
            name='last-name'
            id='last-name'
            type='text'
            // value={enteredUserEmail}
            onChange={lastNameChangeHandler}
          ></StyledInput>

          <InfoType text={'Account information'} />

          <StyledLabel htmlFor='user-email'>E-mail</StyledLabel>
          <StyledInput
            name='user-email'
            id='user-email'
            type='email'
            // value={enteredUserEmail}
            onChange={emailChangeHandler}
          ></StyledInput>

          <Pin />

          <StyledLabel htmlFor='user-password'>Password</StyledLabel>
          <StyledInput
            name='user-password'
            id='user-password'
            type='password'
            // value={enteredUserEmail}
            onChange={passwordChangeHandler}
          ></StyledInput>

          <StyledLabel htmlFor='user-confirm-password'>Confirm password</StyledLabel>
          <StyledInput
            name='user-confirm-password'
            id='user-confirm-password'
            type='password'
            // value={enteredUserEmail}
            onChange={passwordConfirmChangeHandler}
          ></StyledInput>

          <InfoType text={'Product information'} />

          <StyledLabel htmlFor='product-information'>Product information</StyledLabel>
          <StyledInput
            name='product-information'
            id='product-information'
            type='text'
            // value={enteredUserEmail}
            onChange={productInformationChangeHandler}
          ></StyledInput>
        </InfiniteScroll>
        <Button
          className=''
          color='yellow'
        >
          Sign in
        </Button>
        <Button
          className=''
          color='red'
        >
          Back
        </Button>
      </main>
    </div>
  );
}

export default SigninPage;
