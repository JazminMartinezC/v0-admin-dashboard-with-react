"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  FileText,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Wrench,
  Lightbulb,
  MessageSquareText,
  Hash,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ── Types ──

type EstadoReporte = "Resuelto" | "En revision" | "Pendiente"

interface Reporte {
  id: string
  folio: string
  fecha: string
  tecnico: string
  departamento: string
  diagnostico: string
  solucion: string
  detallesAdicionales: string
  estado: EstadoReporte
}

// ── Sample data ──

const reportes: Reporte[] = [
  {
    id: "RPT-001",
    folio: "SOL-2024-001",
    fecha: "2024-12-15",
    tecnico: "Juan Rodriguez",
    departamento: "Recursos Humanos",
    diagnostico:
      "El equipo de escritorio presentaba fallas intermitentes de encendido. Se identifico que la fuente de poder mostraba signos de desgaste y voltaje inestable en la linea de 12V.",
    solucion:
      "Se reemplazo la fuente de poder por una nueva unidad de 500W certificada. Se verifico estabilidad de voltaje en todas las lineas y se realizo prueba de estres durante 2 horas sin incidencias.",
    detallesAdicionales:
      "Se recomienda revisar la regulacion electrica del area de RH ya que se detectaron micro-variaciones de voltaje que podrian afectar otros equipos.",
    estado: "Resuelto",
  },
  {
    id: "RPT-002",
    folio: "SOL-2024-003",
    fecha: "2024-12-14",
    tecnico: "Ana Torres Ruiz",
    departamento: "Sistemas",
    diagnostico:
      "Switch de red principal presento desconexiones aleatorias en puertos 12-18. Los logs muestran errores CRC y frame check en la interfaz.",
    solucion:
      "Se actualizo el firmware del switch Cisco Catalyst 2960 a la ultima version estable. Se reemplazaron 3 cables de patcheo danados y se reconfiguraron los puertos afectados.",
    detallesAdicionales:
      "Pendiente monitorear durante 72 horas para confirmar estabilidad. Se programo revision preventiva del rack de comunicaciones para la proxima semana.",
    estado: "En revision",
  },
  {
    id: "RPT-003",
    folio: "SOL-2024-002",
    fecha: "2024-12-14",
    tecnico: "Carlos Martinez",
    departamento: "Contabilidad",
    diagnostico:
      "La impresora HP LaserJet no reconoce los cartuchos de toner nuevos. Se descarta problema de hardware del lector de chip.",
    solucion:
      "Se realizo reset de fabrica del modulo de reconocimiento de toner. Se actualizo el firmware de la impresora y se limpiaron los contactos del cartucho.",
    detallesAdicionales:
      "El proveedor de toner generico ha presentado problemas de compatibilidad. Se sugiere migrar a toner original HP para evitar recurrencia.",
    estado: "Resuelto",
  },
  {
    id: "RPT-004",
    folio: "SOL-2024-006",
    fecha: "2024-12-12",
    tecnico: "Juan Rodriguez",
    departamento: "Marketing",
    diagnostico:
      "Equipo portatil con pantalla azul recurrente (BSOD). El codigo de error apunta a un problema de driver de video NVIDIA.",
    solucion:
      "Se desinstalo el driver actual y se instalo la version estable recomendada por el fabricante. Se desactivo la actualizacion automatica de drivers de Windows Update para este dispositivo.",
    detallesAdicionales:
      "Usuario reporta uso intensivo de software de diseno (Adobe Creative Suite). Se recomienda evaluar si el equipo actual cumple con los requisitos minimos o considerar upgrade de RAM.",
    estado: "Resuelto",
  },
  {
    id: "RPT-005",
    folio: "SOL-2024-008",
    fecha: "2024-12-10",
    tecnico: "Sofia Ramirez",
    departamento: "Contabilidad",
    diagnostico:
      "Sistema de contabilidad no permite generar reportes fiscales. Error de conexion a la base de datos al ejecutar consultas complejas.",
    solucion: "",
    detallesAdicionales:
      "Se ha escalado al proveedor del sistema contable. Ticket de soporte externo #EXT-4521 abierto. Tiempo estimado de respuesta: 48 horas.",
    estado: "Pendiente",
  },
]

// ── Badge helpers ──

const estadoConfig: Record<
  EstadoReporte,
  { class: string; icon: typeof CheckCircle2 }
> = {
  Resuelto: {
    class: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  "En revision": {
    class: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Clock,
  },
  Pendiente: {
    class: "bg-red-100 text-red-700 border-red-200",
    icon: AlertCircle,
  },
}

function EstadoReporteBadge({ estado }: { estado: EstadoReporte }) {
  const config = estadoConfig[estado]
  const Icon = config.icon
  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 font-semibold", config.class)}
    >
      <Icon className="h-3 w-3" />
      {estado}
    </Badge>
  )
}

// ── Action Bar ──

function ReportesActionBar({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string
  onSearchChange: (v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por folio, tecnico o diagnostico..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-sm bg-transparent shrink-0"
        >
          <Download className="h-4 w-4" />
          Exportar Reportes
        </Button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtrado por:</span>
          <span className="sm:hidden">Filtros:</span>
        </div>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[110px] bg-card text-sm">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="resuelto">Resuelto</SelectItem>
            <SelectItem value="en-revision">En revision</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[110px] bg-card text-sm">
            <SelectValue placeholder="Depto." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="rh">Recursos Humanos</SelectItem>
            <SelectItem value="sistemas">Sistemas</SelectItem>
            <SelectItem value="contabilidad">Contabilidad</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[110px] bg-card text-sm">
            <SelectValue placeholder="Tecnico" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="juan">Juan Rodriguez</SelectItem>
            <SelectItem value="ana">Ana Torres Ruiz</SelectItem>
            <SelectItem value="carlos">Carlos Martinez</SelectItem>
            <SelectItem value="sofia">Sofia Ramirez</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// ── Report Card (technical document feed item) ──

function ReportCard({ reporte }: { reporte: Reporte }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-3 p-4 pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-foreground">{reporte.id}</h3>
              <EstadoReporteBadge estado={reporte.estado} />
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {reporte.folio}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {reporte.fecha}
              </span>
              <span className="font-medium text-foreground/70">
                {reporte.tecnico}
              </span>
              <span className="text-border">|</span>
              <span>{reporte.departamento}</span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 gap-1 text-xs text-muted-foreground hover:text-foreground self-start"
        >
          {expanded ? (
            <>
              Contraer <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              Expandir <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </div>

      {/* Diagnostico -- always visible */}
      <div className="border-t border-border/60 px-4 py-3">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-100">
            <Wrench className="h-3.5 w-3.5 text-amber-600" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
              Diagnostico
            </p>
            <p className={cn("text-sm leading-relaxed text-foreground/80", !expanded && "line-clamp-2")}>
              {reporte.diagnostico}
            </p>
          </div>
        </div>
      </div>

      {/* Solucion + Detalles -- expanded */}
      {expanded && (
        <>
          {reporte.solucion && (
            <div className="border-t border-border/60 px-4 py-3">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100">
                  <Lightbulb className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
                    Solucion
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {reporte.solucion}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-border/60 px-4 py-3">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-100">
                <MessageSquareText className="h-3.5 w-3.5 text-sky-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
                  Detalles Adicionales
                </p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {reporte.detallesAdicionales}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ── Main Export ──

export function ReportesContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReportes = reportes.filter(
    (r) =>
      r.folio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.diagnostico.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tecnico.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.departamento.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const resueltos = filteredReportes.filter((r) => r.estado === "Resuelto").length
  const pendientes = filteredReportes.filter((r) => r.estado === "Pendiente").length

  return (
    <div className="space-y-6">
      <ReportesActionBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Summary stats */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-muted-foreground">
          {filteredReportes.length} reporte
          {filteredReportes.length !== 1 ? "s" : ""} encontrado
          {filteredReportes.length !== 1 ? "s" : ""}
        </p>
        {resueltos > 0 && (
          <Badge
            variant="outline"
            className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-600 font-semibold"
          >
            <CheckCircle2 className="h-3 w-3" />
            {resueltos} resuelto{resueltos !== 1 ? "s" : ""}
          </Badge>
        )}
        {pendientes > 0 && (
          <Badge
            variant="outline"
            className="gap-1 border-red-200 bg-red-50 text-red-600 font-semibold"
          >
            <AlertCircle className="h-3 w-3" />
            {pendientes} pendiente{pendientes !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {filteredReportes.map((reporte) => (
          <ReportCard key={reporte.id} reporte={reporte} />
        ))}

        {filteredReportes.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
            <FileText className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              No se encontraron reportes
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Intenta ajustar los filtros de busqueda
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
