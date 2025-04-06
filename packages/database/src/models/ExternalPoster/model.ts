import {WithRequired} from "../../index";
import {OptionalExternalPoster} from "./type";

export class ExternalPosterModel implements OptionalExternalPoster {
	externalImageId?: OptionalExternalPoster['externalImageId']
	mediaId?: OptionalExternalPoster['mediaId']

	constructor(data: OptionalExternalPoster) {
		this.setData(data)
	}

	setData(data: OptionalExternalPoster) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalExternalPoster, 'externalImageId' | 'mediaId'> {
		if (!this.externalImageId || !this.mediaId)
			throw new Error('Missing required fields: ' + this.constructor.name);
	}
}