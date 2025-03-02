import {db} from "web/db";
import {pluginStorageTable} from "web/db/tables";
import {eq} from "web/db"
import {logger} from "../utils";

type Status<T> = {
  successful: boolean
  data?: T | null
}

export class PluginStorage {
  constructor(private readonly pluginName: string) {
    logger.info(`Plugin (${pluginName}) Storage initialized`);
  }

  public async get<T>(): Promise<Status<T>|null> {
    return db.select()
      .from(pluginStorageTable)
      .where(eq(pluginStorageTable.pluginName, this.pluginName))
      .then(v => {
        return {
          successful: !!v.length,
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

  public async update<T>(v: T) {
    return db.update(pluginStorageTable)
      .set({
        value: v
      })
      .returning()
      .then(v => {
        return {
          successful: !!v.length,
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