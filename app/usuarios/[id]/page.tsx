"use client"

import {
  AppSidebar,
  SidebarProvider,
  useSidebar,
} from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { UserDetailsContent } from "@/components/user-details-content"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

function UserDetailsShell({ userId }: { userId: string | null }) {
  const { collapsed } = useSidebar()

  if (!userId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

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

export default function UserDetailsPage() {
  const params = useParams()
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    console.log("[v0] params:", params)
    if (params?.id) {
      const id = Array.isArray(params.id) ? params.id[0] : params.id
      console.log("[v0] userId obtenido de params:", id)
      setUserId(id)
    }
  }, [params])

  return (
    <SidebarProvider>
      <UserDetailsShell userId={userId} />
    </SidebarProvider>
  )
}
