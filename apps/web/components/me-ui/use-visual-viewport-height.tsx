import { useEffect, useState } from 'react'

export function useVisualViewportHeight() {
  const [height, setHeight] = useState(
    typeof window !== 'undefined' ? window.visualViewport?.height ?? window.innerHeight : 0
  )

  useEffect(() => {
    function onResize() {
      setHeight(window.visualViewport?.height ?? window.innerHeight)
    }
    window.visualViewport?.addEventListener('resize', onResize)
    window.addEventListener('resize', onResize)
    return () => {
      window.visualViewport?.removeEventListener('resize', onResize)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return height
}