import { Suspense } from "react"
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth"
import { redirect } from "next/navigation"
import { db } from "@/drizzle/db"
import { eq,desc } from "drizzle-orm"
import { JobListingTable } from "@/drizzle/schema"

export default function EmployerHomePage() {
  return (
    <Suspense>
      <SuspendedPage />
    </Suspense>
  )
}

async function SuspendedPage() {
  const { orgId } = await getCurrentOrganization()
  if (orgId == null) return null

  const jobListing = await getMostRecentJobListing(orgId)
  if (jobListing == null) {
    redirect("/employer/job-listings/new")
  } else {
    redirect(`/employer/job-listings/${jobListing.id}`)
  }
}

async function getMostRecentJobListing(orgId: string) {

  return db.query.JobListingTable.findFirst({
    where: eq(JobListingTable.organizationId, orgId),
    orderBy: desc(JobListingTable.createdAt),
    columns: { id: true },
  })
}