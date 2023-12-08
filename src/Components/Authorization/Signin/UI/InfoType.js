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

function InfoType({ text, className, style }) {
  return (
    <Text>
      <div
        className={className}
        style={style}
      >
        {text}
      </div>
      <Underline />
    </Text>
  );
}

export default InfoType;
