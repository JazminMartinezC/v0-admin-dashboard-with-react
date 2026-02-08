"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  UserMinus,
  UserPlus,
  Users,
  Mail,
  Building2,
  ShieldCheck,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// ── Types ──

type TipoUsuario = "Jefe de Departamento" | "Tecnico" | "Coordinador"
type EstadoUsuario = "Activo" | "Inactivo" | "Baja"

interface Usuario {
  id: string
  nombres: string
  primerApellido: string
  segundoApellido: string
  correo: string
  departamento: string
  tipoUsuario: TipoUsuario
  estado: EstadoUsuario
  fechaRegistro: string
}

// ── Sample data ──

const usuarios: Usuario[] = [
  {
    id: "USR-001",
    nombres: "Maria",
    primerApellido: "Garcia",
    segundoApellido: "Lopez",
    correo: "maria.garcia@empresa.com",
    departamento: "Recursos Humanos",
    tipoUsuario: "Jefe de Departamento",
    estado: "Activo",
    fechaRegistro: "2024-01-15",
  },
  {
    id: "USR-002",
    nombres: "Carlos",
    primerApellido: "Martinez",
    segundoApellido: "Ruiz",
    correo: "carlos.martinez@empresa.com",
    departamento: "Sistemas",
    tipoUsuario: "Tecnico",
    estado: "Activo",
    fechaRegistro: "2024-02-20",
  },
  {
    id: "USR-003",
    nombres: "Ana",
    primerApellido: "Torres",
    segundoApellido: "Ruiz",
    correo: "ana.torres@empresa.com",
    departamento: "Sistemas",
    tipoUsuario: "Coordinador",
    estado: "Activo",
    fechaRegistro: "2024-03-10",
  },
  {
    id: "USR-004",
    nombres: "Luis",
    primerApellido: "Hernandez",
    segundoApellido: "Diaz",
    correo: "luis.hernandez@empresa.com",
    departamento: "Contabilidad",
    tipoUsuario: "Tecnico",
    estado: "Inactivo",
    fechaRegistro: "2024-04-05",
  },
  {
    id: "USR-005",
    nombres: "Patricia",
    primerApellido: "Gomez",
    segundoApellido: "Sanchez",
    correo: "patricia.gomez@empresa.com",
    departamento: "Ventas",
    tipoUsuario: "Jefe de Departamento",
    estado: "Activo",
    fechaRegistro: "2024-05-12",
  },
  {
    id: "USR-006",
    nombres: "Fernando",
    primerApellido: "Diaz",
    segundoApellido: "Mora",
    correo: "fernando.diaz@empresa.com",
    departamento: "Marketing",
    tipoUsuario: "Coordinador",
    estado: "Baja",
    fechaRegistro: "2024-06-18",
  },
  {
    id: "USR-007",
    nombres: "Sofia",
    primerApellido: "Ramirez",
    segundoApellido: "Perez",
    correo: "sofia.ramirez@empresa.com",
    departamento: "Recursos Humanos",
    tipoUsuario: "Tecnico",
    estado: "Activo",
    fechaRegistro: "2024-07-22",
  },
  {
    id: "USR-008",
    nombres: "Roberto",
    primerApellido: "Sanchez",
    segundoApellido: "Villa",
    correo: "roberto.sanchez@empresa.com",
    departamento: "Direccion",
    tipoUsuario: "Jefe de Departamento",
    estado: "Activo",
    fechaRegistro: "2024-08-01",
  },
  {
    id: "USR-009",
    nombres: "Elena",
    primerApellido: "Castillo",
    segundoApellido: "Reyes",
    correo: "elena.castillo@empresa.com",
    departamento: "Sistemas",
    tipoUsuario: "Tecnico",
    estado: "Activo",
    fechaRegistro: "2024-09-14",
  },
  {
    id: "USR-010",
    nombres: "Miguel",
    primerApellido: "Flores",
    segundoApellido: "Ortega",
    correo: "miguel.flores@empresa.com",
    departamento: "Contabilidad",
    tipoUsuario: "Coordinador",
    estado: "Inactivo",
    fechaRegistro: "2024-10-03",
  },
]

// ── Badge helpers ──

const tipoUsuarioConfig: Record<TipoUsuario, string> = {
  "Jefe de Departamento": "bg-indigo-100 text-indigo-700 border-indigo-200",
  Tecnico: "bg-sky-100 text-sky-700 border-sky-200",
  Coordinador: "bg-amber-100 text-amber-700 border-amber-200",
}

const estadoUsuarioConfig: Record<EstadoUsuario, string> = {
  Activo: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Inactivo: "bg-zinc-100 text-zinc-600 border-zinc-200",
  Baja: "bg-red-100 text-red-700 border-red-200",
}

function TipoUsuarioBadge({ tipo }: { tipo: TipoUsuario }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-semibold", tipoUsuarioConfig[tipo])}
    >
      {tipo}
    </Badge>
  )
}

function EstadoUsuarioBadge({ estado }: { estado: EstadoUsuario }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-semibold", estadoUsuarioConfig[estado])}
    >
      {estado}
    </Badge>
  )
}

function getInitials(nombres: string, apellido: string) {
  return `${nombres.charAt(0)}${apellido.charAt(0)}`.toUpperCase()
}

function getFullName(user: Usuario) {
  return `${user.nombres} ${user.primerApellido} ${user.segundoApellido}`
}

// ── Action Bar ──

function ActionBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  tipoFilter,
  onTipoFilterChange,
  deptoFilter,
  onDeptoFilterChange,
}: {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  tipoFilter: string
  onTipoFilterChange: (value: string) => void
  deptoFilter: string
  onDeptoFilterChange: (value: string) => void
}) {
  return (
    <div className="space-y-4">
      {/* Search + Add user button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar usuarios..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <Button
          asChild
          className="shrink-0 rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Link href="/usuarios/registrar">
            <UserPlus className="mr-2 h-4 w-4" />
            Agregar Usuario
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtrado por:</span>
          <span className="sm:hidden">Filtros:</span>
        </div>

        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="h-9 w-auto min-w-[100px] bg-background text-sm">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="inactivo">Inactivo</SelectItem>
            <SelectItem value="baja">Baja</SelectItem>
          </SelectContent>
        </Select>

        <Select value={tipoFilter} onValueChange={onTipoFilterChange}>
          <SelectTrigger className="h-9 w-auto min-w-[130px] bg-background text-sm">
            <SelectValue placeholder="Tipo de Usuario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="jefe">Jefe de Departamento</SelectItem>
            <SelectItem value="tecnico">Tecnico</SelectItem>
            <SelectItem value="coordinador">Coordinador</SelectItem>
          </SelectContent>
        </Select>

        <Select value={deptoFilter} onValueChange={onDeptoFilterChange}>
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
      </div>
    </div>
  )
}

// ── Actions dropdown ──

function ActionsDropdown({ usuario }: { usuario: Usuario }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label={`Acciones para ${getFullName(usuario)}`}
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
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-amber-600 focus:text-amber-600">
          <UserMinus className="h-4 w-4" />
          Dar de Baja
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

function DesktopTable({ data }: { data: Usuario[] }) {
  return (
    <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[90px]">ID</TableHead>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Correo Electronico</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead className="w-[180px]">Tipo de Usuario</TableHead>
            <TableHead className="w-[100px]">Estado</TableHead>
            <TableHead className="w-[70px] text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                {usuario.id}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {getInitials(usuario.nombres, usuario.primerApellido)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {getFullName(usuario)}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {usuario.correo}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {usuario.departamento}
              </TableCell>
              <TableCell>
                <TipoUsuarioBadge tipo={usuario.tipoUsuario} />
              </TableCell>
              <TableCell>
                <EstadoUsuarioBadge estado={usuario.estado} />
              </TableCell>
              <TableCell className="text-center">
                <ActionsDropdown usuario={usuario} />
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-muted-foreground"
              >
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm font-medium">
                    No se encontraron usuarios
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Intenta ajustar los filtros de busqueda
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// ── Mobile Cards ──

function MobileCards({ data }: { data: Usuario[] }) {
  return (
    <div className="md:hidden space-y-2">
      {data.map((usuario) => (
        <div
          key={usuario.id}
          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
        >
          <Avatar className="mt-0.5 h-10 w-10 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {getInitials(usuario.nombres, usuario.primerApellido)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 space-y-1.5">
            {/* Top: ID + Type */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold text-muted-foreground">
                {usuario.id}
              </span>
              <TipoUsuarioBadge tipo={usuario.tipoUsuario} />
            </div>

            {/* Name */}
            <p className="truncate text-sm font-bold text-foreground">
              {getFullName(usuario)}
            </p>

            {/* Email */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3 w-3 shrink-0" />
              <span className="truncate">{usuario.correo}</span>
            </div>

            {/* Department + Date */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3 shrink-0" />
                <span className="truncate">{usuario.departamento}</span>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {usuario.fechaRegistro}
              </span>
            </div>

            {/* Status */}
            <div className="pt-0.5">
              <EstadoUsuarioBadge estado={usuario.estado} />
            </div>
          </div>

          <ActionsDropdown usuario={usuario} />
        </div>
      ))}

      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
          <Users className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            No se encontraron usuarios
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Intenta ajustar los filtros de busqueda
          </p>
        </div>
      )}
    </div>
  )
}

// ── Main Export ──

export function UsuariosContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [deptoFilter, setDeptoFilter] = useState("todos")

  const filteredUsuarios = usuarios.filter((u) => {
    // Search filter
    const fullName = getFullName(u).toLowerCase()
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      fullName.includes(query) ||
      u.correo.toLowerCase().includes(query) ||
      u.departamento.toLowerCase().includes(query) ||
      u.id.toLowerCase().includes(query)

    // Status filter
    const matchesStatus =
      statusFilter === "todos" ||
      u.estado.toLowerCase() === statusFilter.toLowerCase()

    // Tipo filter
    const matchesTipo =
      tipoFilter === "todos" ||
      (tipoFilter === "jefe" && u.tipoUsuario === "Jefe de Departamento") ||
      (tipoFilter === "tecnico" && u.tipoUsuario === "Tecnico") ||
      (tipoFilter === "coordinador" && u.tipoUsuario === "Coordinador")

    // Department filter
    const deptoMap: Record<string, string> = {
      rh: "Recursos Humanos",
      contabilidad: "Contabilidad",
      sistemas: "Sistemas",
      direccion: "Direccion",
      ventas: "Ventas",
      marketing: "Marketing",
    }
    const matchesDepto =
      deptoFilter === "todos" || u.departamento === deptoMap[deptoFilter]

    return matchesSearch && matchesStatus && matchesTipo && matchesDepto
  })

  const activosCount = filteredUsuarios.filter(
    (u) => u.estado === "Activo"
  ).length
  const inactivosCount = filteredUsuarios.filter(
    (u) => u.estado === "Inactivo"
  ).length
  const bajasCount = filteredUsuarios.filter(
    (u) => u.estado === "Baja"
  ).length

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">
            Gestion de Usuarios
          </h1>
          <p className="text-xs text-muted-foreground">
            Administra los usuarios del sistema
          </p>
        </div>
      </div>

      <ActionBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        tipoFilter={tipoFilter}
        onTipoFilterChange={setTipoFilter}
        deptoFilter={deptoFilter}
        onDeptoFilterChange={setDeptoFilter}
      />

      {/* Results count + summary badges */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-muted-foreground">
          {filteredUsuarios.length} usuario
          {filteredUsuarios.length !== 1 ? "s" : ""} encontrado
          {filteredUsuarios.length !== 1 ? "s" : ""}
        </p>
        {activosCount > 0 && (
          <Badge
            variant="outline"
            className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-600 font-semibold"
          >
            <ShieldCheck className="h-3 w-3" />
            {activosCount} activo{activosCount !== 1 ? "s" : ""}
          </Badge>
        )}
        {inactivosCount > 0 && (
          <Badge
            variant="outline"
            className="gap-1 border-zinc-200 bg-zinc-50 text-zinc-600 font-semibold"
          >
            {inactivosCount} inactivo{inactivosCount !== 1 ? "s" : ""}
          </Badge>
        )}
        {bajasCount > 0 && (
          <Badge
            variant="outline"
            className="gap-1 border-red-200 bg-red-50 text-red-600 font-semibold"
          >
            {bajasCount} baja{bajasCount !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {/* Desktop table */}
      <DesktopTable data={filteredUsuarios} />

      {/* Mobile cards */}
      <MobileCards data={filteredUsuarios} />
    </div>
  )
}
