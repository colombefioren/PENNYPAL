import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import type { PropsWithChildren } from 'react';
import { Icon, SeverityStyles } from './constants/toastIcon';

// Types
export type ToastSeverity = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type ToastVariant = 'filled' | 'outlined' | 'standard';

export interface ToastOptions {
  severity?: ToastSeverity;
  variant?: ToastVariant;
  autoHideDuration?: number | null;
  action?: React.ReactNode;
  replaceId?: string;
}

export interface ToastItem extends Required<ToastOptions> {
  id: string;
  message: React.ReactNode;
}

export interface AnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export interface ToastProviderProps {
  max?: number;
  anchorOrigin?: AnchorOrigin;
  dense?: boolean;
  pauseOnHover?: boolean;
  classes?: {
    container?: string;
    item?: string;
    icon?: string;
    message?: string;
    action?: string;
  };
}

export interface ToastContextType {
  enqueue: (message: React.ReactNode, options?: ToastOptions) => string;
  close: (id: string) => void;
  success: (message: React.ReactNode, options?: Omit<ToastOptions, 'severity'>) => string;
  error: (message: React.ReactNode, options?: Omit<ToastOptions, 'severity'>) => string;
  warning: (message: React.ReactNode, options?: Omit<ToastOptions, 'severity'>) => string;
  info: (message: React.ReactNode, options?: Omit<ToastOptions, 'severity'>) => string;
  loading: (message: React.ReactNode, options?: Omit<ToastOptions, 'severity' | 'autoHideDuration'>) => string;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};

// Toast visual component
export interface ToastProps {
  item: ToastItem;
  onClose: (id: string) => void;
  paused?: boolean;
  classes?: {
    root?: string;
    icon?: string;
    message?: string;
    action?: string;
  };
}

const severityStyles: Record<ToastSeverity, { filled: string; outlined: string; standard: string }> = SeverityStyles

const Toast: React.FC<ToastProps> = ({ item, onClose, paused = false, classes }) => {
  const { id, message, severity, variant, action, autoHideDuration } = item;

  useEffect(() => {
    if (autoHideDuration === null || paused) return;
    const t = window.setTimeout(() => onClose(id), autoHideDuration);
    return () => window.clearTimeout(t);
  }, [id, autoHideDuration, onClose, paused]);

  const styles = severityStyles[severity][variant];

  return (
    <div
      onClick={() => onClose(id)}
      role="alert"
      className={[
        'pointer-events-auto flex items-center gap-3 rounded-md shadow-lg px-4 py-3',
        styles,
        classes?.root,
      ].filter(Boolean).join(' ')}
    >
      <span className={['shrink-0', classes?.icon].filter(Boolean).join(' ')}>{Icon[severity]}</span>
      <div className={['text-sm leading-snug', classes?.message].filter(Boolean).join(' ')}>{message}</div>
      {action && <div className={['ml-auto', classes?.action].filter(Boolean).join(' ')}>{action}</div>}
    </div>
  );
};

// Container renders a stack based on anchor origin
export const ToastContainer: React.FC<{
  toasts: ToastItem[];
  onClose: (id: string) => void;
  anchorOrigin: AnchorOrigin;
  dense?: boolean;
  pauseOnHover?: boolean;
  classes?: ToastProviderProps['classes'];
}> = ({ toasts, onClose, anchorOrigin, dense, pauseOnHover, classes }) => {
  const position = useMemo(() => {
    const v = anchorOrigin.vertical === 'top' ? 'top-4' : 'bottom-4';
    const h =
      anchorOrigin.horizontal === 'left'
        ? 'left-4'
        : anchorOrigin.horizontal === 'right'
        ? 'right-4'
        : 'left-1/2 -translate-x-1/2';
    return `${v} ${h}`;
  }, [anchorOrigin]);

  const [paused, setPaused] = useState(false);

  return (
    <div
      className={[
        'pointer-events-none fixed z-[9999]',
        position,
        'flex flex-col',
        anchorOrigin.vertical === 'top' ? 'items-stretch' : 'items-stretch',
        dense ? 'gap-2' : 'gap-3',
        classes?.container,
      ].filter(Boolean).join(' ')}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast item={t} onClose={onClose} paused={paused} classes={{
            root: classes?.item,
            icon: classes?.icon,
            message: classes?.message,
            action: classes?.action,
          }} />
        </div>
      ))}
    </div>
  );
};

// Provider manages queue and exposes API
export const ToastProvider: React.FC<PropsWithChildren<ToastProviderProps>> = ({
  children,
  max = 4,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  dense = false,
  pauseOnHover = true,
  classes,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const close = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const enqueue = useCallback<ToastContextType['enqueue']>((message, options) => {
    const id = options?.replaceId ?? `t_${Date.now()}_${counter.current++}`;
    const defaultDuration = options?.severity === 'loading' ? null : 3000;
    setToasts((prev) => {
      const base: ToastItem = {
        id,
        message,
        severity: options?.severity ?? 'info',
        variant: options?.variant ?? 'filled',
        autoHideDuration:
          options?.autoHideDuration === undefined ? defaultDuration : options.autoHideDuration,
        action: options?.action ?? null,
        replaceId: options?.replaceId ?? id,
      } as ToastItem;

      // Replace existing
      const next = prev.filter((t) => t.id !== options?.replaceId);
      next.unshift(base);
      return next.slice(0, max);
    });
    return id;
  }, [max]);

  const api = useMemo<ToastContextType>(() => ({
    enqueue,
    close,
    success: (m, o) => enqueue(m, { ...o, severity: 'success' }),
    error: (m, o) => enqueue(m, { ...o, severity: 'error' }),
    warning: (m, o) => enqueue(m, { ...o, severity: 'warning' }),
    info: (m, o) => enqueue(m, { ...o, severity: 'info' }),
    loading: (m, o) => enqueue(m, { ...o, severity: 'loading', autoHideDuration: null }),
  }), [enqueue, close]);

  // Portal to body to avoid clipping
  const portal = (
    <ToastContainer
      toasts={toasts}
      onClose={close}
      anchorOrigin={anchorOrigin}
      dense={dense}
      pauseOnHover={pauseOnHover}
      classes={classes}
    />
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {portal}
    </ToastContext.Provider>
  );
};

export default Toast;

