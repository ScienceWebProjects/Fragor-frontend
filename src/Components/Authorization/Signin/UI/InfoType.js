// libs
import styled from 'styled-components';

const Underline = styled.div`
  width: 100%;
  height: 2px;
  background-color: #000;

  margin: 0.313rem 0;
`;

function InfoType(props) {
  const { text } = props;

  return (
    <div style={{ width: '100%', margin: '0.625rem 0' }}>
      <div style={{ color: '#000' }}>{text}</div>
      <Underline />
    </div>
  );
}

export default InfoType;
