import styled from 'styled-components';

const StyledInput = styled.input`
  width: 95%;
  min-height: 2.5rem;
  padding: 0 0.313rem;
  margin: 0.625rem 0rem;

  font-size: 1rem;

  border-radius: 0.625rem;
  border: 1px solid #000;
  background: #ffffff;

  transition: 0.3s;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline-offset: 5px;
  }
`;

export default StyledInput;
