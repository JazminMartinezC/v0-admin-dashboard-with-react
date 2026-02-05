"use client"

import { useRouter } from "next/navigation"
import { AppSidebar, MobileSidebarTrigger, DesktopSidebarToggle, useSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { UsuariosContent } from "@/components/usuarios-content"

export default function UsuariosPage() {
  const router = useRouter()
  const { collapsed } = useSidebar()

  const handleNewUser = () => {
    router.push("/usuarios/registrar")
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <div className={collapsed ? "md:ml-0" : "md:ml-64"}>
        <AppHeader />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Administra los usuarios del sistema
            </p>
          </div>
          <UsuariosContent onNewUser={handleNewUser} />
        </main>
      </div>
    </div>
  )
}
