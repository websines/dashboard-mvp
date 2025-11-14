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
  FileText
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
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
        'min-h-screen transition-all duration-300',
        'lg:ml-64',
        sidebarCollapsed && 'lg:ml-16',
        'max-lg:ml-0'
      )}
    >
      <Header
        title="Self-Evolution Engine"
        subtitle="Autonomous Improvement Pipeline"
        breadcrumbs={[{ label: 'Evolution' }]}
      />

      <main className="mt-16 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text"
          >
            Evolution Pipeline
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-muted-foreground"
          >
            Continuous self-improvement from 62% to 94% accuracy
          </motion.p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Accuracy Gain</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">+32%</div>
                <p className="text-xs text-muted-foreground mt-1">62% → 94%</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">6%</div>
                <p className="text-xs text-muted-foreground mt-1">Target: &lt; 5% for distillation</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Days Stable</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground mt-1">Target: 30 days</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Symbolic Changes</CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground mt-1">Autonomous modifications</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Accuracy Improvement Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Accuracy Improvement Over Time
            </CardTitle>
            <CardDescription>Workflow performance trajectory (62% → 94%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={accuracyData}>
                <defs>
                  <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(142 76% 36%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(0 0% 60%)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="hsl(0 0% 60%)"
                  style={{ fontSize: '12px' }}
                  domain={[50, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0 0% 8%)',
                    border: '1px solid hsl(0 0% 20%)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="hsl(142 76% 36%)"
                  fill="url(#accuracyGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Symbolic Learning Logs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Symbolic Learning Log
            </CardTitle>
            <CardDescription>What the Supervisor Agent changed and why</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {symbolicLearningLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-border/40 rounded-lg p-4 bg-card/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn(
                        'text-xs',
                        log.type === 'agent_creation' && 'bg-green-500/10 text-green-400 border-green-500/20',
                        log.type === 'agent_modification' && 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                        log.type === 'workflow_optimization' && 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                        log.type === 'agent_removal' && 'bg-red-500/10 text-red-400 border-red-500/20',
                        log.type === 'scenario_learning' && 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                      )}>
                        {log.type.replace('_', ' ')}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">{log.version}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                  </div>
                  <div className="mb-2">
                    <div className="font-semibold text-sm mb-1">{log.change}</div>
                    <div className="text-xs text-muted-foreground mb-2">{log.reason}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-green-400">{log.impact}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experimental Branches */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" />
              Experimental Branches
            </CardTitle>
            <CardDescription>A/B testing workflow variations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {experimentalBranches.map((branch, index) => (
                <motion.div
                  key={branch.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-border/40 rounded-lg p-4 bg-card/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm font-mono">{branch.name}</span>
                        <Badge variant={branch.status === 'merged' ? 'default' : 'secondary'} className="text-xs">
                          {branch.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{branch.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground mb-0.5">Accuracy</p>
                      <p className="font-semibold text-green-400">{branch.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-0.5">Cost/Run</p>
                      <p className="font-semibold">{branch.costPerRun}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-0.5">Tests</p>
                      <p className="font-semibold">{branch.testExecutions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-0.5">Improvement</p>
                      <p className="font-semibold text-green-400">{branch.improvement}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Distillation Readiness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Distillation Readiness
              </CardTitle>
              <CardDescription>Criteria for Action Model creation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded bg-secondary/30">
                  <div className="flex items-center gap-2">
                    {distillationReadiness.errorRate < 5 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                    )}
                    <span className="text-sm">Error Rate &lt; 5%</span>
                  </div>
                  <span className={cn(
                    'text-sm font-semibold',
                    distillationReadiness.errorRate < 5 ? 'text-green-400' : 'text-orange-400'
                  )}>
                    {distillationReadiness.errorRate}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded bg-secondary/30">
                  <div className="flex items-center gap-2">
                    {distillationReadiness.daysStable >= 30 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <Clock className="h-4 w-4 text-orange-400" />
                    )}
                    <span className="text-sm">30+ Days Stable</span>
                  </div>
                  <span className={cn(
                    'text-sm font-semibold',
                    distillationReadiness.daysStable >= 30 ? 'text-green-400' : 'text-orange-400'
                  )}>
                    {distillationReadiness.daysStable} days
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded bg-secondary/30">
                  <div className="flex items-center gap-2">
                    {distillationReadiness.executions >= 100 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                    )}
                    <span className="text-sm">100+ Executions</span>
                  </div>
                  <span className="text-sm font-semibold text-green-400">
                    {distillationReadiness.executions}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded bg-secondary/30">
                  <div className="flex items-center gap-2">
                    {distillationReadiness.complianceViolations === 0 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    )}
                    <span className="text-sm">No Compliance Violations</span>
                  </div>
                  <span className="text-sm font-semibold text-green-400">
                    {distillationReadiness.complianceViolations}
                  </span>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Ready for Distillation?</span>
                    <Badge variant={distillationReadiness.readyForDistillation ? 'default' : 'secondary'}>
                      {distillationReadiness.readyForDistillation ? 'Yes' : 'Not Yet'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Projected ready in: <span className="font-semibold text-foreground">{distillationReadiness.projectedReady}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Rate Reduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Error Rate Reduction
              </CardTitle>
              <CardDescription>Path to &lt;5% distillation threshold</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={errorRateData}>
                  <defs>
                    <linearGradient id="errorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(0 0% 60%)"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="hsl(0 0% 60%)"
                    style={{ fontSize: '12px' }}
                    domain={[0, 40]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(0 0% 8%)',
                      border: '1px solid hsl(0 0% 20%)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="errors"
                    stroke="hsl(0 84% 60%)"
                    fill="url(#errorGradient)"
                    strokeWidth={3}
                  />
                  {/* Target line at 5% */}
                  <line
                    x1="0%"
                    y1={5}
                    x2="100%"
                    y2={5}
                    stroke="hsl(142 76% 36%)"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* All Workflows Improvement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              All Workflows Improvement
            </CardTitle>
            <CardDescription>Self-evolution across entire platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowImprovements.map((workflow, index) => (
                <motion.div
                  key={workflow.workflow}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded bg-secondary/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{workflow.workflow}</span>
                    <span className="text-xs text-muted-foreground">{workflow.days} days</span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs text-red-400 font-semibold">{workflow.initial}%</span>
                    <div className="flex-1 h-2 bg-accent/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                        initial={{ width: `${workflow.initial}%` }}
                        animate={{ width: `${workflow.current}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                    <span className="text-xs text-green-400 font-semibold">{workflow.current}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Improvement</span>
                    <span className="text-sm font-bold text-green-400">+{workflow.current - workflow.initial}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
