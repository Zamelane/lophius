import {translates} from "@/database/schemas/translates";
import {queryOneResult, pickExistingByType} from "@/database";
import {TranslatedModel} from "@/database/models/Translate/type";
import {TranslateRepository} from "@/database/models/Translate/repository";

/**
 * Операция Insert для модели UoW
 */
export async function insertTranslate(
	this: TranslateRepository,
	data: TranslatedModel
) {
	// Валидируем наличие данных
	data.media.validateRequiredIds()
	data.language.validateRequiredIds()
	data.country.validateRequiredIds()

	return queryOneResult(
		await this.tx.insert(translates)
			.values({
				...pickExistingByType(data, ['title', 'overview', 'homepage', 'runtime', 'tagline', 'isOriginal']),
				mediaId: data.media.id,
				countryId: data.country.id,
				languageId: data.language.id
			})
			.returning()
	)!
}