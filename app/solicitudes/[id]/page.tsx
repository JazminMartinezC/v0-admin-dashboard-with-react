import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { SolicitudDetailContent } from "@/components/solicitud-detail-content"

export default async function SolicitudDetailPage({
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
          <SolicitudDetailContent folio={id} />
        </main>
      </div>
    </div>
  )
}
