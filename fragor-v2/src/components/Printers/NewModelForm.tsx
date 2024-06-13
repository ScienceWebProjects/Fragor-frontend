import React from 'react';
import { Form, Field, FormRenderProps } from 'react-final-form';

import { FormattedMessage } from 'react-intl';
import FormInput from 'components/ui/Input/FormInput/FormInput';
import InputLabelStyle from 'components/ui/Input/InputLabelStyle';
import PrimaryButton from 'components/ui/Button/PrimaryButton';
import ErrorLabel from 'components/ui/Input/ErrorLabel';

import buttonColors from 'utils/button-colors';

interface FormValues {
  modelName: string;
}

const NewModelForm: React.FC = () => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values: FormValues) => {
    await sleep(300);
    console.log(JSON.stringify(values));
  };

  const required = (value: string) => (value ? null : 'Required');

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
                id='printers.modelName'
                defaultMessage='Model name'
              />
            </InputLabelStyle>
            <Field
              name='model'
              component={FormInput}
              type='text'
              validate={required}
              parse={(value: string) => value.trim()}
            />
            {props.errors &&
              props.touched &&
              props.errors.model &&
              props.touched.model && (
                <ErrorLabel>{props.errors.model}</ErrorLabel>
              )}

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

export default NewModelForm;
