'use server'

import type { MediaType } from 'database/schemas/media_types'
import { Calendar } from './ui/calendar'
import { CalendarList } from './ui/calendar-list'

type Props = {
  mediaType?: MediaType
  userId?: number
}

export async function CalendarView({ mediaType }: Props) {
  return (
    <div className='flex flex-wrap gap-6 w-full mx-auto'>
      <div className='w-full md:w-1/2 lg:w-[400px]'>
        <Calendar mediaType={mediaType} />
      </div>
      <div className='flex-1 min-w-[250px]'>
        <CalendarList />
      </div>
    </div>
  )
}
