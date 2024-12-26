export const fetcher = (
	...args:[input: RequestInfo | URL, init?: RequestInit]
) =>
	fetch(...args).then(res => res.json())