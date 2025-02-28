import {db} from "@/db";
import bcrypt from "bcrypt";
import {usersTable} from "@/db/tables";
import {ErrorResponse} from "@/interfaces";

export default async function CreateUser({
	email,
	nickname,
	password
}: {
	nickname: string,
	email: string,
	password: string
}): Promise<ErrorResponse|number> {
	// Хешируем пароль для хранения в БД
	const hashedPassword = await bcrypt.hash(password, 10);

	// Сохраняем пользователя в базе данных и возвращаем его id
	return await db
		.insert(usersTable)
		.values({
			email,
			nickname,
			password: hashedPassword,
		})
		.returning({ id: usersTable.id })
		.then((v) => v[0].id)
}