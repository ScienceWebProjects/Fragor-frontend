import styled from 'styled-components';

const SelectBox = styled.div`
  width: 20%;
  margin: 0.313rem;

  color: #d6af15;
  background: linear-gradient(30deg, rgba(138, 111, 7, 1) 0%, rgba(214, 175, 21, 1) 40%);
  padding: 2px;
  border-radius: 0.625rem;

  .SelectBox_border-gradient {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    background-color: #fff;
    border-radius: 0.625rem;

    width: 100%;
    height: 100%;

    label {
      z-index: 1;
    }

    select {
      padding: 0;
      margin: 0;

      z-index: 1;
      width: 98%;
      margin-bottom: 0.125rem;

      -webkit-appearance: none;
      -moz-appearance: none;
      text-indent: 1px;
      text-overflow: '';

      color: #d6af15;
      background-color: #fff;

      border: 0;
      border-radius: 0.625rem;

      text-align: center;

      font-family: 'Electrolize', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

      &:focus-visible {
        border: 0;
        border-bottom: 2px solid black;
        outline: none;
      }

      &:hover {
        cursor: pointer;
      }

      option {
        background-color: #1375bd;
        font-family: 'Electrolize', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      }
    }
  }
`;

export default SelectBox;
