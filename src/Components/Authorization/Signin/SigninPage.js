// libs

// hooks
// import React, { useState, useEffect } from 'react';
import useWindowSize from '../../../Hooks/useWindowSize';

// downloaded components
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements
import logo from '../../../Images/logo-black.png';
import Button from '../../UI/shared/buttons/Button';
import InfoType from './UI/InfoType';

function SigninPage(props) {
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
          height={windowSize * 0.6}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '80vw',
          }}
        >
          <InfoType text={'Personal information'} />
          <div>First name</div>
          <div>Last name</div>
          <div>Phone number</div>
          <InfoType text={'Account information'} />
          <div>E-mail</div>
          <div>Pin</div>
          <div>Password</div>
          <div>Confirm password</div>
          <InfoType text={'Product information'} />
          <div>Product information</div>
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
