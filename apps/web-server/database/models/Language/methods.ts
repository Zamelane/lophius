import {eq} from "drizzle-orm";
import {languages} from "@/database/schemas";
import {LanguageModel} from "@/database/models/Language/model";
import {Language, queryOneResult, LanguageRepository} from "@/database";

/**
 * Метод получения языка по ISO_639_1 из базы
 * @param iso_639_1
 */
export async function findLanguageByISO(
	this: LanguageRepository,
	iso_639_1: string
): Promise<Language|undefined> {
	return queryOneResult(
		await this.tx.select()
			.from(languages)
			.where(eq(languages.iso_639_1, iso_639_1))
			.limit(1)
	)
}

/**
 * Операция Insert для модели UoW
 */
export async function insertLanguage(
	this: LanguageRepository,
	data: LanguageModel
) {
	// Проверяем на существование
	const exist = queryOneResult(
		await this.findByISO_639_1(data.iso_639_1),
		r => data.id = r.id // Действие, если запись найдена
	)

	// Если существует, то не создаём
	if (exist)
		return exist

	return queryOneResult(
		await this.tx.insert(languages)
			.values(data)
			.returning(),
		r => data.id = r.id
	)!
}