'use client'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const fetcher = (...args) => fetch(...args).then((res) => res.json())
