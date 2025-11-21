'use client'

import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/store/dashboard-store'
import {
  LayoutDashboard,
  Workflow,
  GitBranch,
  Network,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  BookOpen,
  Plug,
  Mic,
  BrainCircuit,
  FlaskConical,
  LogOut,
  User,
  Database,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import Image from 'next/image'

const navigationSections = [
  {
    title: 'Platform',
    items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard },
      { name: 'Supervisor', href: '/supervisor', icon: BrainCircuit },
      { name: 'Workflows', href: '/workflows', icon: Workflow },
      { name: 'Agents', href: '/agents', icon: Network },
    ]
  },
  {
    title: 'Build',
    items: [
      { name: 'Create Agent', href: '/create-agent', icon: Plus },
      { name: 'Agent Rules', href: '/agent-rules', icon: Shield },
      { name: 'Connect Tools', href: '/connect-tools', icon: Database }, // Icon changed from Plug to Database
      { name: 'Add Voice', href: '/add-voice', icon: Mic }, // Added 'Add Voice'
    ]
  },
  {
    title: 'Knowledge',
    items: [
      { name: 'Scenario Library', href: '/scenarios', icon: BookOpen },
      { name: 'Knowledge Base', href: '/knowledge-base', icon: Database },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Versions', href: '/versions', icon: GitBranch },
      { name: 'Evolution Lab', href: '/evolution', icon: FlaskConical },
      { name: 'Settings', href: '/settings', icon: Settings },
    ]
  }
]

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore()
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 ease-in-out',
          // Desktop
          'lg:translate-x-0',
          sidebarCollapsed ? 'lg:w-[70px]' : 'lg:w-64',
          // Mobile
          'max-lg:w-64',
          sidebarCollapsed ? 'max-lg:-translate-x-full' : 'max-lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header/Logo */}
          <div className={cn(
            "flex h-14 items-center border-b border-border",
            sidebarCollapsed ? "justify-center" : "justify-between px-4"
          )}>
            {!sidebarCollapsed ? (
              <div className="flex items-center gap-2 w-full">
                <Image
                  src="/logowithtext.png"
                  alt="GoNova AI"
                  width={140}
                  height={32}
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <div className="cursor-pointer" onClick={toggleSidebar}>
                <Image
                  src="/logo-symbol.png"
                  alt="GoNova AI"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
            {navigationSections.map((section) => (
              <div key={section.title}>
                {!sidebarCollapsed && (
                  <h3 className="mb-2 px-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'group flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200',
                          'hover:text-foreground',
                          isActive
                            ? 'text-foreground bg-secondary/50 border-l-2 border-foreground'
                            : 'text-muted-foreground border-l-2 border-transparent',
                          sidebarCollapsed && 'justify-center px-0'
                        )}
                        title={sidebarCollapsed ? item.name : undefined}
                      >
                        <item.icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                        {!sidebarCollapsed && <span>{item.name}</span>}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer / User Profile */}
          <div className="border-t border-border p-3">
            {!sidebarCollapsed ? (
              <div className="flex items-center gap-3 rounded-md p-2 hover:bg-muted transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-muted-foreground/20 flex items-center justify-center border border-border">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-foreground">Admin User</p>
                  <p className="truncate text-xs text-muted-foreground">admin@gonova.ai</p>
                </div>
                <LogOut className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="h-8 w-8 rounded-full bg-muted-foreground/20 flex items-center justify-center border border-border cursor-pointer hover:bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            )}

            <div className="mt-2 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
              >
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
