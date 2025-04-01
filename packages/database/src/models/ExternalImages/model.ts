import {WithRequired, OptionalSourceId} from "../../index";
import { OptionalExternalImage, OptionalExternalImageId } from "./type";

export class ExternalImageModel implements OptionalExternalImage {
	id?: OptionalExternalImageId;
	sourceId?: OptionalSourceId;
	languageId?: OptionalExternalImage['languageId'];
	externalDomainId?: OptionalExternalImage['externalDomainId'];
	path!: OptionalExternalImage['path'];
	width!: OptionalExternalImage['width'];
	height!: OptionalExternalImage['height'];
	vote_avg!: OptionalExternalImage['vote_avg'];
	vote_count!: OptionalExternalImage['vote_count'];

	constructor(data: OptionalExternalImage) {
		this.setData(data)
	}

	setData(data: OptionalExternalImage) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalExternalImage, 'id' | 'sourceId' | 'externalDomainId' | 'languageId'> {
		if (!this.id || !this.sourceId || !this.languageId || !this.externalDomainId)
			throw new Error('Missing required id and sourceId: ' + this.constructor.name);
	}
}