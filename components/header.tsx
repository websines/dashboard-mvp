'use client'

import { useDashboardStore } from '@/store/dashboard-store'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { TrendingUp, Play, RefreshCw, Settings as SettingsIcon, ChevronDown, ChevronRight, Menu } from 'lucide-react'
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
        'fixed top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card transition-all duration-300',
        // Desktop
        'lg:left-64 lg:w-[calc(100%-16rem)]',
        sidebarCollapsed && 'lg:left-16 lg:w-[calc(100%-4rem)]',
        // Mobile
        'max-lg:left-0 max-lg:w-full'
      )}
    >
      <div className="flex flex-1 items-center gap-3 px-4 lg:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden h-9 w-9"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {breadcrumbs.length > 0 ? (
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                {crumb.href ? (
                  <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-foreground">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-serif font-medium">{title}</h1>
          </div>
        )}

        {subtitle && (
          <>
            <div className="h-5 w-px bg-border ml-1" />
            <Badge variant="outline" className="gap-1.5 font-normal border-primary/40 text-primary bg-primary/5">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs">{subtitle}</span>
            </Badge>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-3 px-4 lg:px-6">
        <Badge variant="outline" className="gap-1.5 max-sm:hidden font-medium border-primary/40 text-primary bg-primary/5">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs">Live</span>
        </Badge>

        <span className="text-xs text-muted-foreground max-lg:hidden">updated 1m ago</span>

        {showDeployButton && (
          <>
            <Button size="sm" className="gap-2 h-9 max-sm:hidden font-medium">
              <Play className="h-3.5 w-3.5" />
              <span className="max-lg:hidden">Deploy Workflow</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </>
        )}

        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-border">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 max-sm:hidden">
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
