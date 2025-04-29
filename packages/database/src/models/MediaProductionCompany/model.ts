import type { OptionalMediaProductionCompany } from 'database/models/MediaProductionCompany/type.ts'
import type { WithRequired } from '../../index'

export class MediaProductionCompanyModel
  implements OptionalMediaProductionCompany
{
  mediaId?: OptionalMediaProductionCompany['mediaId']
  companyId?: OptionalMediaProductionCompany['companyId']

  constructor(data: OptionalMediaProductionCompany) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalMediaProductionCompany,
    'companyId' | 'mediaId'
  > {
    if (!this.mediaId || !this.companyId)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
