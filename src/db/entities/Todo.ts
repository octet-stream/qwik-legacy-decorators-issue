import {Entity, Property, type Opt} from "@mikro-orm/better-sqlite"

import {Record} from "./Record"

@Entity()
export class Todo extends Record {
  @Property({type: "varchar"})
  title!: string

  @Property({type: "boolean", default: false})
  completed!: Opt<boolean>
}
