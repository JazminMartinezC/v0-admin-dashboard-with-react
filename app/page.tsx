"use client"

import { AppSidebar, SidebarProvider, useSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { TicketsContent } from "@/components/tickets-content"
import { cn } from "@/lib/utils"

function DashboardShell() {
  const { collapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-muted/40">
      <AppSidebar />

      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "md:pl-0" : "md:pl-64"
        )}
      >
        <AppHeader />

        <main className="p-4 md:p-6 lg:p-8">
          <TicketsContent />
        </main>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <SidebarProvider>
      <DashboardShell />
    </SidebarProvider>
  )
}
