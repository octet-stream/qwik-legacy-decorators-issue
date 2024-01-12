import {Property, type Opt} from "@mikro-orm/better-sqlite"

import {Node} from "./Node"

export abstract class Record extends Node {
  @Property({type: "datetime"})
  readonly createdAt: Opt<Date> = new Date()

  @Property({type: "datetime", onUpdate: () => new Date()})
  readonly updatedAt: Opt<Date> = new Date()
}
