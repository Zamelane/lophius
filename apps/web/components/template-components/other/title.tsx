interface Props {
  title: string
}

export const Title = ({ title }: Props) => {
  return (
    <h2 className='mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6'>
      {title}
    </h2>
  )
}
