import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useWindowSize } from 'hooks/useWindowSize';

import api from 'utils/apiKeys.json';
import { mediaBreakpointsPoints } from 'utils/media-breakpoints';
import buttonColors from 'utils/button-colors';

import MenuButtons from 'pages/Home/MenuButtons';

import PrimaryButton from 'components/ui/Button/PrimaryButton';

const Menu: React.FC = () => {
  const { windowWidth } = useWindowSize();
  const navigate = useNavigate();

  if (windowWidth > mediaBreakpointsPoints.desctop) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '10vw',
          height: '100%',
          backgroundColor: 'rgba(153, 153, 153, 0.486)',
          borderRadius: '3rem 0 0 3rem',
        }}
      >
        <MenuButtons
          containerStyle={{
            flexGrow: 1, // Make this element grow to take up available space
            flexShrink: 1,
            flexBasis: 'auto', // Default basis to auto
            // height: '100%',

            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
          buttonStyle={{ width: '90%', height: '5rem' }}
        >
          <PrimaryButton
            colorBtn={buttonColors.red}
            style={{ width: '90%', height: '5rem' }}
            onClick={() => navigate(api.home)}
          >
            <FormattedMessage
              id='back'
              defaultMessage='Back'
            />
          </PrimaryButton>
        </MenuButtons>
      </div>
    );
  } else {
    return (
      <>
        <div>Mobile</div>
      </>
    );
  }
};

export default Menu;
