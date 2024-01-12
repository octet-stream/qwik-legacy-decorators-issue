import {MikroORM, type Options} from "@mikro-orm/core"

import {config} from "./config"

let cached: Promise<MikroORM>

/**
 * Creates a new MikroORM instance with given options
 */
export const createOrm = (config: Options) => MikroORM.init(config)

/**
 * Returns MikroORM instance.
 * Creates the new if one does not exists, then caches it
 */
export async function getOrm(): Promise<MikroORM> {
  if (!cached) {
    cached = createOrm(config).then(async orm => {
      const gen = orm.getSchemaGenerator()

      await gen.updateSchema()

      return orm
    })
  }

  return cached
}
