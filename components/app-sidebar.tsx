"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  LayoutDashboard,
  Users,
  Package,
  Monitor,
  Headphones,
  FileText,
  ClipboardList,
  BarChart3,
  Building2,
  Tags,
  CalendarDays,
  UserCog,
  BookOpen,
  ChevronDown,
  LogOut,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const mainNav = [
  { label: "Inicio", icon: Home, href: "#" },
  { label: "Dashboard", icon: LayoutDashboard, href: "#", active: true },
  { label: "Usuarios", icon: Users, href: "#" },
]

const inventariosNav = [
  { label: "Materiales", icon: Package, href: "#" },
  { label: "Equipos", icon: Monitor, href: "#" },
]

const mesaAyudaNav = [
  { label: "Mis Solicitudes", icon: FileText, href: "#" },
  { label: "Solicitudes", icon: ClipboardList, href: "#", active: true },
  { label: "Reportes", icon: BarChart3, href: "#" },
]

const adicionalesNav = [
  { label: "Departamentos", icon: Building2, href: "#" },
  { label: "Etiquetas", icon: Tags, href: "#" },
  { label: "Periodo", icon: CalendarDays, href: "#" },
  { label: "Responsables equipo", icon: UserCog, href: "#" },
  { label: "Catalogos", icon: BookOpen, href: "#" },
]

function NavItem({
  item,
  onClick,
}: {
  item: { label: string; icon: React.ComponentType<{ className?: string }>; href: string; active?: boolean }
  onClick?: () => void
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        item.active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon className="h-4 w-4 shrink-0" />
      {item.label}
    </Link>
  )
}

function CollapsibleNavGroup({
  title,
  items,
  defaultOpen = false,
  onItemClick,
}: {
  title: string
  items: typeof inventariosNav
  defaultOpen?: boolean
  onItemClick?: () => void
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pl-2 pt-1">
        {items.map((item) => (
          <NavItem key={item.label} item={item} onClick={onItemClick} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
          <Headphones className="h-4 w-4 text-background" />
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">
          HelpDesk
        </span>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {mainNav.map((item) => (
          <NavItem key={item.label} item={item} onClick={onItemClick} />
        ))}

        <div className="pt-3">
          <CollapsibleNavGroup
            title="Inventarios"
            items={inventariosNav}
            onItemClick={onItemClick}
          />
        </div>

        <div className="pt-1">
          <CollapsibleNavGroup
            title="Mesa de Ayuda"
            items={mesaAyudaNav}
            defaultOpen
            onItemClick={onItemClick}
          />
        </div>

        <div className="pt-1">
          <CollapsibleNavGroup
            title="Adicionales"
            items={adicionalesNav}
            onItemClick={onItemClick}
          />
        </div>
      </nav>

      <Separator />

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Juan Rodriguez" />
            <AvatarFallback className="bg-muted text-foreground text-xs">JR</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              Juan Rodriguez
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Administrador
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
            aria-label="Cerrar sesion"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function MobileSidebarTrigger() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetTitle className="sr-only">Menu de navegacion</SheetTitle>
        <SidebarContent onItemClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

export function AppSidebar() {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-border bg-card">
      <SidebarContent />
    </aside>
  )
}
