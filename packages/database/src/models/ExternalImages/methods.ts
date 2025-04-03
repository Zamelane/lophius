import { queryOneResult } from "database/utils";
import { ExternalImageModel } from "./model";
import { ExternalImageRepository } from "./repository";
import { external_images } from "database/schemas";
import { SourceId } from "../Source";
import { and, eq } from "drizzle-orm";

export async function findExternalImageByCredentials(
  this: ExternalImageRepository,
  path: string,
  sourceId: SourceId
): Promise<ExternalImageModel|undefined> {
  let model: ExternalImageModel|undefined = undefined

  queryOneResult(
    await this.tx.select()
    .from(external_images)
    .where(and(
      eq(external_images.path, path),
      eq(external_images.sourceId, sourceId)
    ))
    .limit(1),
    v => model = new ExternalImageModel(v)
  )

  return model
}

export async function updateExternalImage(
  this: ExternalImageRepository,
  model: ExternalImageModel
) {
  model.validateRequiredIds()
  queryOneResult(
    await this.tx.update(external_images)
      .set({
        ...model
      })
      .where(eq(external_images.id, model.id))
      .returning(),
      v => model.setData(v)
  )
  return model
}

export async function insertExternalImage(
  this: ExternalImageRepository,
  model: ExternalImageModel,
  sourceId: SourceId
): Promise<ExternalImageModel|undefined> {
  model.validateRequiredIds()
  queryOneResult(
    await this.tx.insert(external_images)
      .values({
        ...model,
        sourceId
      }).returning(),
      v => model.id = v.id
  )

  return model
}