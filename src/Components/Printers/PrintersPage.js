// libs
import React from 'react';

// components
import Button from '../UI/shared/buttons/Button';

// UI elements
import logo from '../../Images/icon-white.png';
// import StyledLink from '../UI/shared/StyledLink';

// scss
import '../UI/shared/_topbar.scss';

function PrintersPage(props) {
  return (
    <div>
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

      <main className='App-header'>
        <Button
          className=''
          color='yellow'
        >
          Add Printer
        </Button>
      </main>
    </div>
  );
}

export default PrintersPage;
