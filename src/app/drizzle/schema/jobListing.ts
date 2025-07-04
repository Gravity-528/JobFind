import { uuid, varchar,text, integer,pgEnum,boolean,timestamp ,index} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { OrganisationTable } from "./organisation";
import { createdAt, updatedAt } from "../schemaHelpers";

export const wageIntervals=["hourly","yearly"] as const
type WageInterval=typeof wageIntervals[number]

export const wageIntervalEnum=pgEnum("job_listings_wage_interval",wageIntervals)

export const JobListingTable=pgTable("job_listing",{
   id: uuid().primaryKey().defaultRandom(),
   organisationId:varchar().references(()=>OrganisationTable.id,{onDelete:"cascade"}).notNull(),
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


