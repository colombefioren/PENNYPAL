import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type PopoverPlacement = 'bottom' | 'top' | 'left' | 'right';

type AnyRef<E extends HTMLElement> = React.RefObject<E> | React.MutableRefObject<E | null>;

export function useAnchoredPopover<TAnchor extends HTMLElement, TPopover extends HTMLElement>(
  open: boolean,
  anchorRef: AnyRef<TAnchor>,
  popoverRef: AnyRef<TPopover>,
  deps: unknown[] = [],
  preferred?: PopoverPlacement,
) {
  const [coords, setCoords] = useState<{ left: number; top: number; width: number }>({ left: 0, top: 0, width: 0 });
  const [placement, setPlacement] = useState<PopoverPlacement>('bottom');
  const rafRef = useRef<number | null>(null);
  const depsKey = JSON.stringify(deps);

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current; if (!anchor) return;
    const pop = popoverRef.current;
    const a = anchor.getBoundingClientRect();
    const vw = window.innerWidth; const vh = window.innerHeight;
    const margin = 8; // viewport margin
    const gap = 6; // base gap; caller may add arrow visually

    // Measure popover if available
    const tW = pop ? pop.offsetWidth : 0;
    const tH = pop ? pop.offsetHeight : 0;

    let pl: PopoverPlacement = preferred ?? 'bottom';
    let left = a.left;
    let top = a.bottom + gap;

    const placeBottom = () => { left = a.left + a.width / 2 - tW / 2; top = a.bottom + gap; pl = 'bottom'; };
    const placeTop = () => { left = a.left + a.width / 2 - tW / 2; top = a.top - tH - gap; pl = 'top'; };
    const placeLeft = () => { left = a.left - tW - gap; top = a.top + a.height / 2 - tH / 2; pl = 'left'; };
    const placeRight = () => { left = a.right + gap; top = a.top + a.height / 2 - tH / 2; pl = 'right'; };

    // initial
    if (pl === 'top') placeTop();
    else if (pl === 'left') placeLeft();
    else if (pl === 'right') placeRight();
    else placeBottom();

    // flip logic
    if (pop) {
      if (pl === 'bottom' && top + tH + margin > vh) placeTop();
      else if (pl === 'top' && top < margin) placeBottom();
      else if (pl === 'left' && left < margin) placeRight();
      else if (pl === 'right' && left + tW + margin > vw) placeLeft();
    }

    // clamp within viewport
    if (pop) {
      if (pl === 'top' || pl === 'bottom') {
        // horizontally clamp
        left = Math.max(margin, Math.min(left, vw - tW - margin));
      } else {
        // vertically clamp
        top = Math.max(margin, Math.min(top, vh - tH - margin));
      }
    } else {
      // Without pop size, at least clamp anchor horizontally
      left = Math.max(margin, Math.min(left, vw - a.width - margin));
    }

    setPlacement(pl);
    setCoords({ left, top, width: a.width });
  }, [anchorRef, popoverRef, preferred]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, updatePosition, depsKey]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current!);
      rafRef.current = requestAnimationFrame(updatePosition);
    };
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current!);
      rafRef.current = requestAnimationFrame(updatePosition);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, true);
    const ro = new ResizeObserver(() => onResize());
    if (anchorRef.current) ro.observe(anchorRef.current);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll, true);
      ro.disconnect();
    };
  }, [open, updatePosition, anchorRef]);

  return { coords, placement, updatePosition } as const;
}
