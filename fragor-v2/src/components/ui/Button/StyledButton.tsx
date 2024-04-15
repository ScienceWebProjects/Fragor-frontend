// libs
import styled from 'styled-components';

// components
import { Button } from 'antd';
import { ButtonColors } from 'utils/types';

interface StyledButtonProps {
  $colorBtn: ButtonColors;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  &:where(.css-dev-only-do-not-override-djtmh8).ant-btn-primary:not(
      :disabled
    ):not(.ant-btn-disabled):hover {
    color: #fff;
    background: ${(props) => props.$colorBtn.borderColor};
    border: none;
  }

  & {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 90%;
    height: 2.5rem;
    padding: 0.625rem 1.25rem;

    margin: 0.3rem auto;

    position: relative;
    box-sizing: border-box;

    color: ${(props) => props.$colorBtn?.textColor || '#000'};
    background: #fff;
    background-clip: padding-box;
    border: solid 5px transparent;
    border-radius: 0.625rem;

    text-align: center;
    font-size: 1rem;
    font-family: 'Electrolize';
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    -webkit-transition: 250ms;
    -o-transition: 250ms;
    transition: 250ms;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      margin: calc(-3px);
      border-radius: 0.5rem;
      background: ${(props) => props.$colorBtn?.borderColor};
    }

    &:hover,
    &:active {
      color: #fff;
      background: ${(props) => props.$colorBtn?.textColor};

      cursor: pointer;
      box-sizing: border-box;

      -webkit-transition: 250ms;
      -o-transition: 250ms;
      transition: 250ms;
    }

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

export default StyledButton;
