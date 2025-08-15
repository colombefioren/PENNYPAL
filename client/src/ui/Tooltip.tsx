import React, { cloneElement, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  children: React.ReactElement;
  title: React.ReactNode;
  placement?: TooltipPlacement;
  arrow?: boolean;
  className?: string;
  enterDelay?: number;
  leaveDelay?: number;
  disableHoverListener?: boolean;
  disableFocusListener?: boolean;
  disableTouchListener?: boolean;
  classes?: {
    content?: string;
    arrow?: string;
  };
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  placement = 'top',
  arrow = true,
  className = '',
  enterDelay = 100,
  leaveDelay = 0,
  disableHoverListener = false,
  disableFocusListener = false,
  disableTouchListener = true,
  classes,
}) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [ready, setReady] = useState(false);
  const childRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (enterTimer.current) {
      clearTimeout(enterTimer.current);
      enterTimer.current = null;
    }
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const show = () => {
    if (!title) return;
    clearTimers();
    setReady(false);
    enterTimer.current = setTimeout(() => setOpen(true), enterDelay);
  };

  const hide = () => {
    clearTimers();
    setReady(false);
    leaveTimer.current = setTimeout(() => setOpen(false), leaveDelay);
  };

  const updatePosition = useCallback(() => {
    const anchor = childRef.current;
    const tip = tooltipRef.current;
    if (!anchor || !tip) return;
    const a = anchor.getBoundingClientRect();
    const t = tip.getBoundingClientRect();
    let left = 0;
    let top = 0;
    const gap = arrow ? 10 : 6;

    switch (placement) {
      case 'top':
        left = a.left + a.width / 2 - t.width / 2;
        top = a.top - t.height - gap;
        break;
      case 'bottom':
        left = a.left + a.width / 2 - t.width / 2;
        top = a.bottom + gap;
        break;
      case 'left':
        left = a.left - t.width - gap;
        top = a.top + a.height / 2 - t.height / 2;
        break;
      case 'right':
        left = a.right + gap;
        top = a.top + a.height / 2 - t.height / 2;
        break;
    }

    // Clamp within viewport with small margins
    const margin = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    left = Math.max(margin, Math.min(left, vw - t.width - margin));
    top = Math.max(margin, Math.min(top, vh - t.height - margin));
    setCoords({ left, top });
  }, [placement, arrow]);

  useEffect(() => {
    if (!open) return;
    // Keep hidden until positioned, then reveal next frame
    setReady(false);
    requestAnimationFrame(() => {
      updatePosition();
      requestAnimationFrame(() => setReady(true));
    });

    const onResize = () => updatePosition();
    const onScroll = () => updatePosition();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open, updatePosition]);

  useEffect(() => () => clearTimers(), []);

  const arrowClass = useMemo(() => {
    const b = 'absolute w-2 h-2 rotate-45';
    switch (placement) {
      case 'top':
        return `${b} -bottom-1 left-1/2 -translate-x-1/2`;
      case 'bottom':
        return `${b} -top-1 left-1/2 -translate-x-1/2`;
      case 'left':
        return `${b} -right-1 top-1/2 -translate-y-1/2`;
      case 'right':
        return `${b} -left-1 top-1/2 -translate-y-1/2`;
    }
  }, [placement]);

  const tooltipClasses = useMemo(() => {
    const base = `
      fixed z-[9998] max-w-xs break-words select-none
      px-2.5 py-1.5 text-xs rounded-md shadow-lg
      bg-gray-900 text-white
      transition-all duration-150 ease-out
      will-change-transform will-change-opacity
    `.trim().replace(/\s+/g, ' ');

    const vis = open && ready ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none';
    return [base, vis, className, classes?.content].filter(Boolean).join(' ');
  }, [open, ready, className, classes?.content]);

  if (!isValidElement(children)) return children;

  // Safely capture original handlers to preserve them without TS complaining about {}
  const originalProps: any = (children as any).props || {};

  const childWithHandlers = cloneElement(children, {
    ref: childRef,
    onMouseEnter: (e: React.MouseEvent) => {
      if (!disableHoverListener) show();
      originalProps.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      if (!disableHoverListener) hide();
      originalProps.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      if (!disableFocusListener) show();
      originalProps.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      if (!disableFocusListener) hide();
      originalProps.onBlur?.(e);
    },
    onTouchStart: (e: React.TouchEvent) => {
      if (!disableTouchListener) show();
      originalProps.onTouchStart?.(e);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (!disableTouchListener) hide();
      originalProps.onTouchEnd?.(e);
    },
  } as any);

  return (
    <>
      {childWithHandlers}
      {open && title && createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          className={tooltipClasses}
          style={{ left: coords.left, top: coords.top }}
        >
          {title}
          {arrow && (
            <div className={[arrowClass, classes?.arrow ?? 'bg-gray-900'].filter(Boolean).join(' ')} />
          )}
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip;

