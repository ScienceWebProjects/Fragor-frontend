import React from 'react';
import styled from 'styled-components';

import Label from 'components/ui/Label';
import NewModelForm from 'components/Printers/NewModelForm';
import { FormattedMessage } from 'react-intl';
import NewPrinterForm from 'components/Printers/NewPrinterForm';

interface AddPrinterModalProps {
  onCloseModal: (close: boolean) => void;
}

const AddPrinterModal: React.FC<AddPrinterModalProps> = ({ onCloseModal }) => {
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
        <NewModelForm onCloseModal={(close: boolean) => onCloseModal(close)} />
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
        <NewPrinterForm
          onCloseModal={(close: boolean) => onCloseModal(close)}
        />
      </FormWrapper>
    </div>
  );
};

export default AddPrinterModal;

const FormWrapper = styled.div`
  margin: 0 1rem 0 1rem;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
