import React from 'react';

import HeaderLogin from 'pages/Login/HeaderLoginStyle';

import logo from 'assets/images/logo-black.png';

const AuthorizationHeader: React.FC = () => {
  return (
    <HeaderLogin>
      <h1>
        3D printing assistant
        <br />
        Project by:
        <br />
        Piotr Goraj & Dawid Franczak
        <br />
      </h1>
      <div>
        <a
          href='https://github.com/ScienceWebProjects/filament-measurement'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src={logo}
            alt='Logo'
          />
        </a>
      </div>
    </HeaderLogin>
  );
};

export default AuthorizationHeader;
