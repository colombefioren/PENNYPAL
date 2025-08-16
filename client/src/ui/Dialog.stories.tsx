import type { Meta, StoryObj } from '@storybook/react-vite';
import Dialog, { type DialogProps } from './Dialog';
import Button from './Button';
import React from 'react';

const meta: Meta<DialogProps> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { docs: { source: { type: 'dynamic' } } },
  args: { open: false },
};
export default meta;

type Story = StoryObj<DialogProps>;

function PlaygroundRender(args: DialogProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm action"
        footer={(
          <>
            <Button className="border" onClick={() => setOpen(false)}>Cancel</Button>
            <Button className="bg-gray-900 text-white" onClick={() => setOpen(false)}>Confirm</Button>
          </>
        )}
      >
        Are you sure you want to proceed?
      </Dialog>
    </div>
  );
}

export const Playground: Story = { render: (args) => <PlaygroundRender {...args} /> };

export const StaticExample: Story = {
  name: 'Static example (copy-paste)',
  parameters: {
    docs: {
      source: {
        code: `import Dialog from './Dialog';
import Button from './Button';

export default function Page() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm action"
        footer={(
          <>
            <Button className="border" onClick={() => setOpen(false)}>Cancel</Button>
            <Button className="bg-gray-900 text-white" onClick={() => setOpen(false)}>Confirm</Button>
          </>
        )}
      >
        Are you sure you want to proceed?
      </Dialog>
    </div>
  );
}`,
      },
    },
  },
  render: (args) => (
    <PlaygroundRender {...args} />
  ),
};

function CardsRender(args: DialogProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open dialog (cards)</Button>
      <Dialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        title="Cards in dialog"
        footer={(
          <Button className="bg-gray-900 text-white" onClick={() => setOpen(false)}>Close</Button>
        )}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-md p-3">Card A</div>
          <div className="border rounded-md p-3">Card B</div>
          <div className="border rounded-md p-3">Card C</div>
          <div className="border rounded-md p-3">Card D</div>
        </div>
      </Dialog>
    </div>
  );
}

export const WithCards: Story = {
  parameters: {
    docs: {
      source: {
        code: `import Dialog from './Dialog';
import Button from './Button';

export default function Example() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open dialog (cards)</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Cards in dialog"
        footer={(<Button className="bg-gray-900 text-white" onClick={() => setOpen(false)}>Close</Button>)}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-md p-3">Card A</div>
          <div className="border rounded-md p-3">Card B</div>
          <div className="border rounded-md p-3">Card C</div>
          <div className="border rounded-md p-3">Card D</div>
        </div>
      </Dialog>
    </div>
  );
}`,
      },
    },
  },
  render: (args) => <CardsRender {...args} />,
};

function LongListRender(args: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const items = Array.from({ length: 60 }, (_, i) => `Item ${i + 1}`);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open dialog (long list)</Button>
      <Dialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        title="Long list"
        footer={(
          <Button className="bg-gray-900 text-white" onClick={() => setOpen(false)}>Close</Button>
        )}
      >
        <div className="max-h-[60vh] overflow-auto divide-y">
          {items.map((it) => (
            <div key={it} className="py-2 px-1">{it}</div>
          ))}
        </div>
      </Dialog>
    </div>
  );
}

export const WithLongList: Story = {
  parameters: {
    docs: {
      source: {
        code: `import Dialog from './Dialog';
import Button from './Button';

export default function Example() {
  const [open, setOpen] = React.useState(false);
  const items = Array.from({ length: 60 }, (_, i) => \`Item \${i + 1}\`);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open dialog (long list)</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Long list"
        footer={(<Button className="bg-gray-900 text-white" onClick={() => setOpen(false)}>Close</Button>)}
      >
        <div className="max-h-[60vh] overflow-auto divide-y">
          {items.map((it) => (
            <div key={it} className="py-2 px-1">{it}</div>
          ))}
        </div>
      </Dialog>
    </div>
  );
}`,
      },
    },
  },
  render: (args) => <LongListRender {...args} />,
};
