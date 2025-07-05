import { pgTable,varchar } from "drizzle-orm/pg-core";
import { createdAt,updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm/relations";
import { UserNotificationSettingsTable } from "./userNotificationSettings";
import { UserResumeTable } from "./userResume";
import { OrganisationUserSettingsTable } from "./organisationUserSettings";

export const userTable=pgTable("users",{
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    imageUrl: varchar().notNull(),
    email: varchar().notNull().unique(),
    createdAt,
    updatedAt
})


export const userRelations = relations(userTable, ({ one,many }) => ({
    notificationSettings:one(UserNotificationSettingsTable),
    resume: one(UserResumeTable),
    OrganisationUserSettings: many(OrganisationUserSettingsTable)
}));