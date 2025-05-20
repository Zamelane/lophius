'use client';

import { cn } from '@/lib/utils';
import { DatabaseZapIcon, GlobeIcon } from 'lucide-react';
import React from 'react';

interface SkewedToggleProps {
  onLabel?: string;
  offLabel?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const SkewedToggle: React.FC<SkewedToggleProps> = ({
  onLabel = 'В ИНТЕРНЕТЕ',
  offLabel = 'ЛОКАЛЬНО',
  checked,
  onChange,
}) => {

  const handleChange = () => {
    const newState = !checked;
    onChange?.(newState);
  };

  return (
    <div
      onClick={handleChange}
      className={cn(
        'relative w-16 h-8 overflow-hidden cursor-pointer select-none',
        'skew-x-[-10deg]',
        'text-white font-bold',
        'transition-colors duration-200',
        checked ? 'bg-[hsl(var(--chart-2))]' : 'bg-blue-600',
        'rounded-md min-w-[115px]',
        'text-[12px]'
      )}
    >
      <div
        className={cn(
          'absolute flex flex-row items-center justify-center gap-1',
          'top-0 left-0 w-full h-full',
          'skew-x-[10deg]',
          'text-center leading-8',
          'transition-transform duration-200',
          'pointer-events-none select-none',
          checked ? 'translate-x-[-100%]' : 'translate-x-0',
          'active:translate-x-[-10%]'
        )}
      >
        <DatabaseZapIcon size={16} /> {offLabel}
      </div>

      <div
        className={cn(
          'absolute flex flex-row items-center justify-center gap-1',
          'top-0 left-0 w-full h-full',
          'skew-x-[10deg]',
          'text-center leading-8',
          'transition-transform duration-200',
          'pointer-events-none select-none',
          checked ? 'translate-x-0' : 'translate-x-[100%]',
          'active:translate-x-[10%]'
        )}
      >
        <GlobeIcon size={16} /> {onLabel}
      </div>
    </div>
  );
};
