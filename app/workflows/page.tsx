'use client'

import * as React from 'react'
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
  const { sidebarCollapsed } = useDashboardStore()

  const activeWorkflows = workflows.filter(w => w.status === 'active').length
  const totalExecutions = workflows.reduce((sum, w) => sum + w.executions, 0)
  const avgSuccessRate = Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Workflows"
        subtitle="Multi-Agent Automation"
        breadcrumbs={[{ label: 'Workflows' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2"
            >
              Active Workflows
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Orchestrated multi-agent automation pipelines
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Play className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-muted-foreground">Active Workflows</p>
                </div>
                <p className="text-3xl font-bold">{activeWorkflows}</p>
                <p className="text-xs text-green-500 mt-1">Running now</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <p className="text-sm text-muted-foreground">Total Executions</p>
                </div>
                <p className="text-3xl font-bold">{totalExecutions.toLocaleString()}</p>
                <p className="text-xs text-purple-500 mt-1">All time</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <p className="text-3xl font-bold">{avgSuccessRate}%</p>
                <p className="text-xs text-blue-500 mt-1">Average across all</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Workflows List */}
        <div className="space-y-6">
          {workflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80 hover:border-border/80 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{workflow.name}</CardTitle>
                        <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'} className="gap-1.5">
                          {workflow.status === 'active' && <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />}
                          {workflow.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">{workflow.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Workflow Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border/40">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Executions</p>
                      <p className="text-lg font-semibold">{workflow.executions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                      <p className="text-lg font-semibold text-green-500">{workflow.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Avg Time</p>
                      <p className="text-lg font-semibold">{workflow.avgTime}</p>
                    </div>
                  </div>

                  {/* Agent Flow Visualization */}
                  <div>
                    <p className="text-sm font-medium mb-4">Agent Pipeline</p>
                    <div className="flex items-center gap-3">
                      {workflow.agents.map((agent, agentIndex) => (
                        <React.Fragment key={agentIndex}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 + agentIndex * 0.05 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="flex-1"
                          >
                            <div className={cn(
                              "relative rounded-xl p-4 border-2 transition-all duration-200",
                              agent.status === 'active'
                                ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/20"
                                : "border-border/40 bg-accent/20"
                            )}>
                              {agent.status === 'active' && (
                                <div className="absolute -top-1 -right-1">
                                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                                </div>
                              )}
                              <div className="flex flex-col items-center text-center gap-2">
                                <div className={cn(
                                  "h-10 w-10 rounded-lg flex items-center justify-center",
                                  agent.status === 'active' ? "bg-primary/20" : "bg-accent/40"
                                )}>
                                  <agent.icon className={cn(
                                    "h-5 w-5",
                                    agent.status === 'active' ? "text-primary" : "text-muted-foreground"
                                  )} />
                                </div>
                                <div>
                                  <p className="text-xs font-medium">{agent.name}</p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">
                                    {agent.tasks} tasks
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                          {agentIndex < workflow.agents.length - 1 && (
                            <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
