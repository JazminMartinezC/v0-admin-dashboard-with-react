import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { TicketsContent } from "@/components/tickets-content"

export default function Page() {
  return (
    <div className="min-h-screen bg-muted/40">
      {/* Desktop sidebar */}
      <AppSidebar />

      {/* Main area offset by sidebar on desktop */}
      <div className="md:pl-64">
        <AppHeader />

        <main className="p-4 md:p-6 lg:p-8">
          <TicketsContent />
        </main>
      </div>
    </div>
  )
}
