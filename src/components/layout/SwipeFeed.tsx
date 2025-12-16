import React from 'react';
import { useSwipeable } from 'react-swipeable';
interface SwipeFeedProps {
  children: React.ReactNode;
  nextVideo: () => void;
  prevVideo: () => void;
}
export function SwipeFeed({ children, nextVideo, prevVideo }: SwipeFeedProps) {
  const handlers = useSwipeable({
    onSwipedUp: () => nextVideo(),
    onSwipedDown: () => prevVideo(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <div {...handlers} className="w-full h-full touch-pan-y">
      {children}
    </div>
  );
}