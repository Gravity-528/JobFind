import { pgTable,varchar } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { createdAt, updatedAt } from "../schemaHelpers";

export const UserResumeTable=pgTable("user_resume", {
    userId: varchar().primaryKey().references(()=> userTable.id),
    resumeFileUrl: varchar().notNull(),
    resumeFileKey:varchar().notNull(),
    aisummary: varchar(),
    createdAt,
    updatedAt
})