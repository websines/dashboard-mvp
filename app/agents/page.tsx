'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  Network,
  Zap,
  Activity,
  TrendingUp,
  Terminal
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { agents } from './data'



export default function AgentsPage() {
  const { sidebarCollapsed } = useDashboardStore()
  const router = useRouter()

  const totalTasks = agents.reduce((sum, a) => sum + a.tasksCompleted, 0)
  const avgSuccessRate = Math.round(agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length)
  const activeAgents = agents.filter(a => a.status === 'active').length

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Agents"
        subtitle="Network Status"
        breadcrumbs={[{ label: 'Agents' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Agents', value: agents.length, icon: Network },
            { label: 'Active Now', value: activeAgents, icon: Activity },
            { label: 'Total Tasks', value: totalTasks.toLocaleString(), icon: Zap },
            { label: 'Avg Success', value: `${avgSuccessRate}%`, icon: TrendingUp },
          ].map((stat, i) => (
            <Card key={i} className="p-5 border-border bg-card rounded-none flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-medium mt-1">{stat.value}</p>
              </div>
              <div className="p-2 bg-secondary text-foreground">
                <stat.icon className="h-4 w-4" />
              </div>
            </Card>
          ))}
        </section>

        {/* Agent List - Terminal Style */}
        <section>
          <Card className="border-border bg-card rounded-none overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">System Agents</h2>
              </div>
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500/20 border border-red-500/50" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <span className="h-2 w-2 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-muted/20 text-muted-foreground border-b border-border">
                  <tr>
                    <th className="p-4 font-medium uppercase tracking-wider">Agent ID</th>
                    <th className="p-4 font-medium uppercase tracking-wider">Type</th>
                    <th className="p-4 font-medium uppercase tracking-wider">Status</th>
                    <th className="p-4 font-medium uppercase tracking-wider">Load</th>
                    <th className="p-4 font-medium uppercase tracking-wider">Latency</th>
                    <th className="p-4 font-medium uppercase tracking-wider">Current Process</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {agents.map((agent) => (
                    <tr
                      key={agent.id}
                      onClick={() => router.push(`/agents/${agent.id}`)}
                      className="group hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <td className="p-4 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <agent.icon className="h-3 w-3 text-muted-foreground" />
                          {agent.name}
                        </div>
                        <span className="text-[10px] text-muted-foreground ml-5">{agent.id}</span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        <span className="px-1.5 py-0.5 bg-secondary border border-border rounded-sm">
                          {agent.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            agent.status === 'active' ? "bg-emerald-500" :
                              agent.status === 'processing' ? "bg-blue-500 animate-pulse" : "bg-slate-500"
                          )} />
                          <span className={cn(
                            agent.status === 'active' ? "text-emerald-500" :
                              agent.status === 'processing' ? "text-blue-500" : "text-muted-foreground"
                          )}>
                            {agent.status.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-foreground">
                        {agent.tasksCompleted} ops
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {agent.averageLatency}
                      </td>
                      <td className="p-4 text-muted-foreground max-w-[300px] truncate">
                        {agent.currentTask ? (
                          <span className="text-foreground">
                            <span className="text-blue-500 mr-2">exec</span>
                            {agent.currentTask}
                          </span>
                        ) : (
                          <span className="opacity-50">-- idle --</span>
                        )}
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
