// libs
import React from 'react';

// scss
import '../scss/_filters-dropdown-menu.scss';

function FiltersDropdownMenu(props) {
  return (
    <div className='dropdown-button'>
      <svg
        width='24'
        height='21'
        viewBox='0 0 24 21'
        fill='none'
      >
        <path
          d='M15.4641 17C13.9245 19.6667 13.1547 21 12 21C10.8453 21 10.0755 19.6667 8.5359 17L2.47372 6.5C0.934118 3.83333 0.16432 2.5 0.741669 1.5C1.31902 0.5 2.85862 0.5 5.93782 0.5L18.0622 0.5C21.1414 0.5 22.681 0.5 23.2583 1.5C23.8357 2.5 23.0659 3.83333 21.5263 6.5L15.4641 17Z'
          fill='#D9D9D9'
        />
      </svg>
    </div>
  );
}

export default FiltersDropdownMenu;
