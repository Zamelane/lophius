import { z } from 'zod'

export const SignupFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
	nickname: z
		.string()
		.min(2, { message: 'Nickname must be at least 2 characters long.' })
		.trim(),
	password: z
		.string()
		.min(8, { message: 'Be at least 8 characters long' })
		.regex(/[a-z]/, { message: 'Contain at least one letter1.' })
		.regex(/[A-Z]/, { message: 'Contain at least one letter2.' })
		.regex(/[0-9]/, { message: 'Contain at least one number.' })
		.trim(),
})

export type FormState =
	| {
	errors?: {
		nickname?: string[]
		email?: string[]
		password?: string[]
	}
	message?: string
}
	| undefined
