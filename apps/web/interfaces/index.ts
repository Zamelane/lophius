export type ClassNameType = {
  className?: string
}

export type LayoutProps = ClassNameType & {
  children: React.ReactNode
}

export type Action = {
  action?: ((formData: FormData) => Promise<void> | void) | string | undefined
}

export type MetadataProps = {
  params: Promise<{ locale: string }>
}

export interface ErrorResponse {
  message?: string
  errors?: {
    [key: string]: string[] | undefined
  }
}

export type StatusResponse = {
  success: boolean
  message?: string
}

export type ContentResponse<T> = {
  content?: T
}

export type ServerResponse<T> = StatusResponse & ContentResponse<T>
export type ClientResponse<T> = ContentResponse<T> | ServerResponse<T>

export type ApiResponse<T> =
  | {
      success: false
      error: {
        message: string
        i18n: string
        code?: number
      }
      validateErrors?: {
        [key: string]: string[] | undefined
      }
    }
  | {
      success: true
      data: T
    }

export * from './types'
export * from './helps'
