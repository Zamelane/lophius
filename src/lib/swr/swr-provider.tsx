'use client'

import { SWRConfig } from 'swr'
import {PropsWithChildren} from "react"

export const SWRProvider = ({ children }: PropsWithChildren) => {
	return <SWRConfig>{children}</SWRConfig>
}