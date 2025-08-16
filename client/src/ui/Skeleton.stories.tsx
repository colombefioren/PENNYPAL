import type { Meta, StoryObj } from '@storybook/react-vite';
import Skeleton, { type SkeletonProps } from './Skeleton';

const meta: Meta<SkeletonProps> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { docs: { source: { type: 'dynamic' } } },
};
export default meta;

type Story = StoryObj<SkeletonProps>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Skeleton variant="text" className="w-40" />
      <Skeleton variant="rect" className="w-full" height={80} rounded="rounded-md" />
      <Skeleton variant="circle" width={48} height={48} />
    </div>
  ),
};

export const StaticExample: Story = {
  name: 'Static example (copy-paste)',
  parameters: {
    docs: {
      source: {
        code: `import Skeleton from './Skeleton';

export default function Page() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Skeleton variant="text" style={{ width: 160 }} />
      <Skeleton variant="rect" height={80} rounded="rounded-md" />
      <Skeleton variant="circle" width={48} height={48} />
    </div>
  );
}`,
      },
    },
  },
  render: () => (
    <div className="grid gap-3">
      <Skeleton variant="text" style={{ width: 160 }} />
      <Skeleton variant="rect" height={80} rounded="rounded-md" />
      <Skeleton variant="circle" width={48} height={48} />
    </div>
  ),
};
