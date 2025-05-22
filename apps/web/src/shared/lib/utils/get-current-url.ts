import { headers } from 'next/headers'

export const getCurrentUrl = async () => (await headers()).get('x-url') || ''
