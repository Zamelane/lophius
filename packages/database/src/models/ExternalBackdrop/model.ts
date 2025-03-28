import {WithRequired} from "../../index";
import {OptionalExternalBackdrop} from "./type";

export class ExternalBackdropModel implements OptionalExternalBackdrop {
	externalImageId?: OptionalExternalBackdrop['externalImageId'];
	mediaId?: OptionalExternalBackdrop['mediaId'];

	constructor(data: OptionalExternalBackdrop) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalExternalBackdrop, 'externalImageId' | 'mediaId'> {
		if (!this.externalImageId || !this.mediaId)
			throw new Error('Missing required externalImageId and mediaId: ' + this.constructor.name);
	}
}