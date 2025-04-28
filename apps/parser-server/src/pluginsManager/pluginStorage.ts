import {db, eq} from "web-server/db";
import {pluginStorage} from "web-server/db/tables";
import {logger} from "../utils";

type Status<T> = {
  successful: boolean
  data?: T | null
}

export class PluginStorage {
  constructor(private readonly pluginName: string) {
    logger.info(`Plugin (${pluginName}) Storage initialized`);
  }

  public async get<T>(): Promise<Status<T>> {
    return db.select()
      .from(pluginStorage)
      .where(eq(pluginStorage.pluginName, this.pluginName))
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
    return db.insert(pluginStorage)
     .values({
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
  }

  public async update<T>(v: T) {
    return db.update(pluginStorage)
      .set({
        value: v
      })
      .where(eq(pluginStorage.pluginName, this.pluginName))
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