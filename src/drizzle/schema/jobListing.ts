import { uuid, varchar,text, integer,pgEnum,boolean,timestamp ,index} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { organizationTable } from "./organization";
import { createdAt, updatedAt } from "../schemaHelpers";
import { or, relations } from "drizzle-orm";
import { jobListingApplicationTable } from "../schema";

export const wageIntervals=["hourly","yearly"] as const
type WageInterval=typeof wageIntervals[number]

export const wageIntervalEnum=pgEnum("job_listings_wage_interval",wageIntervals)

export const locationRequirements = ["in-office", "hybrid", "remote"] as const
export type LocationRequirement = (typeof locationRequirements)[number]
export const locationRequirementEnum = pgEnum(
  "job_listings_location_requirement",
  locationRequirements
)

export const experienceLevels = ["junior", "mid-level", "senior"] as const
export type ExperienceLevel = (typeof experienceLevels)[number]
export const experienceLevelEnum = pgEnum(
  "job_listings_experience_level",
  experienceLevels
)

export const jobListingStatuses = ["draft", "published", "delisted"] as const
export type JobListingStatus = (typeof jobListingStatuses)[number]
export const jobListingStatusEnum = pgEnum(
  "job_listings_status",
  jobListingStatuses
)

export const jobListingTypes = ["internship", "part-time", "full-time"] as const
export type JobListingType = (typeof jobListingTypes)[number]
export const jobListingTypeEnum = pgEnum("job_listings_type", jobListingTypes)


export const JobListingTable=pgTable("job_listing",{
   id: uuid().primaryKey().defaultRandom(),
   organizationId:varchar().references(()=>organizationTable.id,{onDelete:"cascade"}).notNull(),
   title:varchar().notNull(),
   description:text().notNull(),
   wage:integer(),
   wageInterval:wageIntervalEnum(),
   stateAbbreviation:varchar(),
   city:varchar(),
   isFeatured:boolean().notNull().default(false),
   locationRequirement: varchar().$type<"remote" | "in-office" | "hybrid">().notNull(),
   experienceLevel: varchar().$type<"junior" | "mid-level" | "senior">().notNull(),
   status: varchar().$type<"draft" | "published" | "delisted">().notNull().default("draft"),
   type: varchar().$type<"full-time" | "part-time" | "internship">().notNull(),
   postedAt: timestamp({ withTimezone: true }),
   createdAt,
   updatedAt
},
   table => [index().on(table.stateAbbreviation)]
)

export const jobListingReferences=relations(JobListingTable, ({ one,many }) => ({
    organization: one(organizationTable,{
        fields:[JobListingTable.organizationId],
        references:[organizationTable.id]
    }),
    applications: many(jobListingApplicationTable),
}))

