import React from 'react';

import PrimaryButton from 'components/ui/Button/PrimaryButton';
import { FormattedMessage } from 'react-intl';
import buttonColors from 'utils/button-colors';

interface MenuButtonsProps {}

const buttonStyle = {
  width: '45%',
  height: '5rem',
};

const MenuButtons: React.FC<MenuButtonsProps> = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <PrimaryButton
        colorBtn={buttonColors.red}
        style={buttonStyle}
      >
        <FormattedMessage
          id='home.printers'
          defaultMessage='Printers'
        />
      </PrimaryButton>

      <PrimaryButton
        colorBtn={buttonColors.red}
        style={buttonStyle}
      >
        <FormattedMessage
          id='home.filaments'
          defaultMessage='Filaments'
        />
      </PrimaryButton>

      <PrimaryButton
        colorBtn={buttonColors.red}
        style={buttonStyle}
      >
        <FormattedMessage
          id='home.settings'
          defaultMessage='Settings'
        />
      </PrimaryButton>

      <PrimaryButton
        colorBtn={buttonColors.red}
        style={buttonStyle}
      >
        <FormattedMessage
          id='home.devices'
          defaultMessage='Devices'
        />
      </PrimaryButton>

      <PrimaryButton style={buttonStyle}>
        <FormattedMessage
          id='home.users'
          defaultMessage='Users'
        />
      </PrimaryButton>

      <PrimaryButton style={buttonStyle}>
        <FormattedMessage
          id='home.owners'
          defaultMessage='Owners'
        />
      </PrimaryButton>
    </div>
  );
};

export default MenuButtons;
