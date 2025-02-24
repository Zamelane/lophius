'use server'
import {redirect} from "next/navigation";
import {ErrorResponse} from "@/interfaces";
import {createSession} from "@/lib/session";
import { SignupFormSchema } from '@/lib/definitions'
import CreateUser from "@/actions/logics/create-user";

export async function signup(state: ErrorResponse|void, formData: FormData): Promise<ErrorResponse|void> {
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

	if (typeof user !== "number")
		return user

	// 4. Create user session
	await createSession(user.toString())
	// 5. Redirect
	redirect('/')
}