"use client"

import React, { createContext, useContext, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  LayoutDashboard,
  Users,
  Package,
  Monitor,
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
  PanelLeftClose,
  PanelLeft,
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

// ── Sidebar context for desktop collapse ──

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
})

export function useSidebar() {
  return useContext(SidebarContext)
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

// ── Nav data ──

interface NavItemData {
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const mainNav: NavItemData[] = [
  { label: "Inicio", icon: Home, href: "#" },
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Usuarios", icon: Users, href: "/usuarios/registrar" },
]

const inventariosNav: NavItemData[] = [
  { label: "Materiales", icon: Package, href: "/inventarios" },
  { label: "Equipos", icon: Monitor, href: "/inventarios" },
]

const mesaAyudaNav: NavItemData[] = [
  { label: "Mis Solicitudes", icon: FileText, href: "#" },
  { label: "Solicitudes", icon: ClipboardList, href: "/" },
  { label: "Reportes", icon: BarChart3, href: "/reportes" },
]

const adicionalesNav: NavItemData[] = [
  { label: "Departamentos", icon: Building2, href: "/adicionales" },
  { label: "Etiquetas", icon: Tags, href: "/adicionales" },
  { label: "Periodo", icon: CalendarDays, href: "/adicionales" },
  { label: "Responsables equipo", icon: UserCog, href: "#" },
  { label: "Catalogos", icon: BookOpen, href: "/adicionales" },
]

// ── Nav item ──

function NavItem({
  item,
  onClick,
}: {
  item: NavItemData
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive =
    item.href !== "#" &&
    (pathname === item.href || pathname.startsWith(item.href + "/"))

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon className="h-4 w-4 shrink-0" />
      {item.label}
    </Link>
  )
}

// ── Collapsible group ──

function CollapsibleNavGroup({
  title,
  items,
  defaultOpen = false,
  onItemClick,
}: {
  title: string
  items: NavItemData[]
  defaultOpen?: boolean
  onItemClick?: () => void
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70 hover:text-muted-foreground transition-colors">
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

// ── Sidebar content (reused for desktop & mobile sheet) ──

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4">
        <Image
          src="/logo.png"
          alt="Soporte Tecnico logo"
          width={36}
          height={36}
          className="shrink-0"
        />
        <span className="text-base font-bold tracking-tight text-foreground">
          Soporte Tecnico
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
            defaultOpen
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
            <AvatarFallback className="bg-muted text-foreground text-xs">
              JR
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              Juan Rodriguez
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Administrador
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
            aria-label="Cerrar sesion"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Mobile sidebar trigger (Sheet) ──

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

// ── Desktop sidebar toggle button (goes in header) ──

export function DesktopSidebarToggle() {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
      onClick={() => setCollapsed(!collapsed)}
      aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
    >
      {collapsed ? (
        <PanelLeft className="h-5 w-5" />
      ) : (
        <PanelLeftClose className="h-5 w-5" />
      )}
    </Button>
  )
}

// ── Desktop fixed sidebar ──

export function AppSidebar() {
  const { collapsed } = useSidebar()

  return (
    <aside
      className={cn(
        "hidden md:flex md:flex-col md:fixed md:inset-y-0 border-r border-border bg-card shadow-sm transition-all duration-300",
        collapsed ? "md:w-0 md:overflow-hidden md:border-r-0" : "md:w-64"
      )}
    >
      <SidebarContent />
    </aside>
  )
}
