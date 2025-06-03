import { VideoCard } from './media-cards/video-card'

export function CalendarList() {
  const lists = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div className='flex flex-col gap-2'>
      {lists.map((list) => (
        <VideoCard key={list} id={1} title='123' />
      ))}
    </div>
  )
}
