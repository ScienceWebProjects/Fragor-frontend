import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'utils/apiKeys.json';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';

import AuthorizationHeader from 'components/AuthorizationHeader';
import MainSignin from './MainSigninStyle';
import PrimaryInput from 'components/ui/Input/PrimaryInput';
import PinInput from 'components/ui/Input/PinInput';
import PrimaryButton from 'components/ui/Button/PrimaryButton';

import { useWindowSize } from 'hooks/useWindowSize';

import buttonColors from 'utils/button-colors';

import { formReducer } from './formReducer';
import WarningText from 'components/ui/WarningText';
import fetchData from 'functions/fetchData';
import { RequestFetchType } from 'utils/types';

const SigninPage: React.FC = () => {
  const [formState, dispatchForm] = useReducer(formReducer, {
    firstNameValue: '',
    firstNameValid: null,

    lastNameValue: '',
    lastNameValid: null,

    emailValue: '',
    emailValid: null,

    pinValue: '',
    pinValid: null,

    passwordValue: '',
    passwordValid: null,

    passwordConfirmValue: '',
    passwordConfirmValid: null,

    productInfoValue: '',
    productInfoValid: null,
  });

  const { windowHeight, windowWidth } = useWindowSize();
  const navigate = useNavigate();
  const intl = useIntl();

  useEffect(() => {
    return () => dispatchForm({ type: 'RESET_STATE' });
  }, []);

  const makeApiPost = async () => {
    const registerData = {
      email: formState.emailValue,
      firstName: formState.firstNameValue,
      lastName: formState.lastNameValue,
      password: formState.passwordValue,
      password2: formState.passwordConfirmValue,
      pin: formState.pinValue,
      token: formState.productInfoValue,
    };

    const requestOptions: RequestFetchType = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: registerData,
    };

    const response = await fetchData({
      api: `${api.ip}${api.registration}`,
      requestOptions: requestOptions,
    });

    return response ? response.success : false;
  };

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const {
      emailValue,
      firstNameValue,
      lastNameValue,
      passwordConfirmValue,
      passwordValue,
      pinValue,
      productInfoValue,
    } = formState;

    const {
      emailValid,
      firstNameValid,
      lastNameValid,
      passwordConfirmValid,
      passwordValid,
      pinValid,
      productInfoValid,
    } = formState;

    const isFormValid =
      emailValid &&
      firstNameValid &&
      lastNameValid &&
      passwordConfirmValid &&
      passwordValid &&
      pinValid &&
      productInfoValid;

    if (isFormValid) {
      const successful = await makeApiPost();

      if (successful) {
        navigate(api.loginPage);
      } else {
        console.error('Something go wrong with signin fetch data...');
      }
    } else {
      dispatchForm({ type: 'SET_FIRST_NAME', value: firstNameValue });
      dispatchForm({ type: 'SET_LAST_NAME', value: lastNameValue });
      dispatchForm({ type: 'SET_EMAIL', value: emailValue });
      dispatchForm({ type: 'SET_PIN', value: pinValue });
      dispatchForm({ type: 'SET_PASSWORD', value: passwordValue });
      dispatchForm({
        type: 'SET_PASSWORD_CONFIRM',
        value: passwordConfirmValue,
      });
      dispatchForm({ type: 'SET_PRODUCT_INFO', value: productInfoValue });

      console.log('Wrong form data');
    }
  };

  const SigninForm: JSX.Element = (
    <>
      <PrimaryInput
        id='first-name'
        label={intl.formatMessage({
          id: 'signin.firstName',
          defaultMessage: 'First Name',
        })}
        placeholder=''
        $isValid={formState.firstNameValid}
        onChange={(event) =>
          dispatchForm({ type: 'SET_FIRST_NAME', value: event.target.value })
        }
        required={true}
      />
      <PrimaryInput
        id='last-name'
        label={intl.formatMessage({
          id: 'signin.lastName',
          defaultMessage: 'Last Name',
        })}
        placeholder=''
        $isValid={formState.lastNameValid}
        onChange={(event) =>
          dispatchForm({ type: 'SET_LAST_NAME', value: event.target.value })
        }
        required={true}
      />
      <PrimaryInput
        id='e-mail'
        type='email'
        label='E-mail'
        placeholder=''
        $isValid={formState.emailValid}
        onChange={(event) =>
          dispatchForm({ type: 'SET_EMAIL', value: event.target.value })
        }
        required={true}
      />
      <PinInput
        label='PIN'
        length={4}
        $isValid={formState.pinValid}
        onPinEntered={(pin) => dispatchForm({ type: 'SET_PIN', value: pin })}
      />
      <PrimaryInput
        id='password'
        type='password'
        label={intl.formatMessage({
          id: 'signin.password',
          defaultMessage: 'Password',
        })}
        placeholder=''
        $isValid={formState.passwordValid}
        onChange={(event) =>
          dispatchForm({ type: 'SET_PASSWORD', value: event.target.value })
        }
        required={true}
      />
      {!formState.passwordValid && formState.passwordValid !== null && (
        <WarningText>
          Password must contain one small letter, one big letter, one number,
          one special sign and be more or equal to 8 sign length.
        </WarningText>
      )}
      <PrimaryInput
        id='cpnfirm-password'
        type='password'
        label={intl.formatMessage({
          id: 'signin.passwordConfirm',
          defaultMessage: 'Confirm password',
        })}
        placeholder=''
        $isValid={formState.passwordConfirmValid}
        onChange={(event) =>
          dispatchForm({
            type: 'SET_PASSWORD_CONFIRM',
            value: event.target.value,
          })
        }
        required={true}
      />
      {!formState.passwordConfirmValid &&
        formState.passwordConfirmValid !== null && (
          <WarningText>Passwords must be the same!</WarningText>
        )}
      <PrimaryInput
        id='product-code'
        label={intl.formatMessage({
          id: 'signin.productCode',
          defaultMessage: 'Product code',
        })}
        placeholder=''
        $isValid={formState.productInfoValid}
        onChange={(event) =>
          dispatchForm({
            type: 'SET_PRODUCT_INFO',
            value: event.target.value,
          })
        }
        required={true}
      />
    </>
  );

  return (
    <>
      <AuthorizationHeader />

      <MainSignin>
        <InfiniteScroll
          dataLength={1}
          hasMore={false}
          next={() => {}}
          loader={''}
          height={windowWidth > 1024 ? windowHeight * 0.63 : windowHeight * 0.6}
        >
          <form onSubmit={formSubmitHandler}>
            {SigninForm}
            <PrimaryButton
              type='submit'
              colorBtn={buttonColors.yellow}
            >
              Sign in
            </PrimaryButton>
          </form>
        </InfiniteScroll>
        <PrimaryButton
          colorBtn={buttonColors.red}
          onClick={() => navigate(api.loginPage)}
        >
          Back
        </PrimaryButton>
      </MainSignin>
    </>
  );
};

export default SigninPage;
