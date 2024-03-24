// libs
import React from 'react';

// import { useDispatch } from 'react-redux';
// import { RootState } from 'store/rootReducer';
// import { authActions } from 'store/auth';
import { FormattedMessage } from 'react-intl';

// components
// import PrimaryButton from 'components/ui/Button/PrimaryButton';
import SelectLanguage from 'components/language/SelectLanguage';

// UI
import logo from 'assets/images/logo-black.png';
import HeaderLogin from './HeaderLogin';
import MainLogin from './MainLogin';
import { Button, Input } from 'antd';

const LoginPage: React.FC = () => {
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
          <Input placeholder='E-mail' />
          <Input placeholder='PIN' />
          <Button>Login</Button>
        </form>

        <Button>Sign in</Button>

        <div>
          <Button>
            <FormattedMessage
              id='login.forgetPin'
              defaultMessage='Forget PIN?'
            />
          </Button>
          <Button>
            <FormattedMessage
              id='login.privacy'
              defaultMessage='Privacy policy'
            />
          </Button>
        </div>
      </MainLogin>
    </div>
  );
};

export default LoginPage;
