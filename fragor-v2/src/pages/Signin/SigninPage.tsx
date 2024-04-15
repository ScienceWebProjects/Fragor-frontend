import React from 'react';

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

const SigninPage: React.FC = () => {
  return (
    <>
      <AuthorizationHeader />
    </>
  );
};

export default SigninPage;
