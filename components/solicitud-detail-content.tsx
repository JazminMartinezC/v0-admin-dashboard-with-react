"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Printer,
  Pencil,
  X,
  Monitor,
  AlertTriangle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type Priority = "Critica" | "Alta" | "Media" | "Baja"
type Status = "Abierto" | "En Progreso" | "Resuelto" | "Cerrado"

interface SolicitudDetail {
  folio: string
  fecha: string
  tipo: string
  departamento: string
  prioridad: Priority
  estado: Status
  nombreAfectado: string
  correo: string
  inventario: string
  descripcion: string
  tecnico?: string
  diagnostico?: string
  solucion?: string
}

const priorityConfig: Record<Priority, string> = {
  Critica: "bg-red-100 text-red-700 border-red-200",
  Alta: "bg-orange-100 text-orange-700 border-orange-200",
  Media: "bg-amber-100 text-amber-700 border-amber-200",
  Baja: "bg-emerald-100 text-emerald-700 border-emerald-200",
}

const statusConfig: Record<Status, string> = {
  Abierto: "bg-sky-100 text-sky-700 border-sky-200",
  "En Progreso": "bg-indigo-100 text-indigo-700 border-indigo-200",
  Resuelto: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Cerrado: "bg-zinc-100 text-zinc-600 border-zinc-200",
}

function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-semibold text-xs", priorityConfig[priority])}
    >
      {priority}
    </Badge>
  )
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-semibold text-xs", statusConfig[status])}
    >
      {status}
    </Badge>
  )
}

export function SolicitudDetailContent({ folio }: { folio: string }) {
  const router = useRouter()

  // Sample data - in a real app, this would come from an API/database
  const solicitud: SolicitudDetail = {
    folio: folio,
    fecha: "2024-12-15",
    tipo: "Hardware",
    departamento: "Recursos Humanos",
    prioridad: "Alta",
    estado: "En Progreso",
    nombreAfectado: "Maria Garcia Lopez",
    correo: "maria.garcia@company.com",
    inventario: "INV-2024-1234",
    descripcion:
      "La pantalla de mi computadora no enciende. He intentado reiniciar pero el problema persiste. El CPU está encendido pero no hay señal de video. Necesito solución urgente para continuar con mis labores.",
    tecnico: "Carlos Martinez",
    diagnostico:
      "Se verificó la conexión de la pantalla y el cable de alimentación. Se identificó que el cable HDMI estaba defectuoso.",
    solucion:
      "Se reemplazó el cable HDMI por uno nuevo. Se probó la conexión y la pantalla enciende correctamente. Sistema funcionando al 100%.",
  }

  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header with back button and title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="h-9 w-9"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-foreground text-balance">
              Detalle de Solicitud: {solicitud.folio}
            </h1>
          </div>
        </div>

        {/* Status and Priority badges */}
        <div className="flex items-center gap-2">
          <StatusBadge status={solicitud.estado} />
          <PriorityBadge priority={solicitud.prioridad} />
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Card 1: Información General */}
          <Card className="rounded-xl border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Información General</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Folio
                  </p>
                  <p className="mt-1 text-sm font-mono font-bold text-foreground">
                    {solicitud.folio}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Fecha de Creación
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {new Date(solicitud.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Tipo de Problema
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {solicitud.tipo}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Departamento
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {solicitud.departamento}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Datos del Afectado y Equipo */}
          <Card className="rounded-xl border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Datos del Afectado y Equipo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Nombre del Afectado
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {solicitud.nombreAfectado}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Correo de Contacto
                  </p>
                  <p className="mt-1 text-sm text-foreground break-all">
                    {solicitud.correo}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    No. de Inventario del Equipo
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-mono font-bold text-foreground">
                      {solicitud.inventario}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Descripción del Problema */}
          <Card className="rounded-xl border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Descripción del Problema</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {solicitud.descripcion}
              </p>
            </CardContent>
          </Card>

          {/* Card 4: Seguimiento Técnico */}
          <Card className="rounded-xl border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Seguimiento Técnico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Técnico Asignado
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {solicitud.tecnico || "No asignado"}
                  </p>
                </div>

                {solicitud.diagnostico ? (
                  <>
                    <Separator />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Diagnóstico
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">
                        {solicitud.diagnostico}
                      </p>
                    </div>
                  </>
                ) : null}

                {solicitud.solucion ? (
                  <>
                    <Separator />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Solución Aplicada
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">
                        {solicitud.solucion}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
                    <p className="text-sm text-amber-700">
                      Pendiente de diagnóstico técnico
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with action buttons - Desktop */}
        <div className="hidden lg:flex lg:flex-col lg:gap-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 rounded-lg"
            onClick={() => {}}
          >
            <Pencil className="h-4 w-4" />
            Editar Solicitud
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 rounded-lg"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            Imprimir Reporte
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 rounded-lg text-destructive hover:text-destructive border-destructive/50 hover:bg-destructive/5"
            onClick={() => {}}
          >
            <X className="h-4 w-4" />
            Cancelar Solicitud
          </Button>
        </div>
      </div>

      {/* Bottom action buttons - Mobile */}
      <div className="flex flex-col gap-2 lg:hidden">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 rounded-lg"
          onClick={() => {}}
        >
          <Pencil className="h-4 w-4" />
          Editar Solicitud
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 rounded-lg"
          onClick={handlePrint}
        >
          <Printer className="h-4 w-4" />
          Imprimir Reporte
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 rounded-lg text-destructive hover:text-destructive border-destructive/50 hover:bg-destructive/5"
          onClick={() => {}}
        >
          <X className="h-4 w-4" />
          Cancelar Solicitud
        </Button>
      </div>
    </div>
  )
}
