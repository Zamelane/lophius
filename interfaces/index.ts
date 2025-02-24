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
		[key: string]: string | string[] | undefined
	}
}