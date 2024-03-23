// libs
import React from 'react';

// import { useDispatch } from 'react-redux';
// import { RootState } from 'store/rootReducer';
// import { authActions } from 'store/auth';

// components
// import PrimaryButton from 'components/ui/Button/PrimaryButton';

// UI
import logo from 'assets/images/logo-black.png';
import HeaderLogin from './HeaderLogin';
import MainLogin from './MainLogin';

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

      <MainLogin></MainLogin>
    </div>
  );
};

export default LoginPage;
