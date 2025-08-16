export const SeverityStyles = {
  success: {
    filled: 'bg-green-600 text-white border-green-600',
    outlined: 'bg-transparent text-green-700 border border-green-300',
    standard: 'bg-green-50 text-green-800 border border-green-100',
  },
  error: {
    filled: 'bg-red-600 text-white border-red-600',
    outlined: 'bg-transparent text-red-700 border border-red-300',
    standard: 'bg-red-50 text-red-800 border border-red-100',
  },
  warning: {
    filled: 'bg-amber-600 text-white border-amber-600',
    outlined: 'bg-transparent text-amber-800 border border-amber-300',
    standard: 'bg-amber-50 text-amber-900 border border-amber-100',
  },
  info: {
    filled: 'bg-sky-600 text-white border-sky-600',
    outlined: 'bg-transparent text-sky-800 border border-sky-300',
    standard: 'bg-sky-50 text-sky-900 border border-sky-100',
  },
  loading: {
    filled: 'bg-gray-700 text-white border-gray-700',
    outlined: 'bg-transparent text-gray-800 border border-gray-300',
    standard: 'bg-gray-50 text-gray-900 border border-gray-100',
  },
} as const;
