// libs
import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch } from 'store/hooks';
import { authActions } from 'store/auth-slice';

import buttonColors from 'utils/button-colors';
import api from 'utils/apiKeys.json';

import { encodedToken } from 'hooks/useToken';
import { useWindowSize } from 'hooks/useWindowSize';

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

import { formReducer } from './formReducer';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: '',
    emailValid: null,

    pinValue: '',
    pinValid: null,
  });

  const { windowWidth } = useWindowSize();
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

    return response ? response.success : false;
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
            id='e-mail'
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
            style={{ width: windowWidth > 1024 ? '20vw' : '70vw' }}
            colorBtn={buttonColors.red}
            type='submit'
          >
            <FormattedMessage
              id='login.loginBtn'
              defaultMessage='Log in'
            />
          </PrimaryButton>
        </form>

        <PrimaryButton
          style={{ marginTop: 0, width: windowWidth > 1024 ? '20vw' : '70vw' }}
          onClick={() => navigate(api.signinPage)}
          colorBtn={buttonColors.yellow}
        >
          <FormattedMessage
            id='login.signinBtn'
            defaultMessage='Sign in'
          />
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
