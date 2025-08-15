import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'UI/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: { source: { type: 'dynamic' } },
  },
  args: {
    label: 'Category',
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Clickable: Story = { args: { clickable: true },
  parameters: { controls: { exclude: ['onClick'] } },
  render: (args) => <Chip {...args} onClick={() => console.log('clicked')} />,
};
export const Deletable: Story = { args: { deletable: true },
  parameters: { controls: { exclude: ['onDelete'] } },
  render: (args) => <Chip {...args} onDelete={() => console.log('deleted')} />,
};
export const WithIcon: Story = { args: { icon: <span>🏷️</span> } };
export const WithAvatar: Story = { args: { avatar: <span>👤</span> } };

export const StaticExample: Story = {
  name: 'Static example (copy-paste)',
  parameters: {
    docs: {
      source: {
        code: `import Chip from './Chip';

export default function Page() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Chip label="Category" />
      <Chip label="Small" size="small" />
      <Chip label="Clickable" clickable />
      <Chip label="Deletable" deletable />
      <Chip label="With icon" icon={<span>🏷️</span>} />
      <Chip label="With avatar" avatar={<span>👤</span>} />
    </div>
  );
}`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Chip label="Category" />
      <Chip label="Small" size="small" />
      <Chip label="Clickable" clickable />
      <Chip label="Deletable" deletable />
      <Chip label="With icon" icon={<span>🏷️</span>} />
      <Chip label="With avatar" avatar={<span>👤</span>} />
    </div>
  ),
};
