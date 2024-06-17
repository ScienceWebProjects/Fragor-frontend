import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/Redux/hooks';
import { authActions } from 'store/Redux/auth-slice';

import api from 'utils/apiKeys.json';
import { useDecodedToken } from 'hooks/useToken';
import HomeStyle from './HomeStyle';
import { useWindowSize } from 'hooks/useWindowSize';
import { mediaBreakpointsPoints } from 'utils/media-breakpoints';
import MobileTopBar from 'components/MobileTopBar';
import HomeContainer from './HomeContainer';
import MenuButtons from './MenuButtons';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();

  const user = useDecodedToken();
  const navigate = useNavigate();
  const { windowWidth } = useWindowSize();

  useEffect(() => {
    if (!isLogin && !user.token) {
      navigate(api.loginPage);
    } else {
      dispatch(authActions.login());
    }
  }, [isLogin, user, navigate, dispatch]);

  return (
    <>
      {windowWidth < mediaBreakpointsPoints.mobile && <MobileTopBar />}

      <HomeStyle>
        {windowWidth < mediaBreakpointsPoints.mobile && (
          <>
            <HomeContainer>Date and clock</HomeContainer>
            <HomeContainer>Quote</HomeContainer>
            <HomeContainer>
              <MenuButtons />
            </HomeContainer>
          </>
        )}

        {windowWidth > mediaBreakpointsPoints.mobile && (
          <>
            <HomeContainer>Welcome user</HomeContainer>
            <HomeContainer>
              <MenuButtons />
            </HomeContainer>
            <HomeContainer>LOGO</HomeContainer>
            <HomeContainer>Quote</HomeContainer>
          </>
        )}
      </HomeStyle>
    </>
  );
};

export default HomePage;
