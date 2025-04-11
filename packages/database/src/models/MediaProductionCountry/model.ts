import {WithRequired} from "../../index";
import {OptionalMediaProductionCountry} from "database/models/MediaProductionCountry/type.ts";

export class MediaProductionCountryModel implements OptionalMediaProductionCountry {
	mediaId?: OptionalMediaProductionCountry['mediaId'];
	countryId?: OptionalMediaProductionCountry['countryId'];


	constructor(data: OptionalMediaProductionCountry) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalMediaProductionCountry, 'countryId' | 'mediaId'> {
		if (!this.mediaId || !this.countryId)
			throw new Error('Missing required fields: ' + this.constructor.name);
	}
}