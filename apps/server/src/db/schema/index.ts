import { DATABASE_URL } from '@/shared/config';
import { drizzle } from 'drizzle-orm/bun-sql';

const db = drizzle(DATABASE_URL!);
