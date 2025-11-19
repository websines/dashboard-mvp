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
  FileText,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Clock,
  Target
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
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Scenario Training"
        subtitle="Edge Case Management"
        breadcrumbs={[{ label: 'Training' }, { label: 'Scenarios' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Scenario Library</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              {scenarios.length} active training scenarios
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-none h-10 border-dashed">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="rounded-none h-10 px-6">
              <Upload className="w-4 h-4 mr-2" />
              Import Scenarios
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Scenarios</p>
                <h3 className="text-2xl font-bold mt-1">{scenarios.length}</h3>
              </div>
              <FlaskConical className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span>{preMadeScenarios.length} static</span>
              <span>•</span>
              <span className="text-cyan-500">{discoveredScenarios.length} discovered</span>
            </div>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Encounters</p>
                <h3 className="text-2xl font-bold mt-1">{totalEncounters}</h3>
              </div>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Lifetime volume</p>
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

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Auto-Discovery</p>
                <h3 className="text-2xl font-bold mt-1">{discoveredScenarios.length}</h3>
              </div>
              <Sparkles className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-xs text-cyan-500 font-mono flex items-center gap-1">
              <Activity className="w-3 h-3" /> Active learning
            </p>
          </Card>
        </div>

        {/* Scenarios List */}
        <div className="space-y-6">

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search scenarios..."
                  className="h-8 w-64 bg-background border border-border pl-8 pr-3 text-xs focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <Button variant="outline" size="sm" className="rounded-none h-8 border-dashed">
                <Filter className="w-3 h-3 mr-2" /> Filter
              </Button>
            </div>
          </div>

          {/* Table */}
          <Card className="border-border bg-card rounded-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30 border-b border-border text-xs uppercase font-mono text-muted-foreground">
                  <tr>
                    <th className="p-4 font-medium w-[300px]">Scenario Name</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Frequency</th>
                    <th className="p-4 font-medium">Success Rate</th>
                    <th className="p-4 font-medium">Encounters</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {scenarios.map((scenario) => (
                    <tr key={scenario.id} className="group hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {scenario.type === 'discovered' ?
                              <Sparkles className="w-4 h-4 text-cyan-500" /> :
                              <Target className="w-4 h-4 text-muted-foreground" />
                            }
                          </div>
                          <div>
                            <span className="font-medium text-foreground block">{scenario.name}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">{scenario.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-none text-[10px] uppercase tracking-wider font-mono",
                            scenario.type === 'discovered' ? "text-cyan-500 border-cyan-500/20 bg-cyan-500/5" : "text-muted-foreground border-border"
                          )}
                        >
                          {scenario.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-none text-[10px] uppercase tracking-wider font-mono border-0",
                            scenario.frequency === 'common' ? "text-emerald-500 bg-emerald-500/10" :
                              scenario.frequency === 'uncommon' ? "text-yellow-500 bg-yellow-500/10" :
                                "text-orange-500 bg-orange-500/10"
                          )}
                        >
                          {scenario.frequency}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-mono", scenario.successRate >= 90 ? "text-emerald-500" : "text-yellow-500")}>
                            {scenario.successRate}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-mono text-xs">{scenario.timesEncountered}</span>
                          <span className="text-[10px] text-muted-foreground">{scenario.lastSeen}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" className="rounded-none h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
