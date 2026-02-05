"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  UserPlus,
  Trash2,
  Filter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

// ── Sample data ──

type Priority = "Alta" | "Media" | "Baja" | "Critica"
type Status = "Abierto" | "En Progreso" | "Resuelto" | "Cerrado"

interface Ticket {
  folio: string
  fecha: string
  nombre: string
  departamento: string
  prioridad: Priority
  estado: Status
}

const tickets: Ticket[] = [
  {
    folio: "SOL-2024-001",
    fecha: "2024-12-15",
    nombre: "Maria Garcia Lopez",
    departamento: "Recursos Humanos",
    prioridad: "Alta",
    estado: "Abierto",
  },
  {
    folio: "SOL-2024-002",
    fecha: "2024-12-14",
    nombre: "Carlos Martinez",
    departamento: "Contabilidad",
    prioridad: "Media",
    estado: "En Progreso",
  },
  {
    folio: "SOL-2024-003",
    fecha: "2024-12-14",
    nombre: "Ana Torres Ruiz",
    departamento: "Sistemas",
    prioridad: "Critica",
    estado: "Abierto",
  },
  {
    folio: "SOL-2024-004",
    fecha: "2024-12-13",
    nombre: "Luis Hernandez",
    departamento: "Direccion",
    prioridad: "Baja",
    estado: "Resuelto",
  },
  {
    folio: "SOL-2024-005",
    fecha: "2024-12-12",
    nombre: "Patricia Gomez",
    departamento: "Ventas",
    prioridad: "Media",
    estado: "Cerrado",
  },
  {
    folio: "SOL-2024-006",
    fecha: "2024-12-11",
    nombre: "Fernando Diaz Mora",
    departamento: "Marketing",
    prioridad: "Alta",
    estado: "En Progreso",
  },
  {
    folio: "SOL-2024-007",
    fecha: "2024-12-10",
    nombre: "Sofia Ramirez",
    departamento: "Recursos Humanos",
    prioridad: "Baja",
    estado: "Resuelto",
  },
  {
    folio: "SOL-2024-008",
    fecha: "2024-12-09",
    nombre: "Roberto Sanchez",
    departamento: "Contabilidad",
    prioridad: "Critica",
    estado: "Abierto",
  },
]

// ── Badge helpers ──

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
      className={cn("font-semibold", priorityConfig[priority])}
    >
      {priority}
    </Badge>
  )
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-semibold", statusConfig[status])}
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
            placeholder="Buscar solicitudes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <Button className="shrink-0 rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Filters with "Filtrado por:" label -- all in one line on mobile */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtrado por:</span>
          <span className="sm:hidden">Filtros:</span>
        </div>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[100px] bg-background text-sm">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="abierto">Abierto</SelectItem>
            <SelectItem value="en-progreso">En Progreso</SelectItem>
            <SelectItem value="resuelto">Resuelto</SelectItem>
            <SelectItem value="cerrado">Cerrado</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[110px] bg-background text-sm">
            <SelectValue placeholder="Depto." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="rh">Recursos Humanos</SelectItem>
            <SelectItem value="contabilidad">Contabilidad</SelectItem>
            <SelectItem value="sistemas">Sistemas</SelectItem>
            <SelectItem value="direccion">Direccion</SelectItem>
            <SelectItem value="ventas">Ventas</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[110px] bg-background text-sm">
            <SelectValue placeholder="Prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="critica">Critica</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
            <SelectItem value="media">Media</SelectItem>
            <SelectItem value="baja">Baja</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// ── Actions dropdown with icons ──

function ActionsDropdown({ folio }: { folio: string }) {
  const router = useRouter()

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
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => router.push(`/solicitudes/${folio}`)}
        >
          <Eye className="h-4 w-4" />
          Ver Detalle
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Pencil className="h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <UserPlus className="h-4 w-4" />
          Asignar
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

function DesktopTable({ data }: { data: Ticket[] }) {
  return (
    <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[140px]">Folio</TableHead>
            <TableHead className="w-[110px]">Fecha</TableHead>
            <TableHead>Nombre del Afectado</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead className="w-[100px]">Prioridad</TableHead>
            <TableHead className="w-[120px]">Estado</TableHead>
            <TableHead className="w-[70px] text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ticket) => (
            <TableRow key={ticket.folio}>
              <TableCell className="font-semibold text-foreground">
                {ticket.folio}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {ticket.fecha}
              </TableCell>
              <TableCell className="text-foreground">{ticket.nombre}</TableCell>
              <TableCell className="text-muted-foreground">
                {ticket.departamento}
              </TableCell>
              <TableCell>
                <PriorityBadge priority={ticket.prioridad} />
              </TableCell>
              <TableCell>
                <StatusBadge status={ticket.estado} />
              </TableCell>
              <TableCell className="text-center">
                <ActionsDropdown folio={ticket.folio} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// ── Mobile Cards ──

function MobileCards({ data }: { data: Ticket[] }) {
  return (
    <div className="md:hidden space-y-2">
      {data.map((ticket) => (
        <div
          key={ticket.folio}
          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
        >
          <Checkbox
            className="mt-1 shrink-0"
            aria-label={`Seleccionar ${ticket.folio}`}
          />

          <div className="min-w-0 flex-1 space-y-1.5">
            {/* Top: folio + priority */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold text-muted-foreground">
                {ticket.folio}
              </span>
              <PriorityBadge priority={ticket.prioridad} />
            </div>

            {/* Name */}
            <p className="truncate text-sm font-bold text-foreground">
              {ticket.nombre}
            </p>

            {/* Department + Date */}
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-xs text-muted-foreground">
                {ticket.departamento}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {ticket.fecha}
              </span>
            </div>

            {/* Status */}
            <div className="pt-0.5">
              <StatusBadge status={ticket.estado} />
            </div>
          </div>

          <ActionsDropdown folio={ticket.folio} />
        </div>
      ))}
    </div>
  )
}

// ── Main Export ──

export function TicketsContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTickets = tickets.filter(
    (t) =>
      t.folio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.departamento.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <ActionBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredTickets.length} solicitud
        {filteredTickets.length !== 1 ? "es" : ""} encontrada
        {filteredTickets.length !== 1 ? "s" : ""}
      </p>

      {/* Desktop table */}
      <DesktopTable data={filteredTickets} />

      {/* Mobile cards */}
      <MobileCards data={filteredTickets} />
    </div>
  )
}
