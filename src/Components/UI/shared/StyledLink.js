// libs
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: unset;
`;

const StyledLink = (props) => {
  const { className, children, to } = props; // Destructuring props do oddzielnych zmiennych

  return (
    <LinkStyle
      to={to}
      className={className}
    >
      {children}
    </LinkStyle>
  );
};

export default StyledLink;
