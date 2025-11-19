'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link2, Bot, BookOpen, ArrowRight, CheckCircle2, Plus, Network, Unplug, RefreshCw, Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

const agents = [
  {
    id: 'ag-001',
    name: 'Customer Support Agent',
    type: 'Conversational',
    status: 'active',
    connectedKnowledge: 3,
    lastSync: '2m ago',
  },
  {
    id: 'ag-002',
    name: 'Sales Assistant',
    type: 'Task Automation',
    status: 'active',
    connectedKnowledge: 2,
    lastSync: '1h ago',
  },
  {
    id: 'ag-003',
    name: 'Technical Support',
    type: 'Knowledge',
    status: 'idle',
    connectedKnowledge: 5,
    lastSync: '5m ago',
  },
]

const knowledgeSources = [
  {
    id: 'ks-001',
    name: 'Product Documentation',
    type: 'documents',
    items: 245,
    connected: ['Customer Support Agent', 'Technical Support'],
    vectorSize: '12MB',
  },
  {
    id: 'ks-002',
    name: 'FAQ Database',
    type: 'database',
    items: 432,
    connected: ['Customer Support Agent'],
    vectorSize: '4MB',
  },
  {
    id: 'ks-003',
    name: 'Company Website',
    type: 'website',
    items: 89,
    connected: ['Sales Assistant'],
    vectorSize: '8MB',
  },
  {
    id: 'ks-004',
    name: 'Support Tickets Archive',
    type: 'database',
    items: 1240,
    connected: ['Technical Support'],
    vectorSize: '45MB',
  },
  {
    id: 'ks-005',
    name: 'Product Catalog',
    type: 'database',
    items: 156,
    connected: ['Sales Assistant'],
    vectorSize: '2MB',
  },
]

export default function ConnectKnowledgePage() {
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
        title="Knowledge Graph"
        subtitle="Agent-Knowledge Binding"
        breadcrumbs={[{ label: 'Knowledge', href: '/knowledge-base' }, { label: 'Connect' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Active Bindings</p>
                <h3 className="text-2xl font-bold mt-1">10</h3>
              </div>
              <Network className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="w-full bg-secondary h-1 mt-4">
              <div className="bg-foreground h-full w-[80%]" />
            </div>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Orphaned Sources</p>
                <h3 className="text-2xl font-bold mt-1">0</h3>
              </div>
              <Unplug className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-emerald-500 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> All sources connected
            </p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Sync Status</p>
                <h3 className="text-2xl font-bold mt-1">Healthy</h3>
              </div>
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Last global sync: 2m ago</p>
          </Card>
        </div>

        {/* Matrix View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Agents List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Target Agents</h2>
              <Button variant="outline" size="sm" className="rounded-none h-8 border-dashed">
                <Plus className="w-3 h-3 mr-2" /> New Agent
              </Button>
            </div>

            <div className="space-y-3">
              {agents.map((agent) => (
                <Card key={agent.id} className="border-border bg-card rounded-none p-4 hover:bg-muted/20 transition-colors cursor-pointer group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-foreground transition-colors" />
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-none">
                        <Bot className="w-4 h-4 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{agent.name}</h3>
                        <p className="text-xs text-muted-foreground font-mono">{agent.id}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-wider">
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pl-11">
                    <span>{agent.type}</span>
                    <span className="font-mono">{agent.connectedKnowledge} sources</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Knowledge Sources & Connections */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Knowledge Matrix</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="rounded-none h-8">
                  <Filter className="w-3 h-3 mr-2" /> Filter
                </Button>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search sources..."
                    className="h-8 w-64 bg-background border border-border pl-8 pr-3 text-xs focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>
            </div>

            <Card className="border-border bg-card rounded-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/30 border-b border-border text-xs uppercase font-mono text-muted-foreground">
                    <tr>
                      <th className="p-4 font-medium">Source Name</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Vectors</th>
                      <th className="p-4 font-medium">Connected Agents</th>
                      <th className="p-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {knowledgeSources.map((source) => (
                      <tr key={source.id} className="group hover:bg-muted/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{source.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground capitalize text-xs">{source.type}</td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">{source.vectorSize}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-2">
                            {source.connected.map((agent) => (
                              <Badge key={agent} variant="secondary" className="rounded-none text-[10px] bg-muted text-muted-foreground border-border">
                                <Link2 className="w-3 h-3 mr-1" />
                                {agent}
                              </Badge>
                            ))}
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 rounded-none border border-dashed border-muted-foreground/50 text-muted-foreground hover:text-foreground hover:border-foreground">
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" className="rounded-none h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Unplug className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}
