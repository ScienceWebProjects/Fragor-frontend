// libs
import styled from 'styled-components';
import { Input } from 'antd';

// utils
import mediaBreakpoints from 'utils/media-breakpoints';
import Colors from 'utils/colors';
import { InputProps } from 'utils/types';

const PrimaryInputStyle: React.FC<InputProps> = styled(Input)`
  &:where(.css-dev-only-do-not-override-djtmh8).ant-input-outlined:focus,
  :where(.css-dev-only-do-not-override-djtmh8).ant-input-outlined:focus-within {
    border-color: ${({ $isValid }) =>
      !$isValid && $isValid !== null ? Colors.red[400] : Colors.grey[100]};
    box-shadow: 0 0 0 1px
      ${({ $isValid }) =>
        !$isValid && $isValid !== null ? Colors.red[600] : Colors.yellow[200]};
  }

  & {
    border-color: ${({ $isValid }) =>
      !$isValid && $isValid !== null ? Colors.red[400] : Colors.grey[100]};

    width: 95%;
    min-height: 2.5rem;
    padding: 0 0.313rem;
    margin: 0.125rem 0rem;

    font-size: 1rem;

    border-radius: 0.625rem;

    transition: 0.3s;

    &::placeholder {
      color: #aaa;
    }

    &:focus {
      outline-offset: 5px;
    }

    @media (min-width: ${mediaBreakpoints.desctop}) {
      font-size: 1.25rem;
    }
  }
`;

export default PrimaryInputStyle;
