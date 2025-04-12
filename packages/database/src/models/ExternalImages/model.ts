import {WithRequired, OptionalSourceId, SourceId} from "../../index";
import { OptionalExternalImage, OptionalExternalImageId } from "./type";

export class ExternalImageModel implements OptionalExternalImage {
	id?: OptionalExternalImageId;
	sourceId!: SourceId;
	languageId: OptionalExternalImage['languageId'] = null;
	externalDomainId?: OptionalExternalImage['externalDomainId'];
	externalDomain?: OptionalExternalImage['externalDomain'];
	language?: OptionalExternalImage['language'];
	path!: OptionalExternalImage['path'];
	width!: OptionalExternalImage['width'];
	height!: OptionalExternalImage['height'];
	vote_avg!: OptionalExternalImage['vote_avg'];
	vote_count!: OptionalExternalImage['vote_count'];

	constructor(data: WithRequired<OptionalExternalImage, 'sourceId'>) {
		this.setData(data)
	}

	setData(data: WithRequired<OptionalExternalImage, 'sourceId'>) {
		Object.assign(this, data);
	}

	validateRequiredModels(): asserts this is WithRequired<OptionalExternalImage, 'externalDomain' | 'externalDomainId'> {
		if (this.externalDomain) {
			this.externalDomain.validateRequiredIds()!
			this.externalDomainId = this.externalDomain.id
		}

		if (this.language) {
			this.language.validateRequiredIds()!
			this.languageId = this.language.id
		}
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalExternalImage, 'id' | 'externalDomainId'> {
		if (!this.id || !this.externalDomainId)
			throw new Error('Missing required id and sourceId: ' + this.constructor.name + JSON.stringify([
				this.id,
				this.sourceId,
				this.externalDomainId
			]));
	}
}