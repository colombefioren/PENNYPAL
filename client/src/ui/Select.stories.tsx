import type { Meta, StoryObj } from '@storybook/react-vite';
import Select, { type SelectProps } from './Select';
import React from 'react';

const meta: Meta<SelectProps> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { docs: { source: { type: 'dynamic' } } },
  args: {
    value: null,
    options: [
      { label: 'Food', value: 'food' },
      { label: 'Transport', value: 'transport' },
      { label: 'Utilities', value: 'utilities' },
      { label: 'Shopping', value: 'shopping' },
    ],
    placeholder: 'Select category',
  },
};
export default meta;

type Story = StoryObj<SelectProps>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? null);
    return (
      <div>
        <Select {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const StaticExample: Story = {
  name: 'Static example (copy-paste)',
  parameters: {
    docs: {
      source: {
        code: `import Select from './Select';

export default function Page() {
  const [value, setValue] = React.useState(null);
  return (
    <Select
      value={value}
      onChange={setValue}
      placeholder="Select category"
      options=[
        { label: 'Food', value: 'food' },
        { label: 'Transport', value: 'transport' },
        { label: 'Utilities', value: 'utilities' },
        { label: 'Shopping', value: 'shopping' },
      ]
    />
  );
}`,
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <Select
        value={value}
        onChange={setValue}
        placeholder="Select category"
        options={[
          { label: 'Food', value: 'food' },
          { label: 'Transport', value: 'transport' },
          { label: 'Utilities', value: 'utilities' },
          { label: 'Shopping', value: 'shopping' },
        ]}
      />
    );
  },
};
