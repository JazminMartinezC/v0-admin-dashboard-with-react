"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Package,
  Monitor,
  AlertTriangle,
  Wifi,
  Printer,
  ArrowUpDown,
  Download,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ── Types ──

interface Material {
  id: string
  nombre: string
  cantidad: number
  unidadMedida: string
  umbralAlerta: number
  fecha: string
}

type TipoEquipo = "Computo" | "Redes" | "Impresora"
type EstadoEquipo = "Activo" | "En reparacion" | "Baja"

interface Equipo {
  noInventario: string
  tipoEquipo: TipoEquipo
  marca: string
  modelo: string
  responsable: string
  estado: EstadoEquipo
}

// ── Sample data ──

const materiales: Material[] = [
  {
    id: "MAT-001",
    nombre: "Toner HP 26A",
    cantidad: 3,
    unidadMedida: "Pieza",
    umbralAlerta: 5,
    fecha: "2024-12-10",
  },
  {
    id: "MAT-002",
    nombre: "Cable UTP Cat 6",
    cantidad: 120,
    unidadMedida: "Metro",
    umbralAlerta: 50,
    fecha: "2024-12-08",
  },
  {
    id: "MAT-003",
    nombre: "Memoria USB 32GB",
    cantidad: 2,
    unidadMedida: "Pieza",
    umbralAlerta: 5,
    fecha: "2024-12-05",
  },
  {
    id: "MAT-004",
    nombre: "Hojas Carta",
    cantidad: 15,
    unidadMedida: "Paquete",
    umbralAlerta: 10,
    fecha: "2024-11-28",
  },
  {
    id: "MAT-005",
    nombre: "Conector RJ45",
    cantidad: 8,
    unidadMedida: "Pieza",
    umbralAlerta: 20,
    fecha: "2024-11-25",
  },
  {
    id: "MAT-006",
    nombre: "Disco Duro 1TB",
    cantidad: 4,
    unidadMedida: "Pieza",
    umbralAlerta: 3,
    fecha: "2024-11-20",
  },
  {
    id: "MAT-007",
    nombre: "Mouse Optico",
    cantidad: 1,
    unidadMedida: "Pieza",
    umbralAlerta: 5,
    fecha: "2024-11-15",
  },
  {
    id: "MAT-008",
    nombre: "Teclado USB",
    cantidad: 6,
    unidadMedida: "Pieza",
    umbralAlerta: 5,
    fecha: "2024-11-10",
  },
]

const equipos: Equipo[] = [
  {
    noInventario: "EQ-2024-001",
    tipoEquipo: "Computo",
    marca: "Dell",
    modelo: "OptiPlex 7090",
    responsable: "Maria Garcia Lopez",
    estado: "Activo",
  },
  {
    noInventario: "EQ-2024-002",
    tipoEquipo: "Impresora",
    marca: "HP",
    modelo: "LaserJet Pro M404n",
    responsable: "Carlos Martinez",
    estado: "Activo",
  },
  {
    noInventario: "EQ-2024-003",
    tipoEquipo: "Redes",
    marca: "Cisco",
    modelo: "Catalyst 2960",
    responsable: "Ana Torres Ruiz",
    estado: "Activo",
  },
  {
    noInventario: "EQ-2024-004",
    tipoEquipo: "Computo",
    marca: "Lenovo",
    modelo: "ThinkPad T14",
    responsable: "Luis Hernandez",
    estado: "En reparacion",
  },
  {
    noInventario: "EQ-2024-005",
    tipoEquipo: "Impresora",
    marca: "Epson",
    modelo: "EcoTank L3250",
    responsable: "Patricia Gomez",
    estado: "Baja",
  },
  {
    noInventario: "EQ-2024-006",
    tipoEquipo: "Computo",
    marca: "HP",
    modelo: "ProBook 450 G9",
    responsable: "Fernando Diaz Mora",
    estado: "Activo",
  },
  {
    noInventario: "EQ-2024-007",
    tipoEquipo: "Redes",
    marca: "TP-Link",
    modelo: "TL-SG1024",
    responsable: "Sofia Ramirez",
    estado: "Activo",
  },
  {
    noInventario: "EQ-2024-008",
    tipoEquipo: "Computo",
    marca: "Dell",
    modelo: "Latitude 5530",
    responsable: "Roberto Sanchez",
    estado: "En reparacion",
  },
]

// ── Badge helpers ──

const tipoEquipoConfig: Record<TipoEquipo, { icon: typeof Monitor; class: string }> = {
  Computo: { icon: Monitor, class: "bg-sky-100 text-sky-700 border-sky-200" },
  Redes: { icon: Wifi, class: "bg-violet-100 text-violet-700 border-violet-200" },
  Impresora: { icon: Printer, class: "bg-amber-100 text-amber-700 border-amber-200" },
}

const estadoEquipoConfig: Record<EstadoEquipo, string> = {
  Activo: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "En reparacion": "bg-amber-100 text-amber-700 border-amber-200",
  Baja: "bg-zinc-100 text-zinc-600 border-zinc-200",
}

function TipoEquipoBadge({ tipo }: { tipo: TipoEquipo }) {
  const config = tipoEquipoConfig[tipo]
  const Icon = config.icon
  return (
    <Badge variant="outline" className={cn("gap-1 font-semibold", config.class)}>
      <Icon className="h-3 w-3" />
      {tipo}
    </Badge>
  )
}

function EstadoEquipoBadge({ estado }: { estado: EstadoEquipo }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-semibold", estadoEquipoConfig[estado])}
    >
      {estado}
    </Badge>
  )
}

function StockBadge({ cantidad, umbral }: { cantidad: number; umbral: number }) {
  const isBelowThreshold = cantidad < umbral
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          "text-sm font-bold tabular-nums",
          isBelowThreshold ? "text-red-600" : "text-foreground"
        )}
      >
        {cantidad}
      </span>
      {isBelowThreshold && (
        <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
      )}
    </div>
  )
}

// ── Actions dropdown ──

function ActionsDropdown({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label={`Acciones para ${id}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2">
          <Eye className="h-4 w-4" />
          Ver Detalle
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

// ═══════════════════════════════════════════════
// ── MATERIALES TAB
// ═══════════════════════════════════════════════

function MaterialesActionBar({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string
  onSearchChange: (v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar materiales..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-sm bg-transparent"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
          <Button className="shrink-0 rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Material
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtrado por:</span>
          <span className="sm:hidden">Filtros:</span>
        </div>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[110px] bg-card text-sm">
            <SelectValue placeholder="Unidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="pieza">Pieza</SelectItem>
            <SelectItem value="metro">Metro</SelectItem>
            <SelectItem value="paquete">Paquete</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[100px] bg-card text-sm">
            <SelectValue placeholder="Stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="bajo">Bajo stock</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function MaterialesDesktopTable({ data }: { data: Material[] }) {
  return (
    <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="w-[100px]">
              <div className="flex items-center gap-1">
                Cantidad
                <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead className="w-[110px]">Unidad</TableHead>
            <TableHead className="w-[100px]">
              <div className="flex items-center gap-1">
                Umbral
                <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead className="w-[110px]">Fecha</TableHead>
            <TableHead className="w-[70px] text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((mat) => {
            const isBelowThreshold = mat.cantidad < mat.umbralAlerta
            return (
              <TableRow
                key={mat.id}
                className={cn(
                  isBelowThreshold && "bg-red-50/70 hover:bg-red-50"
                )}
              >
                <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                  {mat.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {mat.nombre}
                    </span>
                    {isBelowThreshold && (
                      <Badge
                        variant="outline"
                        className="gap-1 border-red-200 bg-red-100 text-red-700 text-[10px] font-bold"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        Bajo stock
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <StockBadge cantidad={mat.cantidad} umbral={mat.umbralAlerta} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {mat.unidadMedida}
                </TableCell>
                <TableCell className="text-muted-foreground tabular-nums">
                  {mat.umbralAlerta}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {mat.fecha}
                </TableCell>
                <TableCell className="text-center">
                  <ActionsDropdown id={mat.id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

function MaterialesMobileCards({ data }: { data: Material[] }) {
  return (
    <div className="md:hidden space-y-2">
      {data.map((mat) => {
        const isBelowThreshold = mat.cantidad < mat.umbralAlerta
        return (
          <div
            key={mat.id}
            className={cn(
              "flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors",
              isBelowThreshold
                ? "border-red-200/60 bg-red-50/50"
                : "hover:bg-muted/50"
            )}
          >
            <div
              className={cn(
                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                isBelowThreshold ? "bg-red-100" : "bg-primary/10"
              )}
            >
              {isBelowThreshold ? (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              ) : (
                <Package className="h-4 w-4 text-primary" />
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-semibold text-muted-foreground">
                  {mat.id}
                </span>
                {isBelowThreshold && (
                  <Badge
                    variant="outline"
                    className="gap-1 border-red-200 bg-red-100 text-red-700 text-[10px] font-bold"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    Bajo
                  </Badge>
                )}
              </div>

              <p className="truncate text-sm font-bold text-foreground">
                {mat.nombre}
              </p>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    <span className={cn("font-bold", isBelowThreshold ? "text-red-600" : "text-foreground")}>
                      {mat.cantidad}
                    </span>
                    {" "}{mat.unidadMedida}
                  </span>
                  <span className="text-border">|</span>
                  <span>Umbral: {mat.umbralAlerta}</span>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {mat.fecha}
                </span>
              </div>
            </div>

            <ActionsDropdown id={mat.id} />
          </div>
        )
      })}
    </div>
  )
}

function MaterialesTab() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMateriales = materiales.filter(
    (m) =>
      m.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const lowStockCount = filteredMateriales.filter(
    (m) => m.cantidad < m.umbralAlerta
  ).length

  return (
    <div className="space-y-5">
      <MaterialesActionBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Summary */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-muted-foreground">
          {filteredMateriales.length} material
          {filteredMateriales.length !== 1 ? "es" : ""} encontrado
          {filteredMateriales.length !== 1 ? "s" : ""}
        </p>
        {lowStockCount > 0 && (
          <Badge
            variant="outline"
            className="gap-1 border-red-200 bg-red-50 text-red-600 font-semibold"
          >
            <AlertTriangle className="h-3 w-3" />
            {lowStockCount} con bajo stock
          </Badge>
        )}
      </div>

      <MaterialesDesktopTable data={filteredMateriales} />
      <MaterialesMobileCards data={filteredMateriales} />
    </div>
  )
}

// ═══════════════════════════════════════════════
// ── EQUIPOS TAB
// ═══════════════════════════════════════════════

function EquiposActionBar({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string
  onSearchChange: (v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar equipos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-sm bg-transparent"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
          <Button className="shrink-0 rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Equipo
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtrado por:</span>
          <span className="sm:hidden">Filtros:</span>
        </div>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[100px] bg-card text-sm">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="computo">Computo</SelectItem>
            <SelectItem value="redes">Redes</SelectItem>
            <SelectItem value="impresora">Impresora</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[100px] bg-card text-sm">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="reparacion">En reparacion</SelectItem>
            <SelectItem value="baja">Baja</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-9 w-auto min-w-[100px] bg-card text-sm">
            <SelectValue placeholder="Marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="dell">Dell</SelectItem>
            <SelectItem value="hp">HP</SelectItem>
            <SelectItem value="lenovo">Lenovo</SelectItem>
            <SelectItem value="cisco">Cisco</SelectItem>
            <SelectItem value="epson">Epson</SelectItem>
            <SelectItem value="tplink">TP-Link</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function EquiposDesktopTable({ data }: { data: Equipo[] }) {
  return (
    <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[150px]">No. Inventario</TableHead>
            <TableHead className="w-[130px]">Tipo</TableHead>
            <TableHead className="w-[100px]">Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead className="w-[130px]">Estado</TableHead>
            <TableHead className="w-[70px] text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((eq) => (
            <TableRow key={eq.noInventario}>
              <TableCell className="font-mono text-xs font-semibold text-foreground">
                {eq.noInventario}
              </TableCell>
              <TableCell>
                <TipoEquipoBadge tipo={eq.tipoEquipo} />
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {eq.marca}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {eq.modelo}
              </TableCell>
              <TableCell className="text-foreground">
                {eq.responsable}
              </TableCell>
              <TableCell>
                <EstadoEquipoBadge estado={eq.estado} />
              </TableCell>
              <TableCell className="text-center">
                <ActionsDropdown id={eq.noInventario} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function EquiposMobileCards({ data }: { data: Equipo[] }) {
  return (
    <div className="md:hidden space-y-2">
      {data.map((eq) => (
        <div
          key={eq.noInventario}
          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
        >
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            {eq.tipoEquipo === "Computo" && (
              <Monitor className="h-4 w-4 text-primary" />
            )}
            {eq.tipoEquipo === "Redes" && (
              <Wifi className="h-4 w-4 text-primary" />
            )}
            {eq.tipoEquipo === "Impresora" && (
              <Printer className="h-4 w-4 text-primary" />
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-1.5">
            {/* Top row: inventory number + status */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold text-muted-foreground">
                {eq.noInventario}
              </span>
              <EstadoEquipoBadge estado={eq.estado} />
            </div>

            {/* Brand + Model */}
            <p className="truncate text-sm font-bold text-foreground">
              {eq.marca} {eq.modelo}
            </p>

            {/* Type + Responsable */}
            <div className="flex items-center justify-between gap-2">
              <TipoEquipoBadge tipo={eq.tipoEquipo} />
              <span className="truncate text-xs text-muted-foreground">
                {eq.responsable}
              </span>
            </div>
          </div>

          <ActionsDropdown id={eq.noInventario} />
        </div>
      ))}
    </div>
  )
}

function EquiposTab() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEquipos = equipos.filter(
    (e) =>
      e.noInventario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.marca.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.modelo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.responsable.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <EquiposActionBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-sm text-muted-foreground">
        {filteredEquipos.length} equipo
        {filteredEquipos.length !== 1 ? "s" : ""} encontrado
        {filteredEquipos.length !== 1 ? "s" : ""}
      </p>

      <EquiposDesktopTable data={filteredEquipos} />
      <EquiposMobileCards data={filteredEquipos} />
    </div>
  )
}

// ═══════════════════════════════════════════════
// ── MAIN EXPORT
// ═══════════════════════════════════════════════

export function InventariosContent() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-lg font-bold text-foreground">Inventarios</h1>
        <p className="text-sm text-muted-foreground">
          Gestion de materiales y equipos del departamento
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="materiales" className="w-full">
        <TabsList className="grid w-full max-w-sm grid-cols-2">
          <TabsTrigger value="materiales" className="gap-1.5">
            <Package className="h-4 w-4" />
            Materiales
          </TabsTrigger>
          <TabsTrigger value="equipos" className="gap-1.5">
            <Monitor className="h-4 w-4" />
            Equipos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="materiales" className="mt-5">
          <MaterialesTab />
        </TabsContent>

        <TabsContent value="equipos" className="mt-5">
          <EquiposTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
