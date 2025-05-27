'use client'

import { useEffect, useRef, useState } from 'react'

export function HeaderTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [, setIsStuck] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const stuck = !entry.isIntersecting
        setIsStuck(stuck)
        window.dispatchEvent(new CustomEvent('header-title:set', { detail: stuck ? children : null }))
      },
      { threshold: 0 }
    )

    const el = ref.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
      // Сбросить заголовок при размонтировании
      window.dispatchEvent(new CustomEvent('header-title:set', { detail: null }))
    }
  }, [children])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
