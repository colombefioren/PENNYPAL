import React, { cloneElement, isValidElement, useEffect, useMemo, useRef, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import { useAnchoredPopover } from './hooks/useAnchoredPopover';
import { TOOLTIP_BASE, TOOLTIP_HIDDEN, TOOLTIP_SHOWN, arrowPlacementClass, initialMotionClass, type TooltipPlacement } from './constants/tooltip';

export type { TooltipPlacement };

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
  const [ready, setReady] = useState(false);
  const childRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { coords, placement: computedPlacement, updatePosition } = useAnchoredPopover(open, childRef, tooltipRef, [placement, arrow], placement);
  const tooltipId = useId();

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

  useEffect(() => {
    if (!open) return;
    // Keep hidden until positioned, then reveal next frame
    setReady(false);
    requestAnimationFrame(() => {
      updatePosition();
      requestAnimationFrame(() => setReady(true));
    });
  }, [open, updatePosition]);

  useEffect(() => () => clearTimers(), []);

  const arrowClass = useMemo(() => arrowPlacementClass(computedPlacement), [computedPlacement]);

  const motionBase = useMemo(() => initialMotionClass(computedPlacement), [computedPlacement]);

  const tooltipClasses = useMemo(() => {
    const base = TOOLTIP_BASE;
    const hidden = TOOLTIP_HIDDEN;
    const shown = TOOLTIP_SHOWN;
    // Start slightly offset, settle to zero when shown
    const motion = open && ready ? 'translate-x-0 translate-y-0' : motionBase;
    return [base, open && ready ? shown : hidden, motion, className, classes?.content].filter(Boolean).join(' ');
  }, [open, ready, motionBase, className, classes?.content]);

  if (!isValidElement(children)) return children;

  // Safely capture original handlers to preserve them without TS complaining about {}
  const originalProps: any = (children as any).props || {};

  const childWithHandlers = cloneElement(children, {
    ref: childRef,
    'aria-describedby': open && title
      ? [originalProps['aria-describedby'], tooltipId].filter(Boolean).join(' ')
      : originalProps['aria-describedby'],
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
          id={tooltipId}
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

