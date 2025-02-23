import {db} from "@/db";
import bcrypt from "bcrypt";
import {api_t_keys} from "@/i18n";
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
}): Promise<{
	id?: number
	message?: string
	errors?: {
		nickname?: string | string[]
		email?: string | string[]
	}
}> {
	const alreadyExistsMessage = await db
		.select()
		.from(usersTable)
		.where(or(
			eq(usersTable.email, email),
			eq(usersTable.nickname, nickname)
		))
		.then((r) => {
			if (r.length == 0)
				return null

			if (r[0].email === email)
				return {
					errors: {
						email: api_t_keys.email_is_already_in_use_by_a_different_user
					}
				}

			if (r[0].nickname === nickname)
				return {
					errors: {
						nickname: api_t_keys.nickname_already_in_use
					}
				}
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
		.catch((e) => {
			console.error(e)
			return {
				message: api_t_keys.error
			}
		})

	if (!Array.isArray(data))
		return data

	return data[0]
}