"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { SolicitudDetailContent } from "@/components/solicitud-detail-content"

export default function SolicitudDetailPage({
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
          <SolicitudDetailContent folio={params.id} />
        </main>
      </div>
    </div>
  )
}
