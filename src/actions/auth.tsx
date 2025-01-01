'use server'

import {SignupFormSchema, SignupFormState} from "@/schemes";
import bcrypt from "bcryptjs"
import {db} from "@/db";
import {usersTable} from "@/db/scheme";
import {createSession, deleteSession} from "@/lib/session";
import {redirect} from "next/navigation";

export async function signup(state: SignupFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    nickname: formData.get('nickname'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  console.log(formData.get('nickname'))

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Prepare data for insertion into database
  const { nickname, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3. Insert the user into the database or call an Auth Library's API
  const data = await db
    .insert(usersTable)
    .values({
      nickname,
      email,
      password: hashedPassword,
    })
    .returning({ id: usersTable.id })

  const user = data[0]

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }

  // 4. Create user session
  await createSession(user.id)
  // 5. Redirect user
  redirect('/')
}

export async function logout() {
  deleteSession()
  redirect('/login')
}