import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';
import Colors from 'utils/colors';
import PrimaryButton from '../Button/PrimaryButton';
import { mediaBreakpointsStyle } from 'utils/media-breakpoints';
import buttonColors from 'utils/button-colors';
import { FormattedMessage } from 'react-intl';
import flexStyles from 'utils/flex-styles';
import { STYLES } from 'utils/styles';

const ModalContainer = styled.div`
  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    position: fixed;
    z-index: 9999;

    ${flexStyles({})}

    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ModalCard = styled.div`
  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    width: 65vw;
    height: 70vh;
    padding: 2rem;
    background-color: ${Colors.grey[300]};

    ${flexStyles({ justify: 'space-between' })}
    border-radius: ${STYLES.borderRadius};
  }
`;

const ButtonsWrapper = styled.div`
  width: 80%;

  ${flexStyles({ direction: 'row' })}
`;

interface ModalProps {
  children: ReactElement;
  button?: ReactElement;
  onClose: (close: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, button, onClose }) => {
  const modalRoot = document.getElementById('modal-root');

  return (
    <>
      {modalRoot &&
        ReactDOM.createPortal(
          <ModalContainer>
            <ModalCard>
              {children}
              <ButtonsWrapper>
                <PrimaryButton
                  colorBtn={buttonColors.red}
                  onClick={() => onClose(false)}
                >
                  <FormattedMessage
                    id='back'
                    defaultMessage='Back'
                  />
                </PrimaryButton>
                {button}
              </ButtonsWrapper>
            </ModalCard>
          </ModalContainer>,
          modalRoot
        )}
    </>
  );
};

export default Modal;
