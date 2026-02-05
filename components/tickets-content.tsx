"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal, ChevronRight } from "lucide-react"
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
  equipo: string
  prioridad: Priority
  estado: Status
}

const tickets: Ticket[] = [
  {
    folio: "SOL-2024-001",
    fecha: "2024-12-15",
    nombre: "Maria Garcia Lopez",
    departamento: "Recursos Humanos",
    equipo: "INV-4521",
    prioridad: "Alta",
    estado: "Abierto",
  },
  {
    folio: "SOL-2024-002",
    fecha: "2024-12-14",
    nombre: "Carlos Martinez",
    departamento: "Contabilidad",
    equipo: "INV-3312",
    prioridad: "Media",
    estado: "En Progreso",
  },
  {
    folio: "SOL-2024-003",
    fecha: "2024-12-14",
    nombre: "Ana Torres Ruiz",
    departamento: "Sistemas",
    equipo: "INV-1187",
    prioridad: "Critica",
    estado: "Abierto",
  },
  {
    folio: "SOL-2024-004",
    fecha: "2024-12-13",
    nombre: "Luis Hernandez",
    departamento: "Direccion",
    equipo: "INV-8834",
    prioridad: "Baja",
    estado: "Resuelto",
  },
  {
    folio: "SOL-2024-005",
    fecha: "2024-12-12",
    nombre: "Patricia Gomez",
    departamento: "Ventas",
    equipo: "INV-2209",
    prioridad: "Media",
    estado: "Cerrado",
  },
  {
    folio: "SOL-2024-006",
    fecha: "2024-12-11",
    nombre: "Fernando Diaz Mora",
    departamento: "Marketing",
    equipo: "INV-5567",
    prioridad: "Alta",
    estado: "En Progreso",
  },
  {
    folio: "SOL-2024-007",
    fecha: "2024-12-10",
    nombre: "Sofia Ramirez",
    departamento: "Recursos Humanos",
    equipo: "INV-9901",
    prioridad: "Baja",
    estado: "Resuelto",
  },
  {
    folio: "SOL-2024-008",
    fecha: "2024-12-09",
    nombre: "Roberto Sanchez",
    departamento: "Contabilidad",
    equipo: "INV-7743",
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
      className={cn("font-medium", priorityConfig[priority])}
    >
      {priority}
    </Badge>
  )
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", statusConfig[status])}
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
        <Button className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select>
          <SelectTrigger className="w-[160px] bg-background">
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
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Departamento" />
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
          <SelectTrigger className="w-[160px] bg-background">
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

// ── Desktop Table ──

function DesktopTable({ data }: { data: Ticket[] }) {
  return (
    <div className="hidden md:block rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[130px]">Folio</TableHead>
            <TableHead className="w-[100px]">Fecha</TableHead>
            <TableHead>Nombre Afectado</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Equipo (No. Inv.)</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-[60px]">
              <span className="sr-only">Acciones</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ticket) => (
            <TableRow key={ticket.folio}>
              <TableCell className="font-medium text-foreground">
                {ticket.folio}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {ticket.fecha}
              </TableCell>
              <TableCell className="text-foreground">{ticket.nombre}</TableCell>
              <TableCell className="text-muted-foreground">
                {ticket.departamento}
              </TableCell>
              <TableCell className="text-muted-foreground font-mono text-xs">
                {ticket.equipo}
              </TableCell>
              <TableCell>
                <PriorityBadge priority={ticket.prioridad} />
              </TableCell>
              <TableCell>
                <StatusBadge status={ticket.estado} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      aria-label={`Acciones para ${ticket.folio}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver Detalle</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Asignar</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// ── Mobile Cards (Gmail-style) ──

function MobileCards({ data }: { data: Ticket[] }) {
  return (
    <div className="md:hidden space-y-2">
      {data.map((ticket) => (
        <div
          key={ticket.folio}
          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
        >
          <Checkbox
            className="mt-1 shrink-0"
            aria-label={`Seleccionar ${ticket.folio}`}
          />

          <div className="flex-1 min-w-0 space-y-1.5">
            {/* Top: folio + priority */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-medium text-muted-foreground">
                {ticket.folio}
              </span>
              <PriorityBadge priority={ticket.prioridad} />
            </div>

            {/* Name */}
            <p className="text-sm font-semibold text-foreground truncate">
              {ticket.nombre}
            </p>

            {/* Department + Date */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground truncate">
                {ticket.departamento}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">
                {ticket.fecha}
              </span>
            </div>

            {/* Status */}
            <div className="pt-0.5">
              <StatusBadge status={ticket.estado} />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                aria-label={`Acciones para ${ticket.folio}`}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver Detalle</DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Asignar</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        {filteredTickets.length} solicitud{filteredTickets.length !== 1 ? "es" : ""} encontrada{filteredTickets.length !== 1 ? "s" : ""}
      </p>

      {/* Desktop table */}
      <DesktopTable data={filteredTickets} />

      {/* Mobile cards */}
      <MobileCards data={filteredTickets} />
    </div>
  )
}
