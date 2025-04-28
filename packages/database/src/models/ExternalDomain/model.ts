import {WithRequired} from "../../index";
import { OptionalExternalDomain, OptionalExternalDomainId } from "./type";

export class ExternalDomainModel implements OptionalExternalDomain {
	id?: OptionalExternalDomainId;
	https!: OptionalExternalDomain['https'];
	domain!: OptionalExternalDomain['domain'];

	constructor(data: OptionalExternalDomain) {
		Object.assign(this, data);
	}

	validateRequiredIds(): asserts this is WithRequired<OptionalExternalDomain, 'id'> {
		if (!this.id)
			throw new Error('Missing required id and sourceId: ' + this.constructor.name);
	}
}