import { Suspense } from "react"
import { SidebarUserButtonClient } from "./_SidebarUserButtonClient"
import { SignOutButton } from "@/services/clerk/components/AuthButton"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { LogOutIcon } from "lucide-react"
import { auth } from "@clerk/nextjs/server"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth"

export function SidebarUserButton() {
  return (
    <Suspense>
      <SidebarUserSuspense />
    </Suspense>
  )
}

async function SidebarUserSuspense(){
    const {user}=await getCurrentUser({allData:true})
    
    if(user==null){
        return (
            <SignOutButton>
                <SidebarMenuButton>
                    <LogOutIcon>
                        <span>Logout</span>
                    </LogOutIcon>
                </SidebarMenuButton>
            </SignOutButton>
        )
    }

    return(
        <SidebarUserButtonClient user={user}/>
    )
}