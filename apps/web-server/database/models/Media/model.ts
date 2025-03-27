import {
	WithRequired,
	OptionalMediaId,
	type OptionalMedia
} from "@/database";

export class MediaModel implements OptionalMedia {
	id?: OptionalMediaId;
	sourceId!: OptionalMedia['sourceId'];
	isVideo!: OptionalMedia['isVideo'];
	isAdult!: OptionalMedia['isAdult'];
	mediaType!: OptionalMedia['mediaType'];
	external_id!: OptionalMedia['external_id'];

	constructor(data: OptionalMedia) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalMedia, 'id'> {
		if (!this.id)
			throw new Error('Missing required id');
	}
}