import {db} from "@/db";
import bcrypt from "bcrypt";
import {eq, or} from "drizzle-orm";
import {usersTable} from "@/db/tables";

export default async function CreateUser({
	email,
	nickname,
	password
}: {
	nickname: string,
	email: string,
	password: string
}) {
	const alreadyExistsMessage = await db
		.select()
		.from(usersTable)
		.where(or(
			eq(usersTable.email, email),
			eq(usersTable.password, password)
		))
		.then((r) => {
			if (r.length == 0)
				return null

			if (r[0].email === email)
				return 'Email already exists'

			if (r[0].nickname === nickname)
				return 'Nickname already exists'
		})

	if (alreadyExistsMessage)
		return alreadyExistsMessage

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
		.catch(() => ('Error ...'))

	if (!Array.isArray(data))
		return data

	return data[0]
}