export function RatingBadge({
  votes,
  rating
}: { rating: string; votes: string }) {
  return (
    <button type='button' className='flex flex-col gap-1 items-end'>
      <div className='flex gap-1 text-md font-semibold items-center'>
        {rating}
        <svg
          width='20'
          height='20'
          strokeWidth='0'
          fill='currentColor'
          viewBox='0 0 24 24'
          stroke='currentColor'
          xmlns='http://www.w3.org/2000/svg'
          className='text-amber-500 w-[20px] h-[20px]'
        >
          <g fill='none'>
            <path d='M0 0h24v24H0V0z' />
            <path d='M0 0h24v24H0V0z' />
          </g>
          <path d='M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z' />
        </svg>
      </div>
      <span className='font-normal text-xs text-nowrap'>{votes}</span>
    </button>
  )
}
