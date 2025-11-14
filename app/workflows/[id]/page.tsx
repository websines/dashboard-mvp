'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Bot, ArrowRight, CheckCircle2, Clock, AlertCircle, Play, Pause,
  TrendingUp, Zap, Activity, MessageSquare, ChevronRight, RefreshCw,
  GitBranch, Sparkles, Eye, Layers, Users, Brain, Mail, FileText,
  Calendar, Shield, Webhook, Target, BrainCircuit
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Kanban board data
const kanbanColumns = [
  { id: 'backlog', title: 'Backlog', color: 'text-gray-400' },
  { id: 'in_progress', title: 'In Progress', color: 'text-blue-400' },
  { id: 'review', title: 'Review', color: 'text-yellow-400' },
  { id: 'done', title: 'Done', color: 'text-green-400' },
]

const tasks = [
  { id: 1, title: 'Verify email address', column: 'in_progress', assignee: 'Data Worker', priority: 'high', phase: 'analysis', dependencies: [] },
  { id: 2, title: 'Validate company domain', column: 'in_progress', assignee: 'API Worker', priority: 'high', phase: 'analysis', dependencies: [1] },
  { id: 3, title: 'Check credit score', column: 'review', assignee: 'Data Worker', priority: 'medium', phase: 'analysis', dependencies: [1] },
  { id: 4, title: 'Update CRM record', column: 'backlog', assignee: null, priority: 'medium', phase: 'implementation', dependencies: [1, 2, 3] },
  { id: 5, title: 'Send welcome email', column: 'backlog', assignee: null, priority: 'low', phase: 'implementation', dependencies: [4] },
  { id: 6, title: 'Create user account', column: 'done', assignee: 'API Worker', priority: 'high', phase: 'implementation', dependencies: [] },
  { id: 7, title: 'Assign account manager', column: 'done', assignee: 'Notification Worker', priority: 'medium', phase: 'validation', dependencies: [6] },
]

// Evolution history
const evolutionHistory = [
  { version: 'v1.0.0', date: 'Oct 15', accuracy: 62, branch: 'main' },
  { version: 'v1.5.2', date: 'Oct 22', accuracy: 71, branch: 'main' },
  { version: 'v2.1.0', date: 'Oct 29', accuracy: 78, branch: 'main' },
  { version: 'v2.8.1', date: 'Nov 5', accuracy: 85, branch: 'experimental' },
  { version: 'v3.0.0', date: 'Nov 12', accuracy: 91, branch: 'main' },
  { version: 'v3.2.1', date: 'Nov 15', accuracy: 94, branch: 'main' },
]

// Workflow phases
const phases = [
  { id: 'analysis', name: 'Analysis', description: 'Gather data & validate requirements', status: 'active', progress: 75 },
  { id: 'implementation', name: 'Implementation', description: 'Execute planned actions', status: 'pending', progress: 0 },
  { id: 'validation', name: 'Validation', description: 'Verify results & quality', status: 'completed', progress: 100 },
]

const recentActivity = [
  { id: 1, time: '2s ago', agent: 'Supervisor', action: 'Moved Task #3 to Review', type: 'move' },
  { id: 2, time: '5s ago', agent: 'Data Worker', action: 'Completed email verification (98% confidence)', type: 'complete' },
  { id: 3, time: '8s ago', agent: 'Guardian', action: 'Coherence check passed (94% alignment)', type: 'check' },
  { id: 4, time: '12s ago', agent: 'Supervisor', action: 'Assigned Task #2 to API Worker', type: 'assign' },
  { id: 5, time: '15s ago', agent: 'Evolution Engine', action: 'Detected optimization opportunity in Task #1', type: 'optimize' },
]

export default function WorkflowDetailPage({ params }: { params: { id: string } }) {
  const { sidebarCollapsed } = useDashboardStore()
  const [selectedPhase, setSelectedPhase] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<'execution' | 'design'>('execution')

  const getTasksByColumn = (columnId: string) => {
    return tasks.filter(task => task.column === columnId)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'analysis': return 'bg-purple-500/20 text-purple-400'
      case 'implementation': return 'bg-blue-500/20 text-blue-400'
      case 'validation': return 'bg-green-500/20 text-green-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        'lg:ml-64',
        sidebarCollapsed && 'lg:ml-16',
        'max-lg:ml-0'
      )}
    >
      <Header
        title="Customer Onboarding"
        subtitle="Self-Improving"
        breadcrumbs={[
          { label: 'Workflows', href: '/workflows' },
          { label: 'Customer Onboarding' }
        ]}
      />

      <main className="mt-16 p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto">
        {/* Top Stats Row */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Current Version</p>
                    <p className="text-xl font-bold text-primary">v3.2.1</p>
                  </div>
                  <GitBranch className="h-8 w-8 text-primary/40" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                    <p className="text-xl font-bold text-green-400">94%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400/40" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Active Tasks</p>
                    <p className="text-xl font-bold">7</p>
                  </div>
                  <Layers className="h-8 w-8 text-blue-400/40" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Agents</p>
                    <p className="text-xl font-bold">3 Workers</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-400/40" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Phase Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Workflow Phases
              </CardTitle>
              <CardDescription>Multi-stage execution pipeline with phase guards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {phases.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all cursor-pointer",
                      phase.status === 'active' && "border-primary/50 bg-primary/5 shadow-[0_0_20px_rgba(103,232,249,0.2)]",
                      phase.status === 'completed' && "border-green-500/50 bg-green-500/5",
                      phase.status === 'pending' && "border-border/40 bg-accent/20"
                    )}
                    onClick={() => setSelectedPhase(phase.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        {phase.status === 'active' && <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
                        {phase.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        {phase.status === 'pending' && <Clock className="h-4 w-4 text-muted-foreground" />}
                        {phase.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">{phase.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{phase.description}</p>
                    <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                      <motion.div
                        className={cn(
                          "h-full",
                          phase.status === 'active' && "bg-gradient-to-r from-primary to-blue-500",
                          phase.status === 'completed' && "bg-green-500",
                          phase.status === 'pending' && "bg-muted"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${phase.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex gap-2 mb-4">
            <Button
              variant={activeTab === 'execution' ? 'default' : 'outline'}
              onClick={() => setActiveTab('execution')}
              className={cn(
                "gap-2",
                activeTab === 'execution' && "bg-primary/20 text-primary border-primary/30"
              )}
            >
              <Activity className="h-4 w-4" />
              Execution View
            </Button>
            <Button
              variant={activeTab === 'design' ? 'default' : 'outline'}
              onClick={() => setActiveTab('design')}
              className={cn(
                "gap-2",
                activeTab === 'design' && "bg-primary/20 text-primary border-primary/30"
              )}
            >
              <Layers className="h-4 w-4" />
              Workflow Design
            </Button>
          </div>

          {activeTab === 'execution' ? (
            // Kanban Board
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary animate-pulse" />
                      Live Execution Board
                    </CardTitle>
                    <CardDescription>Real-time task orchestration with dependency tracking</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-green-500/30 text-green-400">
                      <Sparkles className="h-4 w-4 mr-2" />
                    Evolution: +32%
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {kanbanColumns.map((column, colIndex) => (
                  <div key={column.id} className="space-y-3">
                    <div className={cn("flex items-center gap-2 mb-3")}>
                      <div className={cn("h-2 w-2 rounded-full", column.color.replace('text-', 'bg-'))} />
                      <h3 className={cn("font-semibold text-sm", column.color)}>{column.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {getTasksByColumn(column.id).length}
                      </Badge>
                    </div>

                    <div className="space-y-2 min-h-[200px]">
                      <AnimatePresence>
                        {getTasksByColumn(column.id).map((task, taskIndex) => (
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.6 + colIndex * 0.1 + taskIndex * 0.05 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="p-3 rounded-lg bg-card/60 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all cursor-pointer"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs font-mono text-muted-foreground">#{task.id}</span>
                              <Badge variant="outline" className={cn("text-[10px] h-5 border", getPriorityColor(task.priority))}>
                                {task.priority}
                              </Badge>
                            </div>

                            <p className="text-sm font-medium mb-2">{task.title}</p>

                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="secondary" className={cn("text-[10px] h-5", getPhaseColor(task.phase))}>
                                {task.phase}
                              </Badge>
                              {task.assignee && (
                                <Badge variant="outline" className="text-[10px] h-5 flex items-center gap-1">
                                  <Bot className="h-3 w-3" />
                                  {task.assignee}
                                </Badge>
                              )}
                              {task.dependencies.length > 0 && (
                                <Badge variant="outline" className="text-[10px] h-5 flex items-center gap-1 border-yellow-500/30 text-yellow-400">
                                  <ArrowRight className="h-3 w-3" />
                                  {task.dependencies.length}
                                </Badge>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          ) : (
            // Workflow Design View
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      n8n-Style Workflow Design
                    </CardTitle>
                    <CardDescription>Visual node-based workflow • Modified autonomously by Supervisor Agent</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                      <Sparkles className="h-3 w-3 mr-1" />
                      3 autonomous changes
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative min-h-[600px] bg-gradient-to-br from-accent/20 to-transparent rounded-xl border border-border/40 p-8 overflow-x-auto">
                  {/* Workflow Nodes */}
                  <div className="flex flex-col gap-12 min-w-[1200px]">

                    {/* Trigger Node */}
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <div className="px-6 py-4 rounded-xl border-2 border-green-500/50 bg-green-500/10 shadow-lg shadow-green-500/20">
                          <div className="flex items-center gap-3">
                            <Play className="h-5 w-5 text-green-400" />
                            <div>
                              <div className="font-semibold text-sm">Trigger: New Customer</div>
                              <div className="text-xs text-muted-foreground">Webhook / API Call</div>
                            </div>
                          </div>
                        </div>
                        {/* Connection line down */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 w-0.5 bg-gradient-to-b from-green-500/50 to-purple-500/50" />
                      </motion.div>
                    </div>

                    {/* Planner Node */}
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="relative"
                      >
                        <div className="px-6 py-4 rounded-xl border-2 border-purple-500/50 bg-purple-500/10 shadow-lg shadow-purple-500/20">
                          <div className="flex items-center gap-3">
                            <Brain className="h-5 w-5 text-purple-400" />
                            <div>
                              <div className="font-semibold text-sm">Task Planner Agent</div>
                              <div className="text-xs text-muted-foreground">ROMA decomposition → atomic tasks</div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 w-0.5 bg-gradient-to-b from-purple-500/50 to-cyan-500/50" />
                      </motion.div>
                    </div>

                    {/* Supervisor Node */}
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                      >
                        <div className="px-8 py-5 rounded-xl border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent shadow-xl shadow-cyan-500/30">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <BrainCircuit className="h-6 w-6 text-cyan-400" />
                              <Sparkles className="h-3 w-3 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
                            </div>
                            <div>
                              <div className="font-semibold">Autonomous Supervisor Agent</div>
                              <div className="text-xs text-cyan-300">Orchestrates workers • Self-modifying</div>
                            </div>
                          </div>
                        </div>
                        {/* Connection lines to workers */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 w-[300px] border-t-0 border-l-2 border-r-2 border-b-0 border-cyan-500/30 rounded-t-none" style={{ left: '50%', transform: 'translateX(-50%)' }} />
                      </motion.div>
                    </div>

                    {/* Worker Nodes Row */}
                    <div className="flex justify-center gap-8 relative">
                      {/* Resume Parser */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center"
                      >
                        <div className="h-12 w-0.5 bg-gradient-to-b from-transparent to-green-500/50 mb-0" />
                        <div className="px-5 py-3 rounded-xl border-2 border-green-500/50 bg-green-500/10 shadow-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-green-400" />
                            <div>
                              <div className="font-semibold text-sm">Resume Parser</div>
                              <div className="text-xs text-muted-foreground">Extract data</div>
                            </div>
                          </div>
                        </div>
                        {/* Connection down */}
                        <div className="h-8 w-0.5 bg-gradient-to-b from-green-500/50 to-orange-500/50 mt-0" />
                      </motion.div>

                      {/* Email Sender - Modified by Supervisor */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="flex flex-col items-center"
                      >
                        <div className="h-12 w-0.5 bg-gradient-to-b from-transparent to-green-500/50 mb-0" />
                        <div className="relative px-5 py-3 rounded-xl border-2 border-green-500/50 bg-green-500/10 shadow-lg ring-2 ring-cyan-500/30 ring-offset-2 ring-offset-background">
                          <Badge variant="outline" className="absolute -top-2 -right-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                            <Sparkles className="h-2.5 w-2.5 mr-1" />
                            Modified
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-green-400" />
                            <div>
                              <div className="font-semibold text-sm">Email Sender</div>
                              <div className="text-xs text-cyan-300">Tone: Professional</div>
                            </div>
                          </div>
                        </div>
                        <div className="h-8 w-0.5 bg-gradient-to-b from-green-500/50 to-orange-500/50 mt-0" />
                      </motion.div>

                      {/* Interview Scheduler */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center"
                      >
                        <div className="h-12 w-0.5 bg-gradient-to-b from-transparent to-green-500/50 mb-0" />
                        <div className="px-5 py-3 rounded-xl border-2 border-green-500/50 bg-green-500/10 shadow-lg">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-400" />
                            <div>
                              <div className="font-semibold text-sm">Interview Scheduler</div>
                              <div className="text-xs text-muted-foreground">Calendar sync</div>
                            </div>
                          </div>
                        </div>
                        <div className="h-8 w-0.5 bg-gradient-to-b from-green-500/50 to-orange-500/50 mt-0" />
                      </motion.div>

                      {/* Document Parser - Added by Supervisor */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="flex flex-col items-center"
                      >
                        <div className="h-12 w-0.5 bg-gradient-to-b from-transparent to-green-500/50 mb-0" />
                        <div className="relative px-5 py-3 rounded-xl border-2 border-cyan-500/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/20">
                          <Badge variant="outline" className="absolute -top-2 -right-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                            <Sparkles className="h-2.5 w-2.5 mr-1" />
                            Auto-created
                          </Badge>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-cyan-400" />
                            <div>
                              <div className="font-semibold text-sm">Document Parser</div>
                              <div className="text-xs text-cyan-300">OCR + Layout</div>
                            </div>
                          </div>
                        </div>
                        <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-orange-500/50 mt-0" />
                      </motion.div>
                    </div>

                    {/* Compliance Check (Parallel) */}
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative"
                      >
                        <div className="px-6 py-4 rounded-xl border-2 border-orange-500/50 bg-orange-500/10 shadow-lg shadow-orange-500/20">
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-orange-400" />
                            <div>
                              <div className="font-semibold text-sm">Compliance Checker</div>
                              <div className="text-xs text-muted-foreground">Business rules validation</div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 w-0.5 bg-gradient-to-b from-orange-500/50 to-blue-500/50" />
                      </motion.div>
                    </div>

                    {/* Decision Node */}
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="relative"
                      >
                        <div className="px-6 py-4 rounded-xl border-2 border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/20 transform rotate-45">
                          <div className="transform -rotate-45">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold text-sm text-center">Approved?</div>
                            </div>
                          </div>
                        </div>
                        {/* Split paths */}
                        <div className="absolute left-0 top-full translate-y-8 -translate-x-32">
                          <div className="text-xs text-green-400 mb-1">✓ Yes</div>
                          <div className="px-4 py-2 rounded-lg border border-green-500/50 bg-green-500/10 text-sm">
                            Send Welcome Email
                          </div>
                        </div>
                        <div className="absolute right-0 top-full translate-y-8 translate-x-32">
                          <div className="text-xs text-red-400 mb-1">✗ No</div>
                          <div className="px-4 py-2 rounded-lg border border-red-500/50 bg-red-500/10 text-sm">
                            Escalate to Manager
                          </div>
                        </div>
                      </motion.div>
                    </div>

                  </div>

                  {/* Legend */}
                  <div className="mt-16 pt-6 border-t border-border/40">
                    <div className="text-sm font-medium mb-3">Legend:</div>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded border-2 border-green-500/50 bg-green-500/10" />
                        <span className="text-muted-foreground">Worker Agent</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded border-2 border-cyan-500/50 bg-cyan-500/10" />
                        <span className="text-muted-foreground">Autonomous Change</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded border-2 border-orange-500/50 bg-orange-500/10" />
                        <span className="text-muted-foreground">Validation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded border-2 border-blue-500/50 bg-blue-500/10" />
                        <span className="text-muted-foreground">Decision Node</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Bottom Row: Evolution Chart + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Evolution Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Self-Evolution Timeline
                </CardTitle>
                <CardDescription>62% → 94% accuracy improvement over 23 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={evolutionHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 12%)" />
                    <XAxis
                      dataKey="date"
                      stroke="hsl(0 0% 55%)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="hsl(0 0% 55%)"
                      style={{ fontSize: '12px' }}
                      domain={[0, 100]}
                      label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', style: { fill: 'hsl(0 0% 55%)' } }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 6%)',
                        border: '1px solid hsl(180 85% 55% / 0.2)',
                        borderRadius: '0.5rem',
                        color: 'hsl(0 0% 98%)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="hsl(180 85% 55%)"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(180 85% 55%)', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                {/* Version badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {evolutionHistory.map((ver, idx) => (
                    <motion.div
                      key={ver.version}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + idx * 0.05 }}
                    >
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-primary/30",
                          idx === evolutionHistory.length - 1 && "border-primary bg-primary/10"
                        )}
                      >
                        {ver.version} · {ver.accuracy}%
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary animate-pulse" />
                  Live Activity
                </CardTitle>
                <CardDescription className="text-xs">Real-time coordination logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className="flex gap-2 p-2 rounded-lg hover:bg-accent/30 transition-colors text-xs"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            activity.type === 'complete' && "bg-green-500",
                            activity.type === 'assign' && "bg-blue-500",
                            activity.type === 'check' && "bg-purple-500",
                            activity.type === 'move' && "bg-yellow-500",
                            activity.type === 'optimize' && "bg-pink-500"
                          )} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-muted-foreground text-[10px] mb-0.5">{activity.time}</p>
                          <p className="font-medium text-xs leading-tight">
                            <span className="text-primary">{activity.agent}</span>: {activity.action}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
