import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import api from 'utils/apiKeys.json';
import buttonColors from 'utils/button-colors';

import { FormattedMessage } from 'react-intl';
import PrimaryButton from 'components/ui/Button/PrimaryButton';

import { useDecodedToken } from 'hooks/useToken';
import usePermissions from 'hooks/usePermissions';

interface MenuButtonsProps {
  children?: ReactNode;
  containerStyle?: React.CSSProperties;
  buttonStyle?: { width: string; height: string };
  isMenuBar?: boolean;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({
  children,
  containerStyle,
  buttonStyle = {
    width: '45%',
    height: '5rem',
  },
  isMenuBar = false,
}) => {
  const navigate = useNavigate();
  const user = useDecodedToken();
  const permission = usePermissions(user.permission);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        ...containerStyle,
      }}
    >
      {isMenuBar && (
        <PrimaryButton
          colorBtn={buttonColors.green}
          style={buttonStyle}
          onClick={() => navigate(api.home)}
        >
          <FormattedMessage
            id='menu.home'
            defaultMessage='Home'
          />
        </PrimaryButton>
      )}

      <PrimaryButton
        colorBtn={buttonColors.red}
        style={buttonStyle}
        onClick={() => navigate(api.printersPage)}
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

      {permission.MASTER && (
        <PrimaryButton
          colorBtn={buttonColors.red}
          style={buttonStyle}
        >
          <FormattedMessage
            id='home.devices'
            defaultMessage='Devices'
          />
        </PrimaryButton>
      )}

      {permission.MASTER && (
        <PrimaryButton style={buttonStyle}>
          <FormattedMessage
            id='home.users'
            defaultMessage='Users'
          />
        </PrimaryButton>
      )}

      {permission.OWNER && (
        <PrimaryButton style={buttonStyle}>
          <FormattedMessage
            id='home.owners'
            defaultMessage='Owners'
          />
        </PrimaryButton>
      )}

      {children}
    </div>
  );
};

export default MenuButtons;
