import {WithRequired} from "../../index";
import {OptionalSourceGenre} from "./type";

export class SourceGenreModel implements OptionalSourceGenre {
	sourceId?: OptionalSourceGenre['sourceId'];
	genreId?: OptionalSourceGenre['genreId'];
	external_id!: OptionalSourceGenre['external_id'];

	constructor(data: OptionalSourceGenre) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalSourceGenre, 'genreId' | 'sourceId'> {
		if (!this.external_id || !this.sourceId)
			throw new Error('Missing required fields: ' + this.constructor.name);
	}
}