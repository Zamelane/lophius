'use server'
import {db} from "@/db";
import bcrypt from 'bcrypt'
import {usersTable} from "@/db/tables";
import {redirect} from "next/navigation";
import {createSession} from "@/lib/session";
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

	// 2. Prepare data for insertion into database
	const { email, nickname, password } = validatedFields.data

	// e.g. Hash the user's password before storing it
	const hashedPassword = await bcrypt.hash(password, 10)

	// 3. Insert the user into the database or call an Auth Library's API
	const data = await db
		.insert(usersTable)
		.values({
			email,
			nickname,
			password: hashedPassword,
		})
		.returning({ id: usersTable.id })

	console.log(data)

	const user = data[0]

	if (!user) {
		return {
			message: 'An error occurred while creating your account.',
		}
	}

	// 4. Create user session
	await createSession(user.id.toString())
	// 5. Redirect
	redirect('/')
}