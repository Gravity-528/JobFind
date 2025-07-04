import { pgTable,uuid,varchar,integer,primaryKey,text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { JobListingTable } from "./jobListing";
import { createdAt, updatedAt } from "../schemaHelpers";
import { userTable } from "./user";

export function applicationStageEnum() {
    return varchar("stage", { enum: ["applied", "reviewed", "interview", "offered", "rejected"] });
}

export const jobListingApplicationTable=pgTable("job_listing_application",{
    jobListingId:uuid().references(()=>JobListingTable.id,{onDelete:"cascade"}).notNull(),
    userId:varchar().references(()=> userTable.id,{onDelete:"cascade"}).notNull(),
    coverLetter:text(),
    rating: integer(),
    stage:applicationStageEnum().notNull().default("applied"),
    createdAt: createdAt,
    updatedAt: updatedAt
},
table => [primaryKey({columns:[table.jobListingId,table.userId]})])

export const jobListingApplicationReferences=relations(jobListingApplicationTable, ({ one }) => ({
    jobListing: one(JobListingTable, {
        fields: [jobListingApplicationTable.jobListingId],
        references: [JobListingTable.id]
    }),
    user: one(userTable, {
        fields: [jobListingApplicationTable.userId],
        references: [userTable.id]
    })
}));
