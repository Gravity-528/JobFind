import { organizationTable, userTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

export async function Insertorganization(organization:typeof organizationTable.$inferInsert){
    await db.insert(organizationTable).values(organization).onConflictDoNothing()
}

export async function updateorganization(id:string,organization:Partial<typeof organizationTable.$inferInsert>){
    await db.update(organizationTable).set(organization).where(eq(organizationTable.id,id))
}

export async function deleteorganization(id:string){
    await db.delete(organizationTable).where(eq(organizationTable.id,id))
}