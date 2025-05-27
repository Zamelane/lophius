import React from "react"
import { afterColors, colors } from '../config'

export function renderDots(level: number, isPast: boolean, isSelected: boolean) {
  const dots = []
  for (let i = 1; i <= level; i++) {
    dots.push(
      <div
        key={i}
        className={`
          w-1.5 h-1.5 rounded-full
          ${isPast ? afterColors[i] : colors[i]}
          transition-all duration-300 ease-in-out
        `}
      />
    )
  }

  return (
    <div
      className={`flex flex-row items-center transition-[gap] duration-300 ease-in-out ${
        isSelected ? "gap-0.5" : "gap-0"
      }`}
    >
      {dots}
    </div>
  )
}
