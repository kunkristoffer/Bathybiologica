import { RefObject, useEffect } from 'react';

/**
 * Hook that triggers a callback when clicking outside the referenced element.
 *
 * @param ref - React ref of the element to detect outside clicks for
 * @param onOutsideClick - Callback to trigger on outside click
 */
export function useClickOutside(ref: RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener('mouseup', handleClick);
    return () => {
      document.removeEventListener('mouseup', handleClick);
    };
  }, [ref, handler]);
}
