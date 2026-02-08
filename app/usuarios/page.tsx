"use client"

import {
  AppSidebar,
  SidebarProvider,
  useSidebar,
} from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { UsuariosContent } from "@/components/usuarios-content"
import { cn } from "@/lib/utils"

function UsuariosShell() {
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
          <UsuariosContent />
        </main>
      </div>
    </div>
  )
}

export default function UsuariosPage() {
  return (
    <SidebarProvider>
      <UsuariosShell />
    </SidebarProvider>
  )
}
