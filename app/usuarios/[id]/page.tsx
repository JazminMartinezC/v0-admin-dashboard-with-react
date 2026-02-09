"use client"

import {
  AppSidebar,
  SidebarProvider,
  useSidebar,
} from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { UserDetailsContent } from "@/components/user-details-content"
import { cn } from "@/lib/utils"

function UserDetailsShell({ userId }: { userId: string }) {
  const { collapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "md:pl-0" : "md:pl-64"
        )}
      >
        <AppHeader />

        <main className="p-4 md:p-6 lg:p-8">
          <UserDetailsContent userId={userId} />
        </main>
      </div>
    </div>
  )
}

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Handle the async params from Next.js 16
  const clientParams = params as any
  const userId = typeof clientParams === "string" ? clientParams : clientParams.id

  return (
    <SidebarProvider>
      <UserDetailsShell userId={userId} />
    </SidebarProvider>
  )
}
