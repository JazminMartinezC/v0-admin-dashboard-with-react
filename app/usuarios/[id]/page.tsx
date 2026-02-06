import { UsuarioDetailContent } from "@/components/usuario-detail-content"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"

export default function UsuarioDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <div className="md:pl-64">
        <AppHeader />

        <main className="p-4 md:p-6 lg:p-8">
          <UsuarioDetailContent userId={params.id} />
        </main>
      </div>
    </div>
  )
}
