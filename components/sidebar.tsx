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
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import Image from 'next/image'

import { Plus, BookOpen, Plug, Mic, BrainCircuit, FlaskConical, Layout } from 'lucide-react'

const navigationSections = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard },
      { name: 'Supervisor', href: '/supervisor', icon: BrainCircuit },
      { name: 'Workflows', href: '/workflows', icon: Workflow },
      { name: 'Agents', href: '/agents', icon: Network },
    ]
  },
  {
    title: 'Creation',
    items: [
      { name: 'Create Agent', href: '/create-agent', icon: Plus },
      { name: 'Connect Tools', href: '/connect-tools', icon: Plug },
    ]
  },
  {
    title: 'Training',
    items: [
      { name: 'Scenario Training', href: '/scenario-training', icon: FlaskConical },
      { name: 'Knowledge Base', href: '/knowledge-base', icon: BookOpen },
    ]
  },
  {
    title: 'Features',
    items: [
      { name: 'Add Voice', href: '/add-voice', icon: Mic },
      { name: 'Evolution', href: '/evolution', icon: TrendingUp },
      { name: 'Versions', href: '/versions', icon: GitBranch },
    ]
  },
  {
    title: 'System',
    items: [
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
          className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r border-primary/20 bg-card/40 backdrop-blur-xl transition-all duration-300',
          'shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]',
          // Desktop
          'lg:translate-x-0',
          sidebarCollapsed ? 'lg:w-16' : 'lg:w-64',
          // Mobile
          'max-lg:w-64',
          sidebarCollapsed ? 'max-lg:-translate-x-full' : 'max-lg:translate-x-0'
        )}
      >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className={cn("flex h-14 items-center border-b border-primary/20", sidebarCollapsed ? "justify-center px-2" : "justify-between px-4")}>
          {!sidebarCollapsed && (
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
              <ChevronLeft className="h-4 w-4 text-muted-foreground ml-auto cursor-pointer hover:text-foreground transition-colors" onClick={toggleSidebar} />
            </div>
          )}
          {sidebarCollapsed && (
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

        {!sidebarCollapsed && (
          <>
            {/* Search */}
            <div className="p-3 border-b border-primary/20">
              <div className="flex items-center gap-2 rounded bg-secondary/50 backdrop-blur-sm border border-primary/10 px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {!sidebarCollapsed ? (
            <div className="space-y-6">
              {navigationSections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-all',
                            isActive
                              ? 'bg-primary/10 text-primary border-l-2 border-primary pl-[10px]'
                              : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground border-l-2 border-transparent'
                          )}
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {navigationSections.flatMap(section => section.items).map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-center rounded py-2.5 transition-all relative',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    )}
                    title={item.name}
                  >
                    <item.icon className="h-4 w-4" />
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full" />}
                  </Link>
                )
              })}
            </div>
          )}
        </nav>

        {sidebarCollapsed && (
          <div className="border-t border-primary/20 p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="w-full h-9 hover:bg-secondary"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {!sidebarCollapsed && (
          <div className="border-t border-primary/20 p-3">
            <div className="text-xs text-muted-foreground px-2">
              <p className="font-semibold text-foreground">GoNova AI v2.3</p>
              <p className="mt-1">Self-Evolving Platform</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
