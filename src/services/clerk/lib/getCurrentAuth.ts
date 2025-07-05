import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";
import {eq} from "drizzle-orm";
import { userTable } from "@/drizzle/schema/user";
import { organizationTable } from "@/drizzle/schema/organisation";


export async function getCurrentUser({ allData = false }= {}) {
	const {userId} =await auth()

    return{
        userId,
        user:allData && userId != null ? await getUser(userId): undefined
    }
}

export async function getCurrentorganization({ allData = false }= {}) {
	const {orgId} =await auth()

    return{
        orgId,
        organization:allData && orgId != null ? await getorganization(orgId): undefined
    }
}

async function getUser(id: string) {
    return db.query.userTable.findFirst({
        where:eq(userTable.id, id),
    })
}

async function getorganization(id:string){
    return db.query.organizationTable.findFirst({
        where: eq(organizationTable.id, id)
    })
}