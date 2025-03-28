import {
	WithRequired,
	OptionalMediaId,
} from "../../index";
import {OptionalTranslate} from "./type";

export class TranslateModel implements OptionalTranslate {
	id?: OptionalMediaId;
	overview!: OptionalTranslate['overview'];
	runtime!: OptionalTranslate['runtime'];
	title!: OptionalTranslate['title'];
	tagline!: OptionalTranslate['tagline'];
	homepage!: OptionalTranslate['homepage'];
	isOriginal!: OptionalTranslate['isOriginal'];
	countryId?: OptionalTranslate['countryId'];
	languageId?: OptionalTranslate['languageId'];
	mediaId?: OptionalTranslate['mediaId'];

	constructor(data: OptionalTranslate) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalTranslate, 'id'> {
		if (!this.id)
			throw new Error('Missing required id');
	}
}