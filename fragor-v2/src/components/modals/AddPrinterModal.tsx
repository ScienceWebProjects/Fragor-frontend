import React from 'react';
import styled from 'styled-components';

import Label from 'components/ui/Label';
import NewModelForm from 'components/Printers/NewModelForm';
import { FormattedMessage } from 'react-intl';

interface AddPrinterModalProps {}

const AddPrinterModal: React.FC<AddPrinterModalProps> = () => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <FormWrapper>
        <Label>
          <b>
            <FormattedMessage
              id='printers.newModelLabel'
              defaultMessage='NEW MODEL'
            />
          </b>
        </Label>
        <NewModelForm />
      </FormWrapper>

      <FormWrapper>
        <Label>
          <b>
            <FormattedMessage
              id='printers.newPrinterLabel'
              defaultMessage={'NEW PRINTER'}
            />
          </b>
        </Label>
        <div>image</div>
        <div>printer name</div>
        <div>printer model</div>
        <div>printer power</div>
        <div>new printer button</div>
      </FormWrapper>
    </div>
  );
};

export default AddPrinterModal;

const FormWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
