"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Eye,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
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

type Estatusolicitud = "Pendiente" | "En Proceso" | "Completada" | "Rechazada"
type TipoSolicitud = "Soporte Técnico" | "Mantenimiento" | "Solicitud de Equipo"

interface Solicitud {
  id: string
  folio: string
  titulo: string
  descripcion: string
  departamento: string
  tipoSolicitud: TipoSolicitud
  estado: Estatusolicitud
  fechaSolicitud: string
  fechaActualizacion: string
  prioridad: "Baja" | "Media" | "Alta"
}

// ── Sample data ──

const misSolicitudes: Solicitud[] = [
  {
    id: "SOL-001",
    folio: "SOL-2024-001",
    titulo: "Reparación de impresora",
    descripcion: "La impresora del departamento no enciende",
    departamento: "Recursos Humanos",
    tipoSolicitud: "Mantenimiento",
    estado: "En Proceso",
    fechaSolicitud: "2024-12-15",
    fechaActualizacion: "2024-12-18",
    prioridad: "Alta",
  },
  {
    id: "SOL-002",
    folio: "SOL-2024-002",
    titulo: "Solicitud de nuevo monitor",
    descripcion: "Se requiere un monitor de 27 pulgadas para la estación de trabajo",
    departamento: "Recursos Humanos",
    tipoSolicitud: "Solicitud de Equipo",
    estado: "Pendiente",
    fechaSolicitud: "2024-12-16",
    fechaActualizacion: "2024-12-16",
    prioridad: "Media",
  },
  {
    id: "SOL-003",
    folio: "SOL-2024-003",
    titulo: "Problemas de conectividad",
    descripcion: "Conexión de red intermitente en la sala de juntas",
    departamento: "Recursos Humanos",
    tipoSolicitud: "Soporte Técnico",
    estado: "Completada",
    fechaSolicitud: "2024-12-10",
    fechaActualizacion: "2024-12-13",
    prioridad: "Alta",
  },
  {
    id: "SOL-004",
    folio: "SOL-2024-004",
    titulo: "Instalación de software",
    descripcion: "Instalar Microsoft Office en 5 computadoras",
    departamento: "Recursos Humanos",
    tipoSolicitud: "Soporte Técnico",
    estado: "En Proceso",
    fechaSolicitud: "2024-12-14",
    fechaActualizacion: "2024-12-17",
    prioridad: "Media",
  },
  {
    id: "SOL-005",
    folio: "SOL-2024-005",
    titulo: "Cambio de contraseña",
    descripcion: "Problemas al acceder al sistema",
    departamento: "Recursos Humanos",
    tipoSolicitud: "Soporte Técnico",
    estado: "Rechazada",
    fechaSolicitud: "2024-12-12",
    fechaActualizacion: "2024-12-14",
    prioridad: "Baja",
  },
]

// ── Helper functions ──

function getEstadoBadge(estado: Estatusolicitud) {
  const styles = {
    Pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
    "En Proceso": "bg-blue-100 text-blue-800 border-blue-300",
    Completada: "bg-green-100 text-green-800 border-green-300",
    Rechazada: "bg-red-100 text-red-800 border-red-300",
  }
  return styles[estado] || styles.Pendiente
}

function getEstadoIcon(estado: Estatusolicitud) {
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

function getPrioridadBadge(prioridad: string) {
  const styles = {
    Baja: "bg-gray-100 text-gray-800 border-gray-300",
    Media: "bg-orange-100 text-orange-800 border-orange-300",
    Alta: "bg-red-100 text-red-800 border-red-300",
  }
  return styles[prioridad as keyof typeof styles] || styles.Baja
}

function getTipoSolicitudBadge(tipo: TipoSolicitud) {
  const styles = {
    "Soporte Técnico": "bg-blue-100 text-blue-800 border-blue-300",
    Mantenimiento: "bg-purple-100 text-purple-800 border-purple-300",
    "Solicitud de Equipo": "bg-indigo-100 text-indigo-800 border-indigo-300",
  }
  return styles[tipo] || styles["Soporte Técnico"]
}

// ── Main component ──

export function MisSolicitudesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState<string>("Todos")
  const [filterTipo, setFilterTipo] = useState<string>("Todos")

  const filteredSolicitudes = misSolicitudes.filter((solicitud) => {
    const matchSearch =
      solicitud.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado =
      filterEstado === "Todos" || solicitud.estado === filterEstado
    const matchTipo =
      filterTipo === "Todos" || solicitud.tipoSolicitud === filterTipo

    return matchSearch && matchEstado && matchTipo
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mis Solicitudes</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona tus solicitudes de soporte y mantenimiento
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
              placeholder="Folio, título..."
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
                <SelectItem value="Soporte Técnico">Soporte Técnico</SelectItem>
                <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                <SelectItem value="Solicitud de Equipo">
                  Solicitud de Equipo
                </SelectItem>
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
              <TableHead className="w-24">Folio</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead className="w-32">Tipo</TableHead>
              <TableHead className="w-24">Estado</TableHead>
              <TableHead className="w-20">Prioridad</TableHead>
              <TableHead className="w-32">Fecha Solicitud</TableHead>
              <TableHead className="w-16 text-center">Accion</TableHead>
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
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{solicitud.titulo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs", getTipoSolicitudBadge(solicitud.tipoSolicitud))}>
                      {solicitud.tipoSolicitud}
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
                  <TableCell>
                    <Badge className={cn("text-xs", getPrioridadBadge(solicitud.prioridad))}>
                      {solicitud.prioridad}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {solicitud.fechaSolicitud}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      title="Ver solicitud"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
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
                    <CardTitle className="text-sm font-bold text-foreground line-clamp-2">
                      {solicitud.titulo}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {solicitud.folio}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    title="Ver solicitud"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Tipo
                    </p>
                    <Badge className={cn("mt-1 text-xs", getTipoSolicitudBadge(solicitud.tipoSolicitud))}>
                      {solicitud.tipoSolicitud}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Prioridad
                    </p>
                    <Badge className={cn("mt-1 text-xs", getPrioridadBadge(solicitud.prioridad))}>
                      {solicitud.prioridad}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
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
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Fecha
                    </p>
                    <p className="text-xs text-foreground font-semibold mt-1">
                      {solicitud.fechaSolicitud}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Descripcion
                  </p>
                  <p className="text-xs text-foreground mt-1 line-clamp-2">
                    {solicitud.descripcion}
                  </p>
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
