'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckCircle2, Play, ArrowRight, Zap, TrendingUp, Bot, MessageSquare, Database, FileText, Plus, Sparkles, GitBranch, Clock, Activity, Workflow, ChevronRight, Settings2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const workflows = [
  {
    id: 'wf-001',
    name: 'Customer Onboarding',
    description: 'Automate new customer setup and verification',
    status: 'active',
    executions: 1247,
    successRate: 94,
    avgTime: '2.3m',
    costPerRun: '$0.12',
    version: 'v3.2.1',
    branch: 'main',
    agents: [
      { name: 'Data Collector', type: 'input', icon: Database, status: 'active' },
      { name: 'Verifier', type: 'process', icon: CheckCircle2, status: 'active' },
      { name: 'Email Sender', type: 'output', icon: MessageSquare, status: 'active' },
    ]
  },
  {
    id: 'wf-002',
    name: 'Support Ticket Triage',
    description: 'Classify and route support tickets automatically',
    status: 'active',
    executions: 3421,
    successRate: 97,
    avgTime: '0.8m',
    costPerRun: '$0.004',
    version: 'v5.1.0',
    branch: 'main',
    agents: [
      { name: 'Ticket Reader', type: 'input', icon: FileText, status: 'active' },
      { name: 'Classifier', type: 'process', icon: Bot, status: 'active' },
      { name: 'Router', type: 'output', icon: GitBranch, status: 'active' },
    ]
  },
  {
    id: 'wf-003',
    name: 'Sales Lead Qualification',
    description: 'Score and qualify incoming sales leads',
    status: 'testing',
    executions: 892,
    successRate: 91,
    avgTime: '3.1m',
    costPerRun: '$0.18',
    version: 'v2.8.3',
    branch: 'experimental',
    agents: [
      { name: 'Lead Collector', type: 'input', icon: Database, status: 'active' },
      { name: 'Scoring Agent', type: 'process', icon: TrendingUp, status: 'active' },
      { name: 'CRM Updater', type: 'output', icon: CheckCircle2, status: 'active' },
    ]
  },
  {
    id: 'wf-004',
    name: 'Document Processing',
    description: 'Extract and index data from uploaded documents',
    status: 'paused',
    executions: 567,
    successRate: 89,
    avgTime: '5.2m',
    costPerRun: '$0.25',
    version: 'v1.9.2',
    branch: 'main',
    agents: [
      { name: 'Document Reader', type: 'input', icon: FileText, status: 'idle' },
      { name: 'Data Extractor', type: 'process', icon: Database, status: 'idle' },
      { name: 'Indexer', type: 'output', icon: CheckCircle2, status: 'idle' },
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
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Workflows"
        subtitle="Orchestration Engine"
        breadcrumbs={[{ label: 'Workflows' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pipeline Overview</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Managing {workflows.length} autonomous workflows
            </p>
          </div>
          <Button className="rounded-none h-10 px-6">
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Active Pipelines</p>
                <h3 className="text-2xl font-bold mt-1">{activeWorkflows}</h3>
              </div>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs text-emerald-500 font-mono">System Operational</p>
            </div>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Executions</p>
                <h3 className="text-2xl font-bold mt-1">{totalExecutions.toLocaleString()}</h3>
              </div>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">All-time volume</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Avg Success Rate</p>
                <h3 className="text-2xl font-bold mt-1">{avgSuccessRate}%</h3>
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="w-full bg-secondary h-1 mt-4">
              <div className="bg-foreground h-full" style={{ width: `${avgSuccessRate}%` }} />
            </div>
          </Card>
        </div>

        {/* Workflows List */}
        <div className="space-y-4">
          {workflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group border-border bg-card rounded-none hover:bg-muted/10 transition-all duration-300">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                    {/* Workflow Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold tracking-tight">{workflow.name}</h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-none text-[10px] uppercase tracking-wider",
                            workflow.status === 'active' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" :
                              workflow.status === 'testing' ? "text-yellow-500 border-yellow-500/20 bg-yellow-500/5" :
                                "text-muted-foreground border-border bg-muted/50"
                          )}
                        >
                          {workflow.status}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground border-l border-border pl-3 ml-1">
                          {workflow.version}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-4">
                        {workflow.description}
                      </p>

                      {/* Metrics Mini-Grid */}
                      <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Play className="w-3 h-3" />
                          <span>{workflow.executions.toLocaleString()} runs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>{workflow.avgTime} avg</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn(workflow.successRate >= 90 ? "text-emerald-500" : "text-yellow-500")}>
                            {workflow.successRate}% success
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pipeline Visualization */}
                    <div className="flex-1 lg:max-w-md">
                      <div className="flex items-center justify-between relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-border -z-10" />

                        {workflow.agents.map((agent, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 bg-card px-2 z-10">
                            <div className={cn(
                              "w-8 h-8 flex items-center justify-center border transition-colors",
                              agent.status === 'active' ? "border-foreground bg-foreground text-background" : "border-border bg-muted text-muted-foreground"
                            )}>
                              <agent.icon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{agent.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 lg:border-l lg:border-border lg:pl-6">
                      <Button variant="outline" size="sm" className="rounded-none h-9 w-9 p-0">
                        <Settings2 className="w-4 h-4" />
                      </Button>
                      <Link href={`/workflows/${workflow.id}`}>
                        <Button size="sm" className="rounded-none h-9">
                          View Details <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>

                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
