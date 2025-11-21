'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
  CheckCircle2, Play, ArrowRight, Zap, TrendingUp, Bot, MessageSquare,
  Database, FileText, Plus, Sparkles, GitBranch, Clock, Activity,
  Workflow, ChevronRight, Settings2, Search, Filter, MoreHorizontal,
  LayoutGrid, List as ListIcon
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

import { workflows } from './data'

export default function WorkflowsPage() {
  const { sidebarCollapsed } = useDashboardStore()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('list')

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeWorkflows = workflows.filter(w => w.status === 'active').length
  const totalExecutions = workflows.reduce((sum, w) => sum + w.executions, 0)
  const avgSuccessRate = Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Workflows"
        subtitle="Orchestration Engine"
        breadcrumbs={[{ label: 'Workflows' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pipeline Overview</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Managing {workflows.length} autonomous workflows
            </p>
          </div>
          <Button className="rounded-none h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border bg-card/50 backdrop-blur-sm rounded-xl p-4 flex flex-col justify-between h-32 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Active Pipelines</p>
                <h3 className="text-2xl font-bold mt-1">{activeWorkflows}</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs text-emerald-500 font-mono">System Operational</p>
            </div>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm rounded-xl p-4 flex flex-col justify-between h-32 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Executions</p>
                <h3 className="text-2xl font-bold mt-1">{totalExecutions.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Zap className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-mono">All-time volume</p>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm rounded-xl p-4 flex flex-col justify-between h-32 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Avg Success Rate</p>
                <h3 className="text-2xl font-bold mt-1">{avgSuccessRate}%</h3>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <div className="w-full bg-secondary h-1 mt-4 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: `${avgSuccessRate}%` }} />
            </div>
          </Card>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/30 p-4 rounded-xl border border-border/50">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workflows..."
                className="pl-8 bg-background/50 border-border/50 focus:border-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-background/50 border-border/50">
                <div className="flex items-center gap-2">
                  <Filter className="w-3 h-3" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 border-l border-border/50 pl-4">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", viewMode === 'list' && "bg-accent text-accent-foreground")}
              onClick={() => setViewMode('list')}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", viewMode === 'grid' && "bg-accent text-accent-foreground")}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Workflows List */}
        <div className={cn(
          "grid gap-4",
          viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
        )}>
          <AnimatePresence>
            {filteredWorkflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={cn(
                  "group border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:border-primary/20 overflow-hidden",
                  viewMode === 'list' ? "rounded-xl" : "rounded-xl h-full flex flex-col"
                )}>
                  <div className={cn("p-6", viewMode === 'list' ? "" : "flex-1")}>
                    <div className={cn(
                      "flex justify-between gap-6",
                      viewMode === 'list' ? "flex-col lg:flex-row lg:items-center" : "flex-col"
                    )}>

                      {/* Workflow Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                              {workflow.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-md text-[10px] uppercase tracking-wider font-mono",
                                workflow.status === 'active' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" :
                                  workflow.status === 'testing' ? "text-yellow-500 border-yellow-500/20 bg-yellow-500/5" :
                                    "text-muted-foreground border-border bg-muted/50"
                              )}
                            >
                              {workflow.status}
                            </Badge>
                          </div>
                          {viewMode === 'grid' && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                          {workflow.description}
                        </p>

                        {/* Metrics Mini-Grid */}
                        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground bg-muted/30 p-2 rounded-lg border border-border/50 w-fit">
                          <div className="flex items-center gap-1.5">
                            <Play className="w-3 h-3 text-blue-400" />
                            <span>{workflow.executions.toLocaleString()}</span>
                          </div>
                          <div className="w-px h-3 bg-border" />
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-purple-400" />
                            <span>{workflow.avgTime}</span>
                          </div>
                          <div className="w-px h-3 bg-border" />
                          <div className="flex items-center gap-1.5">
                            <span className={cn("font-bold", workflow.successRate >= 90 ? "text-emerald-500" : "text-yellow-500")}>
                              {workflow.successRate}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Pipeline Visualization */}
                      <div className={cn(
                        "flex-1",
                        viewMode === 'list' ? "lg:max-w-md" : "w-full mt-4 pt-4 border-t border-border/50"
                      )}>
                        <div className="flex items-center justify-between relative px-2">
                          {/* Connecting Line */}
                          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

                          {workflow.agents.map((agent, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 z-10 group/agent relative">
                              <div className={cn(
                                "w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-300 shadow-sm",
                                agent.status === 'active'
                                  ? "border-primary/50 bg-background text-primary shadow-primary/10 group-hover/agent:scale-110 group-hover/agent:border-primary"
                                  : "border-border bg-muted text-muted-foreground"
                              )}>
                                <agent.icon className="w-4 h-4" />
                              </div>
                              <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground opacity-0 group-hover/agent:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap bg-background/90 px-1 rounded border border-border">
                                {agent.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className={cn(
                        "flex items-center gap-2",
                        viewMode === 'list' ? "lg:border-l lg:border-border lg:pl-6" : "mt-4 justify-end"
                      )}>
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg border-border/50 hover:bg-accent hover:text-accent-foreground">
                          <Settings2 className="w-4 h-4" />
                        </Button>
                        <Link href={`/workflows/${workflow.id}`} className={viewMode === 'grid' ? "flex-1" : ""}>
                          <Button size="sm" className={cn(
                            "h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 shadow-sm",
                            viewMode === 'grid' ? "w-full" : ""
                          )}>
                            View Details <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>

                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredWorkflows.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No workflows found</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Try adjusting your search or filters
              </p>
              <Button
                variant="link"
                onClick={() => { setSearchQuery(''); setStatusFilter('all') }}
                className="mt-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
