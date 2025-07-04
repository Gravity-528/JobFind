import { pgTable,varchar,boolean } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { createdAt, updatedAt } from "../schemaHelpers";

export const UserNotificationSettingsTable = pgTable("user_notification_settings", {
    userId: varchar().notNull().references(()=> userTable.id),
    newJobListingEmailNotification: boolean().notNull().default(false),
    aiprompt:varchar(),
    createdAt,
    updatedAt
})