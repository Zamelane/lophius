import { db, eq } from "../../../web-server/database";
import { plugin_storage, sources } from "@/database/schemas";
import { logger } from "src/utils";


type Status<T> = {
  successful: boolean
  data?: T | null
}

export class PluginStorage {
  public sourceId: number|null = null

  constructor(private readonly pluginName: string) {
    logger.info(`Plugin (${pluginName}) Storage initialized`);
  }

  public async GetSourceId() {
    if (this.sourceId)
      return this.sourceId

    const sourceId = await db.select()
      .from(plugin_storage)
      .where(eq(plugin_storage.pluginName, this.pluginName))
      .then(v => v[0].sourceId)

    this.sourceId = sourceId

    return sourceId
  }

  public async get<T>(): Promise<Status<T>> {
    return db.select()
      .from(plugin_storage)
      .where(eq(plugin_storage.pluginName, this.pluginName))
      .then(v => {
        return {
          successful: true,
          data: v.length ? v[0].value as T : null
        }
      })
      .catch(e => {
        logger.error(`Plugin (${this.pluginName}) Storage get value error: ${e}`)
        return {
          successful: false
        }
      })
  }

  public async create<T>(v: T) {
    return await db.transaction(async (tx) => {
      const sourceId = await db.insert(sources)
        .values({
          type: 'parser'
        })
        .returning()
        .then(v => v[0].id)
      
      return tx.insert(plugin_storage)
        .values({
            sourceId,
            pluginName: this.pluginName,
            value: v
         })
        .returning()
        .then(v => {
           logger.info(`Plugin (${this.pluginName}) Storage insert value success`)
           return {
             successful: true,
             data: v.length ? v[0].value as T : null
           }
         })
         .catch(e => {
           logger.error(`Plugin (${this.pluginName}) Storage insert value error: ${e}`)
           return {
             successful: false
           }
         })
    })
  }

  public async update<T>(v: T): Promise<{
    successful: true,
    data: T|null
  }| {
    successful: false
  }> {
    return db.update(plugin_storage)
      .set({
        value: v
      })
      .where(eq(plugin_storage.pluginName, this.pluginName))
      .returning()
      .then(v => {
        logger.info(`Plugin (${this.pluginName}) Storage update value success`)
        return {
          successful: true,
          data: v.length ? v[0].value as T : null
        }
      })
      .catch(e => {
        logger.error(`Plugin (${this.pluginName}) Storage update value error: ${e}`)
        return {
          successful: false
        }
      })
  }
}