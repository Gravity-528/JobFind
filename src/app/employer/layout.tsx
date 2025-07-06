import { AppSlidebar } from "@/components/sidebar/AppSidebar";
import { SidebarHeader, SidebarProvider, SidebarTrigger, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, Sidebar, SidebarGroupLabel, SidebarGroupAction } from "@/components/ui/sidebar";
// import { AppSidebarClient } from "../sidebar/_AppSidebarClient";
import { LogInIcon, ClipboardListIcon, BrainCircuitIcon, LayoutDashboard, PlusIcon } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@/services/clerk/components/SignedInStatus";
import { ReactNode, Suspense } from "react";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";
import { SidebarNavMenuGroup } from "@/components/sidebar/SidebarNavMenu";
import { SidebarOrganizationButton } from "@/features/organizations/components/SidebarOrganizationButton";
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import { redirect } from "next/navigation";

export default function EmployerLayout({children}:{children:ReactNode}){
    return <Suspense>
        <LayoutSuspense>{children}</LayoutSuspense>
    </Suspense>
}


async function LayoutSuspense({children}:{children:ReactNode}){
    const {orgId}=await getCurrentOrganization()
    if(orgId==null) return redirect("/organizations/select")
    return(<AppSlidebar
            content={
            <>
              <SidebarGroup>
                <SidebarGroupLabel>Job Listing</SidebarGroupLabel>
                <SidebarGroupAction title="Add Job Listing" asChild>
                    <Link href={"/employer/job-listing/new"}>
                    <PlusIcon/> <span className="sr-only">Add Job Listing</span>
                    </Link>
                </SidebarGroupAction>
              </SidebarGroup>
              <SidebarNavMenuGroup
                className="mt-auto"
                items={[
                  { href: "/", icon: <ClipboardListIcon />, label: "Job Board" },
                  {
                    href: "/ai-search",
                    icon: <BrainCircuitIcon />,
                    label: "AI Search",
                  },
                  {
                    href: "/employer",
                    icon: <LayoutDashboard />,
                    label: "Employer Dashboard",
                    authStatus: "signedIn",
                  },
                  {
                    href: "/sign-in",
                    icon: <LogInIcon />,
                    label: "Sign In",
                    authStatus: "signedOut",
                  },
                ]}
              />
            </>
          }
          footerButton={<SidebarOrganizationButton />}
        >
          {children}
        </AppSlidebar>
    )
}