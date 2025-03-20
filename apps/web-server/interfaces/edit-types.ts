import { Dispatch, SetStateAction } from "react"
import { LanguageTranslation } from "@/interfaces"

export type LanguageInfoDataType = {
  get: LanguageTranslation[]
  set: Dispatch<SetStateAction<LanguageTranslation[]>>
}

export type DetailedInfoDataType = {
  languages: LanguageInfoDataType
}