import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: { source: { type: 'dynamic' } },
  },
  args: {
    children: 'Button',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
export const FullWidth: Story = { args: { fullWidth: true }, parameters: { layout: 'fullscreen' } };
export const LoadingCenter: Story = { args: { loading: true, loadingPosition: 'center', className: 'bg-gray-900 text-white' } };
export const LoadingStart: Story = { args: { loading: true, loadingPosition: 'start' } };
export const LoadingEnd: Story = { args: { loading: true, loadingPosition: 'end' } };
export const WithStartIcon: Story = { args: { startIcon: '⭐', children: 'Star' } };
export const WithEndIcon: Story = { args: { endIcon: '→', children: 'Next' } };
export const NoRipple: Story = { args: { disableRipple: true } };

export const StaticExample: Story = {
  name: 'Static example (copy-paste)',
  parameters: {
    docs: {
      source: {
        code: `import Button from './Button';

export default function Page() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button>Button</Button>
      <Button size="small">Small</Button>
      <Button size="large">Large</Button>
      <Button fullWidth>Full width</Button>
      <Button loading loadingPosition="center">Loading</Button>
      <Button startIcon="⭐">Star</Button>
      <Button endIcon="→">Next</Button>
      <Button disableRipple>No ripple</Button>
    </div>
  );
}`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button>Button</Button>
      <Button size="small">Small</Button>
      <Button size="large">Large</Button>
      <Button fullWidth>Full width</Button>
      <Button loading loadingPosition="center">Loading</Button>
      <Button startIcon="⭐">Star</Button>
      <Button endIcon="→">Next</Button>
      <Button disableRipple>No ripple</Button>
    </div>
  ),
};
