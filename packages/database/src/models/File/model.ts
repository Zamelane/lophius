import type { WithRequired } from '../../index'
import type { OptionalFile, OptionalFileId } from './type'

export class FileModel implements OptionalFile {
  id?: OptionalFileId
  ext!: OptionalFile['ext']
  externalPath!: OptionalFile['externalPath']
  createdAt!: OptionalFile['createdAt']
  height!: OptionalFile['height']
  width!: OptionalFile['width']
  hash!: OptionalFile['hash']
  size!: OptionalFile['size']

  constructor(data: OptionalFile) {
    this.setData(data)
  }

  setData(data: OptionalFile) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<OptionalFile, 'id'> {
    if (!this.id)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
