// libs
import React from 'react';

// UI elements
import logo from '../../Images/icon-white.png';

// scss
import './UI/_topbar.scss';
import TopBarButton from './UI/TopBarButton';

function TopBar() {
  return (
    <header className='topbar'>
      <div className='topbar_logo-wrapper'>
        <div className='logo-wrapper_txt '>FraGor StartUp</div>
        <img
          src={logo}
          alt='Logo'
        />
      </div>
      <div className='topbar_menu'>
        <TopBarButton />
      </div>
    </header>
  );
}

export default TopBar;
