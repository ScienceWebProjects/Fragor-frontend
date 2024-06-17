import React, { useContext } from 'react';
import { Form, Field, FormRenderProps } from 'react-final-form';

import { FormattedMessage } from 'react-intl';
import FormInput from 'components/ui/Input/FormInput/FormInput';
import InputLabelStyle from 'components/ui/Input/InputLabelStyle';
import PrimaryButton from 'components/ui/Button/PrimaryButton';
import ErrorLabel from 'components/ui/Input/ErrorLabel';

// import api from 'utils/apiKeys.json';
import buttonColors from 'utils/button-colors';

// import fetchData from 'functions/fetchData';
// import { RequestFetchType } from 'utils/types';
import { useDecodedToken } from 'hooks/useToken';

import MessageContext from 'store/printerModalContext/message-context';

interface FormValues {
  model: string;
}

interface NewModelFormProps {
  onCloseModal: (close: boolean) => void;
}

const NewModelForm: React.FC<NewModelFormProps> = ({ onCloseModal }) => {
  const ctx = useContext(MessageContext);
  // const user = useDecodedToken();

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values: FormValues) => {
    await sleep(300);

    // const requestOptions: RequestFetchType = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${user.token}`,
    //   },
    //   body: values,
    // };

    // const response = await fetchData({
    //   api: `${api.ip}${api.printerModelAdd}`,
    //   requestOptions: requestOptions,
    // });

    // if (response.success === true) {
    //   onCloseModal(false);

    //   messageApi.open({
    //     type: 'success',
    //     content: `Susscessfully add ${values.modelName}`,
    //   });
    // }

    ctx.onMessage('success', `Susscessfully add ${values.model}`);
    onCloseModal(false);
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
