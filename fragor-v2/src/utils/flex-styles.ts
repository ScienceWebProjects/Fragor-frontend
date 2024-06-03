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
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | 'unset';
  gap?: string;
}

const flexStyles = ({
  direction = 'column',
  justify = 'center',
  align = 'center',
  wrap = 'nowrap',
  gap,
}: FlexProps): Interpolation<any> => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap};
`;

export default flexStyles;
