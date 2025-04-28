import {WithRequired,OptionalCountryId, OptionalLanguageId} from "../../index";
import {OptionalCountryTranslation} from "./type";

export class CountryTranslationModel implements OptionalCountryTranslation {
	countryId?: OptionalCountryId;
	languageId?: OptionalLanguageId;
	value!: OptionalCountryTranslation['value'];


	constructor(data: OptionalCountryTranslation) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalCountryTranslation, 'countryId' | 'languageId'> {
		if (!this.countryId || !this.languageId)
			throw new Error('Missing required countryId and languageId: ' + this.constructor.name);
	}
}