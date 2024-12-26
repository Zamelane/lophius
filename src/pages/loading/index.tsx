"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import {Label} from "@/components/ui/label"
import {sleep} from "@/lib/utils";

export default function Loading() {
  const [progress, setProgress] = React.useState(0)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [dotAnimateWord, setDotAnimateWord] = React.useState('')

  const dotAnimate = async () => {
    let dotCount = 0
    while (!isLoaded) {
      dotCount++
      if (dotCount > 3)
        dotCount = 0
      setDotAnimateWord('.'.repeat(dotCount))
      await sleep(500);
    }
  }

  React.useEffect(() => {
    // Тут проверяем всякие штуки
    dotAnimate()
    //const timer = setTimeout(() => setProgress(66), 500)
    //return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[60%] flex flex-col gap-2">
        <Label className="self-center">Loading {dotAnimateWord}</Label>
        <Progress value={progress} />
      </div>
    </div>
  )
}
