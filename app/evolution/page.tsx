'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  FlaskConical,
  Bot,
  TrendingUp,
  Activity,
  GitBranch,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Sparkles,
  ArrowRight,
  Split,
  Layers,
  Microscope,
  Beaker,
  ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

// Mock Data for Evolution Agents - TechFlow L1 Support
const evolutionAgents = [
  {
    id: 'EA-001',
    name: 'Shadow Test Agent',
    status: 'running',
    task: 'Shadow Testing Proactive Resolution',
    target: 'TechFlow Support v2.5',
    progress: 67,
    metrics: { accuracy: '92.4%', latency: '2.0s' }
  },
  {
    id: 'EA-002',
    name: 'A/B Testing Agent',
    status: 'running',
    task: 'Split Testing Response Length',
    target: 'TechFlow Support (20% traffic)',
    progress: 45,
    metrics: { confidence: '67%', uplift: 'TBD' }
  },
  {
    id: 'EA-003',
    name: 'Distillation Bot',
    status: 'idle',
    task: 'Ready for Password Reset',
    target: 'Ticket Classifier (1.2% error)',
    progress: 100,
    metrics: { candidate: 'Yes', savings: '$279/mo' }
  },
  {
    id: 'EA-004',
    name: 'Edge Case Hunter',
    status: 'analyzing',
    task: 'Analyzing Escalated Tickets',
    target: 'TechFlow Support (449 escalations)',
    progress: 78,
    metrics: { found: '2 patterns', type: 'API errors' }
  }
]

const activeExperiments = [
  { id: 'EXP-104', name: 'Response Length Optimization', type: 'A/B Test', status: 'Running', uplift: 'Pending', confidence: '67%' },
  { id: 'EXP-105', name: 'Proactive Version Check v2.5', type: 'Shadow Run', status: 'Testing', uplift: '+3%', confidence: '89%' },
  { id: 'EXP-106', name: 'Context Caching for Speed', type: 'Simulation', status: 'Planning', uplift: 'Pending', confidence: 'Pending' },
]

const pipelineStages = [
  { id: 'discovery', label: 'Discovery', count: 2, icon: Sparkles, color: 'text-cyan-500' },
  { id: 'simulation', label: 'Simulation', count: 3, icon: FlaskConical, color: 'text-blue-500' },
  { id: 'ab-testing', label: 'A/B Testing', count: 3, icon: Split, color: 'text-purple-500' },
  { id: 'distillation', label: 'Distillation', count: 1, icon: Layers, color: 'text-amber-500' },
  { id: 'production', label: 'Production', count: 12, icon: CheckCircle2, color: 'text-emerald-500' },
]

export default function EvolutionLabPage() {
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
        title="TechFlow Evolution Lab"
        subtitle="Self-Improvement Pipeline | Day 90 | 12 versions deployed autonomously"
        breadcrumbs={[{ label: 'Evolution Lab' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Supervisor Stream & Pipeline Status */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Supervisor Stream (HUD Style) */}
          <Card className="lg:col-span-1 border-border bg-black/90 text-green-500 font-mono text-xs overflow-hidden flex flex-col h-[200px] relative shadow-[0_0_20px_rgba(0,255,0,0.1)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-50" />
            <CardHeader className="p-3 border-b border-green-900/30 bg-green-900/10">
              <CardTitle className="text-[10px] uppercase tracking-widest flex items-center gap-2 text-green-400">
                <Activity className="w-3 h-3 animate-pulse" />
                Supervisor Stream
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 flex-1 overflow-hidden relative">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,20,0,0.8)_100%)] pointer-events-none z-10" />
              <div className="space-y-2 animate-in slide-in-from-bottom duration-1000">
                {[
                  "Processing TechFlow ticket #1843...",
                  "Ticket Classifier: 92% confidence (billing)",
                  "Compliance Validator: Passed 8/8 rules",
                  "Shadow Test: v2.5 proactive check (67%)",
                  "A/B Test EXP-104: 20% traffic split",
                  "Distillation ready: Password Reset (1.2%)",
                  "Integration Helper: API v3 detected",
                  "Edge Case: New subscription pause pattern",
                  "Response sent: 2.1s | Customer: satisfied"
                ].map((log, i) => (
                  <div key={i} className="flex gap-2 opacity-80 hover:opacity-100 transition-opacity">
                    <span className="text-green-700">[{new Date().toLocaleTimeString()}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pipeline Status Visualization */}
          <div className="lg:col-span-3 w-full overflow-x-auto pb-4 flex items-center">
            <div className="w-full grid grid-cols-5 gap-4">
              {pipelineStages.map((stage, i) => (
                <div key={stage.id} className="relative group">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10" />
                  {i === 0 && <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-background -z-10" />}
                  {i === pipelineStages.length - 1 && <div className="absolute top-1/2 right-0 w-1/2 h-0.5 bg-background -z-10" />}

                  <Card className="relative border-border bg-card hover:border-primary/50 transition-colors cursor-pointer h-full">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                      <div className={cn("p-2 rounded-full bg-background border border-border group-hover:scale-110 transition-transform duration-300 relative", stage.color)}>
                        <stage.icon className="w-5 h-5" />
                        <div className={cn("absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 animate-ping", stage.color.replace('text-', 'bg-'))} />
                      </div>
                      <div>
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{stage.label}</p>
                        <p className="text-xl font-bold font-mono">{stage.count}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {i < pipelineStages.length - 1 && (
                    <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 bg-background rounded-full border border-border p-0.5">
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
          {[
            { label: 'Active Experiments', value: '3', icon: FlaskConical, color: 'text-cyan-500' },
            { label: 'Accuracy Improvement', value: '+32%', icon: TrendingUp, color: 'text-emerald-500' },
            { label: 'Automation Rate', value: '75.7%', icon: Cpu, color: 'text-purple-500' },
            { label: 'Evolution Agents', value: '4', icon: Bot, color: 'text-amber-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-card p-6 flex items-center justify-between group hover:bg-accent/5 transition-colors">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold font-mono mt-1">{stat.value}</h3>
              </div>
              <div className={cn("p-2 rounded-full bg-background border border-border/50", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Evolution Agents Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Evolution Agents
            </h2>
            <Badge variant="outline" className="font-mono text-xs">
              Managed by Supervisor Alpha
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {evolutionAgents.map((agent) => (
              <Link key={agent.id} href={`/evolution/agents/${agent.id}`} className="block h-full">
                <Card className="h-full border-border bg-card rounded-none overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer relative">
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                  <div className="p-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded flex items-center justify-center border",
                        agent.status === 'running' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                          agent.status === 'analyzing' ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                            "bg-muted border-border text-muted-foreground"
                      )}>
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-medium">{agent.name}</CardTitle>
                        <p className="text-[10px] font-mono text-muted-foreground">{agent.id}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={cn(
                      "text-[10px] uppercase tracking-wider font-mono border-0",
                      agent.status === 'running' ? "bg-emerald-500/10 text-emerald-500 animate-pulse" :
                        agent.status === 'analyzing' ? "bg-blue-500/10 text-blue-500" :
                          "bg-muted text-muted-foreground"
                    )}>
                      {agent.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Current Task</p>
                      <p className="text-sm font-medium truncate" title={agent.task}>{agent.task}</p>
                      <p className="text-xs text-muted-foreground truncate">Target: {agent.target}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span className="font-mono">{agent.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full transition-all duration-500",
                            agent.status === 'running' ? "bg-emerald-500" :
                              agent.status === 'analyzing' ? "bg-blue-500" : "bg-muted-foreground"
                          )}
                          style={{ width: `${agent.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
                      {Object.entries(agent.metrics).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-[10px] text-muted-foreground uppercase">{key}</p>
                          <p className="text-xs font-mono font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Active Experiments & Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experiment List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border bg-card rounded-none">
              <CardHeader className="border-b border-border py-3 px-4">
                <CardTitle className="text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-primary" />
                  Active Experiments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {activeExperiments.map((exp) => (
                    <Link key={exp.id} href={`/evolution/experiments/${exp.id}`} className="block hover:bg-muted/10 transition-colors">
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "p-2 rounded border",
                            exp.type === 'A/B Test' ? "bg-purple-500/10 border-purple-500/20 text-purple-500" :
                              exp.type === 'Shadow Run' ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-500" :
                                "bg-blue-500/10 border-blue-500/20 text-blue-500"
                          )}>
                            {exp.type === 'A/B Test' ? <Split className="w-4 h-4" /> :
                              exp.type === 'Shadow Run' ? <Clock className="w-4 h-4" /> :
                                <Activity className="w-4 h-4" />}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">{exp.name}</h4>
                            <p className="text-xs text-muted-foreground font-mono">{exp.id} • {exp.status}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-right">
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase">Uplift</p>
                            <p className={cn("text-sm font-mono font-bold", exp.uplift.startsWith('+') ? "text-emerald-500" : "text-muted-foreground")}>
                              {exp.uplift}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase">Confidence</p>
                            <p className="text-sm font-mono">{exp.confidence}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Global Metrics / Distillation Queue */}
          <div className="space-y-6">
            <Card className="border-border bg-card rounded-none p-6">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">System Efficiency</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Token Savings</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-500">-24%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Latency Reduction</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-500">-150ms</span>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Over 90 days, TechFlow L1 Support has evolved through <span className="text-foreground font-medium">12 autonomous versions</span>, improving accuracy from 62% to 97.2% while reducing cost by 87%.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

      </main>
    </div>
  )
}
