import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './scheme'
const db = drizzle('postgresql://diary:Pomidorka!@192.168.1.28/pg', { schema });

export { db }