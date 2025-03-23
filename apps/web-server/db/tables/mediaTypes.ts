import { pgEnum } from "drizzle-orm/pg-core";

export const mediaTypes = pgEnum('media_types', ['kino', 'anime', 'comic', 'book', 'music'])