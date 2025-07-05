import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";
import {eq} from "drizzle-orm";
import { userTable } from "@/drizzle/schema/user";


export async function getCurrentUser({ allData = false }= {}) {
	const {userId} =await auth()

    return{
        userId,
        user:allData && userId != null ? await getUser(userId): undefined
    }
}

async function getUser(id: string) {
    return db.query.userTable.findFirst({
        where:eq(userTable.id, id),
    })
}