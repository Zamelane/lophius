'use server'

import { db, eq } from 'database/index'
import { files, users } from 'database/schemas'

export async function loadUserAvatar(userId: number) {
  const result = await db
    .select({
      ext: files.ext,
      hash: files.hash,
      width: files.width,
      height: files.height,
      externalPath: files.externalPath
    })
    .from(files)
    .innerJoin(users, eq(users.id, files.id))
    .where(eq(users.id, userId))
    .then((r) => (r.length ? r[0] : undefined))

  return result
}
