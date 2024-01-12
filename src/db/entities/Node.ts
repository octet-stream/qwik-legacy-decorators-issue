import {PrimaryKey} from "@mikro-orm/better-sqlite"

export abstract class Node {
  @PrimaryKey({type: "uuid"})
  id: string = crypto.randomUUID()
}
