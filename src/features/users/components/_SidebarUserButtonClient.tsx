"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile"
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { ChevronsUpDown, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";

type User={
    name:string
    imageUrl:string
    email:string
}

export function SidebarUserButtonClient({user}:{
    user:{
        name:string,
        imageUrl:string,
        email:string
    }
}){
   const  isMobile  = useIsMobile();
   const {openUserProfile} =useClerk()

   return(
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <UserInfo {...user}/>
                <ChevronsUpDown className="ml-auto group-data-[state=collapsed]:hidden"/>
            </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
        sideOffset={4}
        align="end"
        side={isMobile ? "bottom":"right"}
        className="min-w-64 max-w-80">
            <DropdownMenuLabel className="font-normal p-1"><UserInfo {...user}/></DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={()=> openUserProfile()}>
              <UserIcon className="mr-2"/> Profile
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/user-settings/notifications">
                 <SettingsIcon className="mr-2"/> Settings
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

function UserInfo({imageUrl,email,name}:User){
    const nameInitials=name.split(" ").slice(0,2).map(str=>str[0]).join("")
    return <div className="flex item-center gap-2 overflow-hidden">
        <Avatar className="rounded-lg size-8">
            <AvatarImage src={imageUrl} alt={name}/>
            <AvatarFallback className="uppercase bg-primary text-primary-foreground">{nameInitials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state-collapsed]:hidden">
            <span className="truncate text-sm font-semibold">{name}</span>
            <span className="truncate text-xs">{email}</span>
        </div>
    </div>
}
