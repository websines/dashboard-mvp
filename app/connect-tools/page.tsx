'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plug, Search, Database, Mail, Calendar, FileText, Github, Slack, CheckCircle2, Plus, Filter, ArrowUpRight, Terminal, Code2, Globe, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

const connectedTools = [
  { name: 'GitHub', icon: Github, status: 'connected', color: 'text-foreground', lastSync: '2m ago', events: 1240 },
  { name: 'Slack', icon: Slack, status: 'connected', color: 'text-foreground', lastSync: '5s ago', events: 850 },
  { name: 'Google Calendar', icon: Calendar, status: 'connected', color: 'text-foreground', lastSync: '1h ago', events: 42 },
]

const availableTools = [
  {
    name: 'Web Search',
    description: 'Real-time web search and data retrieval',
    icon: Globe,
    category: 'Data',
    popularity: 'High'
  },
  {
    name: 'PostgreSQL',
    description: 'Connect to SQL/NoSQL databases',
    icon: Database,
    category: 'Data',
    popularity: 'Medium'
  },
  {
    name: 'Gmail / Outlook',
    description: 'Send and receive emails',
    icon: Mail,
    category: 'Communication',
    popularity: 'High'
  },
  {
    name: 'Notion',
    description: 'Knowledge base and docs integration',
    icon: FileText,
    category: 'Productivity',
    popularity: 'High'
  },
  {
    name: 'Document Parser',
    description: 'Parse PDFs, Word docs, and more',
    icon: FileText,
    category: 'Data',
    popularity: 'Medium'
  },
  {
    name: 'REST API',
    description: 'Generic REST API connector',
    icon: Terminal,
    category: 'Development',
    popularity: 'Low'
  },
]

export default function ConnectToolsPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Integration Hub"
        subtitle="Tool Connectivity"
        breadcrumbs={[{ label: 'Build', href: '/connect-tools' }, { label: 'Tools' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Active Integrations</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              {connectedTools.length} tools connected • 99.9% uptime
            </p>
          </div>
          <Button className="rounded-none h-10 px-6">
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>

        {/* Connected Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {connectedTools.map((tool) => (
            <Card key={tool.name} className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-40 group hover:border-foreground/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/50 rounded-none">
                    <tool.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{tool.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-emerald-500 font-mono uppercase tracking-wider">Connected</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">Last Sync</p>
                  <p className="text-sm font-mono mt-0.5">{tool.lastSync}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">Events (24h)</p>
                  <p className="text-sm font-mono mt-0.5">{tool.events.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Available Tools Section */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">Available Connectors</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  className="h-8 w-64 bg-background border border-border pl-8 pr-3 text-xs focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <Button variant="outline" size="sm" className="rounded-none h-8 border-dashed">
                <Filter className="w-3 h-3 mr-2" /> Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTools.map((tool) => (
              <Card key={tool.name} className="border-border bg-card rounded-none p-0 group hover:border-foreground/30 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-secondary/30 rounded-none group-hover:bg-secondary/60 transition-colors">
                      <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
                      {tool.category}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-base mb-1">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 h-8">
                    {tool.description}
                  </p>

                  <Button variant="outline" className="w-full rounded-none h-8 text-xs border-dashed group-hover:border-solid group-hover:bg-secondary/50">
                    <Plus className="w-3 h-3 mr-2" /> Connect
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Custom Tool Card */}
            <Card className="border-border bg-card rounded-none p-0 group border-dashed hover:border-foreground/30 transition-all duration-300 flex flex-col justify-center items-center text-center min-h-[180px]">
              <CardContent className="p-5 flex flex-col items-center">
                <div className="p-3 bg-secondary/30 rounded-full mb-3 group-hover:bg-secondary/60 transition-colors">
                  <Code2 className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
                </div>
                <h3 className="font-bold text-base mb-1">Custom Integration</h3>
                <p className="text-xs text-muted-foreground mb-4 max-w-[200px]">
                  Connect any external API or service using our SDK
                </p>
                <Button variant="ghost" size="sm" className="rounded-none h-8 text-xs hover:bg-secondary">
                  View Documentation <ArrowUpRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
