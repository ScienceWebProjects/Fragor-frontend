import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { authActions } from 'store/auth-slice';

import PrimaryButton from 'components/ui/Button/PrimaryButton';

import api from 'utils/apiKeys.json';
import { useDecodedToken } from 'hooks/useToken';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();

  const token = useDecodedToken();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isLogin && !token) {
      navigate(api.loginPage);
    } else {
      dispatch(authActions.login());
    }
  }, [isLogin, token, navigate, dispatch]);

  return <div>{isLogin && <PrimaryButton />}</div>;
};

export default HomePage;
