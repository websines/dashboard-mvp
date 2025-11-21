'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BrainCircuit, Plus, Shield, AlertTriangle, CheckCircle2, Edit, Filter, Search, MoreHorizontal, Scale, Lock, AlertOctagon, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { initialRules, Rule } from './data'
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



export default function AgentRulesPage() {
  const { sidebarCollapsed } = useDashboardStore()
  const router = useRouter()
  const [rules, setRules] = useState<Rule[]>(initialRules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newRule, setNewRule] = useState<Partial<Rule>>({
    name: '',
    description: '',
    category: 'Safety',
    priority: 'medium',
    status: 'active',
    triggers: 0,
    lastTriggered: 'Never'
  })

  const handleCreateRule = () => {
    if (!newRule.name || !newRule.description) return

    const rule: Rule = {
      id: `rl-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: newRule.name,
      description: newRule.description,
      category: newRule.category as any,
      priority: newRule.priority as any,
      status: 'active',
      triggers: 0,
      lastTriggered: 'Never'
    }

    setRules([...rules, rule])
    setIsDialogOpen(false)
    setNewRule({
      name: '',
      description: '',
      category: 'Safety',
      priority: 'medium',
      status: 'active',
      triggers: 0,
      lastTriggered: 'Never'
    })
  }

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Governance"
        subtitle="Behavioral Controls"
        breadcrumbs={[{ label: 'Training', href: '/agent-rules' }, { label: 'Rules' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Policy Engine</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Enforcing {rules.length} active behavioral protocols
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-none h-10 px-6">
                <Plus className="w-4 h-4 mr-2" />
                New Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Policy Rule</DialogTitle>
                <DialogDescription>
                  Define a new behavioral protocol for your agents.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Rule Name</Label>
                  <Input
                    id="name"
                    value={newRule.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRule({ ...newRule, name: e.target.value })}
                    placeholder="e.g., Tone Consistency"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newRule.category}
                    onValueChange={(v) => setNewRule({ ...newRule, category: v as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Quality">Quality</SelectItem>
                      <SelectItem value="Reliability">Reliability</SelectItem>
                      <SelectItem value="Intelligence">Intelligence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newRule.priority}
                    onValueChange={(v) => setNewRule({ ...newRule, priority: v as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newRule.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewRule({ ...newRule, description: e.target.value })}
                    placeholder="Describe what this rule enforces..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateRule}>Create Rule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Active Policies</p>
                <h3 className="text-2xl font-bold mt-1">{rules.filter(r => r.status === 'active').length}</h3>
              </div>
              <Shield className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="w-full bg-secondary h-1 mt-4">
              <div className="bg-foreground h-full w-[80%]" />
            </div>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Enforcement Rate</p>
                <h3 className="text-2xl font-bold mt-1">99.9%</h3>
              </div>
              <Scale className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-emerald-500 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> System Compliant
            </p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Triggers</p>
                <h3 className="text-2xl font-bold mt-1">
                  {rules.reduce((sum, r) => sum + r.triggers, 0).toLocaleString()}
                </h3>
              </div>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Last 24 hours</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Critical Alerts</p>
                <h3 className="text-2xl font-bold mt-1">0</h3>
              </div>
              <AlertOctagon className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">No active threats</p>
          </Card>
        </div>

        {/* Rules Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search policies..."
                  className="h-8 w-64 bg-background border border-border pl-8 pr-3 text-xs focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <Button variant="outline" size="sm" className="rounded-none h-8 border-dashed">
                <Filter className="w-3 h-3 mr-2" /> Filter
              </Button>
            </div>
          </div>

          <Card className="border-border bg-card rounded-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30 border-b border-border text-xs uppercase font-mono text-muted-foreground">
                  <tr>
                    <th className="p-4 font-medium w-[300px]">Policy Name</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Priority</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Triggers</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {rules.map((rule) => (
                    <tr
                      key={rule.id}
                      onClick={() => router.push(`/agent-rules/${rule.id}`)}
                      className="group hover:bg-muted/20 transition-colors cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {rule.category === 'Security' ? <Lock className="w-4 h-4 text-muted-foreground" /> :
                              rule.category === 'Safety' ? <Shield className="w-4 h-4 text-muted-foreground" /> :
                                <BrainCircuit className="w-4 h-4 text-muted-foreground" />}
                          </div>
                          <div>
                            <span className="font-medium text-foreground block">{rule.name}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">{rule.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-wider font-mono">
                          {rule.category}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-none text-[10px] uppercase tracking-wider font-mono border-0",
                            rule.priority === 'critical' ? "text-red-500 bg-red-500/10" :
                              rule.priority === 'high' ? "text-orange-500 bg-orange-500/10" :
                                "text-blue-500 bg-blue-500/10"
                          )}
                        >
                          {rule.priority}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            rule.status === 'active' ? "bg-emerald-500" : "bg-yellow-500"
                          )} />
                          <span className="text-xs capitalize text-muted-foreground">{rule.status}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-mono text-xs">{rule.triggers.toLocaleString()}</span>
                          <span className="text-[10px] text-muted-foreground">{rule.lastTriggered}</span>
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
