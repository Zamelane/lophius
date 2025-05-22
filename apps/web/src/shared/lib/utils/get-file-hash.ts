import base64 from 'base-64'
import { XXH3_128 } from 'xxh3-ts'

export function getFileHash(buffer: Buffer): string {
  const hex = XXH3_128(buffer).toString(16)
  return base64.encode(hex)
}
