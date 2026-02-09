"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Eye,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ── Types ──

type EstadoSolicitud = "Pendiente" | "En Proceso" | "Completada" | "Rechazada"
type TipoProblema = "Red" | "Mantenimiento" | "Sistema"
type TipoSolicitud = "Soporte Técnico" | "Mantenimiento" | "Solicitud de Equipo"
type Estatusolicitud = EstadoSolicitud

interface Solicitud {
  id: string
  folio: string
  nombreAfectado: string
  tipoProblema: TipoProblema
  estado: EstadoSolicitud
  fechaSolicitud: string
  prioridad: string
  tipoSolicitud: TipoSolicitud
  titulo: string
  descripcion: string
}

// ── Sample data ──

const misSolicitudes: Solicitud[] = [
  {
    id: "SOL-001",
    folio: "SOL-2024-001",
    nombreAfectado: "Juan López García",
    tipoProblema: "Mantenimiento",
    estado: "En Proceso",
    fechaSolicitud: "2024-12-15",
    prioridad: "Media",
    tipoSolicitud: "Mantenimiento",
    titulo: "Mantenimiento de Equipo",
    descripcion: "Se necesita mantenimiento preventivo en el servidor.",
  },
  {
    id: "SOL-002",
    folio: "SOL-2024-002",
    nombreAfectado: "María Rodríguez",
    tipoProblema: "Sistema",
    estado: "Pendiente",
    fechaSolicitud: "2024-12-16",
    prioridad: "Alta",
    tipoSolicitud: "Soporte Técnico",
    titulo: "Error en Sistema",
    descripcion: "El sistema está presentando errores recurrentes.",
  },
  {
    id: "SOL-003",
    folio: "SOL-2024-003",
    nombreAfectado: "Carlos Martínez",
    tipoProblema: "Red",
    estado: "Completada",
    fechaSolicitud: "2024-12-10",
    prioridad: "Baja",
    tipoSolicitud: "Solicitud de Equipo",
    titulo: "Solicitud de Red",
    descripcion: "Se necesita una nueva conexión de red.",
  },
  {
    id: "SOL-004",
    folio: "SOL-2024-004",
    nombreAfectado: "Ana Fernández",
    tipoProblema: "Sistema",
    estado: "En Proceso",
    fechaSolicitud: "2024-12-14",
    prioridad: "Media",
    tipoSolicitud: "Soporte Técnico",
    titulo: "Soporte Técnico",
    descripcion: "Se necesita soporte técnico urgente.",
  },
  {
    id: "SOL-005",
    folio: "SOL-2024-005",
    nombreAfectado: "Pedro Sánchez",
    tipoProblema: "Red",
    estado: "Rechazada",
    fechaSolicitud: "2024-12-12",
    prioridad: "Alta",
    tipoSolicitud: "Mantenimiento",
    titulo: "Mantenimiento de Red",
    descripcion: "La solicitud de mantenimiento de red fue rechazada.",
  },
]

// ── Helper functions ──

function getEstadoBadge(estado: EstadoSolicitud) {
  const styles = {
    Pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
    "En Proceso": "bg-blue-100 text-blue-800 border-blue-300",
    Completada: "bg-green-100 text-green-800 border-green-300",
    Rechazada: "bg-red-100 text-red-800 border-red-300",
  }
  return styles[estado] || styles.Pendiente
}

function getEstadoIcon(estado: EstadoSolicitud) {
  const iconClass = "h-4 w-4"
  switch (estado) {
    case "Pendiente":
      return <Clock className={cn(iconClass, "text-yellow-600")} />
    case "En Proceso":
      return <AlertCircle className={cn(iconClass, "text-blue-600")} />
    case "Completada":
      return <CheckCircle2 className={cn(iconClass, "text-green-600")} />
    case "Rechazada":
      return <AlertCircle className={cn(iconClass, "text-red-600")} />
    default:
      return null
  }
}

function getTipoProblemaColor(tipo: TipoProblema) {
  const styles = {
    Red: "bg-indigo-100 text-indigo-800 border-indigo-300",
    Mantenimiento: "bg-purple-100 text-purple-800 border-purple-300",
    Sistema: "bg-cyan-100 text-cyan-800 border-cyan-300",
  }
  return styles[tipo] || styles.Sistema
}

function getTipoSolicitudBadge(tipo: TipoSolicitud) {
  const styles = {
    "Soporte Técnico": "bg-teal-100 text-teal-800 border-teal-300",
    Mantenimiento: "bg-orange-100 text-orange-800 border-orange-300",
    "Solicitud de Equipo": "bg-pink-100 text-pink-800 border-pink-300",
  }
  return styles[tipo] || styles["Soporte Técnico"]
}

function getPrioridadBadge(prioridad: string) {
  const styles = {
    Alta: "bg-red-100 text-red-800 border-red-300",
    Media: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Baja: "bg-green-100 text-green-800 border-green-300",
  }
  return styles[prioridad] || styles.Media
}

// ── Main component ──

export function MisSolicitudesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState<string>("Todos")
  const [filterTipo, setFilterTipo] = useState<string>("Todos")

  const filteredSolicitudes = misSolicitudes.filter((solicitud) => {
    const matchSearch =
      solicitud.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.nombreAfectado.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado =
      filterEstado === "Todos" || solicitud.estado === filterEstado
    const matchTipo =
      filterTipo === "Todos" || solicitud.tipoProblema === filterTipo

    return matchSearch && matchEstado && matchTipo
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mis Solicitudes</h1>
          <p className="text-sm text-muted-foreground">
            Visualiza y gestiona tus solicitudes
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-end sm:gap-3">
        <div className="flex-1">
          <label className="text-xs font-semibold text-foreground">
            Buscar solicitud
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Folio o nombre afectado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="min-w-32 sm:min-w-40">
            <label className="text-xs font-semibold text-foreground">
              Estado
            </label>
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Proceso">En Proceso</SelectItem>
                <SelectItem value="Completada">Completada</SelectItem>
                <SelectItem value="Rechazada">Rechazada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-32 sm:min-w-40">
            <label className="text-xs font-semibold text-foreground">
              Tipo
            </label>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Red">Red</SelectItem>
                <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                <SelectItem value="Sistema">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto rounded-lg border border-border md:block">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-28">Folio</TableHead>
              <TableHead className="w-32">Fecha Solicitud</TableHead>
              <TableHead>Nombre del Afectado</TableHead>
              <TableHead className="w-32">Tipo Problema</TableHead>
              <TableHead className="w-28">Estado</TableHead>
              <TableHead className="w-16 text-center">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSolicitudes.length > 0 ? (
              filteredSolicitudes.map((solicitud) => (
                <TableRow
                  key={solicitud.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-mono text-sm font-semibold text-primary">
                    {solicitud.folio}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {solicitud.fechaSolicitud}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {solicitud.nombreAfectado}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs", getTipoProblemaColor(solicitud.tipoProblema))}>
                      {solicitud.tipoProblema}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getEstadoIcon(solicitud.estado)}
                      <Badge className={cn("text-xs", getEstadoBadge(solicitud.estado))}>
                        {solicitud.estado}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <ActionsDropdown />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-8 w-8 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">
                      No hay solicitudes que coincidan con los filtros
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {filteredSolicitudes.length > 0 ? (
          filteredSolicitudes.map((solicitud) => (
            <Card key={solicitud.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-semibold">
                      {solicitud.folio}
                    </p>
                    <p className="text-sm font-bold text-foreground mt-1">
                      {solicitud.nombreAfectado}
                    </p>
                  </div>
                  <ActionsDropdown />
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Fecha Solicitud
                    </p>
                    <p className="text-xs text-foreground font-semibold mt-1">
                      {solicitud.fechaSolicitud}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Tipo Problema
                    </p>
                    <Badge className={cn("mt-1 text-xs", getTipoProblemaColor(solicitud.tipoProblema))}>
                      {solicitud.tipoProblema}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Estado
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {getEstadoIcon(solicitud.estado)}
                    <Badge className={cn("text-xs", getEstadoBadge(solicitud.estado))}>
                      {solicitud.estado}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-8 w-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                No hay solicitudes que coincidan con los filtros
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// ── Actions Dropdown ──

function ActionsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label="Acciones"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2">
          <Eye className="h-4 w-4" />
          Ver Detalles
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
