'use client'
import { InputCustom } from '@/src/shared/ui/custom/input-custom'
import { useCharacterLimit } from './use-character-limit'
import { useId } from 'react'
import type * as React from 'react'

interface InputLimitProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number
}

export default function InputLimit({ maxLength, ...props }: InputLimitProps) {
  const id = useId()
  const {
    value,
    handleChange,
    characterCount,
    maxLength: limit
  } = useCharacterLimit({ maxLength: maxLength ?? 50 })

  return (
    <div className='relative'>
      <InputCustom
        id={id}
        type='text'
        value={value}
        maxLength={maxLength}
        className='peer pe-14'
        onChange={handleChange}
        aria-describedby={`${id}-description`}
        {...props}
      />
      <div
        role='status'
        aria-live='polite'
        id={`${id}-description`}
        className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50'
      >
        {characterCount}/{limit}
      </div>
    </div>
  )
}
