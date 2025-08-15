import type { Meta, StoryObj } from '@storybook/react-vite';
import Tooltip from './Tooltip';
import Button from './Button';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: { source: { type: 'dynamic' } },
  },
  args: { title: 'Info', placement: 'top' },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

const Template = (args: React.ComponentProps<typeof Tooltip>) => (
  <div style={{ padding: 24 }}>
    <Tooltip {...args}>
      <Button className="border border-gray-300">Hover me</Button>
    </Tooltip>
  </div>
);

export const Top: Story = { render: (args) => <Template {...args} /> };
export const Bottom: Story = { args: { placement: 'bottom' }, render: (args) => <Template {...args} /> };
export const Left: Story = { args: { placement: 'left' }, render: (args) => <Template {...args} /> };
export const Right: Story = { args: {
  placement: 'right',
  classes: {},
  className: "bg-red-500"
}, render: (args) => <Template {...args} /> };
export const NoArrow: Story = { args: { arrow: false }, render: (args) => <Template {...args} /> };

export const StaticExample: Story = {
  name: 'Static example (copy-paste)',
  parameters: {
    docs: {
      source: {
        code: `import Tooltip from './Tooltip';
import Button from './Button';

export default function Page() {
  return (
    <div style={{ padding: 24, display: 'flex', gap: 12 }}>
      <Tooltip title="Info" placement="top">
        <Button className="border border-gray-300">Hover me</Button>
      </Tooltip>
      <Tooltip title="Right" placement="right">
        <Button className="border border-gray-300">Hover me</Button>
      </Tooltip>
      <Tooltip title="Bottom" placement="bottom">
        <Button className="border border-gray-300">Hover me</Button>
      </Tooltip>
      <Tooltip title="Left" placement="left">
        <Button className="border border-gray-300">Hover me</Button>
      </Tooltip>
    </div>
  );
}`,
      },
    },
  },
  render: () => (
    <div style={{ padding: 24, display: 'flex', gap: 12 }}>
      <Tooltip title="Info" placement="top">
        <Button className="border border-gray-300">Hover me</Button>
      </Tooltip>
      <Tooltip title="Right" placement="right">
        <Button className="border border-gray-300">Hover me</Button>
      </Tooltip>
      <Tooltip title="Bottom" placement="bottom">
        <Button className="border border-gray-300">Hover me</Button>
      </Tooltip>
      <Tooltip title="Left" placement="left">
        <Button className="border border-gray-300">Hover me</Button>
      </Tooltip>
    </div>
  ),
};
