// hooks/useUnsavedChangesWarning.ts
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function useUnsavedChangesWarning(shouldWarn: boolean) {
  const pathname = usePathname()

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!shouldWarn) return
      e.preventDefault()
      e.returnValue = ""
    }

    const handleClick = (e: MouseEvent) => {
      if (!shouldWarn) return
      const target = e.target as HTMLElement
      const link = target.closest("a") as HTMLAnchorElement | null
      if (link && link.href && link.target !== "_blank") {
        const sameOrigin = link.href.startsWith(window.location.origin)
        const newPath = new URL(link.href).pathname
        if (sameOrigin && newPath !== pathname) {
          const confirmed = window.confirm("У вас есть несохранённые изменения. Выйти со страницы?")
          if (!confirmed) {
            e.preventDefault()
            e.stopPropagation()
          }
        }
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("click", handleClick, true)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("click", handleClick, true)
    }
  }, [shouldWarn, pathname])
}
