// libs
import React from 'react';
import styled from 'styled-components';

const Dot = styled.div`
  background-color: #d9d9d9;
  border-radius: 50%;
  height: 100%;
`;

function TopBarButton() {
  return (
    <div className='menu_button'>
      <button>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </button>
    </div>
  );
}

export default TopBarButton;
