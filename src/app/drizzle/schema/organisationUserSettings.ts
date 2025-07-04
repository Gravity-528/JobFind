import { pgTable,varchar,boolean,integer, primaryKey } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { OrganisationTable } from "./organisation";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm/relations";

export const OrganisationUserSettingsTable=pgTable("organisation_user_settings", {
    userId:varchar().notNull().references(() => userTable.id),
    organisationId: varchar().notNull().references(() => OrganisationTable.id),
    newApplicationEmailNotification: boolean().notNull().default(false),
    minimumRating:integer(),
    createdAt,
    updatedAt
},
 table => [primaryKey({columns:[table.userId,table.organisationId]})]
);

export const organisationUserSettingsRelations = relations(OrganisationUserSettingsTable, ({ one }) => ({
    user: one(userTable, {
        fields: [OrganisationUserSettingsTable.userId],
        references: [userTable.id]
    }),
    organisation: one(OrganisationTable, {
        fields: [OrganisationUserSettingsTable.organisationId],
        references: [OrganisationTable.id]
    })
}));