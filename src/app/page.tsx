// import { Sidebar } from "@/components/sidebar";
// import { Sidebar } from "lucide-react";
import { SidebarHeader, SidebarProvider, SidebarTrigger,SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../components/ui/sidebar";
import { Sidebar } from "../components/ui/sidebar";
export default function HomePage(){
  return (
    <>
      <SidebarProvider className="overflow-y-hidden">
         <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row">
            <SidebarTrigger/>
            <span className="text-xl text-nowrap">Jobify</span>
          </SidebarHeader>
          <SidebarContent></SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  button
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
         </Sidebar>
         <main className="flex-1">abcdef</main>
      </SidebarProvider>
      <h1>Welcome</h1>
    </>
  )
}