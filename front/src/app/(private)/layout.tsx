import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./components/app-sidebar";

export default function PrivateRoutesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full">
        <div className="w-full flex h-20 bg-white justify-between items-center">
          <SidebarTrigger
            className="w-9 h-9 -ml-4 z-10 rounded-full hover:bg-sidebar-ring bg-secondary"
            variant={"secondary"}
          />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
