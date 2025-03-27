import {db} from "database";
import bcrypt from "bcrypt";
import {users} from "@/database/schemas";
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
		.insert(users)
		.values({
			email,
			nickname,
			password: hashedPassword,
		})
		.returning({ id: users.id })
		.then((v) => v[0].id)
}