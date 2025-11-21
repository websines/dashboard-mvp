'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Activity, TrendingUp, Zap, Clock, CheckCircle2, AlertCircle,
  ArrowUpRight, MoreHorizontal, Layers, Bot, Cpu, Server,
  Shield, Database, Terminal, PlayCircle, PauseCircle, StopCircle,
  LayoutDashboard, GitBranch, Network
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { motion } from 'framer-motion'
import { workflows, WorkflowTask } from './workflows/data'

// Aggregated Data Calculation
const totalWorkflows = workflows.length
const activeWorkflowsCount = workflows.filter(w => w.status === 'active').length
const totalExecutions = workflows.reduce((acc, w) => acc + w.executions, 0)
const avgSuccessRate = Math.round(workflows.reduce((acc, w) => acc + w.successRate, 0) / totalWorkflows)

// Task Aggregation
const allTasks = workflows.flatMap(w => w.tasks.map(t => ({ ...t, workflowName: w.name })))
const tasksByStatus = {
  backlog: allTasks.filter(t => t.column === 'backlog').length,
  in_progress: allTasks.filter(t => t.column === 'in_progress').length,
  review: allTasks.filter(t => t.column === 'review').length,
  done: allTasks.filter(t => t.column === 'done').length,
}

const taskStatusData = [
  { name: 'Backlog', value: tasksByStatus.backlog, color: '#64748b' }, // Slate 500
  { name: 'In Progress', value: tasksByStatus.in_progress, color: '#3b82f6' }, // Blue 500
  { name: 'Review', value: tasksByStatus.review, color: '#eab308' }, // Yellow 500
  { name: 'Done', value: tasksByStatus.done, color: '#10b981' }, // Emerald 500
]

// Mock Performance Data (Enhanced)
const performanceData = [
  { time: '00:00', success: 94, latency: 110, load: 45 },
  { time: '04:00', success: 96, latency: 105, load: 30 },
  { time: '08:00', success: 92, latency: 135, load: 75 },
  { time: '12:00', success: 98, latency: 90, load: 85 },
  { time: '16:00', success: 95, latency: 115, load: 60 },
  { time: '20:00', success: 97, latency: 100, load: 40 },
  { time: '24:00', success: 98, latency: 95, load: 35 },
]

const activeAgents = [
  { name: 'Supervisor Agent', status: 'active', load: 68, type: 'Orchestrator', task: 'Managing TechFlow Support' },
  { name: 'Ticket Classifier', status: 'working', load: 82, type: 'Worker', task: 'Categorizing Support Tickets' },
  { name: 'Response Composer', status: 'active', load: 91, type: 'Worker', task: 'Drafting Customer Response' },
  { name: 'Knowledge Retriever', status: 'active', load: 73, type: 'Worker', task: 'Searching Help Documentation' },
  { name: 'Compliance Validator', status: 'active', load: 24, type: 'Security', task: 'Enforcing Business Rules' },
  { name: 'Integration Helper', status: 'idle', load: 8, type: 'Worker', task: 'Standby for API Issues' },
]

export default function DashboardPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header title="Overview" subtitle="System Status" showDeployButton={true} />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Hero Metrics - HUD Style */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {[
            { label: 'Active Workflows', value: activeWorkflowsCount, total: totalWorkflows, icon: Network, color: 'text-blue-500' },
            { label: 'Success Rate', value: `${avgSuccessRate}%`, trend: '+1.2%', icon: Activity, color: 'text-emerald-500' },
            { label: 'Total Executions', value: totalExecutions.toLocaleString(), trend: '+124', icon: Zap, color: 'text-amber-500' },
            { label: 'Active Agents', value: '6', sub: '1 Idle', icon: Bot, color: 'text-purple-500' },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card p-6 hover:bg-accent/5 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 bg-background border border-border/50", metric.color)}>
                  <metric.icon className="h-4 w-4" />
                </div>
                {metric.trend && (
                  <span className={cn("text-[10px] font-mono font-bold px-2 py-1 bg-background border border-border/50 flex items-center gap-1", metric.color)}>
                    <ArrowUpRight className="h-3 w-3" />
                    {metric.trend}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-foreground font-mono">{metric.value}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{metric.label}</p>
                  {metric.total && <span className="text-[10px] text-muted-foreground font-mono">/ {metric.total}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Task Summary & Performance */}
          <div className="lg:col-span-2 space-y-8">

            {/* Task Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-border bg-card rounded-none">
                <CardHeader className="border-b border-border py-4 px-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" />
                      Global Task Matrix
                    </CardTitle>
                    <Badge variant="outline" className="rounded-none font-mono text-[10px]">
                      {allTasks.length} TASKS
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Donut Chart */}
                    <div className="h-[200px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={taskStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="hsl(var(--background))"
                            strokeWidth={2}
                          >
                            {taskStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              borderColor: 'hsl(var(--border))',
                              borderRadius: '0px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '12px',
                              textTransform: 'uppercase'
                            }}
                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                        <span className="text-4xl font-bold font-mono tracking-tighter">{tasksByStatus.in_progress}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Active</span>
                      </div>
                    </div>

                    {/* Legend / Stats */}
                    <div className="space-y-5">
                      {taskStatusData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2" style={{ backgroundColor: item.color }} />
                            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32 h-1 bg-secondary overflow-hidden">
                              <div
                                className="h-full transition-all duration-500"
                                style={{ width: `${(item.value / allTasks.length) * 100}%`, backgroundColor: item.color }}
                              />
                            </div>
                            <span className="text-xs font-mono font-bold w-8 text-right">{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-border bg-card rounded-none">
                <CardHeader className="border-b border-border py-4 px-6">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-primary" />
                      System Load & Latency
                    </CardTitle>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                        <div className="w-2 h-2 bg-primary" /> LOAD
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                        <div className="w-2 h-2 bg-violet-500" /> LATENCY
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis
                          dataKey="time"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                          dy={10}
                          fontFamily="var(--font-mono)"
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                          dx={-10}
                          fontFamily="var(--font-mono)"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: '0px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            textTransform: 'uppercase'
                          }}
                          itemStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Area
                          type="step"
                          dataKey="load"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorLoad)"
                        />
                        <Area
                          type="monotone"
                          dataKey="latency"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          fillOpacity={0}
                          strokeDasharray="4 4"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>

          {/* Right Column: Active Agents & Recent Tasks */}
          <div className="space-y-8">

            {/* Active Agents List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-border bg-card rounded-none h-full flex flex-col">
                <CardHeader className="border-b border-border py-4 px-5 bg-muted/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
                      <Bot className="h-4 w-4 text-primary" />
                      Agent Status
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] text-emerald-500 font-mono tracking-wider">ONLINE</span>
                    </div>
                  </div>
                </CardHeader>
                <div className="divide-y divide-border">
                  {activeAgents.map((agent, i) => (
                    <div key={i} className="p-4 hover:bg-muted/20 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors font-mono">{agent.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{agent.type}</p>
                        </div>
                        <Badge variant="outline" className={cn(
                          "text-[9px] uppercase rounded-none border-0",
                          agent.status === 'active' ? "bg-emerald-500/10 text-emerald-500" :
                            agent.status === 'working' ? "bg-blue-500/10 text-blue-500" : "bg-slate-500/10 text-slate-500"
                        )}>
                          {agent.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[9px] text-muted-foreground uppercase tracking-widest font-mono">
                          <span>Current Task</span>
                          <span>{agent.load}% Load</span>
                        </div>
                        <div className="text-xs font-mono bg-background border border-border p-2 truncate text-muted-foreground">
                          {'>'} {agent.task}
                        </div>
                        <div className="h-0.5 w-full bg-secondary overflow-hidden">
                          <div
                            className={cn("h-full transition-all duration-1000",
                              agent.load > 90 ? "bg-red-500" : agent.load > 70 ? "bg-amber-500" : "bg-emerald-500"
                            )}
                            style={{ width: `${agent.load}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Tasks Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-border bg-card rounded-none">
                <CardHeader className="border-b border-border py-4 px-5 bg-muted/10">
                  <h3 className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-primary" />
                    Recent Activity
                  </h3>
                </CardHeader>
                <div className="max-h-[300px] overflow-y-auto p-0">
                  {allTasks.slice(0, 5).map((task, i) => (
                    <div key={task.id} className="p-3 border-b border-border last:border-0 hover:bg-muted/20 transition-colors flex gap-3 items-start group">
                      <div className={cn(
                        "mt-1.5 w-1.5 h-1.5 rounded-none flex-shrink-0",
                        task.column === 'done' ? "bg-emerald-500" :
                          task.column === 'in_progress' ? "bg-blue-500" :
                            task.column === 'review' ? "bg-amber-500" : "bg-slate-500"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate font-mono group-hover:text-primary transition-colors">{task.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">{task.workflowName}</span>
                          <span className="text-[10px] text-border">•</span>
                          <span className="text-[10px] text-muted-foreground truncate">{task.assignee || 'Unassigned'}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-muted-foreground whitespace-nowrap opacity-50 group-hover:opacity-100 transition-opacity">2m</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

          </div>
        </section>

      </main>
    </div>
  )
}
