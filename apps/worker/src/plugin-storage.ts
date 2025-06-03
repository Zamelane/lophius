import { db, eq } from 'database'
import { plugin_storage, sources } from 'database/src/schemas'

type Status<T> = {
  successful: boolean
  data?: T | null
}

export class PluginStorage {
  public sourceId!: number

  private constructor(
    private readonly uid: string,
    private readonly pluginName: string
  ) {
    console.info(`Plugin (${pluginName}) Storage initialized`)
  }

  static async init(uid: string, pluginName: string) {
    const instance = new PluginStorage(uid, pluginName)

    // Проверяем, занесено ли в базу
    const check = await instance.get()

    // Если занесено, чекаем id'шник
    if (check.successful && check.data !== undefined) {
      await instance.GetSourceId()
      return instance
    }

    // Иначе создаём запись в базе
    const { successful } = await instance.create(null)

    if (!successful) {
      throw new Error(`Error create storage in database (plugin ${pluginName})`)
    }

    return instance
  }

  private async GetSourceId() {
    if (this.sourceId) return this.sourceId

    const sourceId = await db
      .select()
      .from(plugin_storage)
      .where(eq(plugin_storage.uid, this.uid))
      .then((v) => v[0].sourceId)

    this.sourceId = sourceId

    return sourceId
  }

  public async get<T>(): Promise<Status<T>> {
    return db
      .select()
      .from(plugin_storage)
      .where(eq(plugin_storage.uid, this.uid))
      .then((v) => {
        return {
          successful: true,
          data: v.length ? (v[0].value as T) : undefined
        }
      })
      .catch((e) => {
        console.error(
          `Plugin (${this.pluginName}) Storage get value error: ${e}`
        )
        return {
          successful: false
        }
      })
  }

  public async create<T>(v: T) {
    return await db.transaction(async (tx) => {
      const sourceId = await db
        .insert(sources)
        .values({
          type: 'parser'
        })
        .returning()
        .then((v) => v[0].id)

      return tx
        .insert(plugin_storage)
        .values({
          sourceId,
          uid: this.uid,
          pluginName: this.pluginName,
          value: v
        })
        .returning()
        .then((v) => {
          console.info(
            `Plugin (${this.pluginName}) Storage insert value success`
          )
          return {
            successful: true,
            data: v.length ? (v[0].value as T) : null
          }
        })
        .catch((e) => {
          console.error(
            `Plugin (${this.pluginName}) Storage insert value error: ${e}`
          )
          return {
            successful: false
          }
        })
    })
  }

  public async update<T>(v: T): Promise<
    | {
        successful: true
        data: T | null
      }
    | {
        successful: false
      }
  > {
    return db
      .update(plugin_storage)
      .set({
        value: v
      })
      .where(eq(plugin_storage.uid, this.uid))
      .returning()
      .then((v) => {
        console.info(`Plugin (${this.pluginName}) Storage update value success`)
        return {
          successful: true,
          data: v.length ? (v[0].value as T) : null
        }
      })
      .catch((e) => {
        console.error(
          `Plugin (${this.pluginName}) Storage update value error: ${e}`
        )
        return {
          successful: false
        }
      })
  }
}
