import { useState, useRef, useCallback } from 'react';

type scrollBehavior = 'natural' | 'reverse';

/**
 * Hook that adds the hability to scroll horizontally by grabbing the div.
 *
 * To use it, add the scrollRef to the component you want to be scrollable and spread the props. Props has all necessary mouse events on it.
 *
 * @param {scrollBehavior} - 'natural'| 'reverse' - Natural will scroll to the side the user is dragging
 * @returns { scrollRef, props, clickStartX, scrollStartX and isDragging }
 */
const useHorizontalScroll = (behavior: scrollBehavior) => {
  const scrollRef = useRef<HTMLElement | null>(null);
  const [clickStartX, setClickStartX] = useState<number | null>(null);
  const [scrollStartX, setScrollStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (scrollRef.current) {
      setClickStartX(e.screenX);
      setScrollStartX(scrollRef.current.scrollLeft);
      setIsDragging(true);
    }
  }, []);

  const handleDragMove = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (scrollRef && scrollRef.current) {
        e.preventDefault();
        e.stopPropagation();

        if (clickStartX !== null && scrollStartX !== null && isDragging) {
          const touchDelta = clickStartX - e.screenX;
          scrollRef.current.scrollLeft = behavior === 'natural' ? scrollStartX - touchDelta : scrollStartX + touchDelta;
        }
      }
    },
    [clickStartX, isDragging, scrollStartX, behavior],
  );

  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      setClickStartX(null);
      setScrollStartX(null);
      setIsDragging(false);
    }
  }, [isDragging]);

  const props = {
    onMouseDown: handleDragStart,
    onMouseMove: handleDragMove,
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
  };

  return { props, scrollRef, clickStartX, scrollStartX, isDragging };
};

export default useHorizontalScroll;
