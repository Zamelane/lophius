export type LayoutProps = {
	children: React.ReactNode
}

export type Action = {
	action?: ((formData: FormData) => (Promise<void> | void)) | string | undefined
}

export type MetadataProps = {
	params: {
		locale: string
	}
}