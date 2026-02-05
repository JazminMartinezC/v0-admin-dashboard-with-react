"use client"

import React from "react"

import { useState, useRef } from "react"
import {
  Camera,
  Save,
  X,
  RotateCcw,
  Mail,
  Lock,
  User,
  ShieldCheck,
  ToggleLeft,
  Eye,
  EyeOff,
  ImageIcon,
  ArrowLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// ── Avatar Upload Card ──

function AvatarUploadCard({
  preview,
  onFileSelect,
  onClear,
}: {
  preview: string | null
  onFileSelect: (file: File) => void
  onClear: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Camera className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground">Foto de Perfil</h2>
          <p className="text-xs text-muted-foreground">
            Imagen del usuario
          </p>
        </div>
      </div>

      <Separator className="mb-5" />

      <div className="flex flex-col items-center gap-4">
        {/* Preview area */}
        <div
          className={cn(
            "relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-colors",
            preview
              ? "border-primary/40 bg-primary/5"
              : "border-muted-foreground/25 bg-muted/50"
          )}
        >
          {preview ? (
            <img
              src={preview || "/placeholder.svg"}
              alt="Vista previa del avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <ImageIcon className="h-8 w-8" />
              <span className="text-[10px] font-medium">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs bg-transparent"
            onClick={() => inputRef.current?.click()}
          >
            <Camera className="h-3.5 w-3.5" />
            {preview ? "Cambiar" : "Subir foto"}
          </Button>
          {preview && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs text-destructive hover:text-destructive"
              onClick={onClear}
            >
              <X className="h-3.5 w-3.5" />
              Quitar
            </Button>
          )}
        </div>

        <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
          Formatos: JPG, PNG o WebP.
          <br />
          Peso maximo: 2 MB. Resolucion recomendada: 200x200 px.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

// ── User Data Card ──

function UserDataCard({
  form,
  onChange,
}: {
  form: FormState
  onChange: (field: keyof FormState, value: string) => void
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <User className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground">
            Datos del Usuario
          </h2>
          <p className="text-xs text-muted-foreground">
            Informacion personal y credenciales de acceso
          </p>
        </div>
      </div>

      <Separator className="mb-5" />

      <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
        {/* Correo -- full width */}
        <div className="space-y-1.5 md:col-span-2">
          <Label
            htmlFor="correo"
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground"
          >
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            Correo Electronico
          </Label>
          <Input
            id="correo"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={form.correo}
            onChange={(e) => onChange("correo", e.target.value)}
            className="bg-background"
          />
        </div>

        {/* Contrasena -- full width */}
        <div className="space-y-1.5 md:col-span-2">
          <Label
            htmlFor="contrasena"
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground"
          >
            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
            Contrasena
          </Label>
          <div className="relative">
            <Input
              id="contrasena"
              type={showPassword ? "text" : "password"}
              placeholder="Minimo 8 caracteres"
              value={form.contrasena}
              onChange={(e) => onChange("contrasena", e.target.value)}
              className="bg-background pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Nombres */}
        <div className="space-y-1.5">
          <Label
            htmlFor="nombres"
            className="text-xs font-semibold text-foreground"
          >
            Nombres
          </Label>
          <Input
            id="nombres"
            placeholder="Ej. Juan Carlos"
            value={form.nombres}
            onChange={(e) => onChange("nombres", e.target.value)}
            className="bg-background"
          />
        </div>

        {/* Primer Apellido */}
        <div className="space-y-1.5">
          <Label
            htmlFor="primerApellido"
            className="text-xs font-semibold text-foreground"
          >
            Primer Apellido
          </Label>
          <Input
            id="primerApellido"
            placeholder="Ej. Rodriguez"
            value={form.primerApellido}
            onChange={(e) => onChange("primerApellido", e.target.value)}
            className="bg-background"
          />
        </div>

        {/* Segundo Apellido */}
        <div className="space-y-1.5 md:col-span-1">
          <Label
            htmlFor="segundoApellido"
            className="text-xs font-semibold text-foreground"
          >
            Segundo Apellido
          </Label>
          <Input
            id="segundoApellido"
            placeholder="Ej. Martinez"
            value={form.segundoApellido}
            onChange={(e) => onChange("segundoApellido", e.target.value)}
            className="bg-background"
          />
        </div>
      </div>
    </div>
  )
}

// ── Rol & Permissions Card ──

function RolPermisoCard({
  form,
  onChange,
}: {
  form: FormState
  onChange: (field: keyof FormState, value: string) => void
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <ShieldCheck className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground">Rol y Permisos</h2>
          <p className="text-xs text-muted-foreground">
            Nivel de acceso y estado de la cuenta
          </p>
        </div>
      </div>

      <Separator className="mb-5" />

      <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
        {/* Rol */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
            Rol
          </Label>
          <Select
            value={form.rol}
            onValueChange={(v) => onChange("rol", v)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="administrador">Administrador</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="usuario">Usuario</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Estado */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <ToggleLeft className="h-3.5 w-3.5 text-muted-foreground" />
            Estado
          </Label>
          <Select
            value={form.estado}
            onValueChange={(v) => onChange("estado", v)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

// ── Form State ──

interface FormState {
  correo: string
  contrasena: string
  nombres: string
  primerApellido: string
  segundoApellido: string
  rol: string
  estado: string
}

const emptyForm: FormState = {
  correo: "",
  contrasena: "",
  nombres: "",
  primerApellido: "",
  segundoApellido: "",
  rol: "",
  estado: "",
}

// ── Main Export ──

export function RegisterUserContent() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleFileSelect(file: File) {
    const url = URL.createObjectURL(file)
    setAvatarPreview(url)
  }

  function handleClearAvatar() {
    setAvatarPreview(null)
  }

  function handleReset() {
    setForm(emptyForm)
    setAvatarPreview(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // placeholder -- integrate with backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
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
              Registrar Usuario
            </h1>
            <p className="text-xs text-muted-foreground">
              Complete la informacion para crear una nueva cuenta
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout: photo on left, data + role on right */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">
        {/* Left: Photo */}
        <div className="space-y-5">
          <AvatarUploadCard
            preview={avatarPreview}
            onFileSelect={handleFileSelect}
            onClear={handleClearAvatar}
          />
        </div>

        {/* Right: Data + Role */}
        <div className="space-y-5">
          <UserDataCard form={form} onChange={handleChange} />
          <RolPermisoCard form={form} onChange={handleChange} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => window.history.back()}
        >
          <X className="mr-1.5 h-4 w-4" />
          Cancelar
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
        >
          <RotateCcw className="mr-1.5 h-4 w-4" />
          Limpiar Formulario
        </Button>
        <Button type="submit" className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
          <Save className="mr-1.5 h-4 w-4" />
          Crear Usuario
        </Button>
      </div>
    </form>
  )
}
