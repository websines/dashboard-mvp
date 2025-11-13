'use client'

import { useDashboardStore } from '@/store/dashboard-store'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { TrendingUp, Play, RefreshCw, Settings as SettingsIcon, ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  title: string
  subtitle?: string
  showDeployButton?: boolean
  breadcrumbs?: { label: string; href?: string }[]
}

export function Header({ title, subtitle, showDeployButton = true, breadcrumbs = [] }: HeaderProps) {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'fixed top-0 z-30 flex h-16 items-center justify-between border-b border-border/40 bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95 transition-all duration-300',
        sidebarCollapsed ? 'left-16 w-[calc(100%-4rem)]' : 'left-64 w-[calc(100%-16rem)]'
      )}
    >
      <div className="flex flex-1 items-center gap-3 px-6">
        {breadcrumbs.length > 0 ? (
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                {crumb.href ? (
                  <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />
            <span className="text-base font-semibold">{title}</span>
          </div>
        )}

        {subtitle && (
          <>
            <div className="h-4 w-px bg-border/40 ml-1" />
            <Badge variant="outline" className="gap-1.5 font-normal">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs">{subtitle}</span>
            </Badge>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 px-6">
        <Badge variant="secondary" className="gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="text-xs">Live</span>
        </Badge>

        <span className="text-xs text-muted-foreground">updated a min ago</span>

        {showDeployButton && (
          <>
            <Button size="sm" className="gap-1.5 h-8">
              <Play className="h-3 w-3" />
              Deploy Workflow
              <ChevronDown className="h-3 w-3" />
            </Button>
          </>
        )}

        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-border/40">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
