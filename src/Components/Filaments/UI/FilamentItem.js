// libs
import styled from 'styled-components';

const StyledListElement = styled.li`
  color: #e7e7e7;

  width: 40vw;

  background-color: #ad0006;
  background-image: radial-gradient(circle, #ad0006 0%, #3d0100 100%);

  border-radius: 1.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1rem;
  padding: 0rem 0rem 1rem 0rem;
`;

const FilamentItem = (props) => {
  return (
    <StyledListElement>
      <h2>{props.type}</h2>
      <div style={{ margin: '1rem' }}>
        <div className=''>Color: {props.color}</div>
        <div className=''>Quantity: {props.quantity} g</div>
      </div>
    </StyledListElement>
  );
};

export default FilamentItem;
