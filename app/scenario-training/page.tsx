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
  FlaskConical,
  Plus,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Upload,
  Brain,
  User,
  AlertCircle,
  ChevronRight,
  Activity,
  FileText
} from 'lucide-react'

interface Scenario {
  id: string
  name: string
  type: 'pre-made' | 'discovered'
  frequency: 'common' | 'uncommon' | 'rare'
  description: string
  trigger: string
  workflowResponse: string[]
  successRate: number
  timesEncountered: number
  lastSeen: string
}

const scenarios: Scenario[] = [
  // Pre-made scenarios (client-provided)
  {
    id: 'SC-001',
    name: 'Candidate No Response',
    type: 'pre-made',
    frequency: 'common',
    description: 'Candidate does not respond to initial outreach email within 48 hours',
    trigger: 'No email reply after 48 hours',
    workflowResponse: [
      'Send follow-up email after 48h',
      'Escalate to recruiter after 7 days',
      'Mark as inactive after 14 days'
    ],
    successRate: 87,
    timesEncountered: 142,
    lastSeen: '2 hours ago'
  },
  {
    id: 'SC-002',
    name: 'Salary Inquiry Pre-Interview',
    type: 'pre-made',
    frequency: 'common',
    description: 'Candidate asks about salary range before scheduling interview',
    trigger: 'Email contains keywords: "salary", "compensation", "pay"',
    workflowResponse: [
      'Provide salary range from job posting',
      'Mention additional benefits',
      'Schedule call with recruiter to discuss details'
    ],
    successRate: 92,
    timesEncountered: 89,
    lastSeen: '5 hours ago'
  },
  {
    id: 'SC-003',
    name: 'Employment Gap Detected',
    type: 'pre-made',
    frequency: 'uncommon',
    description: 'Resume shows gap in employment history > 6 months',
    trigger: 'Resume parser detects employment gap',
    workflowResponse: [
      'Flag for recruiter review',
      'Do not auto-reject',
      'Add note to candidate profile'
    ],
    successRate: 94,
    timesEncountered: 34,
    lastSeen: '1 day ago'
  },
  {
    id: 'SC-004',
    name: 'Weekend Contact Attempt',
    type: 'pre-made',
    frequency: 'rare',
    description: 'System attempts to contact candidate on weekend (violates business rules)',
    trigger: 'Scheduled action falls on Saturday/Sunday',
    workflowResponse: [
      'Automatically reschedule to Monday 9am',
      'Log compliance event',
      'Notify compliance team if recurring'
    ],
    successRate: 100,
    timesEncountered: 12,
    lastSeen: '3 days ago'
  },

  // Discovered scenarios (learned during operation)
  {
    id: 'SC-D001',
    name: 'Duplicate Application',
    type: 'discovered',
    frequency: 'uncommon',
    description: 'Candidate applies to same position twice within 7 days',
    trigger: 'Email/name match detected within 7 day window',
    workflowResponse: [
      'Merge duplicate applications',
      'Use most recent resume',
      'Send single response email'
    ],
    successRate: 91,
    timesEncountered: 23,
    lastSeen: '6 hours ago'
  },
  {
    id: 'SC-D002',
    name: 'Out-of-Office Auto-Reply',
    type: 'discovered',
    frequency: 'common',
    description: 'Candidate email triggers out-of-office auto-reply',
    trigger: 'Email reply contains "out of office", "OOO", "vacation"',
    workflowResponse: [
      'Do not mark as response',
      'Extract return date if available',
      'Reschedule follow-up to return date + 1 day'
    ],
    successRate: 88,
    timesEncountered: 67,
    lastSeen: '1 hour ago'
  },
  {
    id: 'SC-D003',
    name: 'Competitor Company Application',
    type: 'discovered',
    frequency: 'rare',
    description: 'Candidate currently employed at direct competitor company',
    trigger: 'Current employer matches competitor list',
    workflowResponse: [
      'Flag for confidentiality review',
      'Add non-compete check task',
      'Require legal team approval before offer'
    ],
    successRate: 96,
    timesEncountered: 8,
    lastSeen: '2 days ago'
  },
  {
    id: 'SC-D004',
    name: 'Resume Format Parsing Failure',
    type: 'discovered',
    frequency: 'uncommon',
    description: 'Resume parser fails on scanned PDF or unusual format',
    trigger: 'Resume Parser agent returns error',
    workflowResponse: [
      'Route to Document Parser agent',
      'If still fails, flag for manual review',
      'Notify candidate of processing delay'
    ],
    successRate: 85,
    timesEncountered: 18,
    lastSeen: '8 hours ago'
  },
  {
    id: 'SC-D005',
    name: 'Interview Scheduling Conflict',
    type: 'discovered',
    frequency: 'common',
    description: 'Proposed interview time conflicts with existing meeting',
    trigger: 'Calendar API returns "busy" for proposed time',
    workflowResponse: [
      'Find next available 3 slots',
      'Send alternatives to candidate',
      'Mark as "scheduling in progress"'
    ],
    successRate: 93,
    timesEncountered: 56,
    lastSeen: '30 minutes ago'
  }
]

export default function ScenarioTrainingPage() {
  const { sidebarCollapsed } = useDashboardStore()

  const preMadeScenarios = scenarios.filter(s => s.type === 'pre-made')
  const discoveredScenarios = scenarios.filter(s => s.type === 'discovered')

  const totalEncounters = scenarios.reduce((sum, s) => sum + s.timesEncountered, 0)
  const avgSuccessRate = Math.round(scenarios.reduce((sum, s) => sum + s.successRate, 0) / scenarios.length)

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
        title="Scenario Training"
        subtitle="Pre-Made + Discovered Scenarios"
        breadcrumbs={[{ label: 'Training' }, { label: 'Scenarios' }]}
      />

      <main className="mt-16 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text"
            >
              Scenario Library
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-muted-foreground"
            >
              Client-provided scenarios + autonomously discovered patterns
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Scenarios
            </Button>
          </motion.div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Scenarios</CardTitle>
                <FlaskConical className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{scenarios.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {preMadeScenarios.length} pre-made, {discoveredScenarios.length} discovered
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Times Encountered</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEncounters}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all scenarios
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">{avgSuccessRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Workflow effectiveness
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Auto-Discovered</CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{discoveredScenarios.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Learned by Supervisor Agent
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pre-Made Scenarios */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Pre-Made Scenarios
            </CardTitle>
            <CardDescription>
              Client-provided scenarios uploaded during initial setup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {preMadeScenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-border/40 rounded-lg p-4 bg-secondary/20 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm">{scenario.name}</span>
                        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
                          {scenario.id}
                        </Badge>
                        <Badge variant="secondary" className={cn(
                          'text-xs',
                          scenario.frequency === 'common' && 'bg-green-500/10 text-green-400',
                          scenario.frequency === 'uncommon' && 'bg-yellow-500/10 text-yellow-400',
                          scenario.frequency === 'rare' && 'bg-orange-500/10 text-orange-400'
                        )}>
                          {scenario.frequency}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{scenario.description}</p>
                      <div className="bg-accent/30 rounded p-2 mb-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Trigger:</p>
                        <p className="text-xs text-foreground">{scenario.trigger}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Workflow Response:</p>
                        <div className="space-y-1">
                          {scenario.workflowResponse.map((response, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs">
                              <ChevronRight className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">{response}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right shrink-0">
                      <div className="text-xl font-bold text-green-400 mb-1">{scenario.successRate}%</div>
                      <div className="text-xs text-muted-foreground mb-2">success rate</div>
                      <div className="text-sm font-semibold mb-1">{scenario.timesEncountered}</div>
                      <div className="text-xs text-muted-foreground mb-2">encounters</div>
                      <div className="text-xs text-muted-foreground">Last: {scenario.lastSeen}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Discovered Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              Discovered Scenarios
            </CardTitle>
            <CardDescription>
              Patterns autonomously identified by Supervisor Agent during operation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discoveredScenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-cyan-500/20 rounded-lg p-4 bg-gradient-to-br from-cyan-500/5 to-transparent hover:from-cyan-500/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="font-semibold text-sm">{scenario.name}</span>
                        <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                          {scenario.id}
                        </Badge>
                        <Badge variant="secondary" className={cn(
                          'text-xs',
                          scenario.frequency === 'common' && 'bg-green-500/10 text-green-400',
                          scenario.frequency === 'uncommon' && 'bg-yellow-500/10 text-yellow-400',
                          scenario.frequency === 'rare' && 'bg-orange-500/10 text-orange-400'
                        )}>
                          {scenario.frequency}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{scenario.description}</p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded p-2 mb-3">
                        <p className="text-xs font-medium text-cyan-300 mb-1">Auto-Detected Trigger:</p>
                        <p className="text-xs text-foreground">{scenario.trigger}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Autonomous Response:</p>
                        <div className="space-y-1">
                          {scenario.workflowResponse.map((response, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs">
                              <ChevronRight className="h-3 w-3 text-cyan-400 mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">{response}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right shrink-0">
                      <div className="text-xl font-bold text-green-400 mb-1">{scenario.successRate}%</div>
                      <div className="text-xs text-muted-foreground mb-2">success rate</div>
                      <div className="text-sm font-semibold mb-1">{scenario.timesEncountered}</div>
                      <div className="text-xs text-muted-foreground mb-2">encounters</div>
                      <div className="text-xs text-muted-foreground">Last: {scenario.lastSeen}</div>
                    </div>
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
