// libs
import styled from 'styled-components';

// components
import { Button } from 'antd';

interface StyledButtonProps {
  $textcolor?: string;
  $bordercolor?: string;
}

const StyledButton = styled(Button)<StyledButtonProps>``;

export default StyledButton;
