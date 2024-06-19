import React, { useContext, useEffect, useState } from 'react';
import { Form, Field, FormRenderProps } from 'react-final-form';

import { FormattedMessage } from 'react-intl';
import TextInput from 'components/ui/Input/FormInput/Textnput';
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
import SelectInput, {
  selectOptionsProps,
} from 'components/ui/Input/FormInput/SelectInput';

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
  const ctx = useContext(MessageContext);
  const user = useDecodedToken();

  const [modelsList, setModelList] = useState<selectOptionsProps[]>([]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getModelsFetch = async () => {
    const requestOptions: RequestFetchType = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await fetchData({
      api: `${api.ip}${api.printersModelsGet}`,
      requestOptions: requestOptions,
    });

    console.log(response.response);

    if (response.success) {
      const modelsSelectOptions: selectOptionsProps[] = [];

      response.response.forEach((item: any) => {
        modelsSelectOptions.push({
          label: item.model,
          value: item.model,
        });
      });

      setModelList(modelsSelectOptions);
    }
  };

  useEffect(() => {
    getModelsFetch();
    //eslint-disable-next-line
  }, []);

  const onSubmit = async (values: FormValues) => {
    await sleep(300);

    const requestOptions: RequestFetchType = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: values,
    };

    const response = await fetchData({
      api: `${api.ip}${api.printerAdd}`,
      requestOptions: requestOptions,
    });

    if (response.success === true) {
      ctx.onMessage('success', `Susscessfully add printer ${values.name}`);
      onCloseModal(false);
    }

    console.log('Form Values:', values);
  };

  // Form validators
  const required = (value: string) => (value ? null : 'Required');
  const mustBeNumber = (value: any) =>
    isNaN(value) ? 'Must be a number' : undefined;
  const minValue = (min: number) => (value: any) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
  const composeValidators =
    (...validators: any[]) =>
    (value: any) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

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
              component={TextInput}
              type='text'
              validate={required}
              format={(value: string) => (value ? value.trim() : '')}
              formatOnBlur={true}
              initialValue=''
            />

            <InputLabelStyle>
              <FormattedMessage
                id='printers.modelName'
                defaultMessage='Model name'
              />
            </InputLabelStyle>
            <Field
              name='model'
              type='text'
              validate={required}
            >
              {({ input, meta }) => (
                <>
                  <SelectInput
                    input={input}
                    placeholder='Choose model'
                    options={modelsList}
                  />
                  {meta.error && meta.touched && (
                    <ErrorLabel>{meta.error}</ErrorLabel>
                  )}
                </>
              )}
            </Field>

            <InputLabelStyle>
              <FormattedMessage
                id='printers.power'
                defaultMessage='Printer power'
              />
              {' [W]'}
            </InputLabelStyle>
            <Field
              name='power'
              type='text'
              validate={composeValidators(required, mustBeNumber, minValue(0))}
              parse={(value: string) => value.trim()}
              format={(value: string) =>
                value ? parseFloat(value).toFixed(1) : ''
              }
              formatOnBlur={true}
              initialValue=''
            >
              {({ input, meta, type }) => (
                <>
                  <TextInput
                    type={type}
                    meta={meta}
                    input={input}
                  />
                  {meta.error && meta.touched && (
                    <ErrorLabel>{meta.error}</ErrorLabel>
                  )}
                </>
              )}
            </Field>

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
