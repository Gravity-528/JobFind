import { pgTable,varchar } from "drizzle-orm/pg-core";
import { createdAt,updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm/relations";
import { JobListingTable } from "./jobListing";
import { organizationUserSettingsTable } from "./organizationUserSettings";

export const organizationTable=pgTable("organizations",{
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    imageUrl: varchar(),
    createdAt,
    updatedAt
})

export const organizationRelations = relations(organizationTable, ({ many }) => ({
    jobListings: many(JobListingTable),
    organizationUserSettings: many(organizationUserSettingsTable)
}));
