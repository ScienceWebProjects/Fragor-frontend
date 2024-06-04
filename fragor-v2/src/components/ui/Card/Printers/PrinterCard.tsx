import React, { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';

import api from 'utils/apiKeys.json';
import Colors from 'utils/colors';
import flexStyles from 'utils/flex-styles';
import { mediaBreakpointsStyle } from 'utils/media-breakpoints';
import { STYLES } from 'utils/styles';
import { Printer } from 'utils/types';
import PrimaryButton from '../../Button/PrimaryButton';
import buttonColors from 'utils/button-colors';
import Modal from '../Modal';
import PrinterCardDetails from './PrinterCardDetails';

const PrinterCardContainer = styled.div`
  position: relative;

  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    margin: 1rem 0 1rem 0;

    width: 48%;
    height: 20vh;

    border: 2px solid ${Colors.blue[60]};
    border-radius: ${STYLES.borderRadius};

    ${flexStyles({ direction: 'row', justify: 'space-between' })}
  }
`;

const PrinterImage = styled.img`
  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    max-width: 33%;
    height: 90%;
    margin: 0.625rem;
    border-radius: ${STYLES.borderRadius};
  }
`;

const PrinterDetails = styled.div`
  ${flexStyles({ direction: 'column', align: 'flex-start' })};
  width: 50%;
  font-size: 1.25rem;
`;

const PrinterCard: React.FC<{ printer: Printer }> = ({ printer }) => {
  const intl = useIntl();

  const [isModal, setIsModal] = useState<boolean>(false);
  const [printerDetails, setPrinterDetails] = useState<Printer>();

  return (
    <>
      <PrinterCardContainer>
        <PrimaryButton
          onClick={() => {
            setIsModal(true);
            setPrinterDetails(printer);
          }}
          colorBtn={buttonColors.yellow}
          style={{ position: 'absolute', bottom: -25, left: 10, width: '40%' }}
        >
          Details
        </PrimaryButton>

        <PrinterImage
          src={`${api.ip}${api.printerImage_id}${printer.image}/`}
          alt='Printer'
        />
        <PrinterDetails>
          <div>
            <b>
              {intl.formatMessage({
                id: 'printers.name',
                defaultMessage: 'Name',
              })}
              :
            </b>{' '}
            {printer.name}
          </div>
          <div>
            <b>
              {intl.formatMessage({
                id: 'printers.model',
                defaultMessage: 'Model',
              })}
              :
            </b>{' '}
            {printer.model}
          </div>
          <div>
            <b>
              {intl.formatMessage({
                id: 'printers.power',
                defaultMessage: 'Power',
              })}
              :
            </b>{' '}
            {printer.power} W
          </div>
          <div>
            <b>
              {intl.formatMessage({
                id: 'printers.workHours',
                defaultMessage: 'Hours worked',
              })}
              :
            </b>{' '}
            {printer.workHours} h
          </div>
        </PrinterDetails>
      </PrinterCardContainer>

      {isModal && printerDetails && (
        <Modal
          onClose={setIsModal}
          button={
            <>
              <PrimaryButton colorBtn={buttonColors.red}>
                <FormattedMessage
                  id='delete'
                  defaultMessage='Delete'
                />
              </PrimaryButton>
              <PrimaryButton colorBtn={buttonColors.yellow}>
                <FormattedMessage
                  id='edit'
                  defaultMessage='Edit'
                />
              </PrimaryButton>
            </>
          }
        >
          <PrinterCardDetails printer={printerDetails} />
        </Modal>
      )}
    </>
  );
};

export default PrinterCard;
