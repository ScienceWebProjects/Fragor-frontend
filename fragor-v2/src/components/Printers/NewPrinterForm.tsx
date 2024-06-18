import React, { useContext, useState } from 'react';
import { Form, Field, FormRenderProps } from 'react-final-form';

import { FormattedMessage } from 'react-intl';
import FormInput from 'components/ui/Input/FormInput/FormInput';
import InputLabelStyle from 'components/ui/Input/InputLabelStyle';
import PrimaryButton from 'components/ui/Button/PrimaryButton';
import ErrorLabel from 'components/ui/Input/ErrorLabel';

import api from 'utils/apiKeys.json';
import buttonColors from 'utils/button-colors';

import fetchData from 'functions/fetchData';
import { RequestFetchType } from 'utils/types';
import { useDecodedToken } from 'hooks/useToken';

import MessageContext from 'store/printerModalContext/message-context';
import ImageInput from 'components/ui/Input/FormInput/ImageInput';
import { UploadFile } from 'antd';

interface FormValues {
  name: string;
  model: string;
  power: string;
  image: UploadFile[];
}

interface NewPrinterFormProps {
  onCloseModal: (close: boolean) => void;
}

const NewPrinterForm: React.FC<NewPrinterFormProps> = ({ onCloseModal }) => {
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values: FormValues) => {
    await sleep(300);
    console.log('Form Values:', values);
  };

  const required = (value: string) => (value ? null : 'Required');

  const handleImageChange = (fileList: UploadFile[]) => {
    setImageFileList(fileList);
  };

  return (
    <>
      <Form<FormValues> onSubmit={onSubmit}>
        {(props: FormRenderProps<FormValues>) => (
          <form
            onSubmit={props.handleSubmit}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <InputLabelStyle>
              <FormattedMessage
                id='printers.image'
                defaultMessage='Printer image'
              />
            </InputLabelStyle>
            <Field name='image'>
              {({ input, type, meta }) => (
                <div>
                  <ImageInput
                    type={type}
                    input={input}
                    meta={meta}
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </Field>

            <InputLabelStyle>
              <FormattedMessage
                id='printers.name'
                defaultMessage='Printer name'
              />
            </InputLabelStyle>
            <Field
              name='name'
              component={FormInput}
              type='text'
              validate={required}
              parse={(value: string) => value.trim()}
            />

            <InputLabelStyle>
              <FormattedMessage
                id='printers.modelName'
                defaultMessage='Model name'
              />
            </InputLabelStyle>
            {/* SELECT */}
            <Field
              name='model'
              component={FormInput}
              type='text'
              validate={required}
              parse={(value: string) => value.trim()}
            />

            <InputLabelStyle>
              <FormattedMessage
                id='printers.power'
                defaultMessage='Printer power'
              />
            </InputLabelStyle>
            <Field
              name='power'
              component={FormInput}
              type='text'
              validate={required}
              parse={(value: string) => value.trim()}
            />

            {/* {props.errors &&
              props.touched &&
              props.errors.model &&
              props.touched.model && (
                <ErrorLabel>{props.errors.model}</ErrorLabel>
                )} */}

            <PrimaryButton
              colorBtn={buttonColors.green}
              type='submit'
              style={{ width: '50%' }}
            >
              <FormattedMessage
                id='confirm'
                defaultMessage={'Confirm'}
              />
            </PrimaryButton>
          </form>
        )}
      </Form>
    </>
  );
};

export default NewPrinterForm;
