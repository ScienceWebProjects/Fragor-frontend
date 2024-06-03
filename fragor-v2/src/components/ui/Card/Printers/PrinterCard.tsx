import React, { useState } from 'react';
import styled from 'styled-components';

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
            <b>Name:</b> {printer.name}
          </div>
          <div>
            <b>Model:</b> {printer.model}
          </div>
          <div>
            <b>Power:</b> {printer.power} W
          </div>
          <div>
            <b>Work hours:</b> {printer.workHours} h
          </div>
        </PrinterDetails>
      </PrinterCardContainer>

      {isModal && (
        <Modal
          onClose={setIsModal}
          button={
            <>
              <PrimaryButton colorBtn={buttonColors.red}>Delete</PrimaryButton>
              <PrimaryButton colorBtn={buttonColors.yellow}>Edit</PrimaryButton>
            </>
          }
        >
          <PrinterCardDetails printer={printer} />
        </Modal>
      )}
    </>
  );
};

export default PrinterCard;
