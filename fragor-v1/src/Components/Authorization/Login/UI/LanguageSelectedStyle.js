// libs
import styled from 'styled-components';

const LanguageSelectedStyle = styled.div`
  &::before {
    content: '';
    display: block;
    width: 1.563rem;
    height: 1.563rem;
    background-image: ${(props) => props.$flagimage};
  }
`;

export default LanguageSelectedStyle;
