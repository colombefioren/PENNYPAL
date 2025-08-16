import React from 'react';

export interface SkeletonClasses {
  root?: string;
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: number | string;
  height?: number | string;
  rounded?: string;
  classes?: SkeletonClasses;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  rounded,
  className,
  classes,
  style,
  ...rest
}) => {
  const base = [
    'relative overflow-hidden bg-gray-200',
    variant === 'text' ? 'h-4' : '',
    variant === 'circle' ? 'rounded-full' : '',
    rounded,
    className,
    classes?.root,
  ]
    .filter(Boolean)
    .join(' ');

  const inlineStyle: React.CSSProperties = {
    width,
    height,
    ...style,
  };

  return (
    <div aria-hidden className={base} style={inlineStyle} {...rest}>
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black, transparent)',
        }}
      />
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
};

export default Skeleton;
