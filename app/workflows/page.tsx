'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, Clock, User, GitBranch, Play, ArrowRight, Zap, TrendingUp, Bot, MessageSquare, Database, FileText, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

const workflows = [
  {
    id: 1,
    name: 'Customer Onboarding',
    description: 'Automate new customer setup and verification',
    status: 'active',
    executions: 1247,
    successRate: 94,
    avgTime: '2.3m',
    agents: [
      { name: 'Data Collector', type: 'input', icon: Database, status: 'active', tasks: 45 },
      { name: 'Verifier', type: 'process', icon: CheckCircle2, status: 'active', tasks: 38 },
      { name: 'Email Sender', type: 'output', icon: MessageSquare, status: 'active', tasks: 41 },
    ]
  },
  {
    id: 2,
    name: 'Support Ticket Triage',
    description: 'Classify and route support tickets automatically',
    status: 'active',
    executions: 3421,
    successRate: 97,
    avgTime: '0.8m',
    agents: [
      { name: 'Ticket Reader', type: 'input', icon: FileText, status: 'active', tasks: 120 },
      { name: 'Classifier', type: 'process', icon: Bot, status: 'active', tasks: 115 },
      { name: 'Priority Assigner', type: 'process', icon: TrendingUp, status: 'active', tasks: 110 },
      { name: 'Router', type: 'output', icon: GitBranch, status: 'active', tasks: 108 },
    ]
  },
  {
    id: 3,
    name: 'Sales Lead Qualification',
    description: 'Score and qualify incoming sales leads',
    status: 'active',
    executions: 892,
    successRate: 91,
    avgTime: '3.1m',
    agents: [
      { name: 'Lead Collector', type: 'input', icon: Database, status: 'active', tasks: 34 },
      { name: 'Enrichment Agent', type: 'process', icon: Zap, status: 'active', tasks: 30 },
      { name: 'Scoring Agent', type: 'process', icon: TrendingUp, status: 'active', tasks: 28 },
      { name: 'CRM Updater', type: 'output', icon: CheckCircle2, status: 'active', tasks: 27 },
    ]
  },
  {
    id: 4,
    name: 'Document Processing',
    description: 'Extract and index data from uploaded documents',
    status: 'paused',
    executions: 567,
    successRate: 89,
    avgTime: '5.2m',
    agents: [
      { name: 'Document Reader', type: 'input', icon: FileText, status: 'idle', tasks: 0 },
      { name: 'Data Extractor', type: 'process', icon: Database, status: 'idle', tasks: 0 },
      { name: 'Indexer', type: 'output', icon: CheckCircle2, status: 'idle', tasks: 0 },
    ]
  },
]

export default function WorkflowsPage() {
  const { sidebarCollapsed, tasks } = useDashboardStore()

  const columns = ['backlog', 'in-progress', 'review', 'done'] as const

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Customer Onboarding Workflow"
        subtitle="Multi-Agent"
        breadcrumbs={[{ label: 'Workflows' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-4 flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Workflow Pipeline</h1>
          <Badge variant="outline" className="gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs">3 agents active</span>
          </Badge>
        </div>

        {/* Kanban Board */}
        <motion.div
          className="grid grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {columns.map((status, columnIndex) => {
            const config = statusConfig[status]
            const columnTasks = tasks.filter((task) => task.status === status)

            return (
              <motion.div
                key={status}
                className="flex flex-col gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: columnIndex * 0.1 }}
              >
                <div className="flex items-center gap-2 px-2">
                  <config.icon className={cn('h-4 w-4', config.color)} />
                  <h3 className="text-sm font-medium">{config.label}</h3>
                  <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
                    {columnTasks.length}
                  </Badge>
                </div>

                <div className="flex flex-col gap-2">
                  {columnTasks.map((task, taskIndex) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: columnIndex * 0.1 + taskIndex * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-lg hover:shadow-black/10 transition-all cursor-pointer"
                    >
                      <CardHeader className="p-3 pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-tight">
                            {task.title}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {task.agent && (
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{task.agent}</span>
                            </div>
                          )}
                          {task.dependencies && task.dependencies.length > 0 && (
                            <div className="flex items-center gap-1">
                              <GitBranch className="h-3 w-3" />
                              <span>{task.dependencies.length} dep</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    </motion.div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border/40 p-6">
                      <p className="text-xs text-muted-foreground">No tasks</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Workflow Details */}
        <Card className="mt-6 border border-border/60 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <h3 className="text-lg font-semibold">Workflow Details</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
                <p className="text-2xl font-semibold">{tasks.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
                <p className="text-2xl font-semibold">
                  {Math.round((tasks.filter((t) => t.status === 'done').length / tasks.length) * 100)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Agents</p>
                <p className="text-2xl font-semibold">
                  {new Set(tasks.filter((t) => t.agent).map((t) => t.agent)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
