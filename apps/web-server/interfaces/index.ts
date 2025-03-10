export type LayoutProps = {
	children: React.ReactNode
}

export type Action = {
	action?: ((formData: FormData) => (Promise<void> | void)) | string | undefined
}

export type MetadataProps =  {
	params: Promise<{ locale: string }>
}

export interface ErrorResponse {
	message?: string
	errors?: {
		[key: string]: string[] | undefined
	}
}

export type User = {
	id: number
	nickname: string
	email: string
	isAdmin: boolean
}

export type StatusResponse = {
	success: boolean
	message?: string,
}

export type ContentResponse<T> = {
	content?: T
}

export type ServerResponse<T> = StatusResponse & ContentResponse<T>
export type ClientResponse<T> = ContentResponse<T> | ServerResponse<T>

export * from './types'