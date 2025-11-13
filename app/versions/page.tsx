'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GitBranch, GitCommit, Tag, TrendingUp, Clock, Download, Eye } from 'lucide-react'

const versionHistory = [
  {
    version: 'v2.3',
    date: 'Day 30',
    time: '2 hours ago',
    accuracy: 95,
    branch: 'main',
    changes: [
      'Optimized agent communication protocol',
      'Improved error handling in Worker agents',
      'Added caching layer for repeated tasks',
    ],
    metrics: {
      tasks: 156,
      successRate: 95.2,
      avgTime: '2.3s',
    },
    status: 'latest',
  },
  {
    version: 'v2.0',
    date: 'Day 14',
    time: '16 days ago',
    accuracy: 85,
    branch: 'main',
    changes: [
      'Major architecture refactor',
      'Implemented parallel task execution',
      'Added Supervisor agent layer',
    ],
    metrics: {
      tasks: 142,
      successRate: 84.8,
      avgTime: '3.1s',
    },
    status: 'stable',
  },
  {
    version: 'v1.2',
    date: 'Day 7',
    time: '23 days ago',
    accuracy: 72,
    branch: 'main',
    changes: [
      'Enhanced Planner agent logic',
      'Fixed dependency resolution bugs',
      'Improved task prioritization',
    ],
    metrics: {
      tasks: 98,
      successRate: 71.4,
      avgTime: '4.2s',
    },
    status: 'archived',
  },
  {
    version: 'v1.0',
    date: 'Day 1',
    time: '30 days ago',
    accuracy: 60,
    branch: 'main',
    changes: [
      'Initial deployment',
      'Basic multi-agent workflow',
      'Simple task orchestration',
    ],
    metrics: {
      tasks: 67,
      successRate: 59.7,
      avgTime: '5.8s',
    },
    status: 'archived',
  },
]

export default function VersionsPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Version History"
        subtitle="Time-Series Workflow"
        breadcrumbs={[{ label: 'Versions' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Workflow Versions</h1>
            <p className="text-sm text-muted-foreground">
              Git-style version control for your workflows
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <GitBranch className="h-4 w-4" />
              Branch: main
            </Button>
          </div>
        </div>

        {/* Version Timeline */}
        <div className="space-y-4">
          {versionHistory.map((version, index) => (
            <Card key={version.version} className={cn(
              "border-border/40 transition-all hover:border-border",
              version.status === 'latest' && 'border-green-500/50 bg-green-500/5'
            )}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
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
                      {index < versionHistory.length - 1 && (
                        <div className="w-0.5 h-full min-h-[4rem] bg-border/40 mt-2" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold">{version.version}</h3>
                        {version.status === 'latest' && (
                          <Badge variant="default" className="gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Latest
                          </Badge>
                        )}
                        {version.status === 'stable' && (
                          <Badge variant="secondary">Stable</Badge>
                        )}
                        <span className="text-sm text-muted-foreground ml-2">
                          {version.branch}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <span>{version.date}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{version.time}</span>
                        </div>
                        <span>•</span>
                        <span className="font-medium text-green-500">
                          {version.accuracy}% accuracy
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Changes:</p>
                        <ul className="space-y-1">
                          {version.changes.map((change, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-6 p-3 rounded-lg bg-accent/30">
                        <div>
                          <p className="text-xs text-muted-foreground">Tasks Completed</p>
                          <p className="text-lg font-semibold">{version.metrics.tasks}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Success Rate</p>
                          <p className="text-lg font-semibold">{version.metrics.successRate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Avg Response</p>
                          <p className="text-lg font-semibold">{version.metrics.avgTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    {version.status !== 'latest' && (
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Rollback
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Version Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Versions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{versionHistory.length}</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Branches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">+35%</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
