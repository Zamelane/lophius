'use client'

import type { MediaType } from 'database/schemas/media_types'
import {
  addMonths,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  startOfMonth,
  subMonths
} from 'date-fns'
import { ru } from 'date-fns/locale'
import { useState } from 'react'
import { dayNames } from '../config'
import { renderDots } from './renderDots'

type Props = {
  mediaType?: MediaType
  onDateSelect?: (date: Date) => void
}

export function Calendar({ onDateSelect }: Props) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(today)

  const startDate = startOfMonth(currentMonth)
  const endDate = endOfMonth(currentMonth)

  const startWeekDayIndex = (getDay(startDate) + 6) % 7
  const daysInMonth = Array.from({ length: endDate.getDate() }, (_, i) => i + 1)

  const handleDayClick = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    )
    setSelectedDate(date)
    onDateSelect?.(date)
  }

  return (
    <div className='bg-card text-card-foreground rounded-xl shadow border border-border p-6'>
      <div className='flex justify-between items-center mb-6'>
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className='text-xl hover:text-primary transition'
        >
          ←
        </button>
        <p className='text-xl font-semibold'>
          {format(currentMonth, 'LLLL yyyy', { locale: ru })}
        </p>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className='text-xl hover:text-primary transition'
        >
          →
        </button>
      </div>

      <div className='grid grid-cols-7 text-center text-sm font-medium text-muted-foreground mb-2'>
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className='grid grid-cols-7 text-center gap-y-2'>
        {Array.from({ length: startWeekDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {daysInMonth.map((day) => {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          )
          const isToday = isSameDay(date, today)
          const isSelected = isSameDay(date, selectedDate)
          const isPast = date < today && !isSameDay(date, today)

          const baseStyle = `
            w-10 h-10 flex flex-col items-center justify-center mx-auto transition text-sm rounded-full
            hover:bg-accent
          `

          const selectedStyle = isSelected
            ? 'bg-muted text-foreground border border-primary'
            : ''
          const todayStyle =
            isToday && !isSelected ? 'text-primary font-semibold' : ''
          const pastStyle = isPast ? 'text-muted-foreground opacity-60' : ''

          // Dummy media density level
          const level = day % 4 // 0, 1, 2, 3

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`${baseStyle} ${selectedStyle} ${todayStyle} ${pastStyle}`}
            >
              <span>{day}</span>
              {renderDots(level, isPast, isSelected)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
