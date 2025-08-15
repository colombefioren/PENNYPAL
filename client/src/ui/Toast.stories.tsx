import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ToastProvider, useToast } from './Toast';
import type { ToastProviderProps } from './Toast';
import Button from './Button';

const meta: Meta<ToastProviderProps> = {
  title: 'UI/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: { source: { type: 'dynamic' } },
  },
  argTypes: {
    max: { control: { type: 'number', min: 1, max: 10 } },
    dense: { control: 'boolean' },
    pauseOnHover: { control: 'boolean' },
    anchorOrigin: {
      control: 'object',
      description: 'Position of the toast stack',
    },
    classes: {
      control: 'object',
      description: 'Tailwind classes for container and items',
    },
  },
  args: {
    max: 4,
    dense: false,
    pauseOnHover: true,
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
    classes: {
      container: '',
      item: '',
      icon: '',
      message: '',
      action: '',
    },
  },
};
export default meta;

type Story = StoryObj<ToastProviderProps>;

const Demo: React.FC = () => {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-8 p-4">
      <div className="flex flex-col gap-2">
        <div className="font-medium">Variants</div>
        <Button className="bg-green-600 text-white" onClick={() => toast.success('Success')}>Success</Button>
        <Button className="bg-red-600 text-white" onClick={() => toast.error('Error')}>Error</Button>
        <Button className="bg-amber-600 text-white" onClick={() => toast.warning('Warning')}>Warning</Button>
        <Button className="border border-sky-300 text-sky-700" onClick={() => toast.info('Info')}>Info</Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-medium">Loading → Success</div>
        <Button onClick={() => {
          const id = toast.loading('Loading...');
          setTimeout(() => toast.success('Done', { replaceId: id }), 1000);
        }}>Trigger</Button>
      </div>
    </div>
  );
};

export const Playground: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <Demo />
    </ToastProvider>
  ),
};

export const WithCustomClasses: Story = {
  name: 'With custom classes',
  args: {
    classes: {
      container: 'gap-4',
      item: 'ring-2 ring-offset-2',
      icon: 'opacity-90',
      message: 'font-medium',
      action: 'underline',
    },
  },
  render: (args) => (
    <ToastProvider {...args}>
      <Demo />
    </ToastProvider>
  ),
};

// Simple, copy-paste static example (no args spread)
export const StaticExample: Story = {
  name: 'Static example (copier-coller)',
  parameters: {
    docs: {
      source: {
        code: `import { ToastProvider } from './Toast';

export default function Page() {
  return (
    <ToastProvider
      max={4}
      dense={false}
      pauseOnHover={true}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      classes={{
        container: 'gap-4',
        item: 'ring-2 ring-offset-2',
        icon: 'opacity-90',
        message: 'font-medium',
        action: 'underline',
      }}
    >
      {/* ...votre application... */}
    </ToastProvider>
  );
}`,
      },
    },
  },
  render: () => (
    <ToastProvider
      max={4}
      dense={false}
      pauseOnHover={true}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      classes={{
        container: 'gap-4',
        item: 'ring-2 ring-offset-2',
        icon: 'opacity-90',
        message: 'font-medium',
        action: 'underline',
      }}
    >
      <Demo />
    </ToastProvider>
  ),
};
