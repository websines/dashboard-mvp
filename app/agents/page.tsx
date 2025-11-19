'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card } from '@/components/ui/card'
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
  Activity,
  TrendingUp,
  Bot,
  Cpu,
  Server,
  GitBranch,
  Terminal
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
  },
]

export default function AgentsPage() {
  const { sidebarCollapsed } = useDashboardStore()

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
                    <tr key={agent.id} className="group hover:bg-muted/50 transition-colors">
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
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
