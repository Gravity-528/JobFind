import { SidebarHeader, SidebarProvider, SidebarTrigger, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, Sidebar } from "../ui/sidebar";
import { AppSidebarClient } from "../sidebar/_AppSidebarClient";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ReactNode, Suspense } from "react";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";

export function AppSlidebar({content,footerButton,children}:{content:ReactNode,footerButton:ReactNode,children:ReactNode}){
    return(<>
      <SidebarProvider className="overflow-y-hidden">
        <AppSidebarClient>
         <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row">
            <SidebarTrigger/>
            <span className="text-xl text-nowrap">Jobify</span>
          </SidebarHeader>
          <SidebarContent>
          {/* <SidebarGroup>
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
          </SidebarGroup> */}
          {content}
          </SidebarContent>
          <SignedIn>
          <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  {/* <SidebarUserButton></SidebarUserButton> */}
                  {footerButton}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SignedIn>
         </Sidebar>
         <main className="flex-1">{children}</main>
         </AppSidebarClient>
      </SidebarProvider>
      <h1>Welcome</h1>
    </>
    )
}
