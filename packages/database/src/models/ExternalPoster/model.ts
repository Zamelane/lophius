import {WithRequired} from "../../index";
import {OptionalExternalPoster} from "./type";

export class ExternalPosterModel implements OptionalExternalPoster {
	externalImageId?: OptionalExternalPoster['externalImageId']
	mediaId?: OptionalExternalPoster['mediaId']
	media!: OptionalExternalPoster['media']
	externalImage!: OptionalExternalPoster['externalImage']

	constructor(data: OptionalExternalPoster) {
		this.setData(data)
	}

	setData(data: OptionalExternalPoster) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalExternalPoster, 'externalImageId' | 'mediaId'> {
		// Валидация внешних моделей
		this.media.validateRequiredIds()
		this.externalImage.validateRequiredIds()
		// Перенос свойств (id'шников)
		this.mediaId = this.media.id
		this.externalImageId = this.externalImage.id
	}
}