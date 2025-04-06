import {WithRequired} from "../../index";
import {OptionalMediaBudget} from "./type";

export class MediaBudgetModel implements OptionalMediaBudget {
	mediaId?: OptionalMediaBudget['mediaId'];
	budget!: OptionalMediaBudget['budget'];


	constructor(data: OptionalMediaBudget) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalMediaBudget, 'mediaId'> {
		if (!this.mediaId)
			throw new Error('Missing required fields: ' + this.constructor.name);
	}
}