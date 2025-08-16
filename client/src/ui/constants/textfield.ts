// Shared constants for TextField styling (Tailwind classes kept literal)

export const TEXTFIELD_BASE_INTERACTIVE = (
  'peer w-full rounded-md placeholder-transparent text-gray-900 focus:outline-none transition-[box-shadow,border-color,background-color] duration-150 ease-out'
);

export const TEXTFIELD_OUTLINED = (
  'bg-white ring-1 ring-inset hover:ring-gray-400 shadow-sm border'
);
export const TEXTFIELD_OUTLINED_OK = 'ring-gray-300 border-gray-300 focus:ring-2 focus:ring-sky-500';
export const TEXTFIELD_OUTLINED_ERR = 'ring-red-300 border-red-300 focus:ring-2 focus:ring-sky-500';

export const TEXTFIELD_FILLED = (
  'bg-gray-50 ring-1 ring-inset hover:bg-gray-100 shadow-inner border'
);
export const TEXTFIELD_FILLED_OK = 'ring-gray-300 border-transparent focus:ring-2 focus:ring-sky-500';
export const TEXTFIELD_FILLED_ERR = 'ring-red-300 border-transparent focus:ring-2 focus:ring-sky-500';

export const TEXTFIELD_STANDARD = 'bg-transparent border-0 border-b rounded-none';
export const TEXTFIELD_STANDARD_OK = 'border-gray-300 focus:ring-0 focus:border-sky-500';
export const TEXTFIELD_STANDARD_ERR = 'border-red-300 focus:ring-0 focus:border-sky-500';

export function labelBgByVariant(variant: 'outlined'|'filled'|'standard') {
  return variant === 'filled' ? 'bg-gray-50' : variant === 'standard' ? 'bg-transparent' : 'bg-white';
}

export function labelFocusBgByVariant(variant: 'outlined'|'filled'|'standard') {
  return variant === 'filled' ? 'peer-focus:bg-gray-50' : variant === 'standard' ? 'peer-focus:bg-transparent' : 'peer-focus:bg-white';
}
