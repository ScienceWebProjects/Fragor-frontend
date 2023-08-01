import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 85vw;
  height: 2.5rem;
  padding: 0.625rem 1.25rem;

  margin: 0.625rem auto;

  position: relative;
  box-sizing: border-box;

  color: ${(props) => props.$textcolor || '#000'};
  background: #fff;
  background-clip: padding-box;
  border: solid 5px transparent;
  border-radius: 0.625rem;

  text-align: center;
  font-size: 1.75rem;
  font-family: 'Electrolize';
  font-style: normal;
  font-weight: 400;
  line-height: normal;

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
    background: ${(props) => props.$bordercolor};
  }

  &:hover,
  &:active {
    color: #fff;
    background: ${(props) => props.$textcolor};

    border: 3px solid #000;
    cursor: pointer;
  }
`;

export default StyledButton;
