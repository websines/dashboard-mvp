'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Bot, Brain, Network, TrendingUp, Sparkles, Zap, Activity,
  Plus, Trash2, Edit3, MessageSquare, Eye, CheckCircle2,
  AlertCircle, Clock, ArrowRight, Target, BarChart3
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Supervisor's recent autonomous decisions
const autonomousDecisions = [
  {
    id: 1,
    timestamp: '2 minutes ago',
    type: 'agent_added',
    decision: 'Created new "Document Parser" agent',
    reasoning: 'Detected 15 failed tasks due to unstructured PDF parsing. Created specialized parser agent to handle document extraction.',
    trigger: 'Performance Analysis',
    impact: '+12% success rate',
    confidence: 94,
  },
  {
    id: 2,
    timestamp: '18 minutes ago',
    type: 'agent_modified',
    decision: 'Updated "Email Sender" agent tone',
    reasoning: 'Received feedback from 3 users that emails were too casual. Modified prompt to use more professional language.',
    trigger: 'User Feedback',
    impact: '+8% user satisfaction',
    confidence: 89,
  },
  {
    id: 3,
    timestamp: '1 hour ago',
    type: 'workflow_optimized',
    decision: 'Parallelized Tasks #4 and #5',
    reasoning: 'Dependency analysis showed no blocking relationship. Restructured DAG to execute in parallel, reducing total time by 40%.',
    trigger: 'Performance Optimization',
    impact: '-40% execution time',
    confidence: 97,
  },
  {
    id: 4,
    timestamp: '3 hours ago',
    type: 'agent_removed',
    decision: 'Removed "Legacy Notifier" agent',
    reasoning: 'Agent unused for 60+ consecutive executions. Functionality absorbed by "Notification Worker". Removing to reduce overhead.',
    trigger: 'Resource Optimization',
    impact: '-$0.03 per execution',
    confidence: 91,
  },
  {
    id: 5,
    timestamp: '5 hours ago',
    type: 'scenario_learned',
    decision: 'Added new scenario: "Duplicate Application"',
    reasoning: 'Detected pattern: 8 users submitted duplicate applications. Created automated deduplication logic.',
    trigger: 'Pattern Detection',
    impact: 'New scenario handled',
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
    cost: '$0.04/task',
  },
  {
    id: 2,
    name: 'API Worker',
    type: 'worker',
    status: 'active',
    createdBy: 'initial_setup',
    tasksCompleted: 892,
    successRate: 94,
    lastModified: '2 days ago',
    cost: '$0.05/task',
  },
  {
    id: 3,
    name: 'Document Parser',
    type: 'worker',
    status: 'active',
    createdBy: 'supervisor_autonomous',
    tasksCompleted: 45,
    successRate: 91,
    lastModified: '2 minutes ago',
    cost: '$0.06/task',
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
    lastModified: '1 week ago',
    cost: '$0.02/task',
  },
  {
    id: 5,
    name: 'User-Facing Agent (Sarah)',
    type: 'user_facing',
    status: 'active',
    createdBy: 'initial_setup',
    tasksCompleted: 234,
    successRate: 97,
    lastModified: '18 minutes ago',
    cost: '$0.03/interaction',
  },
  {
    id: 6,
    name: 'User-Facing Agent (Mike)',
    type: 'user_facing',
    status: 'active',
    createdBy: 'initial_setup',
    tasksCompleted: 189,
    successRate: 95,
    lastModified: '3 hours ago',
    cost: '$0.03/interaction',
  },
]

// Current feedback queue
const feedbackQueue = [
  {
    id: 1,
    from: 'Sarah Chen (HR Manager)',
    message: 'The welcome emails need to include the employee handbook link',
    status: 'analyzing',
    priority: 'medium',
    receivedAt: '5 minutes ago',
  },
  {
    id: 2,
    from: 'Mike Rodriguez (Recruiter)',
    message: 'Can we speed up the background check process?',
    status: 'pending',
    priority: 'high',
    receivedAt: '12 minutes ago',
  },
  {
    id: 3,
    from: 'System Performance Monitor',
    message: 'Task #127 failed 3 times consecutively',
    status: 'analyzing',
    priority: 'high',
    receivedAt: '8 minutes ago',
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

  const getDecisionColor = (type: string) => {
    switch (type) {
      case 'agent_added': return 'from-green-500 to-emerald-500'
      case 'agent_removed': return 'from-red-500 to-orange-500'
      case 'agent_modified': return 'from-blue-500 to-cyan-500'
      case 'workflow_optimized': return 'from-purple-500 to-pink-500'
      case 'scenario_learned': return 'from-yellow-500 to-orange-500'
      default: return 'from-gray-500 to-gray-600'
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
        title="Supervisor Agent"
        subtitle="Autonomous Control"
        breadcrumbs={[{ label: 'Supervisor Agent' }]}
      />

      <main className="mt-16 p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto">
        {/* Supervisor Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card shadow-[0_0_50px_rgba(103,232,249,0.2)]">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                      <Brain className="h-9 w-9 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      <div className="h-5 w-5 rounded-full bg-green-500 animate-pulse flex items-center justify-center border-2 border-card">
                        <Activity className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-1">Supervisor Agent</CardTitle>
                    <CardDescription className="text-base">
                      Autonomous workflow orchestration & self-modification
                    </CardDescription>
                  </div>
                </div>
                <Badge className="gap-2 px-4 py-2 bg-green-500/20 text-green-400 border-green-500/30">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Fully Autonomous
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Agents Managed</p>
                  <p className="text-2xl font-bold">{managedAgents.length}</p>
                  <p className="text-xs text-green-400 mt-1">3 added autonomously</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Decisions Made</p>
                  <p className="text-2xl font-bold">247</p>
                  <p className="text-xs text-purple-400 mt-1">Last 30 days</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Avg Confidence</p>
                  <p className="text-2xl font-bold text-primary">92%</p>
                  <p className="text-xs text-primary mt-1">High certainty</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Version</p>
                  <p className="text-2xl font-bold">v3.2.1</p>
                  <p className="text-xs text-blue-400 mt-1">Auto-evolved</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-purple-400 animate-pulse" />
                  <div>
                    <p className="text-sm font-semibold text-purple-400">Current Focus</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Analyzing user feedback from Sarah Chen • Considering Email Worker modification • Confidence: 89%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Autonomous Decisions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Decisions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Autonomous Decision Log
                  </CardTitle>
                  <CardDescription>Real-time AI-driven modifications (no human intervention)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {autonomousDecisions.map((decision, index) => {
                        const Icon = getDecisionIcon(decision.type)
                        return (
                          <motion.div
                            key={decision.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative p-4 rounded-xl border border-border/40 bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all group"
                          >
                            <div className="flex items-start gap-4">
                              <div className={cn(
                                "h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg",
                                getDecisionColor(decision.type)
                              )}>
                                <Icon className="h-6 w-6 text-white" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <h4 className="font-semibold text-sm">{decision.decision}</h4>
                                    <p className="text-xs text-muted-foreground">{decision.timestamp}</p>
                                  </div>
                                  <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                                    {decision.confidence}% confidence
                                  </Badge>
                                </div>

                                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                  {decision.reasoning}
                                </p>

                                <div className="flex items-center gap-3 flex-wrap">
                                  <Badge variant="secondary" className="text-xs">
                                    <Eye className="h-3 w-3 mr-1" />
                                    {decision.trigger}
                                  </Badge>
                                  <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {decision.impact}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Managed Agents */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    Agent Registry
                  </CardTitle>
                  <CardDescription>All agents under autonomous supervision</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {managedAgents.map((agent, index) => (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className={cn(
                          "p-4 rounded-lg border transition-all",
                          agent.isNew
                            ? "border-green-500/50 bg-green-500/5 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                            : "border-border/40 bg-card/60"
                        )}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "h-10 w-10 rounded-lg flex items-center justify-center",
                              agent.type === 'worker' ? "bg-blue-500/20" : "bg-purple-500/20"
                            )}>
                              <Bot className={cn(
                                "h-5 w-5",
                                agent.type === 'worker' ? "text-blue-400" : "text-purple-400"
                              )} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-sm">{agent.name}</h4>
                                {agent.isNew && (
                                  <Badge className="text-[10px] h-5 bg-green-500/20 text-green-400 border-green-500/30">
                                    NEW
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground capitalize">
                                {agent.type.replace('_', ' ')} • {agent.createdBy === 'supervisor_autonomous' ? '🤖 Created by Supervisor' : '👤 Initial Setup'}
                              </p>
                            </div>
                          </div>
                          <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {agent.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-4 gap-3 text-xs">
                          <div>
                            <p className="text-muted-foreground mb-0.5">Tasks</p>
                            <p className="font-semibold">{agent.tasksCompleted}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-0.5">Success</p>
                            <p className="font-semibold text-green-400">{agent.successRate}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-0.5">Cost</p>
                            <p className="font-semibold text-primary">{agent.cost}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-0.5">Modified</p>
                            <p className="font-semibold text-xs">{agent.lastModified}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Feedback Queue & Stats */}
          <div className="space-y-6">
            {/* Feedback Queue */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Feedback Queue
                  </CardTitle>
                  <CardDescription className="text-xs">Processing user input & system signals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {feedbackQueue.map((feedback, index) => (
                      <motion.div
                        key={feedback.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className="p-3 rounded-lg border border-border/40 bg-card/60"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-xs font-semibold">{feedback.from}</p>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] h-5",
                              feedback.priority === 'high' && "border-red-500/30 text-red-400",
                              feedback.priority === 'medium' && "border-yellow-500/30 text-yellow-400"
                            )}
                          >
                            {feedback.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{feedback.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] text-muted-foreground">{feedback.receivedAt}</p>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] h-5",
                              feedback.status === 'analyzing' && "bg-blue-500/20 text-blue-400"
                            )}
                          >
                            {feedback.status === 'analyzing' && <Activity className="h-3 w-3 mr-1 animate-spin" />}
                            {feedback.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Decision Quality
                  </CardTitle>
                  <CardDescription className="text-xs">Autonomous modification success rates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Agent Additions</span>
                      <span className="text-sm font-bold text-green-400">94%</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Workflow Optimizations</span>
                      <span className="text-sm font-bold text-blue-400">97%</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: '97%' }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Scenario Learning</span>
                      <span className="text-sm font-bold text-purple-400">91%</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: '91%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Overall Success</span>
                      <span className="text-lg font-bold text-primary">94%</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Decisions that improved workflow performance
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Next Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    Pending Decision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Email Worker Modification</p>
                        <p className="text-xs text-muted-foreground mb-2">
                          Analyzing 3 user requests to include employee handbook link in welcome emails
                        </p>
                        <Badge className="text-[10px] bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          Decision in ~2 minutes
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
