// libs
import React, { useReducer } from 'react';

// import { useDispatch } from 'react-redux';
// import { RootState } from 'store/rootReducer';
// import { authActions } from 'store/auth';
import { FormattedMessage } from 'react-intl';

// utils
import buttonColors from 'utils/button-colors';

// components
import { Button } from 'antd';
import PrimaryButton from 'components/ui/Button/PrimaryButton';
import SelectLanguage from 'components/language/SelectLanguage';
import PrimaryInput from 'components/ui/Input/PrimaryInput';

// UI
import logo from 'assets/images/logo-black.png';
import HeaderLogin from './HeaderLoginStyle';
import MainLogin from './MainLoginStyle';
import AdidionalBtsWrapper from './AditionalBtnStyle';

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
  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: '',
    emailValid: null,

    pinValue: '',
    pinValid: null,
  });
  // const dispatch = useDispatch();

  // const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  // const loginHandler = (): void => {
  //   dispatch(authActions.login());
  // };

  return (
    <div className='App-wrapper'>
      <HeaderLogin>
        <h1>
          3D printing assistant
          <br />
          Project by:
          <br />
          Piotr Goraj & Dawid Franczak
          <br />
        </h1>
        <div>
          <a
            href='https://github.com/ScienceWebProjects/filament-measurement'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={logo}
              alt='Logo'
            />
          </a>
        </div>
      </HeaderLogin>

      <MainLogin>
        <SelectLanguage />
        <form>
          <PrimaryInput
            label='E-mail'
            placeholder='Enter your login e-mail'
            onChange={(event) => {
              dispatchForm({ type: 'SET_EMAIL', value: event.target.value });
            }}
            $isValid={formState.emailValid}
            required={true}
          />
          <PrimaryInput
            label='PIN'
            placeholder='Enter your pin'
            onChange={(event) => {
              dispatchForm({
                type: 'SET_PIN',
                value: event.target.value.toString(),
              });
            }}
            $isValid={formState.pinValid}
          />
          <PrimaryButton
            colorBtn={buttonColors.red}
            type='submit'
          >
            Login
          </PrimaryButton>
        </form>

        <PrimaryButton style={{ marginTop: 0 }}>Sign in</PrimaryButton>

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
    </div>
  );
};

export default LoginPage;
