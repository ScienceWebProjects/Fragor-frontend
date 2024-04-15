import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import PrimaryButton, {
  PrimaryButtonProps,
} from 'components/ui/Button/PrimaryButton';
import buttonColors from 'utils/button-colors';

const meta = {
  title: 'Atomic/PrimaryButton',
  component: PrimaryButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} as Meta<typeof PrimaryButton>;

export default meta;

type Story = StoryObj<typeof PrimaryButton>;

// @ts-ignore
export const Primary: Story = (args: PrimaryButtonProps) => (
  <PrimaryButton
    {...args}
    antType='primary'
    colorBtn={buttonColors.green}
    onClick={() => {}}
    type='button'
  >
    Label
  </PrimaryButton>
);
