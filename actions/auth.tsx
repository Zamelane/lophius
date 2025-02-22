'use server'
import { FormState, SignupFormSchema } from '@/lib/definitions'

export async function signup(state: FormState, formData: FormData) {
	console.log(formData)
	// Validate form fields
	const validatedFields = SignupFormSchema.safeParse({
		email: formData.get('email'),
		nickname: formData.get('nickname'),
		password: formData.get('password'),
	})

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	// Call the provider or db to create a user...
}