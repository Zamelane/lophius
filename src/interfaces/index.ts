export type LayoutProps = {
	children: React.ReactNode
}

export type Action = {
	action?: string | ((formData: FormData) => (void | Promise<void>)) | undefined
}