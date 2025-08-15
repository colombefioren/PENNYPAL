import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: { source: { type: 'dynamic' } },
  },
  args: {
    children: <span>✚</span>,
    'aria-label': 'Add',
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
export const EdgeStart: Story = { args: { edge: 'start' } };
export const EdgeEnd: Story = { args: { edge: 'end' } };
export const NoRipple: Story = { args: { ripple: false } };
export const Disabled: Story = { args: { disabled: true } };

// Simple, copy-paste static example
export const StaticExample: Story = {
  name: 'Static example (copy-paste)',
  parameters: {
    docs: {
      source: {
        code: `import IconButton from './IconButton';

export default function Page() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconButton aria-label="Add"><span>✚</span></IconButton>
      <IconButton size="small" aria-label="Add"><span>✚</span></IconButton>
      <IconButton size="large" aria-label="Add"><span>✚</span></IconButton>
      <IconButton edge="start" aria-label="Menu"><span>≡</span></IconButton>
      <IconButton edge="end" aria-label="Close"><span>×</span></IconButton>
      <IconButton ripple={false} aria-label="No ripple"><span>✚</span></IconButton>
      <IconButton disabled aria-label="Disabled"><span>✚</span></IconButton>
    </div>
  );
}`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconButton aria-label="Add"><span>✚</span></IconButton>
      <IconButton size="small" aria-label="Add"><span>✚</span></IconButton>
      <IconButton size="large" aria-label="Add"><span>✚</span></IconButton>
      <IconButton edge="start" aria-label="Menu"><span>≡</span></IconButton>
      <IconButton edge="end" aria-label="Close"><span>×</span></IconButton>
      <IconButton ripple={false} aria-label="No ripple"><span>✚</span></IconButton>
      <IconButton disabled aria-label="Disabled"><span>✚</span></IconButton>
    </div>
  ),
};
