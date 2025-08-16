// Shared DatePicker class constants (keep Tailwind classes literal)

export const CALENDAR_BASE = (
  'fixed z-[1002] rounded-md border bg-white p-2 shadow-lg ring-1 ring-gray-200 min-w-[14rem]'
);

export const CALENDAR_ANIM_TOP = 'origin-bottom animate-[fadeUp_120ms_ease-out]';
export const CALENDAR_ANIM_BOTTOM = 'origin-top animate-[fadeDown_120ms_ease-out]';

export const NAV_BASE = 'mb-2 flex items-center justify-between';
export const GRID_BASE = 'grid grid-cols-7 gap-1';

export const HEADER_ROW = 'grid grid-cols-7 gap-1 text-[11px] text-gray-500 pb-1';
export const HEADER_CELL = 'grid place-items-center h-6 w-8';

export const DAY_BASE = 'h-8 w-8 grid place-items-center rounded-md text-sm cursor-pointer p-0 leading-none';
export const DAY_SELECTED = 'bg-sky-600 text-white';
export const DAY_DISABLED = 'opacity-40 cursor-not-allowed';
