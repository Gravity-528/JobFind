import { Suspense } from "react"
// import { SidebarUserButtonClient } from "./_SidebarorganizationButtonClient"
import { SidebarorganizationButtonClient } from "./_SidebarOrganisationButtonClient"
import { SignOutButton } from "@/services/clerk/components/AuthButton"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { LogOutIcon } from "lucide-react"
import { auth } from "@clerk/nextjs/server"
import { getCurrentorganization, getCurrentUser } from "@/services/clerk/lib/getCurrentAuth"

export function SidebarorganizationButton() {
  return (
    <Suspense>
      <SidebarorganizationSuspense />
    </Suspense>
  )
}

async function SidebarorganizationSuspense(){
    const [{user},{organization}]=await Promise.all([ getCurrentUser({allData:true}),getCurrentorganization({allData:true})])
    
    if(user==null || organization==null){
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
        <SidebarorganizationButtonClient user={user} organization={organization}/>
    )
}