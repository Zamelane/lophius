import {
	WithRequired,
	OptionalMediaId,
	type OptionalLanguage,
} from "@/database";

export class LanguageModel implements OptionalLanguage {
	id?: OptionalMediaId;
	native_name!: OptionalLanguage['native_name'];
	english_name!: OptionalLanguage['english_name'];
	iso_639_1!: OptionalLanguage['iso_639_1'];

	constructor(data: OptionalLanguage) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalLanguage, 'id'> {
		if (!this.id)
			throw new Error('Missing required id');
	}
}