import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { within, userEvent, expect } from 'storybook/test';
import TextField, { type TextFieldProps } from './TextField';
import IconButton from './IconButton';

const meta: Meta<TextFieldProps> = {
  title: 'UI/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: { source: { type: 'dynamic' } },
  },
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    variant: { control: { type: 'select' }, options: ['outlined', 'filled', 'standard'] },
    size: { control: { type: 'inline-radio' }, options: ['small', 'medium', 'large'] },
    classes: { control: 'object' },
  },
  args: {
    value: '',
    label: 'Name',
    placeholder: 'Your name',
    helperText: '',
    error: false,
    disabled: false,
    fullWidth: false,
    variant: 'outlined',
    size: 'medium',
  },
};
export default meta;

type Story = StoryObj<TextFieldProps>;

const Controlled: React.FC<Omit<TextFieldProps, 'value' | 'onChange'>> = (props) => {
  const [val, setVal] = useState('');
  return (
    <div className="p-4 max-w-sm">
      <TextField
        {...props}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
};

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const label = args.label || args.placeholder || '';
    const input = await c.findByLabelText(label);
    await userEvent.click(input);
    await userEvent.type(input, 'Hello');
    expect((input as HTMLInputElement).value).toBe('Hello');
  },
};

export const WithAdornments: Story = {
  name: 'With adornments',
  args: {
    label: 'Amount',
  },
  render: (args) => (
    <div className="p-4 max-w-sm space-y-6">
      <Controlled
        {...args}
        startAdornment={<span className="text-gray-500">€</span>}
        placeholder="0.00"
      />
      <Controlled
        {...args}
        endAdornment={<IconButton aria-label="clear">✕</IconButton>}
        placeholder="Type something"
      />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const euro = await c.findByText('€');
    expect(euro).toBeTruthy();
    const labelEl = await c.findByText(args.label as string);
    expect(labelEl.className).toContain('left-12');
    const clearBtn = await c.findByRole('button', { name: /clear/i });
    expect(clearBtn).toBeTruthy();
  },
};

export const ErrorState: Story = {
  name: 'Error state',
  args: {
    label: 'Email',
    helperText: 'Invalid format',
    error: true,
  },
  render: (args) => <Controlled {...args} />,
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const input = await c.findByLabelText(args.label as string);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    await c.findByText(/invalid format/i);
  },
};

export const WithCustomClasses: Story = {
  name: 'With custom classes',
  args: {
    label: 'Search',
    helperText: 'Easily customize with Tailwind',
    classes: {
      root: 'group',
      input: 'bg-slate-50 focus:bg-white',
      label: 'group-focus-within:text-sky-600',
      helperText: 'italic',
    },
  },
  render: (args) => <Controlled {...args} />,
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const input = await c.findByLabelText(args.label as string);
    expect((input as HTMLElement).className).toContain('bg-slate-50');
    await userEvent.click(input);
    await userEvent.type(input, 'Test');
    expect((input as HTMLInputElement).value).toBe('Test');
  },
};

export const CustomBackgrounds: Story = {
  name: 'Custom backgrounds (label matches input)',
  render: (args) => (
    <div className="p-4 space-y-6 max-w-sm">
      {/* Filled: label bg matches automatically (bg-gray-50) */}
      <Controlled
        {...args}
        label="Filled default bg"
        variant="filled"
        helperText="Label should have same bg-gray-50 as input"
      />

      {/* Outlined with custom bg: pass same bg to label via classes.label */}
      <Controlled
        {...args}
        label="Outlined custom bg"
        variant="outlined"
        helperText="Label bg matches custom input bg (amber-50)"
        classes={{
          input: 'bg-amber-50',
          label: 'bg-amber-50',
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await c.findByText(/Filled default bg/i);
    await c.findByText(/Outlined custom bg/i);
  },
};

export const Sizes: Story = {
  name: 'Sizes (small / medium / large)',
  render: (args) => (
    <div className="p-4 grid gap-4">
      <div className="max-w-sm">
        <Controlled {...args} label="Small" size="small" />
      </div>
      <div className="max-w-sm">
        <Controlled {...args} label="Medium (default)" size="medium" />
      </div>
      <div className="max-w-sm">
        <Controlled {...args} label="Large" size="large" />
      </div>
    </div>
  ),
};
