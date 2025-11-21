'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  GitBranch,
  Shield,
  Zap,
  Bot,
  AlertCircle,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Plus,
  ArrowRight,
  Activity,
  Search,
  Filter,
  Cpu,
  Network,
  FileText,
  BrainCircuit
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// Mock Data for Supervisor
const kanbanColumns = [
  { id: 'monitoring', title: 'Monitoring', color: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
  { id: 'optimizing', title: 'Optimizing', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { id: 'shadow_testing', title: 'Shadow Testing', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
  { id: 'ab_testing', title: 'A/B Testing', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  { id: 'distilling', title: 'Distilling', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  { id: 'deployed', title: 'Deployed', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
]

const initialTasks = [
  { id: 't1', title: 'TechFlow Response Composer', type: 'Optimization', column: 'monitoring', priority: 'high', assignee: 'Supervisor Agent' },
  { id: 't2', title: 'Integration Helper - API v3 Update', type: 'Fix', column: 'optimizing', priority: 'critical', assignee: 'Supervisor Agent' },
  { id: 't3', title: 'Proactive Version Check v2.5', type: 'Experiment', column: 'shadow_testing', priority: 'high', assignee: 'Supervisor Agent' },
  { id: 't4', title: 'Ticket Classifier (Distill)', type: 'Distillation', column: 'distilling', priority: 'high', assignee: 'Supervisor Agent' },
  { id: 't5', title: 'Variable Response Timing', type: 'Deployment', column: 'deployed', priority: 'medium', assignee: 'Supervisor Agent' },
  { id: 't6', title: 'Context Gatherer Optimization', type: 'Optimization', column: 'deployed', priority: 'low', assignee: 'Supervisor Agent' },
  { id: 't7', title: 'Response Length A/B Test', type: 'Experiment', column: 'ab_testing', priority: 'medium', assignee: 'Supervisor Agent' },
]

const liveFeed = [
  { id: 1, time: 'Just now', message: 'TechFlow Ticket #1847: Compliance Validator passed 8/8 rules. Response sent.', type: 'success' },
  { id: 2, time: '2m ago', message: 'A/B Test "Response Length" reached 20% traffic. Monitoring CSAT metrics.', type: 'info' },
  { id: 3, time: '5m ago', message: 'Ticket Classifier distillation ready: 1.2% error rate. Savings: $279/mo.', type: 'success' },
  { id: 4, time: '12m ago', message: 'New edge case: Subscription pause for medical leave. Pattern recorded.', type: 'warning' },
]

// Mock Data for Decision Logs - TechFlow
const decisionLogs = [
  { id: 'DL-1024', time: '10:42:15', type: 'Intervention', agent: 'Response Composer', context: 'Refund >$500 detected in draft', outcome: 'Escalated to Finance Team', confidence: 1.00 },
  { id: 'DL-1023', time: '10:38:00', type: 'Optimization', agent: 'Context Gatherer', context: 'Empty CRM queries detected (78%)', outcome: 'Skip empty HubSpot calls', confidence: 0.95 },
  { id: 'DL-1022', time: '10:35:22', type: 'Allocation', agent: 'Knowledge Retriever', context: 'High search latency (2.8s avg)', outcome: 'Enabled vector cache', confidence: 0.89 },
  { id: 'DL-1021', time: '10:30:10', type: 'Distillation', agent: 'Ticket Classifier', context: 'Error rate 1.2% (below 3% threshold)', outcome: 'Initiated model distillation', confidence: 0.98 },
  { id: 'DL-1020', time: '10:15:45', type: 'Security', agent: 'Compliance Validator', context: 'GDPR data request detected', outcome: 'Routed to Legal (72h SLA)', confidence: 1.00 },
  { id: 'DL-1019', time: '10:10:05', type: 'A/B Test', agent: 'Response Composer', context: 'Friendly greeting test complete', outcome: 'Promoted Variant B (+9.5% CSAT)', confidence: 0.94 },
]

export default function SupervisorPage() {
  const { sidebarCollapsed } = useDashboardStore()
  const [tasks, setTasks] = useState(initialTasks)
  const [activeTab, setActiveTab] = useState("orchestration")

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="TechFlow Supervisor Agent"
        subtitle="Autonomous orchestration | 12 versions deployed | 2 agents created autonomously"
        breadcrumbs={[{ label: 'Supervisor' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Top Stats / HUD */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
          {[
            { label: 'Active Optimizations', value: '12', icon: Zap, color: 'text-blue-500' },
            { label: 'A/B Tests Running', value: '4', icon: GitBranch, color: 'text-purple-500' },
            { label: 'Distillation Jobs', value: '2', icon: Cpu, color: 'text-amber-500' },
            { label: 'System Health', value: '99.9%', icon: Activity, color: 'text-emerald-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-card p-6 flex items-center justify-between group hover:bg-accent/5 transition-colors">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold font-mono mt-1">{stat.value}</h3>
              </div>
              <div className={cn("p-2 rounded-full bg-background border border-border/50", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/20 border border-border p-1 rounded-none h-10">
              <TabsTrigger
                value="orchestration"
                className="rounded-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm text-xs font-mono uppercase tracking-wider px-4"
              >
                <LayoutDashboard className="w-3 h-3 mr-2" />
                Orchestration
              </TabsTrigger>
              <TabsTrigger
                value="logs"
                className="rounded-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm text-xs font-mono uppercase tracking-wider px-4"
              >
                <FileText className="w-3 h-3 mr-2" />
                Decision Logs
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="w-3 h-3 mr-2" /> Filter
              </Button>
              <Button size="sm" className="h-8">
                <Plus className="w-3 h-3 mr-2" /> New Directive
              </Button>
            </div>
          </div>

          <TabsContent value="orchestration" className="m-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Kanban Board */}
              <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-[600px]">
                  {kanbanColumns.map(column => (
                    <div key={column.id} className="flex flex-col h-full bg-muted/10 rounded-lg border border-border/50">
                      <div className={cn("p-3 border-b border-border/50 flex items-center justify-between", column.color)}>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider">{column.title}</span>
                        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-background/50 backdrop-blur-sm border-0">
                          {tasks.filter(t => t.column === column.id).length}
                        </Badge>
                      </div>
                      <div className="p-2 flex-1 overflow-y-auto space-y-2">
                        {tasks.filter(t => t.column === column.id).map(task => (
                          <motion.div
                            key={task.id}
                            layoutId={task.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card border border-border p-3 rounded shadow-sm hover:border-primary/50 cursor-pointer group transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="outline" className={cn(
                                "text-[9px] uppercase tracking-wider rounded-none border-0 px-1.5",
                                task.priority === 'critical' ? "bg-red-500/10 text-red-500" :
                                  task.priority === 'high' ? "bg-orange-500/10 text-orange-500" :
                                    "bg-blue-500/10 text-blue-500"
                              )}>
                                {task.priority}
                              </Badge>
                              <MoreHorizontal className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h4 className="text-xs font-medium font-mono leading-tight mb-2">{task.title}</h4>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                              <Bot className="w-3 h-3" />
                              <span className="truncate">{task.assignee}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Sidebar: Live Feed & Hierarchy */}
              <div className="space-y-6">
                {/* Live Feed */}
                <Card className="border-border bg-card rounded-none h-[400px] flex flex-col">
                  <CardHeader className="border-b border-border py-3 px-4 bg-muted/10">
                    <CardTitle className="text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                      <Network className="w-4 h-4 text-primary" />
                      Supervisor Log
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 overflow-y-auto">
                    <div className="divide-y divide-border/50">
                      {liveFeed.map((log) => (
                        <div key={log.id} className="p-3 hover:bg-muted/20 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0",
                              log.type === 'alert' ? "bg-red-500 animate-pulse" :
                                log.type === 'success' ? "bg-emerald-500" :
                                  log.type === 'warning' ? "bg-amber-500" : "bg-blue-500"
                            )} />
                            <div>
                              <p className="text-[10px] font-mono text-muted-foreground mb-0.5">{log.time}</p>
                              <p className="text-xs leading-snug">{log.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Hierarchy Mini-View */}
                <Card className="border-border bg-card rounded-none">
                  <CardHeader className="border-b border-border py-3 px-4 bg-muted/10">
                    <CardTitle className="text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                      <Bot className="w-4 h-4 text-primary" />
                      Agent Hierarchy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="relative pl-2">
                      <div className="absolute left-[11px] top-6 bottom-6 w-px bg-border" />
                      <div className="flex items-center gap-3 mb-4 relative z-10">
                        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center border border-primary/50">
                          <Bot className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-xs font-bold font-mono">Supervisor Alpha</span>
                      </div>
                      <div className="space-y-3 pl-6">
                        {['Writer Unit', 'Research Unit', 'Reviewer Unit'].map((agent, i) => (
                          <div key={i} className="flex items-center gap-3 relative">
                            <div className="absolute -left-[13px] top-1/2 w-3 h-px bg-border" />
                            <div className="w-5 h-5 rounded bg-muted flex items-center justify-center border border-border">
                              <Bot className="w-2.5 h-2.5 text-muted-foreground" />
                            </div>
                            <span className="text-xs text-muted-foreground font-mono">{agent}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="m-0">
            <Card className="border-border bg-card rounded-none">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search decision logs..."
                    className="h-8 w-[300px] bg-background border-border"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-none font-mono text-[10px]">Last 24 Hours</Badge>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/30 border-b border-border text-xs uppercase font-mono text-muted-foreground">
                    <tr>
                      <th className="p-4 font-medium">Log ID</th>
                      <th className="p-4 font-medium">Time</th>
                      <th className="p-4 font-medium">Decision Type</th>
                      <th className="p-4 font-medium">Agent</th>
                      <th className="p-4 font-medium">Context</th>
                      <th className="p-4 font-medium">Outcome</th>
                      <th className="p-4 font-medium text-right">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {decisionLogs.map((log) => (
                      <tr key={log.id} className="group hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-mono text-xs text-muted-foreground">{log.id}</td>
                        <td className="p-4 font-mono text-xs">{log.time}</td>
                        <td className="p-4">
                          <Badge variant="outline" className={cn(
                            "rounded-none text-[10px] uppercase tracking-wider font-mono border-0",
                            log.type === 'Intervention' ? "text-red-500 bg-red-500/10" :
                              log.type === 'Optimization' ? "text-blue-500 bg-blue-500/10" :
                                log.type === 'Security' ? "text-orange-500 bg-orange-500/10" :
                                  log.type === 'A/B Test' ? "text-purple-500 bg-purple-500/10" :
                                    "text-emerald-500 bg-emerald-500/10"
                          )}>
                            {log.type}
                          </Badge>
                        </td>
                        <td className="p-4 text-xs">{log.agent}</td>
                        <td className="p-4 text-xs text-muted-foreground max-w-[250px] truncate" title={log.context}>
                          {log.context}
                        </td>
                        <td className="p-4 text-xs font-medium">{log.outcome}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${log.confidence * 100}%` }}
                              />
                            </div>
                            <span className="font-mono text-xs">{(log.confidence * 100).toFixed(0)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

      </main>
    </div>
  )
}
