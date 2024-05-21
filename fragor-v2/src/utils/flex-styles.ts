import { css, Interpolation } from 'styled-components';

interface FlexProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'unset';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'unset';
  align?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'unset';
}

const flexStyles = ({
  direction = 'column',
  justify = 'center',
  align = 'center',
}: FlexProps): Interpolation<any> => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
`;

export default flexStyles;
