import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { AdicionalContent } from "@/components/adicionales-content"

export const metadata = {
  title: "Configuración - Soporte Técnico",
  description: "Gestiona catálogos y configuración del sistema",
}

export default function AdicionalPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <div className="md:pl-64">
        <AppHeader />

        <main className="p-4 md:p-6 lg:p-8">
          <AdicionalContent />
        </main>
      </div>
    </div>
  )
}
