import styled from 'styled-components';

const SelectBox = styled.div`
  max-width: 22%;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
  color: #fff;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';

    color: #fff;
    background-color: #1375bd;

    border: 0;
    border-bottom: 1px solid black;
    border-radius: 0.625rem;

    text-align: center;

    padding: 5px;

    option {
      background-color: #1375bd;
    }
  }
`;

export default SelectBox;
