// libs
import styled from 'styled-components';

const Text = styled.div`
  width: 100%;
  margin: 1rem auto 0.625rem auto;
  font-weight: 700;
  text-align: center;
`;

const Underline = styled.div`
  width: 90%;
  height: 2px;
  background-color: #000;

  margin: 0.313rem auto;
`;

function InfoType(props) {
  const { text } = props;

  return (
    <Text>
      <div style={{ color: '#000' }}>{text}</div>
      <Underline />
    </Text>
  );
}

export default InfoType;
