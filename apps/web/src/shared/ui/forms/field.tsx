'use client'

import type { LucideIcon } from 'lucide-react'
import type React from 'react'
import type { ChangeEvent } from 'react'

import { Input } from '@/src/shared/ui/shadcn/input'
import { Label } from '@/src/shared/ui/shadcn/label'
import { cn } from '@/src/shared/lib/utils'

type Props = React.ComponentProps<typeof Input> & {
  icon?: LucideIcon
  label: string
  setValue?: (value: string) => void
  error?: null | string
}

export function Field({ label, error, setValue, ...props }: Props) {
  function textChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (setValue) setValue(e.target.value)
  }

  return (
    <div className='flex flex-col gap-2'>
      <Label>{label}</Label>
      <div>
        <div className='relative'>
          {props.icon && (
            <div className='absolute left-0 top-0 bottom-0 flex items-center justify-center w-10 pointer-events-none z-10'>
              <props.icon className='h-4 w-4 text-muted-foreground' />
            </div>
          )}
          <Input
            onChange={textChangeHandler}
            className={cn(error && 'border-destructive')}
            style={props.icon ? { paddingLeft: '2.5rem' } : undefined}
            {...props}
          />
        </div>
        {error && <p className='text-sm text-destructive'>{error}</p>}
      </div>
    </div>
  )
}
