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
import { useRouter } from 'next/navigation'
import { initialScenarios, Scenario } from './data'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"



export default function ScenarioTrainingPage() {
  const { sidebarCollapsed } = useDashboardStore()
  const router = useRouter()
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newScenario, setNewScenario] = useState<Partial<Scenario>>({
    name: '',
    description: '',
    trigger: '',
    type: 'pre-made',
    frequency: 'common',
    workflowResponse: [],
    successRate: 0,
    timesEncountered: 0,
    lastSeen: 'Never'
  })

  const handleCreateScenario = () => {
    if (!newScenario.name || !newScenario.description) return

    const scenario: Scenario = {
      id: `SC-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: newScenario.name,
      description: newScenario.description,
      trigger: newScenario.trigger || '',
      type: newScenario.type as any,
      frequency: newScenario.frequency as any,
      workflowResponse: [],
      successRate: 0,
      timesEncountered: 0,
      lastSeen: 'Never'
    }

    setScenarios([...scenarios, scenario])
    setIsDialogOpen(false)
    setNewScenario({
      name: '',
      description: '',
      trigger: '',
      type: 'pre-made',
      frequency: 'common',
      workflowResponse: [],
      successRate: 0,
      timesEncountered: 0,
      lastSeen: 'Never'
    })
  }

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
            <Button className="rounded-none h-10 px-6" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Scenario
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Scenario</DialogTitle>
                  <DialogDescription>
                    Define a new training scenario for your agents.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Scenario Name</Label>
                    <Input
                      id="name"
                      value={newScenario.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewScenario({ ...newScenario, name: e.target.value })}
                      placeholder="e.g., Unexpected User Input"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newScenario.type}
                      onValueChange={(v) => setNewScenario({ ...newScenario, type: v as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-made">Pre-made</SelectItem>
                        <SelectItem value="discovered">Discovered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select
                      value={newScenario.frequency}
                      onValueChange={(v) => setNewScenario({ ...newScenario, frequency: v as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="common">Common</SelectItem>
                        <SelectItem value="uncommon">Uncommon</SelectItem>
                        <SelectItem value="rare">Rare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="trigger">Trigger Condition</Label>
                    <Input
                      id="trigger"
                      value={newScenario.trigger}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewScenario({ ...newScenario, trigger: e.target.value })}
                      placeholder="e.g., User says 'Cancel'"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newScenario.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewScenario({ ...newScenario, description: e.target.value })}
                      placeholder="Describe the scenario..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateScenario}>Create Scenario</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                    <tr
                      key={scenario.id}
                      onClick={() => router.push(`/scenario-training/${scenario.id}`)}
                      className="group hover:bg-muted/20 transition-colors cursor-pointer"
                    >
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
