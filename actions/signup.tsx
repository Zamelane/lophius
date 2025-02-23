'use server'
import {redirect} from "next/navigation";
import {createSession} from "@/lib/session";
import CreateUser from "@/actions/logics/create-user";
import { FormState, SignupFormSchema } from '@/lib/definitions'

export async function signup(state: FormState, formData: FormData) {
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

	// 2. Prepare data for insertion into database
	const { email, nickname, password } = validatedFields.data

	const user = await CreateUser({ email, nickname, password })

	if (typeof user === 'string')
		return {
			message: user
		}

	// 4. Create user session
	await createSession(user.id.toString())
	// 5. Redirect
	redirect('/')
}