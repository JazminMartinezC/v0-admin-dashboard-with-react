"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Mail,
  User,
  ShieldCheck,
  ToggleLeft,
  Building2,
  Clock,
  Phone,
  MapPin,
  FileText,
  Edit,
  Trash2,
  UserMinus,
  Save,
  X,
  Camera,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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
  telefono?: string
  direccion?: string
  rol?: string
}

// ── Sample data ──

const usuariosData: Record<string, Usuario> = {
  "USR-001": {
    id: "USR-001",
    nombres: "Maria",
    primerApellido: "Garcia",
    segundoApellido: "Lopez",
    correo: "maria.garcia@empresa.com",
    departamento: "Recursos Humanos",
    tipoUsuario: "Jefe de Departamento",
    estado: "Activo",
    fechaRegistro: "2024-01-15",
    telefono: "+34 912 345 678",
    direccion: "Calle Principal 123, Madrid",
    rol: "administrador",
  },
  "USR-002": {
    id: "USR-002",
    nombres: "Carlos",
    primerApellido: "Martinez",
    segundoApellido: "Ruiz",
    correo: "carlos.martinez@empresa.com",
    departamento: "Sistemas",
    tipoUsuario: "Tecnico",
    estado: "Activo",
    fechaRegistro: "2024-02-20",
    telefono: "+34 923 456 789",
    direccion: "Avenida Tecnologia 456, Barcelona",
    rol: "usuario",
  },
  "USR-003": {
    id: "USR-003",
    nombres: "Ana",
    primerApellido: "Torres",
    segundoApellido: "Ruiz",
    correo: "ana.torres@empresa.com",
    departamento: "Sistemas",
    tipoUsuario: "Coordinador",
    estado: "Activo",
    fechaRegistro: "2024-03-10",
    telefono: "+34 934 567 890",
    direccion: "Plaza Centro 789, Barcelona",
    rol: "editor",
  },
}

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

// ── Dialogs ──

function DeleteUserDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar eliminacion</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar a{" "}
            <span className="font-semibold text-foreground">{userName}</span>?
            Esta accion no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// ── Main Export ──

export function UserDetailsContent({ userId }: { userId: string }) {
  console.log("[v0] UserDetailsContent - userId recibido:", userId)
  console.log("[v0] usuariosData keys:", Object.keys(usuariosData))

  const usuario = usuariosData[userId]
  console.log("[v0] usuario encontrado:", usuario)

  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editForm, setEditForm] = useState<Usuario | null>(usuario || null)

  if (!usuario) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
        <User className="h-10 w-10 text-muted-foreground/40" />
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          Usuario no encontrado (ID: {userId})
        </p>
        <Button
          variant="ghost"
          className="mt-4 gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </div>
    )
  }

  if (!editForm) {
    return null
  }

  const handleEditChange = (field: keyof Usuario, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveChanges = () => {
    setIsEditing(false)
    // Aqui iria la logica para guardar los cambios en el backend
  }

  const handleDelete = () => {
    setShowDeleteDialog(false)
    // Aqui iria la logica para eliminar el usuario
    window.history.back()
  }

  const handleDeactivate = () => {
    // Aqui iria la logica para dar de baja al usuario
    setEditForm((prev) => ({
      ...prev,
      estado: prev.estado === "Activo" ? "Baja" : "Activo",
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header con botones de accion */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
            aria-label="Volver"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">
              Detalles del Usuario
            </h1>
            <p className="text-xs text-muted-foreground">
              Informacion completa y opciones de gestion
            </p>
          </div>
        </div>

        {/* Action buttons - Responsive */}
        <div className="flex flex-wrap gap-2">
          {!isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs bg-transparent"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Editar</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs text-amber-600 hover:text-amber-600 bg-transparent border-amber-200 hover:bg-amber-50"
                onClick={handleDeactivate}
              >
                <UserMinus className="h-4 w-4" />
                <span className="hidden sm:inline">Dar de Baja</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs text-destructive hover:text-destructive bg-transparent border-destructive/20 hover:bg-red-50"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Eliminar</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs bg-transparent"
                onClick={() => {
                  setEditForm(usuario)
                  setIsEditing(false)
                }}
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Cancelar</span>
              </Button>
              <Button
                size="sm"
                className="gap-2 text-xs bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                onClick={handleSaveChanges}
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Guardar</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Profile Card with Avatar and Basic Info */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          {/* Avatar section */}
          <div className="flex shrink-0 flex-col items-center gap-3">
            <div className="relative">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                  {getInitials(usuario.nombres, usuario.primerApellido)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-foreground line-clamp-2">
                {getFullName(editForm)}
              </p>
              <p className="text-xs text-muted-foreground">{editForm.id}</p>
            </div>
          </div>

          {/* Info section */}
          <div className="flex-1 w-full space-y-4">
            {/* Row 1: Email + Phone */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex gap-3 sm:gap-2">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Correo</p>
                  {isEditing ? (
                    <Input
                      value={editForm.correo}
                      onChange={(e) =>
                        handleEditChange("correo", e.target.value)
                      }
                      className="h-7 text-xs bg-background"
                    />
                  ) : (
                    <p className="truncate text-sm font-semibold text-foreground">
                      {editForm.correo}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 sm:gap-2">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Telefono</p>
                  {isEditing ? (
                    <Input
                      value={editForm.telefono || ""}
                      onChange={(e) =>
                        handleEditChange("telefono", e.target.value)
                      }
                      className="h-7 text-xs bg-background"
                    />
                  ) : (
                    <p className="truncate text-sm font-semibold text-foreground">
                      {editForm.telefono || "No asignado"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Row 2: Department + User Type */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex gap-3 sm:gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Departamento</p>
                  {isEditing ? (
                    <Input
                      value={editForm.departamento}
                      onChange={(e) =>
                        handleEditChange("departamento", e.target.value)
                      }
                      className="h-7 text-xs bg-background"
                    />
                  ) : (
                    <p className="truncate text-sm font-semibold text-foreground">
                      {editForm.departamento}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 sm:gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Tipo</p>
                  <div className="pt-0.5">
                    <TipoUsuarioBadge tipo={editForm.tipoUsuario} />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Status + Registration date */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex gap-3 sm:gap-2">
                <ToggleLeft className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Estado</p>
                  <div className="pt-0.5">
                    {isEditing ? (
                      <Select
                        value={editForm.estado}
                        onValueChange={(v) =>
                          handleEditChange(
                            "estado",
                            v as EstadoUsuario
                          )
                        }
                      >
                        <SelectTrigger className="h-7 text-xs bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Activo">Activo</SelectItem>
                          <SelectItem value="Inactivo">Inactivo</SelectItem>
                          <SelectItem value="Baja">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <EstadoUsuarioBadge estado={editForm.estado} />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-2">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Fecha Registro</p>
                  <p className="text-sm font-semibold text-foreground">
                    {editForm.fechaRegistro}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-foreground">
              Informacion Personal
            </h2>
            <p className="text-xs text-muted-foreground">
              Datos personales del usuario
            </p>
          </div>
        </div>

        <Separator className="mb-5" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Nombres */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">
              Nombres
            </Label>
            {isEditing ? (
              <Input
                value={editForm.nombres}
                onChange={(e) => handleEditChange("nombres", e.target.value)}
                className="h-8 text-sm bg-background"
              />
            ) : (
              <p className="text-sm font-semibold text-foreground">
                {editForm.nombres}
              </p>
            )}
          </div>

          {/* Primer Apellido */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">
              Primer Apellido
            </Label>
            {isEditing ? (
              <Input
                value={editForm.primerApellido}
                onChange={(e) =>
                  handleEditChange("primerApellido", e.target.value)
                }
                className="h-8 text-sm bg-background"
              />
            ) : (
              <p className="text-sm font-semibold text-foreground">
                {editForm.primerApellido}
              </p>
            )}
          </div>

          {/* Segundo Apellido */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">
              Segundo Apellido
            </Label>
            {isEditing ? (
              <Input
                value={editForm.segundoApellido}
                onChange={(e) =>
                  handleEditChange("segundoApellido", e.target.value)
                }
                className="h-8 text-sm bg-background"
              />
            ) : (
              <p className="text-sm font-semibold text-foreground">
                {editForm.segundoApellido}
              </p>
            )}
          </div>

          {/* Direccion */}
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
            <Label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              Direccion
            </Label>
            {isEditing ? (
              <Input
                value={editForm.direccion || ""}
                onChange={(e) => handleEditChange("direccion", e.target.value)}
                className="h-8 text-sm bg-background"
              />
            ) : (
              <p className="text-sm font-semibold text-foreground">
                {editForm.direccion || "No asignada"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Account Information Card */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <ShieldCheck className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-foreground">
              Informacion de la Cuenta
            </h2>
            <p className="text-xs text-muted-foreground">
              Configuracion y permisos
            </p>
          </div>
        </div>

        <Separator className="mb-5" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Rol */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              Rol
            </Label>
            {isEditing ? (
              <Select
                value={editForm.rol || ""}
                onValueChange={(v) => handleEditChange("rol", v)}
              >
                <SelectTrigger className="h-8 text-sm bg-background">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="usuario">Usuario</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm font-semibold text-foreground capitalize">
                {editForm.rol || "No asignado"}
              </p>
            )}
          </div>

          {/* Estado */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <ToggleLeft className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              Estado de Cuenta
            </Label>
            {isEditing ? (
              <Select
                value={editForm.estado}
                onValueChange={(v) =>
                  handleEditChange("estado", v as EstadoUsuario)
                }
              >
                <SelectTrigger className="h-8 text-sm bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                  <SelectItem value="Baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div>
                <EstadoUsuarioBadge estado={editForm.estado} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity Log Card */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-foreground">
              Informacion Adicional
            </h2>
            <p className="text-xs text-muted-foreground">
              Detalles del registro
            </p>
          </div>
        </div>

        <Separator className="mb-5" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Fecha de Registro
              </p>
              <p className="text-sm font-semibold text-foreground">
                {editForm.fechaRegistro}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Ultima Actualizacion
              </p>
              <p className="text-sm font-semibold text-foreground">
                2024-11-15 14:30:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <DeleteUserDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        userName={getFullName(usuario)}
      />
    </div>
  )
}
