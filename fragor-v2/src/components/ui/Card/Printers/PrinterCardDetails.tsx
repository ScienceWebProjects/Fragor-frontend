import React from 'react';
import styled from 'styled-components';

import api from 'utils/apiKeys.json';
import flexStyles from 'utils/flex-styles';
import { mediaBreakpointsStyle } from 'utils/media-breakpoints';
import { STYLES } from 'utils/styles';
import { Printer } from 'utils/types';

const DetailsContainer = styled.div`
  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    ${flexStyles({
      direction: 'row',
      align: 'center',
    })};
    height: 100%;
  }
`;

const Image = styled.img`
  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    max-width: 50%;
    height: auto;
    margin: 0.625rem;
    border-radius: ${STYLES.borderRadius};
  }
`;

const Details = styled.div`
  ${flexStyles({ direction: 'column', align: 'center' })};
  width: 50%;
  font-size: 1.625rem;
`;

const PrinterCardDetails: React.FC<{ printer: Printer }> = ({ printer }) => {
  return (
    <DetailsContainer>
      <Image
        src={`${api.ip}${api.printerImage_id}${printer.image}/`}
        alt='Printer'
      />
      <Details>
        <div>
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
        </div>

        <div>Filaments (& InfiniteScroll)</div>
      </Details>
    </DetailsContainer>
  );
};

export default PrinterCardDetails;
