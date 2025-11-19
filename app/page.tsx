'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  Activity,
  TrendingUp,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  MoreHorizontal,
  Layers,
  Bot,
  Cpu
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { motion } from 'framer-motion'

// Mock Data for "Award Winning" Charts
const performanceData = [
  { time: '00:00', success: 92, latency: 120 },
  { time: '04:00', success: 94, latency: 115 },
  { time: '08:00', success: 91, latency: 140 },
  { time: '12:00', success: 98, latency: 95 },
  { time: '16:00', success: 96, latency: 105 },
  { time: '20:00', success: 95, latency: 110 },
  { time: '24:00', success: 97, latency: 100 },
]

const activityData = [
  { day: 'Mon', tasks: 1450 },
  { day: 'Tue', tasks: 2300 },
  { day: 'Wed', tasks: 1800 },
  { day: 'Thu', tasks: 2600 },
  { day: 'Fri', tasks: 3100 },
  { day: 'Sat', tasks: 1200 },
  { day: 'Sun', tasks: 900 },
]

const activeAgents = [
  { name: 'Supervisor Alpha', status: 'active', load: 45, type: 'Orchestrator' },
  { name: 'Research Unit-01', status: 'working', load: 82, type: 'Worker' },
  { name: 'Writer Unit-04', status: 'idle', load: 0, type: 'Worker' },
  { name: 'Reviewer Unit-02', status: 'active', load: 23, type: 'Worker' },
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
      <Header title="Overview" subtitle="System Healthy" showDeployButton={true} />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Hero Metrics - "The Pulse" */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Workflows', value: '124', trend: '+12%', icon: Activity, color: 'text-foreground' },
            { label: 'Avg. Success Rate', value: '98.2%', trend: '+0.4%', icon: CheckCircle2, color: 'text-foreground' },
            { label: 'System Latency', value: '104ms', trend: '-12ms', icon: Zap, color: 'text-foreground' },
            { label: 'Cost Savings', value: '$14.2k', trend: 'This Month', icon: TrendingUp, color: 'text-foreground' },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5 border-border bg-card hover:bg-secondary/50 transition-colors group rounded-none">
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-2 bg-secondary text-foreground")}>
                    <metric.icon className="h-4 w-4" />
                  </div>
                  <span className={cn("text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-secondary text-muted-foreground flex items-center gap-1")}>
                    {metric.trend.startsWith('+') && <ArrowUpRight className="h-3 w-3" />}
                    {metric.trend}
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-medium tracking-tight text-foreground font-sans">{metric.value}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mt-2">{metric.label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* Main Visualization Area */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">

          {/* Chart: System Performance */}
          <motion.div
            className="lg:col-span-2 h-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full p-6 border-border/50 bg-card/50 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold">System Performance</h2>
                  <p className="text-sm text-muted-foreground">Real-time latency vs success rate</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">1H</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-muted transition-colors text-muted-foreground">24H</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-muted transition-colors text-muted-foreground">7D</button>
                </div>
              </div>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(150 100% 50%)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(150 100% 50%)" stopOpacity={0} />
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
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0px',
                        boxShadow: 'none'
                      }}
                      itemStyle={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                    />
                    <Area
                      type="step"
                      dataKey="success"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={1}
                      fillOpacity={1}
                      fill="url(#colorSuccess)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Agent Status List */}
          <motion.div
            className="lg:col-span-1 h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full p-0 border-border bg-card overflow-hidden flex flex-col rounded-none">
              <div className="p-4 border-b border-border bg-muted/30">
                <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Bot className="h-3 w-3" />
                  Active Processes
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-0">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-muted/20 text-muted-foreground sticky top-0">
                    <tr>
                      <th className="p-2 font-medium">ID</th>
                      <th className="p-2 font-medium">STATUS</th>
                      <th className="p-2 font-medium text-right">LOAD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {activeAgents.map((agent, i) => (
                      <tr key={i} className="group hover:bg-muted/50 transition-colors">
                        <td className="p-2 text-foreground">
                          <span className="text-muted-foreground mr-1">./</span>{agent.name.toLowerCase().replace(' ', '_')}
                        </td>
                        <td className="p-2">
                          <span className={cn(
                            "px-1.5 py-0.5 rounded-sm text-[10px] uppercase",
                            agent.status === 'active' ? "bg-emerald-500/10 text-emerald-500" :
                              agent.status === 'working' ? "bg-blue-500/10 text-blue-500" : "bg-slate-500/10 text-slate-500"
                          )}>
                            {agent.status}
                          </span>
                        </td>
                        <td className="p-2 text-right text-foreground">
                          {agent.load}%
                        </td>
                      </tr>
                    ))}
                    {/* Fills */}
                    {[...Array(5)].map((_, i) => (
                      <tr key={`fill-${i}`} className="opacity-20">
                        <td className="p-2 text-muted-foreground">--</td>
                        <td className="p-2 text-muted-foreground">IDLE</td>
                        <td className="p-2 text-right text-muted-foreground">0%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Secondary Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Task Volume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 border-border/50 bg-card/50">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Task Volume (7D)</h3>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <Bar
                      dataKey="tasks"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      opacity={0.8}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full p-6 border-border/50 bg-card/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">System Alerts</h3>
                <button className="text-xs text-primary hover:underline">Clear All</button>
              </div>
              <div className="space-y-4">
                {[
                  { msg: "High latency detected in Research Unit-01", time: "2m ago", type: "warning" },
                  { msg: "New scenario discovered: 'Candidate Ghosting'", time: "15m ago", type: "info" },
                  { msg: "Supervisor auto-scaled worker pool (+2 nodes)", time: "1h ago", type: "success" }
                ].map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-background/50 border border-border/50">
                    {alert.type === 'warning' && <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />}
                    {alert.type === 'info' && <Zap className="h-4 w-4 text-blue-500 mt-0.5" />}
                    {alert.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{alert.msg}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </section>

      </main>
    </div>
  )
}
