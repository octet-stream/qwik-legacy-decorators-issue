import {defineConfig} from "@mikro-orm/better-sqlite"

import * as entities from "../../db/entities"

export const config = defineConfig({
  dbName: ":memory:",
  ensureDatabase: true,
  entities: Object.values(entities)
})
