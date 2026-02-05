"use client"

import {
  AppSidebar,
  SidebarProvider,
  useSidebar,
} from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { RegisterUserContent } from "@/components/register-user-content"
import { cn } from "@/lib/utils"

function RegisterUserShell() {
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
          <RegisterUserContent />
        </main>
      </div>
    </div>
  )
}

export default function RegistrarUsuarioPage() {
  return (
    <SidebarProvider>
      <RegisterUserShell />
    </SidebarProvider>
  )
}
