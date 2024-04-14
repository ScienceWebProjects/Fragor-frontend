// libs
import styled from 'styled-components';

// utils
import Colors from 'utils/colors';
import mediaBreakpoints from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';

const HeaderLogin = styled.header`
  width: 100vw;
  height: 23vh;

  background-color: #666666;

  ${flexStyles({ direction: 'row' })}
  color: white;

  h1 {
    width: 60%;

    font-size: 1.25rem;
    font-family: Electrolize;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;

    text-align: start;
  }

  div {
    width: 8.125rem;
    height: 8.125rem;

    border-radius: 2rem;

    a img {
      width: 100%;
      height: 100%;

      border-radius: 10px;
    }
  }

  @media (min-width: ${mediaBreakpoints.tablet}) {
    h1 {
      font-size: 2rem;
    }

    div {
      width: 12rem;
      height: 12rem;

      border-radius: 2rem;

      a img {
        width: 100%;
        height: 100%;

        border-radius: 1.5rem;
      }
    }
  }

  @media (min-width: ${mediaBreakpoints.desctop}) {
    height: 90vh;
    max-width: 40%;
    ${flexStyles({ direction: 'column' })}

    background: none;
    color: ${Colors.light.fontDark};

    h1 {
      width: 100%;
      ${flexStyles({ direction: 'column' })}

      background: none;
      color: ${Colors.light.fontDark};
      text-align: center;
      font-size: 1.7rem;
    }

    div {
      width: 15rem;
      height: 15rem;

      border-radius: 2rem;

      a img {
        width: 100%;
        height: 100%;

        border-radius: 2rem;
        box-shadow: 7px 3px 20px 3px rgba(0, 0, 0, 0.125);
      }
    }
  }
`;

export default HeaderLogin;
