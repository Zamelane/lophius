import {WithRequired} from "../../index";
import {OptionalMediaGenre} from "./type";

export class MediaGenreModel implements OptionalMediaGenre {
	mediaId?: OptionalMediaGenre['mediaId'];
	genreId?: OptionalMediaGenre['genreId'];


	constructor(data: OptionalMediaGenre) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalMediaGenre, 'mediaId' | 'genreId'> {
		if (!this.mediaId || !this.genreId)
			throw new Error('Missing required fields: ' + this.constructor.name);
	}
}