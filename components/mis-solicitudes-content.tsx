'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Filter,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useIsMobile } from '@/hooks/use-mobile'

// ── Sample data ──

type ProblemType = 'Hardware' | 'Software' | 'Red' | 'Acceso' | 'Impresora' | 'Otro'
type Status = 'Pendiente' | 'En Proceso' | 'Resuelto'

interface MiSolicitud {
  folio: string
  fecha: string
  nombre: string
  tipoProblema: ProblemType
  estado: Status
  descripcion: string
}

const misSolicitudes: MiSolicitud[] = [
  {
    folio: 'MIS-2024-001',
    fecha: '15/12/2024',
    nombre: 'Mi Solicitud - Acceso a Sistema',
    tipoProblema: 'Acceso',
    estado: 'Pendiente',
    descripcion: 'Necesito acceso al sistema de inventarios',
  },
  {
    folio: 'MIS-2024-002',
    fecha: '14/12/2024',
    nombre: 'Mi Solicitud - Monitor Dañado',
    tipoProblema: 'Hardware',
    estado: 'En Proceso',
    descripcion: 'El monitor de mi estación se dañó',
  },
  {
    folio: 'MIS-2024-003',
    fecha: '13/12/2024',
    nombre: 'Mi Solicitud - Instalación Software',
    tipoProblema: 'Software',
    estado: 'Resuelto',
    descripcion: 'Necesito instalar software de diseño',
  },
  {
    folio: 'MIS-2024-004',
    fecha: '12/12/2024',
    nombre: 'Mi Solicitud - Problema de Red',
    tipoProblema: 'Red',
    estado: 'En Proceso',
    descripcion: 'Conexión de red intermitente',
  },
]

// ── Badge helpers ──

const problemTypeConfig: Record<ProblemType, string> = {
  Hardware: 'bg-red-100 text-red-700 border-red-200',
  Software: 'bg-blue-100 text-blue-700 border-blue-200',
  Red: 'bg-purple-100 text-purple-700 border-purple-200',
  Acceso: 'bg-orange-100 text-orange-700 border-orange-200',
  Impresora: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Otro: 'bg-zinc-100 text-zinc-600 border-zinc-200',
}

const statusConfig: Record<Status, string> = {
  Pendiente: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'En Proceso': 'bg-blue-100 text-blue-700 border-blue-200',
  Resuelto: 'bg-green-100 text-green-700 border-green-200',
}

function ProblemBadge({ type }: { type: ProblemType }) {
  return (
    <Badge
      variant="outline"
      className={cn('font-semibold text-xs', problemTypeConfig[type])}
    >
      {type}
    </Badge>
  )
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge
      variant="outline"
      className={cn('font-semibold text-xs', statusConfig[status])}
    >
      {status}
    </Badge>
  )
}

// ── Action Bar ──

function ActionBar({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string
  onSearchChange: (value: string) => void
}) {
  return (
    <div className="space-y-4">
      {/* Search + New button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por folio o problema..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <Button className="shrink-0 rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Solicitud
        </Button>
      </div>

      {/* Filters with "Filtrado por:" label */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtrado por:</span>
          <span className="sm:hidden">Filtros:</span>
        </div>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[120px] bg-background text-sm">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="en-proceso">En Proceso</SelectItem>
            <SelectItem value="resuelto">Resuelto</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[130px] bg-background text-sm">
            <SelectValue placeholder="Tipo de Problema" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="hardware">Hardware</SelectItem>
            <SelectItem value="software">Software</SelectItem>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="acceso">Acceso</SelectItem>
            <SelectItem value="impresora">Impresora</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// ── Actions dropdown ──

function ActionsDropdown({ folio }: { folio: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label={`Acciones para ${folio}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2">
          <Eye className="h-4 w-4" />
          Ver Detalles
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Pencil className="h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
          <Trash2 className="h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ── Desktop Table ──

function DesktopTable({ data }: { data: MiSolicitud[] }) {
  return (
    <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[140px]">Folio</TableHead>
            <TableHead className="w-[100px]">Fecha</TableHead>
            <TableHead>Nombre del Afectado</TableHead>
            <TableHead className="w-[130px]">Tipo de Problema</TableHead>
            <TableHead className="w-[110px]">Estado</TableHead>
            <TableHead className="w-[70px] text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((solicitud) => (
            <TableRow key={solicitud.folio}>
              <TableCell className="font-semibold text-foreground">
                {solicitud.folio}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {solicitud.fecha}
              </TableCell>
              <TableCell className="text-foreground">{solicitud.nombre}</TableCell>
              <TableCell>
                <ProblemBadge type={solicitud.tipoProblema} />
              </TableCell>
              <TableCell>
                <StatusBadge status={solicitud.estado} />
              </TableCell>
              <TableCell className="text-center">
                <ActionsDropdown folio={solicitud.folio} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// ── Mobile Cards ──

function MobileCards({ data }: { data: MiSolicitud[] }) {
  return (
    <div className="md:hidden space-y-2">
      {data.map((solicitud) => (
        <div
          key={solicitud.folio}
          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50 cursor-pointer"
        >
          <div className="min-w-0 flex-1 space-y-2">
            {/* Top: Folio + Estado */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold text-muted-foreground">
                {solicitud.folio}
              </span>
              <StatusBadge status={solicitud.estado} />
            </div>

            {/* Name - larger font */}
            <p className="text-sm font-bold text-foreground leading-snug">
              {solicitud.nombre}
            </p>

            {/* Tipo de Problema + Fecha */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <ProblemBadge type={solicitud.tipoProblema} />
              <span className="text-xs text-muted-foreground">{solicitud.fecha}</span>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        </div>
      ))}
    </div>
  )
}

// ── Main Export ──

export function MisSolicituresContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const isMobile = useIsMobile()

  const filteredSolicitudes = misSolicitudes.filter(
    (s) =>
      s.folio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <ActionBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredSolicitudes.length} solicitud
        {filteredSolicitudes.length !== 1 ? 'es' : ''} encontrada
        {filteredSolicitudes.length !== 1 ? 's' : ''}
      </p>

      {/* Desktop table */}
      <DesktopTable data={filteredSolicitudes} />

      {/* Mobile cards */}
      <MobileCards data={filteredSolicitudes} />
    </div>
  )
}
