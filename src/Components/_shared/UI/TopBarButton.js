// libs
import React from 'react';
import styled from 'styled-components';

const Dot = styled.div`
  background-color: #d9d9d9;
  border-radius: 50%;
  height: 100%;
`;

function TopBarButton({ isMenuActive, onTopBarButton }) {
  const dots = [];
  for (let i = 0; i < 9; i++) {
    dots.push(
      <Dot
        key={i}
        className='rotated-dots'
      />
    );
  }

  return (
    <div className='menu_button'>
      <button
        onClick={() => {
          isMenuActive ? onTopBarButton(false) : onTopBarButton(true);
        }}
        className={isMenuActive ? 'rotated' : ''}
      >
        {dots}
      </button>
    </div>
  );
}

export default TopBarButton;
