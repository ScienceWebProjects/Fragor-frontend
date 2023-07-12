// react libs
import { useState } from 'react';

// UI elements
import StyledButton from './StyledButton';

const colors = {
  red: {
    textColor: '#8A100E',
    borderColor: 'linear-gradient(30deg, rgba(61, 1, 0, 1) 0%, rgba(138, 16, 14, 1) 40%);',
  },
  yellow: {
    textColor: '#8A6F07',
    borderColor: 'linear-gradient(30deg, rgba(138,111,7,1) 0%, rgba(214,175,21,1) 40%)',
  },
  blue: {
    textColor: '#1375BD',
    borderColor: '2px solid #1375BD',
  },
  green: {
    textColor: '#2F8A07',
    borderColor: '2px solid #2F8A07',
  },
};

const Button = (props) => {
  const { color, className } = props;
  const [colorData, setColorData] = useState(
    color === 'red'
      ? colors.red
      : color === 'yellow'
      ? colors.yellow
      : color === 'blue'
      ? colors.blue
      : color === 'green'
      ? colors.green
      : null
  );

  return (
    <StyledButton
      className={className}
      $textcolor={colorData.textColor}
      $bordercolor={colorData.borderColor}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
