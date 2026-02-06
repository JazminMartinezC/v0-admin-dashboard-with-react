"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Pencil,
  MoreVertical,
  User,
  Shield,
  Laptop,
  History,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type UserRole = "Administrador" | "Técnico" | "Usuario"
type UserStatus = "Activo" | "Inactivo"

interface UserDetailData {
  id: string
  nombres: string
  apellido1: string
  apellido2: string
  correo: string
  telefono: string
  departamento: string
  rol: UserRole
  estado: UserStatus
  avatar?: string
}

interface TechnicianData {
  equiposResponsables: number
  solicitudesResueltas: number
  solicitudesPendientes: number
}

interface UserDeviceData {
  marca: string
  modelo: string
  inventario: string
}

interface AdminSecurityData {
  ultimoAcceso: string
  permisosGlobales: string[]
}

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
    <Badge variant="outline" className={cn("font-semibold", roleConfig[rol])}>
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

function ActionsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2">
          <Pencil className="h-4 w-4" />
          Editar Usuario
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
          Deshabilitar Cuenta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function UsuarioDetailContent({ userId }: { userId: string }) {
  const router = useRouter()

  // Sample data - in real app from API/database
  const user: UserDetailData = {
    id: userId,
    nombres: "Juan",
    apellido1: "Rodriguez",
    apellido2: "Martinez",
    correo: "juan.rodriguez@company.com",
    telefono: "+34 912 345 678",
    departamento: "Recursos Humanos",
    rol: "Administrador",
    estado: "Activo",
    avatar: "/placeholder-avatar.jpg",
  }

  // Role-specific data
  const techData: TechnicianData = {
    equiposResponsables: 12,
    solicitudesResueltas: 48,
    solicitudesPendientes: 3,
  }

  const userDevices: UserDeviceData[] = [
    {
      marca: "Dell",
      modelo: "OptiPlex 7090",
      inventario: "INV-2024-0001",
    },
    {
      marca: "HP",
      modelo: "LaserJet Pro M404n",
      inventario: "INV-2024-0042",
    },
  ]

  const adminSecurity: AdminSecurityData = {
    ultimoAcceso: "2024-12-20 09:30",
    permisosGlobales: [
      "Gestión de Usuarios",
      "Acceso a Reportes",
      "Configuración del Sistema",
      "Gestión de Inventarios",
    ],
  }

  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  const getInitials = (nombres: string, apellido1: string) => {
    return `${nombres[0]}${apellido1[0]}`.toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
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
          <div>
            <h1 className="text-xl font-bold text-foreground text-balance">
              Detalles del Usuario
            </h1>
          </div>
        </div>

        <ActionsDropdown />
      </div>

      <Separator />

      {/* Identity Card - Always visible */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            {/* Avatar */}
            <Avatar className="h-24 w-24 shrink-0">
              <AvatarImage src={user.avatar} alt={user.nombres} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {getInitials(user.nombres, user.apellido1)}
              </AvatarFallback>
            </Avatar>

            {/* Main info */}
            <div className="min-w-0 flex-1 space-y-4">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {user.nombres} {user.apellido1} {user.apellido2}
                </p>
                <p className="mt-1 text-sm text-muted-foreground break-all">
                  {user.correo}
                </p>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <RoleBadge rol={user.rol} />
                <StatusBadge estado={user.estado} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Data Grid */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            Datos Personales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Primer Apellido
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {user.apellido1}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Segundo Apellido
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {user.apellido2}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Teléfono
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {user.telefono}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Departamento
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {user.departamento}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic sections based on role */}

      {/* TECHNICIAN: Workload */}
      {user.rol === "Técnico" && (
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Laptop className="h-5 w-5 text-muted-foreground" />
              Carga de Trabajo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Equipos a su Cargo
                </p>
                <p className="mt-2 text-3xl font-bold text-primary">
                  {techData.equiposResponsables}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-emerald-50 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                    Resueltas
                  </p>
                </div>
                <p className="mt-2 text-3xl font-bold text-emerald-700">
                  {techData.solicitudesResueltas}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-amber-50 p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                    Pendientes
                  </p>
                </div>
                <p className="mt-2 text-3xl font-bold text-amber-700">
                  {techData.solicitudesPendientes}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* END USER: My Devices */}
      {user.rol === "Usuario" && (
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Laptop className="h-5 w-5 text-muted-foreground" />
              Mis Equipos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userDevices.map((device, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-muted/30 p-4"
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Marca
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {device.marca}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Modelo
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {device.modelo}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        No. Inventario
                      </p>
                      <p className="mt-1 text-sm font-mono font-bold text-primary">
                        {device.inventario}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ADMIN: Security */}
      {user.rol === "Administrador" && (
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              Seguridad y Permisos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Last Access */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-muted-foreground" />
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Último Acceso
                </p>
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                {adminSecurity.ultimoAcceso}
              </p>
            </div>

            {/* Permissions */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Permisos Globales Otorgados
              </p>
              <div className="space-y-2">
                {adminSecurity.permisosGlobales.map((permiso, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm font-medium text-foreground">
                      {permiso}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
