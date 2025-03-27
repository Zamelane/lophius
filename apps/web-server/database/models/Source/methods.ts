import {eq} from "drizzle-orm";
import {sources} from "@/database/schemas";
import {
	SourceId,
	queryOneResult,
	type SourceRepository
} from "@/database";

/**
 * Возвращает источник по его Id
 * @param sourceId
 */
export async function getSourceById(
	this: SourceRepository,
	sourceId: SourceId
) {
	return queryOneResult(
		await this.tx.select()
			.from(sources)
			.where(eq(sources.id, sourceId))
	)
}