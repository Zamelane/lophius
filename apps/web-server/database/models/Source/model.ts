import {
	WithRequired,
	OptionalMediaId,
	type OptionalSource
} from "@/database";

export class SourceModel implements OptionalSource {
	id?: OptionalMediaId;
	type!: OptionalSource['type'];

	constructor(data: OptionalSource) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalSource, 'id'> {
		if (!this.id)
			throw new Error('Missing required id');
	}
}