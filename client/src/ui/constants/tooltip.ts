// Tooltip shared style constants and small helpers (keep Tailwind classes literal)

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export const TOOLTIP_BASE = (
  `fixed z-[9998] max-w-xs break-words select-none
    px-2.5 py-1.5 text-xs rounded-md shadow-lg
    bg-gray-900 text-white
    transition-opacity transition-transform duration-120 ease-out
    will-change-transform will-change-opacity`
).trim().replace(/\s+/g, ' ');

export const TOOLTIP_HIDDEN = 'opacity-0 invisible pointer-events-none';
export const TOOLTIP_SHOWN = 'opacity-100 visible';

export function arrowPlacementClass(placement: TooltipPlacement) {
  const b = 'absolute w-2 h-2 rotate-45';
  switch (placement) {
    case 'top': return `${b} -bottom-1 left-1/2 -translate-x-1/2`;
    case 'bottom': return `${b} -top-1 left-1/2 -translate-x-1/2`;
    case 'left': return `${b} -right-1 top-1/2 -translate-y-1/2`;
    case 'right': return `${b} -left-1 top-1/2 -translate-y-1/2`;
  }
}

export function initialMotionClass(placement: TooltipPlacement) {
  switch (placement) {
    case 'top': return 'translate-y-1';
    case 'bottom': return '-translate-y-1';
    case 'left': return 'translate-x-1';
    case 'right': return '-translate-x-1';
  }
}
