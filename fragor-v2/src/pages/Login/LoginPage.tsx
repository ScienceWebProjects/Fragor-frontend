// libs
import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch } from 'store/hooks';
import { authActions } from 'store/auth-slice';

import buttonColors from 'utils/button-colors';
import api from 'utils/apiKeys.json';

import { encodedToken } from 'hooks/useToken';

import { Button } from 'antd';
import PrimaryButton from 'components/ui/Button/PrimaryButton';
import SelectLanguage from 'components/language/SelectLanguage';
import PrimaryInput from 'components/ui/Input/PrimaryInput';

import MainLogin from './MainLoginStyle';
import AdidionalBtsWrapper from './AditionalBtnStyle';
import PinInput from 'components/ui/Input/PinInput';
import fetchData from 'functions/fetchData';
import { RequestFetchType } from 'utils/types';
import AuthorizationHeader from 'components/AuthorizationHeader';

interface FormState {
  emailValue: string;
  emailValid: boolean | null;

  pinValue: string;
  pinValid: boolean | null;
}

type FormAction =
  | { type: 'SET_EMAIL'; value: string }
  | { type: 'SET_PIN'; value: string }
  | { type: 'RESET_STATE' };

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        emailValue: action.value.trim(),
        emailValid:
          action.value.trim().length > 5 && action.value.includes('@'),
      };
    case 'SET_PIN':
      return {
        ...state,
        pinValue: action.value.trim(),
        pinValid: action.value.trim().length === 4,
      };
    case 'RESET_STATE':
      return {
        emailValue: '',
        emailValid: null,

        pinValue: '',
        pinValid: null,
      };
    default:
      return state;
  }
};

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: '',
    emailValid: null,

    pinValue: '',
    pinValid: null,
  });

  const navigate = useNavigate();

  const makeApiPost = async () => {
    const loginData = {
      email: formState.emailValue,
      pin: formState.pinValue,
    };

    const requestOptions: RequestFetchType = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: loginData,
    };

    const response = await fetchData({
      api: `${api.ip}${api.loginPin}`,
      requestOptions: requestOptions,
    });

    const user = response ? response.response : {};

    encodedToken(user);

    return response ? response.sucsess : false;
  };

  const loginSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const succsesful = await makeApiPost();

    if (succsesful) {
      dispatch(authActions.login());
      navigate(api.home);
    }
  };

  return (
    <>
      <AuthorizationHeader />

      <MainLogin>
        <SelectLanguage />
        <form onSubmit={loginSubmitHandler}>
          <PrimaryInput
            label='E-mail'
            placeholder='Enter your login e-mail'
            onChange={(event) => {
              dispatchForm({ type: 'SET_EMAIL', value: event.target.value });
            }}
            $isValid={formState.emailValid}
            required={true}
          />
          <PinInput
            label='PIN'
            length={4}
            $isValid={formState.pinValid}
            onPinEntered={(pin) => {
              dispatchForm({
                type: 'SET_PIN',
                value: pin,
              });
            }}
          />
          <PrimaryButton
            colorBtn={buttonColors.red}
            type='submit'
          >
            Login
          </PrimaryButton>
        </form>

        <PrimaryButton
          style={{ marginTop: 0 }}
          onClick={() => navigate(api.signinPage)}
        >
          Sign in
        </PrimaryButton>

        <AdidionalBtsWrapper>
          <Button type='link'>
            <FormattedMessage
              id='login.forgetPin'
              defaultMessage='Forget PIN?'
            />
          </Button>
          <Button type='link'>
            <FormattedMessage
              id='login.privacy'
              defaultMessage='Privacy policy'
            />
          </Button>
        </AdidionalBtsWrapper>
      </MainLogin>
    </>
  );
};

export default LoginPage;
