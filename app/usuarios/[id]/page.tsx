import { UsuarioDetailContent } from "@/components/usuario-detail-content"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"

export default async function UsuarioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <div className="md:pl-64">
        <AppHeader />

        <main className="p-4 md:p-6 lg:p-8">
          <UsuarioDetailContent userId={id} />
        </main>
      </div>
    </div>
  )
}
