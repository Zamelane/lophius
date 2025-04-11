import {WithRequired} from "../../index";
import {OptionalMediaRevenue} from "database/models/MediaRevenue/type.ts";

export class MediaRevenueModel implements OptionalMediaRevenue {
	mediaId?: OptionalMediaRevenue['mediaId'];
	revenue!: OptionalMediaRevenue['revenue'];


	constructor(data: OptionalMediaRevenue) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalMediaRevenue, 'mediaId'> {
		if (!this.mediaId)
			throw new Error('Missing required fields: ' + this.constructor.name);
	}
}