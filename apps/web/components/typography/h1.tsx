import type { DetailedHTMLProps, HTMLAttributes } from 'react'

export function H1({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h1
      className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
      {...props}
    >
      {children}
    </h1>
  )
}
