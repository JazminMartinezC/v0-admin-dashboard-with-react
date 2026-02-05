"use client"

import { Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MobileSidebarTrigger,
  DesktopSidebarToggle,
} from "@/components/app-sidebar"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <div className="flex items-center gap-2">
        <MobileSidebarTrigger />
        <DesktopSidebarToggle />
        <h1 className="text-lg font-bold text-foreground tracking-tight">
          Soporte Tecnico
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Configuracion"
        >
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative ml-1 h-9 w-9 rounded-full"
              aria-label="Menu de usuario"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder-avatar.jpg"
                  alt="Juan Rodriguez"
                />
                <AvatarFallback className="bg-muted text-foreground text-xs">
                  JR
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <p className="text-sm font-semibold text-foreground">
                Juan Rodriguez
              </p>
              <p className="text-xs text-muted-foreground">
                admin@helpdesk.com
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuracion</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Cerrar Sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
