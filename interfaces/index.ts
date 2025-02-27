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

export interface AuthErrorResponse {
	success: false
	message: string,
}

export type User = {
	id: number
	nickname: string
	email: string
	isAdmin: boolean
}