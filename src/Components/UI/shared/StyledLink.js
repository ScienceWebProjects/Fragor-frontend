// libs
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: unset;
`;

const StyledLink = (props) => {
  const { className, children, to, style, onClick } = props; // Destructuring props to separate variables

  return (
    <LinkStyle
      to={to}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </LinkStyle>
  );
};

export default StyledLink;
