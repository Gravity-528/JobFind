import { timestamp, uuid } from "drizzle-orm/pg-core"
export const createdAt=timestamp({withTimezone: true})
.notNull()
.defaultNow()

export const id=uuid().primaryKey().defaultRandom()
export const updatedAt=timestamp({withTimezone:true})
.notNull()
.defaultNow()
.$onUpdate(()=> new Date())