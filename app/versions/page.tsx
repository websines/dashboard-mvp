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
  ChevronRight,
  History,
  ArrowUpRight,
  Terminal,
  Code2
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
  supervisor_autonomous: 'text-cyan-400 border-cyan-500/20',
  user_feedback: 'text-blue-400 border-blue-500/20',
  scenario_learning: 'text-purple-400 border-purple-500/20',
  performance_optimization: 'text-emerald-400 border-emerald-500/20'
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
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Version Control"
        subtitle="Git-Style Autonomous Versioning"
        breadcrumbs={[{ label: 'System', href: '/evolution' }, { label: 'Versions' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">TechFlow L1 Support Automation - Version History</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              90-day evolution | v1.0 (62% accuracy) → v2.4 (94% accuracy) | Autonomous improvements by Supervisor
            </p>
          </div>          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-none h-8 gap-2 font-mono text-xs">
              <GitBranch className="w-3 h-3" />
              main
            </Button>
            {experimentalBranches.length > 0 && (
              <Badge variant="secondary" className="rounded-none h-8 px-3 font-mono text-xs gap-2">
                <GitBranch className="w-3 h-3" />
                {experimentalBranches.length} experimental
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Versions</p>
                <h3 className="text-2xl font-bold mt-1">{versionHistory.length}</h3>
              </div>
              <History className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Auto-created in 31 days</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Current Version</p>
                <h3 className="text-2xl font-bold mt-1">{mainBranchVersions[0].version}</h3>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">{mainBranchVersions[0].accuracy}% accuracy</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Improvement</p>
                <h3 className="text-2xl font-bold mt-1 text-emerald-500">+{totalImprovement}%</h3>
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Since v1.0.0</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Autonomous Changes</p>
                <h3 className="text-2xl font-bold mt-1">{versionHistory.filter(v => v.author === 'Supervisor Agent').length}</h3>
              </div>
              <Brain className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">By Supervisor Agent</p>
          </Card>
        </div>

        {/* Experimental Branches */}
        {experimentalBranches.length > 0 && (
          <Card className="border-border bg-card rounded-none p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-foreground" />
                  Experimental Branches
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">Testing workflow variations before merging to main</p>
              </div>
            </div>
            <div className="space-y-4">
              {experimentalBranches.map((version) => {
                const TriggerIcon = triggerIcons[version.trigger]
                return (
                  <div key={version.version} className="border border-border/50 bg-secondary/10 p-4 hover:border-foreground/30 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-background border border-border">
                          <GitBranch className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm">{version.version}</span>
                            <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-wider">Experimental</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={cn("rounded-none text-[10px] uppercase tracking-wider border-0 bg-transparent px-0", triggerColors[version.trigger])}>
                              <TriggerIcon className="w-3 h-3 mr-1" />
                              {version.trigger.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-none h-8 gap-2">
                        <GitMerge className="w-3 h-3" />
                        Merge
                      </Button>
                    </div>

                    <div className="pl-[52px] space-y-4">
                      <div className="space-y-1">
                        {version.changes.map((change, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground font-mono">
                            <span className="text-foreground/30 select-none">|</span>
                            <span>{change}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 pt-2 border-t border-border/30">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Accuracy</span>
                          <span className="text-sm font-mono text-emerald-500">{version.accuracy}%</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Runs</span>
                          <span className="text-sm font-mono">{version.metrics.tasks}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Cost</span>
                          <span className="text-sm font-mono">{version.metrics.cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {/* Version Timeline */}
        <Card className="border-border bg-card rounded-none p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <GitCommit className="w-5 h-5 text-foreground" />
                Version Timeline
              </h3>
              <p className="text-xs text-muted-foreground font-mono mt-1">Main branch history</p>
            </div>
          </div>

          <div className="relative space-y-0">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border/50" />

            {mainBranchVersions.map((version, index) => {
              const TriggerIcon = triggerIcons[version.trigger]
              return (
                <div key={version.version} className="relative pl-12 pb-8 last:pb-0 group">
                  {/* Dot */}
                  <div className={cn(
                    "absolute left-0 top-1 w-10 h-10 flex items-center justify-center border bg-background z-10 transition-colors",
                    version.status === 'latest' ? "border-emerald-500 text-emerald-500" : "border-border text-muted-foreground group-hover:border-foreground/50 group-hover:text-foreground"
                  )}>
                    <GitCommit className="w-4 h-4" />
                  </div>

                  <div className="border border-border/50 bg-card p-5 hover:border-foreground/20 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono font-bold text-lg">{version.version}</span>
                          {version.status === 'latest' && (
                            <Badge className="rounded-none bg-emerald-500 hover:bg-emerald-600 text-black font-mono text-[10px] uppercase tracking-wider">
                              Latest
                            </Badge>
                          )}
                          <Badge variant="outline" className={cn("rounded-none text-[10px] uppercase tracking-wider border-0 bg-transparent px-0", triggerColors[version.trigger])}>
                            <TriggerIcon className="w-3 h-3 mr-1" />
                            {version.trigger.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                          <span>{version.date}</span>
                          <span>{version.time}</span>
                          <span>By {version.author}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-none h-8 w-8 p-0">
                          <Eye className="w-3 h-3" />
                        </Button>
                        {version.status !== 'latest' && (
                          <Button variant="outline" size="sm" className="rounded-none h-8 w-8 p-0">
                            <History className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-mono">Changelog</p>
                        <div className="space-y-1.5">
                          {version.changes.map((change, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="w-3 h-3 mt-1 text-foreground/40 shrink-0" />
                              <span>{change}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-mono">Performance Metrics</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-secondary/10 border border-border/50">
                          <div>
                            <span className="text-[10px] text-muted-foreground block">Tasks</span>
                            <span className="font-mono text-sm font-semibold">{version.metrics.tasks}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground block">Success</span>
                            <span className="font-mono text-sm font-semibold text-emerald-500">{version.metrics.successRate}%</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground block">Latency</span>
                            <span className="font-mono text-sm font-semibold">{version.metrics.avgTime}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground block">Cost</span>
                            <span className="font-mono text-sm font-semibold">{version.metrics.cost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </main>
    </div>
  )
}
