import React, { forwardRef } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  size?: 'small' | 'medium';
  disabled?: boolean;
  clickable?: boolean;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  deletable?: boolean;
  onDelete?: () => void;
  deleteIcon?: React.ReactNode;
  classes?: { root?: string; label?: string; avatar?: string; icon?: string; deleteButton?: string };
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(({
  label,
  size = 'medium',
  disabled = false,
  clickable = false,
  icon,
  avatar,
  deletable = false,
  onDelete,
  deleteIcon,
  className = '',
  classes,
  onClick,
  ...rest
}, ref) => {
  const sz = size === 'small' ? 'h-6 text-[11px] px-2 gap-1' : 'h-8 text-[13px] px-3 gap-1.5';
  const canClick = clickable && !disabled && !!onClick;
  const hasBg = typeof className === 'string' && /(^|\s)bg-/.test(className);
  const hasText = typeof className === 'string' && /(^|\s)text-/.test(className);
  const hoverClasses = canClick ? (!hasBg ? 'cursor-pointer hover:bg-gray-800 active:bg-gray-700' : 'cursor-pointer hover:opacity-95 active:opacity-90') : '';

  return (
    <div
      ref={ref}
      className={[
        'inline-flex items-center rounded-full select-none',
        !hasBg ? 'bg-gray-900' : '',
        !hasText ? 'text-white' : '',
        'shadow-sm',
        'transition-colors duration-200',
        sz,
        hoverClasses,
        disabled ? 'opacity-50 pointer-events-none' : '',
        className,
        classes?.root,
      ].filter(Boolean).join(' ')}
      role={canClick ? 'button' : undefined}
      tabIndex={canClick ? 0 : undefined}
      onClick={canClick ? onClick : undefined}
      {...rest}
    >
      {avatar ? (
        <span className={[size === 'small' ? '-ml-1 mr-1' : '-ml-1.5 mr-1.5', 'flex-shrink-0', classes?.avatar].filter(Boolean).join(' ')}>{avatar}</span>
      ) : icon ? (
        <span className={[size === 'small' ? '-ml-0.5 mr-1' : '-ml-1 mr-1.5', 'flex-shrink-0', classes?.icon].filter(Boolean).join(' ')}>{icon}</span>
      ) : null}

      <span className={["truncate", classes?.label].filter(Boolean).join(' ')}>{label}</span>

      {deletable && (
        <button
          type="button"
          aria-label="Supprimer"
          onClick={(e) => { e.stopPropagation(); if (!disabled) onDelete?.(); }}
          className={[
            size === 'small' ? '-mr-1 ml-1 w-4 h-4' : '-mr-1.5 ml-1.5 w-5 h-5',
            'flex-shrink-0 rounded-full flex items-center justify-center',
            'text-inherit',
            !hasBg ? 'bg-white/15 hover:bg-white/25' : '',
            !hasText ? 'text-white' : '',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
            classes?.deleteButton,
          ].filter(Boolean).join(' ')}
        >
          {deleteIcon || (
            <Cross2Icon
              aria-hidden
              className={[
                size === 'small' ? 'w-4 h-4' : 'w-[18px] h-[18px]',
                'block shrink-0 fill-current stroke-current',
              ].join(' ')}
            />
          )}
        </button>
      )}
    </div>
  );
});

Chip.displayName = 'Chip';

export default Chip;
