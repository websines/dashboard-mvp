'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  Network,
  User,
  Brain,
  BrainCircuit,
  Zap,
  Database,
  Mail,
  FileText,
  Calendar,
  Shield,
  ArrowRight,
  Activity,
  Sparkles,
  Settings,
  MessageSquare,
  TrendingUp,
  Code2,
  Workflow,
  Bot,
  ArrowDown,
  Plus
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  type: 'user-facing' | 'planner' | 'supervisor' | 'worker'
  status: 'active' | 'idle' | 'processing'
  tasksCompleted: number
  successRate: number
  averageLatency: string
  costPerTask: string
  createdBy: 'initial_setup' | 'supervisor_autonomous'
  description: string
  tools: string[]
  currentTask?: string
  icon: any
  color: string
}

const agents: Agent[] = [
  // User-Facing Layer
  {
    id: 'uf-001',
    name: 'Sarah (HR Manager)',
    type: 'user-facing',
    status: 'active',
    tasksCompleted: 342,
    successRate: 96,
    averageLatency: '1.2s',
    costPerTask: '$0.02',
    createdBy: 'initial_setup',
    description: 'Personalized agent for Sarah. Remembers preferences, communication style, and delivers results.',
    tools: ['Email', 'Slack', 'Calendar', 'Notifications'],
    currentTask: 'Preparing daily summary report',
    icon: User,
    color: 'text-blue-400'
  },
  {
    id: 'uf-002',
    name: 'Mike (Recruiter)',
    type: 'user-facing',
    status: 'idle',
    tasksCompleted: 287,
    successRate: 94,
    averageLatency: '1.1s',
    costPerTask: '$0.02',
    createdBy: 'initial_setup',
    description: 'Personalized agent for Mike. Real-time notifications, brief updates, all candidates.',
    tools: ['Email', 'SMS', 'Slack', 'CRM'],
    icon: User,
    color: 'text-blue-400'
  },

  // Planner Layer
  {
    id: 'planner-001',
    name: 'Task Planner',
    type: 'planner',
    status: 'processing',
    tasksCompleted: 1847,
    successRate: 97,
    averageLatency: '2.8s',
    costPerTask: '$0.05',
    createdBy: 'initial_setup',
    description: 'Decomposes user requests into atomic tasks. Uses ROMA pattern for recursive breakdown.',
    tools: ['Task Analyzer', 'Dependency Tracker', 'Phase Designer'],
    currentTask: 'Decomposing "Screen 50 candidates" request',
    icon: Brain,
    color: 'text-purple-400'
  },

  // Supervisor Layer
  {
    id: 'supervisor-001',
    name: 'Autonomous Supervisor',
    type: 'supervisor',
    status: 'active',
    tasksCompleted: 247,
    successRate: 92,
    averageLatency: '3.5s',
    costPerTask: '$0.08',
    createdBy: 'initial_setup',
    description: 'Orchestrates all agents. Autonomously adds/removes/modifies agents based on feedback and performance.',
    tools: ['Agent Manager', 'Workflow Optimizer', 'Feedback Analyzer', 'Version Control', 'Guardian Monitor'],
    currentTask: 'Analyzing feedback: Modify email tone',
    icon: BrainCircuit,
    color: 'text-cyan-400'
  },

  // Worker Layer
  {
    id: 'worker-001',
    name: 'Resume Parser',
    type: 'worker',
    status: 'active',
    tasksCompleted: 1247,
    successRate: 98,
    averageLatency: '0.8s',
    costPerTask: '$0.003',
    createdBy: 'initial_setup',
    description: 'Extracts structured data from resumes. Handles PDF, DOCX, plain text.',
    tools: ['PDF Parser', 'OCR', 'NLP Extractor'],
    currentTask: 'Parsing John Doe resume',
    icon: FileText,
    color: 'text-green-400'
  },
  {
    id: 'worker-002',
    name: 'Email Sender',
    type: 'worker',
    status: 'idle',
    tasksCompleted: 892,
    successRate: 96,
    averageLatency: '1.5s',
    costPerTask: '$0.004',
    createdBy: 'initial_setup',
    description: 'Sends personalized emails. Recently modified by Supervisor to use professional tone.',
    tools: ['Email API', 'Template Engine', 'Personalization'],
    icon: Mail,
    color: 'text-green-400'
  },
  {
    id: 'worker-003',
    name: 'Interview Scheduler',
    type: 'worker',
    status: 'processing',
    tasksCompleted: 534,
    successRate: 94,
    averageLatency: '2.1s',
    costPerTask: '$0.005',
    createdBy: 'initial_setup',
    description: 'Coordinates interview scheduling. Checks calendars, sends invites, handles conflicts.',
    tools: ['Calendar API', 'Timezone Handler', 'Availability Checker'],
    currentTask: 'Finding slot for Jane Smith interview',
    icon: Calendar,
    color: 'text-green-400'
  },
  {
    id: 'worker-004',
    name: 'Compliance Checker',
    type: 'worker',
    status: 'idle',
    tasksCompleted: 1089,
    successRate: 99,
    averageLatency: '0.6s',
    costPerTask: '$0.002',
    createdBy: 'initial_setup',
    description: 'Validates all actions against business rules. GDPR, no weekends, logging, approval workflows.',
    tools: ['Rule Engine', 'Audit Logger', 'Policy Validator'],
    icon: Shield,
    color: 'text-green-400'
  },
  {
    id: 'worker-005',
    name: 'Document Parser',
    type: 'worker',
    status: 'active',
    tasksCompleted: 45,
    successRate: 91,
    averageLatency: '1.8s',
    costPerTask: '$0.006',
    createdBy: 'supervisor_autonomous',
    description: 'Created autonomously by Supervisor. Handles unstructured PDF parsing that Resume Parser missed.',
    tools: ['Advanced OCR', 'Layout Analyzer', 'Table Extractor'],
    currentTask: 'Extracting data from scanned document',
    icon: FileText,
    color: 'text-green-400'
  },
]

const communicationFlow = [
  { from: 'uf-001', to: 'planner-001', label: 'User request', count: 12 },
  { from: 'planner-001', to: 'supervisor-001', label: 'Task plan', count: 12 },
  { from: 'supervisor-001', to: 'worker-001', label: 'Task assignment', count: 45 },
  { from: 'supervisor-001', to: 'worker-002', label: 'Task assignment', count: 38 },
  { from: 'supervisor-001', to: 'worker-003', label: 'Task assignment', count: 22 },
  { from: 'worker-001', to: 'supervisor-001', label: 'Results', count: 43 },
  { from: 'supervisor-001', to: 'uf-001', label: 'Feedback request', count: 8 },
]

export default function AgentsPage() {
  const { sidebarCollapsed } = useDashboardStore()

  const userFacingAgents = agents.filter(a => a.type === 'user-facing')
  const plannerAgents = agents.filter(a => a.type === 'planner')
  const supervisorAgents = agents.filter(a => a.type === 'supervisor')
  const workerAgents = agents.filter(a => a.type === 'worker')

  const totalTasks = agents.reduce((sum, a) => sum + a.tasksCompleted, 0)
  const avgSuccessRate = Math.round(agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length)
  const activeAgents = agents.filter(a => a.status === 'active').length
  const autonomousAgents = agents.filter(a => a.createdBy === 'supervisor_autonomous').length

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
        title="Agent Network"
        subtitle="Multi-Layer Autonomous Hierarchy"
        breadcrumbs={[{ label: 'Agents' }]}
      />

      <main className="mt-16 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text"
            >
              Agent Network
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-muted-foreground"
            >
              User-Facing → Planner → Supervisor → Workers
            </motion.p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
                <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agents.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {autonomousAgents} added autonomously
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeAgents}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {agents.filter(a => a.status === 'processing').length} processing tasks
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTasks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all agents
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgSuccessRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Network-wide performance
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Architecture Visualization */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* User-Facing Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                Layer 1: User-Facing Agents
              </Badge>
              <span className="text-xs text-muted-foreground">Personalized memory per user</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {userFacingAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Card className="border-blue-500/20 bg-blue-500/5 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded bg-blue-500/10">
                            <agent.icon className={`h-5 w-5 ${agent.color}`} />
                          </div>
                          <div>
                            <div className="font-semibold">{agent.name}</div>
                          </div>
                        </div>
                        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {agent.status === 'active' && <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-1" />}
                          {agent.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{agent.description}</p>
                      <div className="flex gap-3 text-xs">
                        <span className="text-muted-foreground">
                          <TrendingUp className="h-3 w-3 inline mr-1" />
                          {agent.successRate}%
                        </span>
                        <span className="text-muted-foreground">{agent.tasksCompleted} tasks</span>
                        <span className="text-muted-foreground">{agent.costPerTask}/task</span>
                      </div>
                      {agent.currentTask && (
                        <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1 p-2 rounded bg-blue-500/5 border border-blue-500/10">
                          <Activity className="h-3 w-3 animate-pulse" />
                          {agent.currentTask}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <ArrowDown className="h-6 w-6 text-muted-foreground" />

          {/* Planner Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                Layer 2: Planner
              </Badge>
              <span className="text-xs text-muted-foreground">ROMA pattern decomposition</span>
            </div>
            {plannerAgents.map((agent) => (
              <motion.div
                key={agent.id}
                whileHover={{ scale: 1.01, y: -2 }}
              >
                <Card className="border-purple-500/20 bg-purple-500/5 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded bg-purple-500/10">
                          <agent.icon className={`h-6 w-6 ${agent.color}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{agent.name}</div>
                        </div>
                      </div>
                      <Badge variant="default" className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {agent.status === 'processing' && <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse mr-1" />}
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {agent.tools.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                    {agent.currentTask && (
                      <div className="text-xs text-purple-300 flex items-center gap-1 p-2 rounded bg-purple-500/10 border border-purple-500/20">
                        <Brain className="h-3 w-3 animate-pulse" />
                        <span className="font-medium">Processing:</span> {agent.currentTask}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <ArrowDown className="h-6 w-6 text-muted-foreground" />

          {/* Supervisor Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                Layer 3: Supervisor (Autonomous AI)
              </Badge>
              <span className="text-xs text-muted-foreground">Orchestrates everything autonomously</span>
            </div>
            {supervisorAgents.map((agent) => (
              <motion.div
                key={agent.id}
                whileHover={{ scale: 1.01, y: -2 }}
              >
                <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent hover:shadow-xl hover:shadow-cyan-500/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded bg-cyan-500/20 relative">
                          <agent.icon className={`h-7 w-7 ${agent.color}`} />
                          <Sparkles className="h-4 w-4 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <div>
                          <div className="font-semibold text-xl">{agent.name}</div>
                        </div>
                      </div>
                      <Badge variant="default" className="text-xs bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse mr-1" />
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {agent.tools.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-xs bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-xs mb-4">
                      <div>
                        <p className="text-muted-foreground mb-1">Tasks</p>
                        <p className="font-semibold">{agent.tasksCompleted}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Success</p>
                        <p className="font-semibold text-green-400">{agent.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Latency</p>
                        <p className="font-semibold">{agent.averageLatency}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Cost/Task</p>
                        <p className="font-semibold">{agent.costPerTask}</p>
                      </div>
                    </div>
                    {agent.currentTask && (
                      <div className="text-xs text-cyan-300 flex items-center gap-1 p-3 rounded bg-cyan-500/10 border border-cyan-500/20">
                        <BrainCircuit className="h-4 w-4 animate-pulse" />
                        <span className="font-medium">Autonomous Thinking:</span> {agent.currentTask}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <ArrowDown className="h-6 w-6 text-muted-foreground" />

          {/* Worker Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full max-w-6xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                Layer 4: Worker Agents
              </Badge>
              <span className="text-xs text-muted-foreground">{workerAgents.length} specialized execution agents</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {workerAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Card className="border-green-500/20 bg-green-500/5 hover:shadow-lg hover:shadow-green-500/10 transition-all h-full">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded bg-green-500/10">
                            <agent.icon className={`h-4 w-4 ${agent.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="font-semibold text-sm">{agent.name}</span>
                              {agent.createdBy === 'supervisor_autonomous' && (
                                <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-1">
                                  <Sparkles className="h-2.5 w-2.5" />
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {agent.status === 'active' && <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-1" />}
                          {agent.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{agent.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div>
                          <p className="text-muted-foreground mb-0.5">Success Rate</p>
                          <p className="font-semibold text-green-400">{agent.successRate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-0.5">Tasks</p>
                          <p className="font-semibold">{agent.tasksCompleted}</p>
                        </div>
                      </div>
                      {agent.currentTask && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1 p-2 rounded bg-green-500/5 border border-green-500/10">
                          <Activity className="h-3 w-3" />
                          {agent.currentTask}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Communication & Model Stats */}
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Inter-Agent Communication
              </CardTitle>
              <CardDescription>Messages in last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communicationFlow.map((flow, index) => {
                  const fromAgent = agents.find(a => a.id === flow.from)
                  const toAgent = agents.find(a => a.id === flow.to)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2 p-2 rounded bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="text-xs font-medium flex-1">
                        {fromAgent?.name} → {toAgent?.name}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {flow.count} msgs
                      </Badge>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Performance Metrics
              </CardTitle>
              <CardDescription>Agent network efficiency stats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Average Response Time</span>
                    <span className="text-xs text-green-400 font-semibold">1.8s</span>
                  </div>
                  <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Task Success Rate</span>
                    <span className="text-xs text-green-400 font-semibold">95.6%</span>
                  </div>
                  <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: '95.6%' }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Autonomous Actions</span>
                    <span className="text-xs text-cyan-400 font-semibold">127 this month</span>
                  </div>
                  <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: '84%' }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
