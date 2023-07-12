// libs
import React from 'react';

// UI elements
import logo from '../../Images/icon-white.png';

// scss
import '../UI/shared/_topbar.scss';

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
        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            viewBox='0 0 40 40'
            fill='none'
          >
            <circle
              cx='35'
              cy='5'
              r='5'
              fill='#D9D9D9'
            />
            <circle
              cx='20'
              cy='5'
              r='5'
              fill='#D9D9D9'
            />
            <circle
              cx='5'
              cy='5'
              r='5'
              fill='#D9D9D9'
            />
            <circle
              cx='35'
              cy='20'
              r='5'
              fill='#D9D9D9'
            />
            <circle
              cx='20'
              cy='20'
              r='5'
              fill='#D9D9D9'
            />
            <circle
              cx='5'
              cy='20'
              r='5'
              fill='#D9D9D9'
            />
            <circle
              cx='35'
              cy='35'
              r='5'
              fill='#D9D9D9'
            />
            <circle
              cx='20'
              cy='35'
              r='5'
              fill='#D9D9D9'
            />
            <circle
              cx='5'
              cy='35'
              r='5'
              fill='#D9D9D9'
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
