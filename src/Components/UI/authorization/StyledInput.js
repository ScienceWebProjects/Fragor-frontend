import styled from 'styled-components';

const StyledInput = styled.input`
  width: 80vw;
  height: 2.5rem;
  padding: 0 0.625rem;
  margin: 0.375rem 0rem;

  font-size: 1.125rem;

  border-radius: 0.625rem;
  border: 1px solid #000;
  background: #ffffff;

  transition: 0.3s;

  &::placeholder {
    color: #005289;
  }

  &:focus {
    outline-offset: 5px;
  }
`;

export default StyledInput;
