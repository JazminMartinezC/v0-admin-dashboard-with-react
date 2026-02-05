"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Badge } from "@/components/ui/badge"
import {
  MoreVertical,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Filter,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data
const departamentosData = [
  { id: 1, nombre: "Sistemas", sigla: "SIS", estado: "Activo" },
  { id: 2, nombre: "Recursos Humanos", sigla: "RH", estado: "Activo" },
  { id: 3, nombre: "Finanzas", sigla: "FIN", estado: "Activo" },
  { id: 4, nombre: "Logística", sigla: "LOG", estado: "Activo" },
  { id: 5, nombre: "Ventas", sigla: "VEN", estado: "Inactivo" },
]

const etiquetasData = [
  { id: 1, nombre: "Urgente", color: "bg-red-100 text-red-800", estado: "Activo" },
  { id: 2, nombre: "Normal", color: "bg-blue-100 text-blue-800", estado: "Activo" },
  { id: 3, nombre: "Baja Prioridad", color: "bg-green-100 text-green-800", estado: "Activo" },
  { id: 4, nombre: "Pendiente", color: "bg-yellow-100 text-yellow-800", estado: "Activo" },
]

const periodosData = [
  { id: 1, nombre: "Enero 2024", fechaInicio: "2024-01-01", fechaFin: "2024-01-31", estado: "Activo" },
  { id: 2, nombre: "Febrero 2024", fechaInicio: "2024-02-01", fechaFin: "2024-02-29", estado: "Activo" },
  { id: 3, nombre: "Marzo 2024", fechaInicio: "2024-03-01", fechaFin: "2024-03-31", estado: "Inactivo" },
]

interface TablaProps {
  title: string
  columns: string[]
  data: Array<Record<string, any>>
  renderRow: (item: any) => React.ReactNode
  onAdd?: () => void
}

function TablaGenerica({ title, columns, data, renderRow, onAdd }: TablaProps) {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="space-y-4">
      {/* Header con búsqueda y botón */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Buscar en ${title}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 rounded-lg"
          />
        </div>
        {onAdd && (
          <Button
            onClick={onAdd}
            className="shrink-0 rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            Agregar
          </Button>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={col}
                  className="bg-muted/30 font-semibold text-foreground"
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => renderRow(item))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-8 text-center text-muted-foreground">
                  No se encontraron registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              {renderRow(item, true)}
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            No se encontraron registros
          </div>
        )}
      </div>
    </div>
  )
}

export function AdicionalContent() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestiona catálogos y configuración del sistema
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="departamentos" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-lg bg-muted/30 p-1 md:w-auto">
          <TabsTrigger value="departamentos" className="rounded-md">
            Departamentos
          </TabsTrigger>
          <TabsTrigger value="etiquetas" className="rounded-md">
            Etiquetas
          </TabsTrigger>
          <TabsTrigger value="periodos" className="rounded-md">
            Períodos
          </TabsTrigger>
        </TabsList>

        {/* Departamentos Tab */}
        <TabsContent value="departamentos" className="space-y-4">
          <TablaGenerica
            title="Departamentos"
            columns={["Nombre", "Sigla", "Estado", "Acciones"]}
            data={departamentosData}
            onAdd={() => alert("Agregar departamento")}
            renderRow={(item, isMobile) => {
              if (isMobile) {
                return (
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{item.nombre}</p>
                        <p className="text-xs text-muted-foreground">{item.sigla}</p>
                      </div>
                      <Badge
                        variant={item.estado === "Activo" ? "default" : "secondary"}
                        className="rounded-full text-xs"
                      >
                        {item.estado}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-full">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              }

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-foreground">
                    {item.nombre}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.sigla}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.estado === "Activo" ? "default" : "secondary"}
                      className="rounded-full text-xs"
                    >
                      {item.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            }}
          />
        </TabsContent>

        {/* Etiquetas Tab */}
        <TabsContent value="etiquetas" className="space-y-4">
          <TablaGenerica
            title="Etiquetas"
            columns={["Nombre", "Color", "Estado", "Acciones"]}
            data={etiquetasData}
            onAdd={() => alert("Agregar etiqueta")}
            renderRow={(item, isMobile) => {
              if (isMobile) {
                return (
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{item.nombre}</p>
                        <div className={cn("mt-1 inline-block px-2 py-1 rounded text-xs font-medium", item.color)}>
                          Vista previa
                        </div>
                      </div>
                      <Badge
                        variant={item.estado === "Activo" ? "default" : "secondary"}
                        className="rounded-full text-xs"
                      >
                        {item.estado}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-full">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              }

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-foreground">
                    {item.nombre}
                  </TableCell>
                  <TableCell>
                    <div className={cn("inline-block px-2 py-1 rounded text-xs font-medium", item.color)}>
                      Vista previa
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.estado === "Activo" ? "default" : "secondary"}
                      className="rounded-full text-xs"
                    >
                      {item.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            }}
          />
        </TabsContent>

        {/* Periodos Tab */}
        <TabsContent value="periodos" className="space-y-4">
          <TablaGenerica
            title="Períodos"
            columns={["Nombre", "Fecha Inicio", "Fecha Fin", "Estado", "Acciones"]}
            data={periodosData}
            onAdd={() => alert("Agregar período")}
            renderRow={(item, isMobile) => {
              if (isMobile) {
                return (
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{item.nombre}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.fechaInicio} → {item.fechaFin}
                        </p>
                      </div>
                      <Badge
                        variant={item.estado === "Activo" ? "default" : "secondary"}
                        className="rounded-full text-xs"
                      >
                        {item.estado}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-full">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              }

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-foreground">
                    {item.nombre}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.fechaInicio}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.fechaFin}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.estado === "Activo" ? "default" : "secondary"}
                      className="rounded-full text-xs"
                    >
                      {item.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
