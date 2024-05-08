import React from 'react';

interface MobileTopBarProps {}

const MobileTopBar: React.FC<MobileTopBarProps> = () => {
  return (
    <div
      style={{
        backgroundColor: 'grey',
        height: '10vh',
        width: '100%',
        marginBottom: '16px',
      }}
    >
      <div>Mobile Top Bar</div>
    </div>
  );
};

export default MobileTopBar;
