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
      { name: 'Workflows', href: '/workflows', icon: Workflow },
      { name: 'Agents', href: '/agents', icon: Network },
    ]
  },
  {
    title: 'Creation',
    items: [
      { name: 'Create Agent', href: '/create-agent', icon: Plus },
      { name: 'Create Frontend', href: '/create-frontend', icon: Layout },
      { name: 'Connect Tools', href: '/connect-tools', icon: Plug },
    ]
  },
  {
    title: 'Training',
    items: [
      { name: 'Agent Rules', href: '/agent-rules', icon: BrainCircuit },
      { name: 'Scenario Training', href: '/scenario-training', icon: FlaskConical },
      { name: 'Knowledge Base', href: '/knowledge-base', icon: BookOpen },
      { name: 'Connect Knowledge', href: '/connect-knowledge', icon: Plug },
      { name: 'Knowledge Hub', href: '/knowledge-hub', icon: BookOpen },
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
    <div
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-border/40 bg-background transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className={cn("flex h-16 items-center border-b border-border/40 bg-card", sidebarCollapsed ? "justify-center px-2" : "justify-between px-4")}>
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
              <ChevronLeft className="h-5 w-5 text-muted-foreground ml-auto cursor-pointer hover:text-foreground transition-colors" onClick={toggleSidebar} />
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
            <div className="p-3">
              <div className="flex items-center gap-2 rounded-md bg-accent/50 px-3 py-1.5">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
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
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {!sidebarCollapsed ? (
            <div className="space-y-6">
              {navigationSections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-2 px-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors',
                            isActive
                              ? 'bg-accent text-foreground font-medium'
                              : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
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
            <div className="space-y-0.5">
              {navigationSections.flatMap(section => section.items).map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-center rounded-md py-2 transition-colors',
                      isActive
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                    )}
                    title={item.name}
                  >
                    <item.icon className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          )}
        </nav>

        {sidebarCollapsed && (
          <div className="border-t border-border/40 p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="w-full h-9 hover:bg-accent"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {!sidebarCollapsed && (
          <div className="border-t border-border/40 p-2">
            <div className="text-xs text-muted-foreground px-3 py-2">
              <p className="font-medium">GoNova AI v2.3</p>
              <p className="mt-0.5">Self-Evolving Platform</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
