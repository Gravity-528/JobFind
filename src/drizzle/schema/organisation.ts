import { pgTable,varchar } from "drizzle-orm/pg-core";
import { createdAt,updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm/relations";
import { JobListingTable } from "./jobListing";
import { OrganisationUserSettingsTable } from "./organisationUserSettings";

export const OrganisationTable=pgTable("organisations",{
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    imageUrl: varchar(),
    createdAt,
    updatedAt
})

export const organisationRelations = relations(OrganisationTable, ({ many }) => ({
    jobListings: many(JobListingTable),
    OrganisationUserSettings: many(OrganisationUserSettingsTable)
}));
