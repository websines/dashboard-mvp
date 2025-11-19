'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Zap,
  Brain,
  Target,
  CheckCircle2,
  GitBranch,
  Sparkles,
  ArrowRight,
  Clock,
  AlertTriangle,
  Package,
  Activity,
  FileText,
  GitCommit,
  GitPullRequest,
  Terminal,
  Code2
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const accuracyData = [
  { date: 'Oct 15', accuracy: 62, version: 'v1.0.0' },
  { date: 'Oct 20', accuracy: 68, version: 'v1.1.2' },
  { date: 'Oct 25', accuracy: 74, version: 'v1.2.5' },
  { date: 'Nov 1', accuracy: 81, version: 'v2.0.0' },
  { date: 'Nov 5', accuracy: 87, version: 'v2.1.3' },
  { date: 'Nov 10', accuracy: 91, version: 'v3.0.1' },
  { date: 'Nov 15', accuracy: 94, version: 'v3.2.1' },
]

const errorRateData = [
  { date: 'Oct 15', errors: 38 },
  { date: 'Oct 20', errors: 32 },
  { date: 'Oct 25', errors: 26 },
  { date: 'Nov 1', errors: 19 },
  { date: 'Nov 5', errors: 13 },
  { date: 'Nov 10', errors: 9 },
  { date: 'Nov 15', errors: 6 },
]

const symbolicLearningLogs = [
  {
    id: 1,
    timestamp: '2025-11-15 09:23',
    change: 'Modified Email Sender tone',
    reason: 'Detected 3 user complaints about casual language in professional context',
    version: 'v3.2.1',
    impact: '+2% user satisfaction',
    type: 'agent_modification'
  },
  {
    id: 2,
    timestamp: '2025-11-14 14:12',
    change: 'Created Document Parser agent',
    reason: 'Identified 15 failed tasks (12% failure rate) due to unstructured PDF parsing',
    version: 'v3.2.0',
    impact: '+12% success rate',
    type: 'agent_creation'
  },
  {
    id: 3,
    timestamp: '2025-11-12 11:45',
    change: 'Parallelized Resume Parse + Compliance Check',
    reason: 'Analysis showed no dependency between tasks, average latency reduction potential: 40%',
    version: 'v3.1.5',
    impact: '-40% execution time',
    type: 'workflow_optimization'
  },
  {
    id: 4,
    timestamp: '2025-11-10 16:30',
    change: 'Removed Legacy Notifier agent',
    reason: 'Agent unused for 50+ executions, redundant with Email Sender capabilities',
    version: 'v3.1.0',
    impact: '-$0.03 per run',
    type: 'agent_removal'
  },
  {
    id: 5,
    timestamp: '2025-11-08 10:15',
    change: 'Learned scenario: Duplicate Application',
    reason: 'Detected pattern: 3 candidates applied twice within 7 days, created deduplication logic',
    version: 'v3.0.8',
    impact: '+8% data quality',
    type: 'scenario_learning'
  }
]

const experimentalBranches = [
  {
    name: 'experimental/faster-parsing',
    description: 'Testing optimized model for resume parsing (improved speed + cost)',
    status: 'testing',
    accuracy: 96,
    costPerRun: '$0.08',
    improvement: '+2% accuracy, -$0.04 cost',
    testExecutions: 47,
    successRate: 96
  },
  {
    name: 'experimental/email-templates',
    description: 'New template engine for personalized emails',
    status: 'merged',
    accuracy: 97,
    costPerRun: '$0.10',
    improvement: '+3% user engagement',
    testExecutions: 120,
    successRate: 97
  }
]

const distillationReadiness = {
  errorRate: 6,
  daysStable: 23,
  executions: 247,
  complianceViolations: 0,
  readyForDistillation: false,
  blockers: [
    { reason: 'Error rate above 5%', target: '< 5%', current: '6%' },
    { reason: 'Stability period incomplete', target: '30 days', current: '23 days' }
  ],
  projectedReady: '7 days'
}

const workflowImprovements = [
  { workflow: 'Customer Onboarding', initial: 62, current: 94, days: 23 },
  { workflow: 'Support Ticket Triage', initial: 58, current: 97, days: 47 },
  { workflow: 'Lead Qualification', initial: 71, current: 88, days: 18 },
  { workflow: 'Document Processing', initial: 65, current: 79, days: 12 }
]

export default function EvolutionPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Evolution Engine"
        subtitle="Self-Improvement Pipeline"
        breadcrumbs={[{ label: 'System', href: '/evolution' }, { label: 'Evolution' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">System Evolution</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Continuous self-improvement from 62% to 94% accuracy
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-none h-8 px-3 font-mono text-xs">
              <Activity className="w-3 h-3 mr-2 text-emerald-500 animate-pulse" />
              Learning Active
            </Badge>
            <Badge variant="outline" className="rounded-none h-8 px-3 font-mono text-xs">
              v3.2.1
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Accuracy Gain</p>
                <h3 className="text-2xl font-bold mt-1 text-emerald-500">+32%</h3>
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">62% → 94%</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Error Rate</p>
                <h3 className="text-2xl font-bold mt-1 text-orange-500">6%</h3>
              </div>
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Target: &lt; 5%</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Days Stable</p>
                <h3 className="text-2xl font-bold mt-1">23</h3>
              </div>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Target: 30 days</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Symbolic Changes</p>
                <h3 className="text-2xl font-bold mt-1">127</h3>
              </div>
              <Sparkles className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Auto-modifications</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border bg-card rounded-none p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  Accuracy Trajectory
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">Model performance over time</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accuracyData}>
                  <defs>
                    <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(150 100% 50%)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="hsl(150 100% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(0 0% 40%)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="hsl(0 0% 40%)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    domain={[50, 100]}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(0 0% 10%)',
                      border: '1px solid hsl(0 0% 20%)',
                      borderRadius: '0px',
                      fontSize: '12px'
                    }}
                    itemStyle={{ color: 'hsl(0 0% 90%)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="hsl(150 100% 50%)"
                    fill="url(#accuracyGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="border-border bg-card rounded-none p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Error Rate Reduction
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">Path to distillation threshold</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={errorRateData}>
                  <defs>
                    <linearGradient id="errorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(10 80% 60%)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="hsl(10 80% 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(0 0% 40%)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="hsl(0 0% 40%)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 40]}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(0 0% 10%)',
                      border: '1px solid hsl(0 0% 20%)',
                      borderRadius: '0px',
                      fontSize: '12px'
                    }}
                    itemStyle={{ color: 'hsl(0 0% 90%)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="errors"
                    stroke="hsl(10 80% 60%)"
                    fill="url(#errorGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Symbolic Learning Logs */}
        <Card className="border-border bg-card rounded-none overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Brain className="w-5 h-5 text-foreground" />
              Symbolic Learning Log
            </h3>
            <p className="text-xs text-muted-foreground font-mono mt-1">Autonomous supervisor decisions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30 border-b border-border text-xs uppercase font-mono text-muted-foreground">
                <tr>
                  <th className="p-4 font-medium w-[200px]">Type</th>
                  <th className="p-4 font-medium">Change Description</th>
                  <th className="p-4 font-medium">Reasoning</th>
                  <th className="p-4 font-medium">Impact</th>
                  <th className="p-4 font-medium text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {symbolicLearningLogs.map((log) => (
                  <tr key={log.id} className="group hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-wider font-mono">
                        {log.type.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4 font-medium">{log.change}</td>
                    <td className="p-4 text-muted-foreground text-xs">{log.reason}</td>
                    <td className="p-4">
                      <span className="text-xs font-mono text-emerald-500">{log.impact}</span>
                    </td>
                    <td className="p-4 text-right text-xs font-mono text-muted-foreground">
                      {log.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Experimental Branches */}
          <Card className="border-border bg-card rounded-none p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-foreground" />
                  Experimental Branches
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">A/B testing variations</p>
              </div>
            </div>
            <div className="space-y-4">
              {experimentalBranches.map((branch) => (
                <div key={branch.name} className="border border-border/50 bg-secondary/10 p-4 hover:border-foreground/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GitCommit className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono text-sm font-semibold">{branch.name}</span>
                    </div>
                    <Badge variant={branch.status === 'merged' ? 'default' : 'secondary'} className="rounded-none text-[10px] uppercase tracking-wider">
                      {branch.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{branch.description}</p>
                  <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-muted-foreground block">Accuracy</span>
                      <span className="text-emerald-500">{branch.accuracy}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Cost</span>
                      <span>{branch.costPerRun}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Tests</span>
                      <span>{branch.testExecutions}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Delta</span>
                      <span className="text-emerald-500">{branch.improvement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Distillation Readiness */}
          <Card className="border-border bg-card rounded-none p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Package className="w-5 h-5 text-foreground" />
                  Distillation Readiness
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">Criteria for Action Model</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-muted-foreground block">Projected Ready</span>
                <span className="text-sm font-bold">{distillationReadiness.projectedReady}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border/50 bg-secondary/10">
                <div className="flex items-center gap-3">
                  {distillationReadiness.errorRate < 5 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  )}
                  <span className="text-sm font-medium">Error Rate &lt; 5%</span>
                </div>
                <span className={cn("text-xs font-mono", distillationReadiness.errorRate < 5 ? "text-emerald-500" : "text-orange-500")}>
                  {distillationReadiness.errorRate}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 border border-border/50 bg-secondary/10">
                <div className="flex items-center gap-3">
                  {distillationReadiness.daysStable >= 30 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-orange-500" />
                  )}
                  <span className="text-sm font-medium">30+ Days Stable</span>
                </div>
                <span className={cn("text-xs font-mono", distillationReadiness.daysStable >= 30 ? "text-emerald-500" : "text-orange-500")}>
                  {distillationReadiness.daysStable} days
                </span>
              </div>

              <div className="flex items-center justify-between p-3 border border-border/50 bg-secondary/10">
                <div className="flex items-center gap-3">
                  {distillationReadiness.executions >= 100 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  )}
                  <span className="text-sm font-medium">100+ Executions</span>
                </div>
                <span className="text-xs font-mono text-emerald-500">
                  {distillationReadiness.executions}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-border/50">
                <Button className="w-full rounded-none" disabled={!distillationReadiness.readyForDistillation}>
                  <Package className="w-4 h-4 mr-2" />
                  {distillationReadiness.readyForDistillation ? 'Start Distillation' : 'Requirements Not Met'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
