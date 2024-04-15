interface FormState {
  firstNameValue: string;
  firstNameValid: boolean | null;

  lastNameValue: string;
  lastNameValid: boolean | null;

  emailValue: string;
  emailValid: boolean | null;

  pinValue: string;
  pinValid: boolean | null;

  passwordValue: string;
  passwordValid: boolean | null;

  passwordConfirmValue: string;
  passwordConfirmValid: boolean | null;

  productInfoValue: string;
  productInfoValid: boolean | null;
}

type FormAction =
  | { type: 'SET_FIRST_NAME'; value: string }
  | { type: 'SET_LAST_NAME'; value: string }
  | { type: 'SET_EMAIL'; value: string }
  | { type: 'SET_PIN'; value: string }
  | { type: 'SET_PASSWORD'; value: string }
  | { type: 'SET_PASSWORD_CONFIRM'; value: string }
  | { type: 'SET_PRODUCT_INFO'; value: string }
  | { type: 'RESET_STATE' };

const lowercaseRegex = /[a-z]/;
const uppercaseRegex = /[A-Z]/;
const digitRegex = /[0-9]/;
const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case 'SET_FIRST_NAME':
      return {
        ...state,
        firstNameValue: action.value.trim(),
        firstNameValid: action.value.trim().length >= 2,
      };
    case 'SET_LAST_NAME':
      return {
        ...state,
        lastNameValue: action.value.trim(),
        lastNameValid: action.value.trim().length >= 2,
      };

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
    case 'SET_PASSWORD':
      const password = action.value.trim();

      const isPasswordValid =
        lowercaseRegex.test(password) &&
        uppercaseRegex.test(password) &&
        digitRegex.test(password) &&
        specialCharRegex.test(password) &&
        password.length > 7;

      return {
        ...state,
        passwordValue: action.value.trim(),
        passwordValid: isPasswordValid,
      };
    case 'SET_PASSWORD_CONFIRM':
      return {
        ...state,
        passwordConfirmValue: action.value.trim(),
        passwordConfirmValid: action.value.trim() === state.passwordValue,
      };
    case 'SET_PRODUCT_INFO':
      return {
        ...state,
        productInfoValue: action.value.trim(),
        productInfoValid: action.value.trim().length > 0,
      };
    case 'RESET_STATE':
      return {
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
      };
    default:
      return state;
  }
};
