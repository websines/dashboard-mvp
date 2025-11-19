'use client'

import { useDashboardStore } from '@/store/dashboard-store'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Play,
  Bell,
  HelpCircle,
  ChevronRight,
  Menu,
  Search
} from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  title: string
  subtitle?: string
  showDeployButton?: boolean
  breadcrumbs?: { label: string; href?: string }[]
}

export function Header({ title, subtitle, showDeployButton = true, breadcrumbs = [] }: HeaderProps) {
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore()

  return (
    <div
      className={cn(
        'fixed top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm transition-all duration-300',
        // Desktop
        'lg:left-64 lg:w-[calc(100%-16rem)]',
        sidebarCollapsed && 'lg:left-[70px] lg:w-[calc(100%-70px)]',
        // Mobile
        'max-lg:left-0 max-lg:w-full'
      )}
    >
      <div className="flex flex-1 items-center gap-4 px-6">
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden h-8 w-8 -ml-2">
          <Menu className="h-4 w-4" />
        </Button>

        {/* Breadcrumbs / Title Area */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-foreground">{title}</span>
          {subtitle && (
            <>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{subtitle}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 px-6">
        {/* Search (Desktop) */}
        <div className="hidden md:flex items-center relative mr-2">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-md border border-border bg-muted/50 pl-9 pr-4 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="h-4 w-px bg-border mx-1" />

        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
          <HelpCircle className="h-4.5 w-4.5" />
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground relative">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
        </Button>

        {showDeployButton && (
          <Button size="sm" className="gap-2 h-8 ml-2 bg-foreground text-background hover:bg-foreground/90">
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Deploy</span>
          </Button>
        )}
      </div>
    </div>
  )
}
