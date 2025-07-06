"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile"
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { ArrowLeftRightIcon, Building2Icon, ChevronsUpDown, CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon, UserRoundCogIcon } from "lucide-react";
import Link from "next/link";

type User={
    email:string
}
type organization={
    name:string
    imageUrl:string | null
}

export function SidebarOrganizationButtonClient({user,organization}:{
    user:{
        email:string
    }
    organization:organization
}){
   const  isMobile  = useIsMobile();
   const {openOrganizationProfile} =useClerk()

   return(
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <OrganizationInfo user={user} organization={organization}/>
                <ChevronsUpDown className="ml-auto group-data-[state=collapsed]:hidden"/>
            </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
        sideOffset={4}
        align="end"
        side={isMobile ? "bottom":"right"}
        className="min-w-64 max-w-80">
            <DropdownMenuLabel className="font-normal p-1"><OrganizationInfo user={user} organization={organization}/></DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={()=> openOrganizationProfile()}>
              <Building2Icon className="mr-2"/> Manage organization
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="employer/user-settings">
                 <UserRoundCogIcon className="mr-2"/> User Settings
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="employer/pricing">
                 <CreditCardIcon className="mr-2"/> Change Plan
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem asChild>
                <Link href="/organization/select">
                 <ArrowLeftRightIcon className="mr-2"/> Switch organizations
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <SignOutButton>
            <DropdownMenuItem>
                 <LogOutIcon className="mr-2"/> LogOut
            </DropdownMenuItem>
            </SignOutButton>
        </DropdownMenuContent>
     </DropdownMenu>
   )

}

function OrganizationInfo({organization,user}:{user:User ,organization:organization}){
    const nameInitials=organization.name.split(" ").slice(0,2).map(str=>str[0]).join("")
    return <div className="flex item-center gap-2 overflow-hidden">
        <Avatar className="rounded-lg size-8">
            <AvatarImage src={organization.imageUrl ?? undefined} alt={organization.name}/>
            <AvatarFallback className="uppercase bg-primary text-primary-foreground">{nameInitials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state-collapsed]:hidden">
            <span className="truncate text-sm font-semibold">{organization.name}</span>
            <span className="truncate text-xs">{user.email}</span>
        </div>
    </div>
}
