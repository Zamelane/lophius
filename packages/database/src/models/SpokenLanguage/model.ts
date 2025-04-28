import {WithRequired} from "../../index";
import {OptionalReleaseDate} from "database/models/ReleaseDate/type.ts";
import {OptionalSpokenLanguage} from "database/models/SpokenLanguage/type.ts";

export class SpokenLanguageModel implements OptionalSpokenLanguage {
	mediaId?: OptionalSpokenLanguage['mediaId'];
	languageId?: OptionalSpokenLanguage['languageId'];


	constructor(data: OptionalSpokenLanguage) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalSpokenLanguage, 'mediaId' | 'languageId'> {
		if (!this.mediaId && !this.languageId)
			throw new Error('Missing required fields: ' + this.constructor.name);
	}
}