// import { Sidebar } from "@/components/sidebar";
// import { Sidebar } from "lucide-react";
import { SidebarHeader, SidebarProvider, SidebarTrigger,SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup } from "../components/ui/sidebar";
import { AppSidebarClient } from "./_AppSidebarClient";
import { Sidebar } from "../components/ui/sidebar";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Suspense } from "react";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";
export default function HomePage(){
  return (
    <>
      <SidebarProvider className="overflow-y-hidden">
        <AppSidebarClient>
         <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row">
            <SidebarTrigger/>
            <span className="text-xl text-nowrap">Jobify</span>
          </SidebarHeader>
          <SidebarContent>
          <SidebarGroup>
              <SidebarMenu>
                <Suspense>
                <SignedOut>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/sign-in">
                    <LogInIcon/>
                    <span>Log In</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                </SignedOut>
                </Suspense>
              </SidebarMenu>
          </SidebarGroup>
          </SidebarContent>
          <SignedIn>
          <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarUserButton></SidebarUserButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SignedIn>
         </Sidebar>
         <main className="flex-1">abcdef</main>
         </AppSidebarClient>
      </SidebarProvider>
      <h1>Welcome</h1>
    </>
  )
}