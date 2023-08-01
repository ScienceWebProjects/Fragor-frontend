// libs

// UI elements
import StyledButton from './StyledButton';

const colors = {
  red: {
    textColor: '#8A100E',
    borderColor: 'linear-gradient(270deg, rgba(61, 1, 0, 1) 0%, rgba(138, 16, 14, 1) 40%);',
  },
  yellow: {
    textColor: '#8A6F07',
    borderColor: 'linear-gradient(270deg, rgba(138,111,7,1) 0%, rgba(214,175,21,1) 40%)',
  },
  blue: {
    textColor: '#1375BD',
    borderColor: 'linear-gradient(270deg, rgba(0,80,138,1) 0%, rgba(19,117,189,1) 40%);',
  },
  green: {
    textColor: '#2F8A07',
    borderColor: 'linear-gradient(270deg, rgba(25,74,4,1) 0%, rgba(47,138,7,1) 40%)',
  },
};

const Button = (props) => {
  const { color, className, onClick } = props;
  // const [colorData, setColorData] = useState(
  const colorData =
    color === 'red'
      ? colors.red
      : color === 'yellow'
      ? colors.yellow
      : color === 'blue'
      ? colors.blue
      : color === 'green'
      ? colors.green
      : null;

  return (
    <StyledButton
      className={className}
      $textcolor={colorData.textColor}
      $bordercolor={colorData.borderColor}
      onClick={onClick}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
