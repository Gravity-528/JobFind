import { pgTable,varchar } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm/relations";

export const UserResumeTable=pgTable("user_resume", {
    userId: varchar().primaryKey().references(()=> userTable.id),
    resumeFileUrl: varchar().notNull(),
    resumeFileKey:varchar().notNull(),
    aisummary: varchar(),
    createdAt,
    updatedAt
})

export const userResumeRelations = relations(UserResumeTable, ({ one }) => ({
    user: one(userTable, {
        fields: [UserResumeTable.userId],
        references: [userTable.id]
    })
}));