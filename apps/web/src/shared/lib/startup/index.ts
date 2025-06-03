import { db } from 'database'
import { indexCreate } from './index-create'
import { listSeeder } from './lists-seeder'

export async function onStartServer() {
  await listSeeder()
  await indexCreate(db)
}
