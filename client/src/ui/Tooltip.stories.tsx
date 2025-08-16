import type { Meta, StoryObj } from '@storybook/react-vite';
import Tooltip from './Tooltip';
import Button from './Button';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        component:
          'Tooltip simple basé sur un enfant unique. Ouvre au survol, focus clavier ou touch (configurable).\n' +
          '\n' +
          '• Positionnement via hook partagé useAnchoredPopover (flip + clamp).\n' +
          '• Rendu via portal dans document.body.\n' +
          '• Invisible jusqu\'à ce que la position soit prête, puis fade rapide.\n' +
          '• API stable : title, placement, arrow, enterDelay, leaveDelay, disable*Listener, className, classes.{content,arrow}.',
      },
    },
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

export const AllPlacements: Story = {
  name: 'All placements grid',
  render: () => (
    <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
      <Tooltip title="Top" placement="top"><Button className="border border-gray-300">Top</Button></Tooltip>
      <Tooltip title="Right" placement="right"><Button className="border border-gray-300">Right</Button></Tooltip>
      <Tooltip title="Bottom" placement="bottom"><Button className="border border-gray-300">Bottom</Button></Tooltip>
      <Tooltip title="Left" placement="left"><Button className="border border-gray-300">Left</Button></Tooltip>
    </div>
  ),
};

export const Delays: Story = {
  args: { enterDelay: 80, leaveDelay: 60 },
  render: (args) => (
    <div style={{ padding: 24 }}>
      <Tooltip {...args}><Button className="border border-gray-300">Hover me (delays)</Button></Tooltip>
    </div>
  ),
};

export const DisabledListeners: Story = {
  args: { disableHoverListener: true, disableTouchListener: true },
  render: (args) => (
    <div style={{ padding: 24 }}>
      <Tooltip {...args}><Button className="border border-gray-300">Focus me (keyboard)</Button></Tooltip>
      <p style={{ marginTop: 8, color: '#666' }}>Hover/touch désactivés, utiliser Tab/Shift+Tab pour focus.</p>
    </div>
  ),
};

export const CustomClasses: Story = {
  name: 'Custom classes (content/arrow)',
  args: {
    classes: { content: 'bg-indigo-600 text-white', arrow: 'bg-indigo-600' },
  },
  render: (args) => (
    <div style={{ padding: 24 }}>
      <Tooltip {...args}><Button className="border border-gray-300">Hover me</Button></Tooltip>
    </div>
  ),
};
