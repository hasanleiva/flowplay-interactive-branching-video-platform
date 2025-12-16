import React from 'react';
import { cn } from '@/lib/utils';
interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}
export function MobileContainer({ children, className }: MobileContainerProps) {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div
        className={cn(
          'relative w-full h-full max-w-[420px] max-h-[900px] bg-neutral-900 overflow-hidden shadow-2xl shadow-orange-500/10',
          'md:aspect-[9/16] md:h-[90vh] md:rounded-3xl',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}