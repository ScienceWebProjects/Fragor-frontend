import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 85vw;
  height: 2.5rem;
  padding: 0.625rem 1.25rem;
  margin: 0.625rem 0;

  flex-shrink: 0;

  border-radius: 0.625rem;
  background: #fff;

  color: ${(props) => props.textcolor || '#000'};
  border: ${(props) => props.bordercolor || '#000'};

  text-align: center;
  font-size: 1.75rem;
  font-family: 'Electrolize';
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    color: #fff;
    background-color: ${(props) => props.textcolor || '#000'};
    border: 2px solid #000;

    cursor: pointer;
  }
`;

export default StyledButton;
