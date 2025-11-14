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
  GitBranch,
  GitCommit,
  Tag,
  TrendingUp,
  Clock,
  Download,
  Eye,
  GitMerge,
  Sparkles,
  User,
  Brain,
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'

interface Version {
  version: string
  date: string
  time: string
  accuracy: number
  errorRate: number
  branch: 'main' | 'experimental'
  trigger: 'supervisor_autonomous' | 'user_feedback' | 'scenario_learning' | 'performance_optimization'
  changes: string[]
  metrics: {
    tasks: number
    successRate: number
    avgTime: string
    cost: string
  }
  status: 'latest' | 'stable' | 'experimental' | 'merged' | 'archived'
  author: 'Supervisor Agent' | 'Initial Setup'
}

const versionHistory: Version[] = [
  // Latest main branch version
  {
    version: 'v3.2.1',
    date: 'Nov 15',
    time: '2 hours ago',
    accuracy: 94,
    errorRate: 6,
    branch: 'main',
    trigger: 'supervisor_autonomous',
    author: 'Supervisor Agent',
    changes: [
      'Modified Email Sender agent tone from casual to professional',
      'Triggered by 3 user complaints about language appropriateness',
      'Updated prompt template and response validation'
    ],
    metrics: {
      tasks: 247,
      successRate: 94.2,
      avgTime: '2.1s',
      cost: '$0.12'
    },
    status: 'latest'
  },

  // Experimental branch testing
  {
    version: 'v3.3.0-beta',
    date: 'Nov 14',
    time: '1 day ago',
    accuracy: 96,
    errorRate: 4,
    branch: 'experimental',
    trigger: 'performance_optimization',
    author: 'Supervisor Agent',
    changes: [
      'Testing optimized model for resume parsing (faster + cheaper)',
      '47 test executions, 96% accuracy (+2% vs current)',
      'Cost reduction: $0.04 per run vs $0.12 current'
    ],
    metrics: {
      tasks: 47,
      successRate: 96.0,
      avgTime: '1.8s',
      cost: '$0.08'
    },
    status: 'experimental'
  },

  {
    version: 'v3.2.0',
    date: 'Nov 14',
    time: '1 day ago',
    accuracy: 94,
    errorRate: 6,
    branch: 'main',
    trigger: 'supervisor_autonomous',
    author: 'Supervisor Agent',
    changes: [
      'Created Document Parser agent autonomously',
      'Detected 15 failed tasks (12% failure rate) from unstructured PDFs',
      'Added specialized OCR + layout analysis capabilities'
    ],
    metrics: {
      tasks: 232,
      successRate: 94.0,
      avgTime: '2.2s',
      cost: '$0.12'
    },
    status: 'stable'
  },

  {
    version: 'v3.1.5',
    date: 'Nov 12',
    time: '3 days ago',
    accuracy: 92,
    errorRate: 8,
    branch: 'main',
    trigger: 'performance_optimization',
    author: 'Supervisor Agent',
    changes: [
      'Parallelized Resume Parse + Compliance Check tasks',
      'Analysis showed no dependency between tasks',
      'Reduced average execution time by 40%'
    ],
    metrics: {
      tasks: 218,
      successRate: 92.3,
      avgTime: '2.8s',
      cost: '$0.11'
    },
    status: 'stable'
  },

  {
    version: 'v3.1.0',
    date: 'Nov 10',
    time: '5 days ago',
    accuracy: 90,
    errorRate: 10,
    branch: 'main',
    trigger: 'supervisor_autonomous',
    author: 'Supervisor Agent',
    changes: [
      'Removed Legacy Notifier agent (unused for 50+ executions)',
      'Agent redundant with Email Sender capabilities',
      'Cost savings: $0.03 per run'
    ],
    metrics: {
      tasks: 205,
      successRate: 89.8,
      avgTime: '3.2s',
      cost: '$0.14'
    },
    status: 'stable'
  },

  {
    version: 'v3.0.8',
    date: 'Nov 8',
    time: '7 days ago',
    accuracy: 88,
    errorRate: 12,
    branch: 'main',
    trigger: 'scenario_learning',
    author: 'Supervisor Agent',
    changes: [
      'Learned new scenario: Duplicate Application detection',
      'Detected pattern: 3 candidates applied twice within 7 days',
      'Created automatic deduplication logic'
    ],
    metrics: {
      tasks: 189,
      successRate: 88.4,
      avgTime: '3.4s',
      cost: '$0.13'
    },
    status: 'archived'
  },

  {
    version: 'v3.0.0',
    date: 'Nov 1',
    time: '14 days ago',
    accuracy: 81,
    errorRate: 19,
    branch: 'main',
    trigger: 'supervisor_autonomous',
    author: 'Supervisor Agent',
    changes: [
      'Major workflow refactor after 100+ executions',
      'Reorganized task dependencies (DAG optimization)',
      'Added Guardian coherence validation'
    ],
    metrics: {
      tasks: 156,
      successRate: 81.2,
      avgTime: '4.1s',
      cost: '$0.15'
    },
    status: 'archived'
  },

  {
    version: 'v2.1.3',
    date: 'Oct 25',
    time: '21 days ago',
    accuracy: 74,
    errorRate: 26,
    branch: 'main',
    trigger: 'user_feedback',
    author: 'Supervisor Agent',
    changes: [
      'User feedback: Follow-up timing too slow (3 days → 24 hours)',
      'Modified Email Sender agent timing parameters',
      'Increased response rate by 15%'
    ],
    metrics: {
      tasks: 134,
      successRate: 74.1,
      avgTime: '4.8s',
      cost: '$0.16'
    },
    status: 'archived'
  },

  {
    version: 'v1.0.0',
    date: 'Oct 15',
    time: '31 days ago',
    accuracy: 62,
    errorRate: 38,
    branch: 'main',
    trigger: 'supervisor_autonomous',
    author: 'Initial Setup',
    changes: [
      'Initial deployment by developer',
      'Basic multi-agent workflow configured',
      'Resume Parser, Email Sender, Interview Scheduler, Compliance Checker'
    ],
    metrics: {
      tasks: 89,
      successRate: 62.4,
      avgTime: '5.8s',
      cost: '$0.18'
    },
    status: 'archived'
  }
]

const triggerColors = {
  supervisor_autonomous: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  user_feedback: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  scenario_learning: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  performance_optimization: 'bg-green-500/10 text-green-400 border-green-500/20'
}

const triggerIcons = {
  supervisor_autonomous: Brain,
  user_feedback: User,
  scenario_learning: Sparkles,
  performance_optimization: TrendingUp
}

export default function VersionsPage() {
  const { sidebarCollapsed } = useDashboardStore()

  const mainBranchVersions = versionHistory.filter(v => v.branch === 'main')
  const experimentalBranches = versionHistory.filter(v => v.branch === 'experimental')
  const totalImprovement = mainBranchVersions[0].accuracy - mainBranchVersions[mainBranchVersions.length - 1].accuracy

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
        title="Version Control"
        subtitle="Git-Style Autonomous Versioning"
        breadcrumbs={[{ label: 'Versions' }]}
      />

      <main className="mt-16 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text"
            >
              Workflow Versions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-muted-foreground"
            >
              Automatic version creation by Supervisor Agent
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <Button variant="outline" size="sm" className="gap-2">
              <GitBranch className="h-4 w-4" />
              main
            </Button>
            {experimentalBranches.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                {experimentalBranches.length} experimental
              </Badge>
            )}
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Versions</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{versionHistory.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Auto-created in 31 days
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Current Version</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mainBranchVersions[0].version}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mainBranchVersions[0].accuracy}% accuracy
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Improvement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">+{totalImprovement}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Since v1.0.0
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Autonomous Changes</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{versionHistory.filter(v => v.author === 'Supervisor Agent').length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  By Supervisor Agent
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Experimental Branches */}
        {experimentalBranches.length > 0 && (
          <Card className="mb-8 border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                Experimental Branches
              </CardTitle>
              <CardDescription>
                Testing workflow variations before merging to main
              </CardDescription>
            </CardHeader>
            <CardContent>
              {experimentalBranches.map((version) => {
                const TriggerIcon = triggerIcons[version.trigger]
                return (
                  <motion.div
                    key={version.version}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border border-cyan-500/20 rounded-lg p-4 bg-cyan-500/5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="h-4 w-4 text-cyan-400" />
                          <span className="font-semibold">{version.version}</span>
                          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                            experimental
                          </Badge>
                          <Badge variant="outline" className={cn('text-xs', triggerColors[version.trigger])}>
                            <TriggerIcon className="h-3 w-3 mr-1" />
                            {version.trigger.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="space-y-1 mb-3">
                          {version.changes.map((change, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                              <span>{change}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-green-400 font-semibold">{version.accuracy}% accuracy</span>
                          <span className="text-muted-foreground">{version.metrics.tasks} test runs</span>
                          <span className="text-muted-foreground">{version.metrics.cost}/run</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <GitMerge className="h-4 w-4" />
                        Merge to main
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>
        )}

        {/* Version Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCommit className="h-5 w-5 text-primary" />
              Version Timeline (main branch)
            </CardTitle>
            <CardDescription>
              Chronological history of autonomous workflow evolution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mainBranchVersions.map((version, index) => {
                const TriggerIcon = triggerIcons[version.trigger]
                return (
                  <motion.div
                    key={version.version}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'border rounded-lg p-4 transition-all hover:border-border',
                      version.status === 'latest' && 'border-green-500/30 bg-green-500/5'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center shrink-0">
                        <div className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full border-2',
                          version.status === 'latest'
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-border bg-accent/50'
                        )}>
                          <GitCommit className={cn(
                            'h-5 w-5',
                            version.status === 'latest' ? 'text-green-500' : 'text-muted-foreground'
                          )} />
                        </div>
                        {index < mainBranchVersions.length - 1 && (
                          <div className="w-0.5 flex-1 min-h-[4rem] bg-border/40 mt-2" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{version.version}</span>
                          {version.status === 'latest' && (
                            <Badge variant="default" className="gap-1">
                              <TrendingUp className="h-3 w-3" />
                              Latest
                            </Badge>
                          )}
                          <Badge variant="outline" className={cn('text-xs ml-2', triggerColors[version.trigger])}>
                            <TriggerIcon className="h-3 w-3 mr-1" />
                            {version.trigger.replace('_', ' ')}
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-auto">{version.author}</span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span>{version.date}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {version.time}
                          </div>
                          <span>•</span>
                          <span className="font-medium text-green-400">
                            {version.accuracy}% accuracy
                          </span>
                          <span>•</span>
                          <span className={cn(
                            'font-medium',
                            version.errorRate <= 5 ? 'text-green-400' : 'text-orange-400'
                          )}>
                            {version.errorRate}% errors
                          </span>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs font-medium text-muted-foreground mb-2">Changes:</p>
                          <div className="space-y-1">
                            {version.changes.map((change, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span>{change}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-6 p-3 rounded-lg bg-secondary/30">
                          <div>
                            <p className="text-xs text-muted-foreground">Tasks</p>
                            <p className="text-sm font-semibold">{version.metrics.tasks}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Success Rate</p>
                            <p className="text-sm font-semibold text-green-400">{version.metrics.successRate}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Avg Time</p>
                            <p className="text-sm font-semibold">{version.metrics.avgTime}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Cost/Run</p>
                            <p className="text-sm font-semibold">{version.metrics.cost}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {version.status !== 'latest' && (
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
