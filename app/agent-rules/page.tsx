'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BrainCircuit, Plus, Shield, AlertTriangle, CheckCircle2, Edit, Filter, Search, MoreHorizontal, Scale, Lock, AlertOctagon, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const rules = [
  {
    id: 'rl-001',
    name: 'Compliance Check',
    description: 'Ensure all responses meet regulatory requirements',
    status: 'active',
    priority: 'high',
    triggers: 3420,
    category: 'Safety',
    lastTriggered: '2m ago',
  },
  {
    id: 'rl-002',
    name: 'PII Detection',
    description: 'Automatically redact personal identifiable information',
    status: 'active',
    priority: 'critical',
    triggers: 1250,
    category: 'Security',
    lastTriggered: '1h ago',
  },
  {
    id: 'rl-003',
    name: 'Tone Adjustment',
    description: 'Maintain professional and friendly communication style',
    status: 'active',
    priority: 'medium',
    triggers: 8900,
    category: 'Quality',
    lastTriggered: '5m ago',
  },
  {
    id: 'rl-004',
    name: 'Error Handling',
    description: 'Gracefully handle unexpected inputs and errors',
    status: 'active',
    priority: 'high',
    triggers: 450,
    category: 'Reliability',
    lastTriggered: '1d ago',
  },
  {
    id: 'rl-005',
    name: 'Context Retention',
    description: 'Remember conversation context across interactions',
    status: 'testing',
    priority: 'medium',
    triggers: 120,
    category: 'Intelligence',
    lastTriggered: '30m ago',
  },
]

export default function AgentRulesPage() {
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
        title="Governance"
        subtitle="Behavioral Controls"
        breadcrumbs={[{ label: 'Training', href: '/agent-rules' }, { label: 'Rules' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Policy Engine</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Enforcing {rules.length} active behavioral protocols
            </p>
          </div>
          <Button className="rounded-none h-10 px-6">
            <Plus className="w-4 h-4 mr-2" />
            New Rule
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Active Policies</p>
                <h3 className="text-2xl font-bold mt-1">{rules.filter(r => r.status === 'active').length}</h3>
              </div>
              <Shield className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="w-full bg-secondary h-1 mt-4">
              <div className="bg-foreground h-full w-[80%]" />
            </div>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Enforcement Rate</p>
                <h3 className="text-2xl font-bold mt-1">99.9%</h3>
              </div>
              <Scale className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-emerald-500 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> System Compliant
            </p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Triggers</p>
                <h3 className="text-2xl font-bold mt-1">
                  {rules.reduce((sum, r) => sum + r.triggers, 0).toLocaleString()}
                </h3>
              </div>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Last 24 hours</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Critical Alerts</p>
                <h3 className="text-2xl font-bold mt-1">0</h3>
              </div>
              <AlertOctagon className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">No active threats</p>
          </Card>
        </div>

        {/* Rules Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search policies..."
                  className="h-8 w-64 bg-background border border-border pl-8 pr-3 text-xs focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <Button variant="outline" size="sm" className="rounded-none h-8 border-dashed">
                <Filter className="w-3 h-3 mr-2" /> Filter
              </Button>
            </div>
          </div>

          <Card className="border-border bg-card rounded-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30 border-b border-border text-xs uppercase font-mono text-muted-foreground">
                  <tr>
                    <th className="p-4 font-medium w-[300px]">Policy Name</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Priority</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Triggers</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {rules.map((rule) => (
                    <tr key={rule.id} className="group hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {rule.category === 'Security' ? <Lock className="w-4 h-4 text-muted-foreground" /> :
                              rule.category === 'Safety' ? <Shield className="w-4 h-4 text-muted-foreground" /> :
                                <BrainCircuit className="w-4 h-4 text-muted-foreground" />}
                          </div>
                          <div>
                            <span className="font-medium text-foreground block">{rule.name}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">{rule.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-wider font-mono">
                          {rule.category}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-none text-[10px] uppercase tracking-wider font-mono border-0",
                            rule.priority === 'critical' ? "text-red-500 bg-red-500/10" :
                              rule.priority === 'high' ? "text-orange-500 bg-orange-500/10" :
                                "text-blue-500 bg-blue-500/10"
                          )}
                        >
                          {rule.priority}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            rule.status === 'active' ? "bg-emerald-500" : "bg-yellow-500"
                          )} />
                          <span className="text-xs capitalize text-muted-foreground">{rule.status}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-mono text-xs">{rule.triggers.toLocaleString()}</span>
                          <span className="text-[10px] text-muted-foreground">{rule.lastTriggered}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" className="rounded-none h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
