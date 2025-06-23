import type { OptionalSourceId, WithRequired } from '../../index'
import type { OptionalCompany, OptionalCompanyId } from './type'

export class CompanyModel implements OptionalCompany {
  id?: OptionalCompanyId
  sourceId?: OptionalSourceId
  name!: OptionalCompany['name']
  homepage!: OptionalCompany['homepage']
  external_id!: OptionalCompany['external_id']
  description!: OptionalCompany['description']
  logoExternalFileId!: OptionalCompany['logoExternalFileId']
  originCountryId!: OptionalCompany['originCountryId']
  parentCompanyId!: OptionalCompany['parentCompanyId']

  constructor(data: OptionalCompany) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalCompany,
    'id' | 'sourceId'
  > {
    if (!this.id || !this.sourceId)
      throw new Error(
        `Missing required id and sourceId: ${this.constructor.name}`
      )
  }
}
