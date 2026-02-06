"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Filter,
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

// ── Sample data ──

type UserRole = "Administrador" | "Técnico" | "Usuario"
type UserStatus = "Activo" | "Inactivo"

interface User {
  id: string
  nombres: string
  apellido1: string
  apellido2: string
  correo: string
  rol: UserRole
  estado: UserStatus
}

const users: User[] = [
  {
    id: "USR-001",
    nombres: "Juan",
    apellido1: "Rodriguez",
    apellido2: "Martinez",
    correo: "juan.rodriguez@example.com",
    rol: "Administrador",
    estado: "Activo",
  },
  {
    id: "USR-002",
    nombres: "Maria",
    apellido1: "Garcia",
    apellido2: "Lopez",
    correo: "maria.garcia@example.com",
    rol: "Técnico",
    estado: "Activo",
  },
  {
    id: "USR-003",
    nombres: "Carlos",
    apellido1: "Martinez",
    apellido2: "Hernandez",
    correo: "carlos.martinez@example.com",
    rol: "Usuario",
    estado: "Activo",
  },
  {
    id: "USR-004",
    nombres: "Ana",
    apellido1: "Torres",
    apellido2: "Ruiz",
    correo: "ana.torres@example.com",
    rol: "Técnico",
    estado: "Inactivo",
  },
  {
    id: "USR-005",
    nombres: "Luis",
    apellido1: "Hernandez",
    apellido2: "Gonzalez",
    correo: "luis.hernandez@example.com",
    rol: "Usuario",
    estado: "Activo",
  },
  {
    id: "USR-006",
    nombres: "Patricia",
    apellido1: "Gomez",
    apellido2: "Silva",
    correo: "patricia.gomez@example.com",
    rol: "Administrador",
    estado: "Activo",
  },
  {
    id: "USR-007",
    nombres: "Fernando",
    apellido1: "Diaz",
    apellido2: "Mora",
    correo: "fernando.diaz@example.com",
    rol: "Técnico",
    estado: "Inactivo",
  },
]

// ── Badge helpers ──

const roleConfig: Record<UserRole, string> = {
  Administrador: "bg-purple-100 text-purple-700 border-purple-200",
  Técnico: "bg-blue-100 text-blue-700 border-blue-200",
  Usuario: "bg-slate-100 text-slate-700 border-slate-200",
}

const statusConfig: Record<UserStatus, string> = {
  Activo: "bg-emerald-100 text-emerald-700 border-emerald-200 rounded-full",
  Inactivo: "bg-zinc-100 text-zinc-600 border-zinc-200 rounded-full",
}

function RoleBadge({ rol }: { rol: UserRole }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-semibold", roleConfig[rol])}
    >
      {rol}
    </Badge>
  )
}

function StatusBadge({ estado }: { estado: UserStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-semibold", statusConfig[estado])}
    >
      {estado}
    </Badge>
  )
}

// ── Action Bar ──

function ActionBar({
  searchQuery,
  onSearchChange,
  onNewUser,
}: {
  searchQuery: string
  onSearchChange: (value: string) => void
  onNewUser: () => void
}) {
  return (
    <div className="space-y-4">
      {/* Search + New button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, correo..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <Button
          onClick={onNewUser}
          className="shrink-0 rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Usuario
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
          <SelectTrigger className="h-9 w-auto min-w-[110px] bg-background text-sm">
            <SelectValue placeholder="Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="tecnico">Técnico</SelectItem>
            <SelectItem value="usuario">Usuario</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[100px] bg-background text-sm">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="inactivo">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// ── Actions dropdown ──

function ActionsDropdown({ userId }: { userId: string }) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label={`Acciones para ${userId}`}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => router.push(`/usuarios/${userId}`)}
        >
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

function DesktopTable({ data }: { data: User[] }) {
  return (
    <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead className="w-[120px]">Rol</TableHead>
            <TableHead className="w-[100px]">Estado</TableHead>
            <TableHead className="w-[70px] text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-bold text-foreground">
                {user.nombres} {user.apellido1} {user.apellido2}
              </TableCell>
              <TableCell className="text-muted-foreground">{user.correo}</TableCell>
              <TableCell>
                <RoleBadge rol={user.rol} />
              </TableCell>
              <TableCell>
                <StatusBadge estado={user.estado} />
              </TableCell>
              <TableCell className="text-center">
                <ActionsDropdown userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// ── Mobile Cards ──

function MobileCards({ data }: { data: User[] }) {
  return (
    <div className="md:hidden space-y-2">
      {data.map((user) => (
        <div
          key={user.id}
          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
        >
          <div className="min-w-0 flex-1 space-y-2">
            {/* Name */}
            <p className="text-sm font-bold text-foreground">
              {user.nombres} {user.apellido1} {user.apellido2}
            </p>

            {/* Email */}
            <p className="truncate text-xs text-muted-foreground">
              {user.correo}
            </p>

            {/* Role and Status */}
            <div className="flex items-center gap-2 pt-0.5">
              <RoleBadge rol={user.rol} />
              <StatusBadge estado={user.estado} />
            </div>
          </div>

          <ActionsDropdown userId={user.id} />
        </div>
      ))}
    </div>
  )
}

// ── Main Export ──

export function UsuariosContent({ onNewUser }: { onNewUser?: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(
    (u) =>
      u.nombres.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.apellido1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.apellido2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.correo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <ActionBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewUser={onNewUser || (() => {})}
      />

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredUsers.length} usuario{filteredUsers.length !== 1 ? "s" : ""}{" "}
        encontrado{filteredUsers.length !== 1 ? "s" : ""}
      </p>

      {/* Desktop table */}
      <DesktopTable data={filteredUsers} />

      {/* Mobile cards */}
      <MobileCards data={filteredUsers} />
    </div>
  )
}
