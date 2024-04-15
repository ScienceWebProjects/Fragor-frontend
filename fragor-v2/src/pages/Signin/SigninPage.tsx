import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'utils/apiKeys.json';
import InfiniteScroll from 'react-infinite-scroll-component';

import AuthorizationHeader from 'components/AuthorizationHeader';
import MainSignin from './MainSigninStyle';
import PrimaryInput from 'components/ui/Input/PrimaryInput';
import PinInput from 'components/ui/Input/PinInput';
import PrimaryButton from 'components/ui/Button/PrimaryButton';

import { useWindowSize } from 'hooks/useWindowSize';

import buttonColors from 'utils/button-colors';

import { formReducer } from './formReducer';

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

    console.log(
      emailValue,
      firstNameValue,
      lastNameValue,
      passwordConfirmValue,
      passwordValue,
      pinValue,
      productInfoValue
    );
  };

  const SigninForm: JSX.Element = (
    <>
      <PrimaryInput
        id='first-name'
        label='First name'
        placeholder=''
        $isValid={formState.firstNameValid}
        onChange={(event) =>
          dispatchForm({ type: 'SET_FIRST_NAME', value: event.target.value })
        }
        required={true}
      />
      <PrimaryInput
        id='last-name'
        label='Last Name'
        placeholder=''
        $isValid={formState.lastNameValid}
        onChange={(event) =>
          dispatchForm({ type: 'SET_LAST_NAME', value: event.target.value })
        }
        required={true}
      />
      <PrimaryInput
        id='e-mail'
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
        label='Password'
        placeholder=''
        $isValid={formState.passwordValid}
        onChange={(event) =>
          dispatchForm({ type: 'SET_PASSWORD', value: event.target.value })
        }
        required={true}
      />
      <PrimaryInput
        id='cpnfirm-password'
        label='Confirm password'
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
      <PrimaryInput
        id='product-code'
        label='Product code'
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
              colorBtn={buttonColors.green}
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
