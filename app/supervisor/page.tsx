'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Bot, Brain, Network, TrendingUp, Sparkles, Zap, Activity,
  Plus, Trash2, Edit3, MessageSquare, Eye, CheckCircle2,
  AlertCircle, Clock, ArrowRight, Target, BarChart3,
  Terminal, GitCommit, GitPullRequest, ShieldAlert, BrainCircuit
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Supervisor's recent autonomous decisions
const autonomousDecisions = [
  {
    id: 1,
    timestamp: '2 min ago',
    type: 'agent_added',
    decision: 'Created "Document Parser"',
    reasoning: 'Detected 15 failed tasks due to unstructured PDF parsing. Created specialized parser agent.',
    trigger: 'Performance Analysis',
    impact: '+12% success',
    confidence: 94,
  },
  {
    id: 2,
    timestamp: '18 min ago',
    type: 'agent_modified',
    decision: 'Updated "Email Sender" tone',
    reasoning: 'Received feedback from 3 users that emails were too casual. Modified prompt.',
    trigger: 'User Feedback',
    impact: '+8% satisfaction',
    confidence: 89,
  },
  {
    id: 3,
    timestamp: '1 hr ago',
    type: 'workflow_optimized',
    decision: 'Parallelized Tasks #4 and #5',
    reasoning: 'Dependency analysis showed no blocking relationship. Restructured DAG.',
    trigger: 'Optimization',
    impact: '-40% duration',
    confidence: 97,
  },
  {
    id: 4,
    timestamp: '3 hr ago',
    type: 'agent_removed',
    decision: 'Removed "Legacy Notifier"',
    reasoning: 'Agent unused for 60+ consecutive executions. Functionality absorbed by "Notification Worker".',
    trigger: 'Resource Opt',
    impact: '-$0.03/exec',
    confidence: 91,
  },
  {
    id: 5,
    timestamp: '5 hr ago',
    type: 'scenario_learned',
    decision: 'New scenario: "Duplicate App"',
    reasoning: 'Detected pattern: 8 users submitted duplicate applications. Created deduplication logic.',
    trigger: 'Pattern Detect',
    impact: 'New Handler',
    confidence: 88,
  },
]

// Active agents managed by Supervisor
const managedAgents = [
  {
    id: 1,
    name: 'Data Worker',
    type: 'worker',
    status: 'active',
    createdBy: 'initial_setup',
    tasksCompleted: 1247,
    successRate: 96,
    lastModified: 'Never',
    cost: '$0.04',
  },
  {
    id: 2,
    name: 'API Worker',
    type: 'worker',
    status: 'active',
    createdBy: 'initial_setup',
    tasksCompleted: 892,
    successRate: 94,
    lastModified: '2d ago',
    cost: '$0.05',
  },
  {
    id: 3,
    name: 'Document Parser',
    type: 'worker',
    status: 'active',
    createdBy: 'supervisor_autonomous',
    tasksCompleted: 45,
    successRate: 91,
    lastModified: '2m ago',
    cost: '$0.06',
    isNew: true,
  },
  {
    id: 4,
    name: 'Notification Worker',
    type: 'worker',
    status: 'active',
    createdBy: 'initial_setup',
    tasksCompleted: 1534,
    successRate: 98,
    lastModified: '1w ago',
    cost: '$0.02',
  },
]

// Current feedback queue
const feedbackQueue = [
  {
    id: 1,
    from: 'Sarah Chen (HR)',
    message: 'Welcome emails need handbook link',
    status: 'analyzing',
    priority: 'medium',
    receivedAt: '5m ago',
  },
  {
    id: 2,
    from: 'Mike Rodriguez (Recruiter)',
    message: 'Speed up background check process',
    status: 'pending',
    priority: 'high',
    receivedAt: '12m ago',
  },
  {
    id: 3,
    from: 'System Monitor',
    message: 'Task #127 failed 3x consecutively',
    status: 'analyzing',
    priority: 'high',
    receivedAt: '8m ago',
  },
]

export default function SupervisorPage() {
  const { sidebarCollapsed } = useDashboardStore()

  const getDecisionIcon = (type: string) => {
    switch (type) {
      case 'agent_added': return Plus
      case 'agent_removed': return Trash2
      case 'agent_modified': return Edit3
      case 'workflow_optimized': return Zap
      case 'scenario_learned': return Brain
      default: return Activity
    }
  }

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Supervisor"
        subtitle="Autonomous Control"
        breadcrumbs={[{ label: 'Supervisor' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Supervisor Status Banner */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="lg:col-span-3 p-6 border-border bg-card rounded-none flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-none uppercase tracking-wider text-[10px]">
                  <Activity className="w-3 h-3 mr-1 animate-pulse" />
                  System Online
                </Badge>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 rounded-none uppercase tracking-wider text-[10px]">
                  v3.2.1 Stable
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Supervisor Agent</h1>
              <p className="text-muted-foreground max-w-2xl">
                Autonomous workflow orchestration engine. Currently monitoring {managedAgents.length} agents and optimizing execution paths.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-8 mt-8 relative z-10">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Decisions (24h)</p>
                <p className="text-2xl font-mono">247</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Confidence</p>
                <p className="text-2xl font-mono text-emerald-500">92%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Optimizations</p>
                <p className="text-2xl font-mono text-blue-500">143</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Learning</p>
                <p className="text-2xl font-mono text-purple-500">Active</p>
              </div>
            </div>
          </Card>

          <Card className="p-0 border-border bg-card rounded-none flex flex-col">
            <div className="p-4 border-b border-border bg-muted/30">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" /> Current Focus
              </h3>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Analyzing Feedback</span>
                  <span className="text-emerald-500">89%</span>
                </div>
                <div className="h-1 bg-secondary w-full">
                  <div className="h-full bg-emerald-500 w-[89%]" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Processing feedback from Sarah Chen regarding email tone. Evaluating potential modifications to Email Worker prompt.
              </p>
            </div>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Autonomous Decision Log */}
          <section className="lg:col-span-2">
            <Card className="border-border bg-card rounded-none overflow-hidden h-full">
              <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">Decision Log</h2>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-muted/20 text-muted-foreground border-b border-border">
                    <tr>
                      <th className="p-4 font-medium uppercase tracking-wider">Time</th>
                      <th className="p-4 font-medium uppercase tracking-wider">Type</th>
                      <th className="p-4 font-medium uppercase tracking-wider">Action</th>
                      <th className="p-4 font-medium uppercase tracking-wider">Reasoning</th>
                      <th className="p-4 font-medium uppercase tracking-wider">Conf</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {autonomousDecisions.map((decision) => {
                      const Icon = getDecisionIcon(decision.type)
                      return (
                        <tr key={decision.id} className="group hover:bg-muted/50 transition-colors">
                          <td className="p-4 text-muted-foreground whitespace-nowrap">{decision.timestamp}</td>
                          <td className="p-4">
                            <span className="flex items-center gap-2 text-foreground">
                              <Icon className="w-3 h-3 text-muted-foreground" />
                              {decision.type.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-foreground">{decision.decision}</td>
                          <td className="p-4 text-muted-foreground max-w-[300px] truncate" title={decision.reasoning}>
                            {decision.reasoning}
                          </td>
                          <td className="p-4 text-emerald-500">{decision.confidence}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* Right Column: Feedback & Managed Agents */}
          <section className="space-y-8">
            {/* Feedback Queue */}
            <Card className="border-border bg-card rounded-none overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">Feedback Queue</h2>
                </div>
                <Badge variant="secondary" className="rounded-none text-[10px]">{feedbackQueue.length} Pending</Badge>
              </div>
              <div className="divide-y divide-border/50">
                {feedbackQueue.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-medium text-foreground">{item.from}</span>
                      <span className="text-[10px] text-muted-foreground">{item.receivedAt}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.message}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={cn(
                        "rounded-none text-[10px] uppercase",
                        item.priority === 'high' ? "text-red-500 border-red-500/20 bg-red-500/5" : "text-yellow-500 border-yellow-500/20 bg-yellow-500/5"
                      )}>
                        {item.priority}
                      </Badge>
                      <Badge variant="secondary" className="rounded-none text-[10px] uppercase">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Managed Agents Compact List */}
            <Card className="border-border bg-card rounded-none overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">Managed Agents</h2>
                </div>
              </div>
              <div className="divide-y divide-border/50">
                {managedAgents.map((agent) => (
                  <div key={agent.id} className="p-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{agent.name}</p>
                        <p className="text-[10px] text-muted-foreground">{agent.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-foreground">{agent.successRate}%</p>
                      <p className="text-[10px] text-muted-foreground">Success</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
