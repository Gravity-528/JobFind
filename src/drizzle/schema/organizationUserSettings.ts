import { pgTable,varchar,boolean,integer, primaryKey } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { organizationTable } from "./organization";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm/relations";

export const organizationUserSettingsTable=pgTable("organization_user_settings", {
    userId:varchar().notNull().references(() => userTable.id),
    organizationId: varchar().notNull().references(() => organizationTable.id),
    newApplicationEmailNotification: boolean().notNull().default(false),
    minimumRating:integer(),
    createdAt,
    updatedAt
},
 table => [primaryKey({columns:[table.userId,table.organizationId]})]
);

export const organizationUserSettingsRelations = relations(organizationUserSettingsTable, ({ one }) => ({
    user: one(userTable, {
        fields: [organizationUserSettingsTable.userId],
        references: [userTable.id]
    }),
    organization: one(organizationTable, {
        fields: [organizationUserSettingsTable.organizationId],
        references: [organizationTable.id]
    })
}));