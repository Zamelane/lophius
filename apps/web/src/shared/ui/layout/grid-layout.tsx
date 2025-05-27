import type React from 'react'
import { cn } from '../../lib/utils'

interface GridLayoutProps {
  className?: string
  children: React.ReactNode
}

export const GridLayout = ({ children, className = '' }: GridLayoutProps) => (
  <div className='flex flex-grow max-w-full mt-1'>
    <div
      className={cn('grid flex-grow gap-[6px] grid-rows-[1fr] grid-cols-[repeat(auto-fill,minmax(130px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]', className)}
    >
      {children}
    </div>
  </div>
)
