import { AppSidebar } from '@/components/app-sidebar'
import { AppHeader } from '@/components/app-header'
import { MisSolicituresContent } from '@/components/mis-solicitudes-content'

export default function MisSolicituresPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <div className="md:pl-64">
        <AppHeader />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Mis Solicitudes</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona todas tus solicitudes de soporte técnico
            </p>
          </div>
          <MisSolicituresContent />
        </main>
      </div>
    </div>
  )
}
