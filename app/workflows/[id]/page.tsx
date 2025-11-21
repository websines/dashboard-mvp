'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Bot, ArrowRight, CheckCircle2, Clock, AlertCircle, Play, Pause,
  TrendingUp, Zap, Activity, MessageSquare, ChevronRight, RefreshCw,
  GitBranch, Sparkles, Eye, Layers, Users, Brain, Mail, FileText,
  Calendar, Shield, Webhook, Target, BrainCircuit, Settings2, X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { workflows, WorkflowTask, WorkflowNode, WorkflowEdge } from '../data'
import { notFound } from 'next/navigation'

// Kanban board columns
const kanbanColumns = [
  { id: 'backlog', title: 'Backlog', color: 'text-gray-400' },
  { id: 'in_progress', title: 'In Progress', color: 'text-blue-400' },
  { id: 'review', title: 'Review', color: 'text-yellow-400' },
  { id: 'done', title: 'Done', color: 'text-green-400' },
]

// Evolution history (Mock data for now, could be moved to data.ts later)
const evolutionHistory = [
  { version: 'v1.0.0', date: 'Oct 15', accuracy: 62, branch: 'main' },
  { version: 'v1.5.2', date: 'Oct 22', accuracy: 71, branch: 'main' },
  { version: 'v2.1.0', date: 'Oct 29', accuracy: 78, branch: 'main' },
  { version: 'v2.8.1', date: 'Nov 5', accuracy: 85, branch: 'experimental' },
  { version: 'v3.0.0', date: 'Nov 12', accuracy: 91, branch: 'main' },
  { version: 'v3.2.1', date: 'Nov 15', accuracy: 94, branch: 'main' },
]

const recentActivity = [
  { id: 1, time: '2s ago', agent: 'Supervisor', action: 'Moved Task #3 to Review', type: 'move' },
  { id: 2, time: '5s ago', agent: 'Data Worker', action: 'Completed email verification (98% confidence)', type: 'complete' },
  { id: 3, time: '8s ago', agent: 'Guardian', action: 'Coherence check passed (94% alignment)', type: 'check' },
  { id: 4, time: '12s ago', agent: 'Supervisor', action: 'Assigned Task #2 to API Worker', type: 'assign' },
  { id: 5, time: '15s ago', agent: 'Evolution Engine', action: 'Detected optimization opportunity in Task #1', type: 'optimize' },
]

export default function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { sidebarCollapsed } = useDashboardStore()
  const { id } = React.use(params)
  const workflow = workflows.find(w => w.id === id)
  const [activeTab, setActiveTab] = React.useState<'execution' | 'design'>('execution')
  const [selectedItem, setSelectedItem] = React.useState<{ type: 'task' | 'node', data: any } | null>(null)

  if (!workflow) {
    return notFound()
  }

  const getTasksByColumn = (columnId: string) => {
    return workflow.tasks.filter(task => task.column === columnId)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'analysis': return 'bg-purple-500/20 text-purple-400'
      case 'implementation': return 'bg-blue-500/20 text-blue-400'
      case 'validation': return 'bg-green-500/20 text-green-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getNodeIcon = (type: WorkflowNode['type']) => {
    switch (type) {
      case 'trigger': return Play
      case 'action': return Zap
      case 'condition': return GitBranch
      case 'agent': return Bot
      default: return Activity
    }
  }

  const getNodeColor = (type: WorkflowNode['type']) => {
    switch (type) {
      case 'trigger': return 'border-green-500/50 bg-green-500/10 text-green-400'
      case 'action': return 'border-blue-500/50 bg-blue-500/10 text-blue-400'
      case 'condition': return 'border-orange-500/50 bg-orange-500/10 text-orange-400'
      case 'agent': return 'border-purple-500/50 bg-purple-500/10 text-purple-400'
      default: return 'border-gray-500/50 bg-gray-500/10 text-gray-400'
    }
  }

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
        title={workflow.name}
        subtitle="Self-Improving"
        breadcrumbs={[
          { label: 'Workflows', href: '/workflows' },
          { label: workflow.name }
        ]}
      />

      <main className="mt-16 p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto relative">
        {/* Top Stats Row */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Current Version</p>
                    <p className="text-xl font-bold text-primary">{workflow.version}</p>
                  </div>
                  <GitBranch className="h-8 w-8 text-primary/40" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                    <p className={cn("text-xl font-bold", workflow.successRate >= 90 ? "text-green-400" : "text-yellow-400")}>
                      {workflow.successRate}%
                    </p>
                  </div>
                  <TrendingUp className={cn("h-8 w-8", workflow.successRate >= 90 ? "text-green-400/40" : "text-yellow-400/40")} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Active Tasks</p>
                    <p className="text-xl font-bold">{workflow.tasks.length}</p>
                  </div>
                  <Layers className="h-8 w-8 text-blue-400/40" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Agents</p>
                    <p className="text-xl font-bold">{workflow.agents.length} Workers</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-400/40" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex gap-2 mb-4">
            <Button
              variant={activeTab === 'execution' ? 'default' : 'outline'}
              onClick={() => setActiveTab('execution')}
              className={cn(
                "gap-2",
                activeTab === 'execution' && "bg-primary/20 text-primary border-primary/30"
              )}
            >
              <Activity className="h-4 w-4" />
              Execution View
            </Button>
            <Button
              variant={activeTab === 'design' ? 'default' : 'outline'}
              onClick={() => setActiveTab('design')}
              className={cn(
                "gap-2",
                activeTab === 'design' && "bg-primary/20 text-primary border-primary/30"
              )}
            >
              <Layers className="h-4 w-4" />
              Workflow Design
            </Button>
          </div>

          {activeTab === 'execution' ? (
            // Kanban Board
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary animate-pulse" />
                      Live Execution Board
                    </CardTitle>
                    <CardDescription>Real-time task orchestration with dependency tracking</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-green-500/30 text-green-400">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Evolution: +32%
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {kanbanColumns.map((column, colIndex) => (
                    <div key={column.id} className="space-y-3">
                      <div className={cn("flex items-center gap-2 mb-3")}>
                        <div className={cn("h-2 w-2 rounded-full", column.color.replace('text-', 'bg-'))} />
                        <h3 className={cn("font-semibold text-sm", column.color)}>{column.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {getTasksByColumn(column.id).length}
                        </Badge>
                      </div>

                      <div className="space-y-2 min-h-[200px]">
                        <AnimatePresence>
                          {getTasksByColumn(column.id).map((task, taskIndex) => (
                            <motion.div
                              key={task.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ delay: 0.1 * taskIndex }}
                              whileHover={{ scale: 1.02, y: -2 }}
                              onClick={() => setSelectedItem({ type: 'task', data: task })}
                              className="p-3 rounded-lg bg-card/60 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all cursor-pointer"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <span className="text-xs font-mono text-muted-foreground">#{task.id}</span>
                                <Badge variant="outline" className={cn("text-[10px] h-5 border", getPriorityColor(task.priority))}>
                                  {task.priority}
                                </Badge>
                              </div>

                              <p className="text-sm font-medium mb-2">{task.title}</p>

                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="secondary" className={cn("text-[10px] h-5", getPhaseColor(task.phase))}>
                                  {task.phase}
                                </Badge>
                                {task.assignee && (
                                  <Badge variant="outline" className="text-[10px] h-5 flex items-center gap-1">
                                    <Bot className="h-3 w-3" />
                                    {task.assignee}
                                  </Badge>
                                )}
                                {task.dependencies.length > 0 && (
                                  <Badge variant="outline" className="text-[10px] h-5 flex items-center gap-1 border-yellow-500/30 text-yellow-400">
                                    <ArrowRight className="h-3 w-3" />
                                    {task.dependencies.length}
                                  </Badge>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {getTasksByColumn(column.id).length === 0 && (
                          <div className="h-24 border-2 border-dashed border-muted/20 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                            No tasks
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            // Workflow Design View
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      n8n-Style Workflow Design
                    </CardTitle>
                    <CardDescription>Visual node-based workflow • Modified autonomously by Supervisor Agent</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Autonomous Mode
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative min-h-[600px] bg-gradient-to-br from-accent/20 to-transparent rounded-xl border border-border/40 p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                  {/* Render Edges */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {workflow.edges.map((edge) => {
                      const sourceNode = workflow.nodes.find(n => n.id === edge.source)
                      const targetNode = workflow.nodes.find(n => n.id === edge.target)
                      if (!sourceNode || !targetNode) return null

                      return (
                        <g key={edge.id}>
                          <line
                            x1={sourceNode.x + 100} // Assuming node width ~200
                            y1={sourceNode.y + 60}  // Assuming node height ~80
                            x2={targetNode.x + 100}
                            y2={targetNode.y}
                            stroke={edge.type === 'success' ? '#22c55e' : edge.type === 'failure' ? '#ef4444' : '#64748b'}
                            strokeWidth="2"
                            strokeDasharray="4"
                            className="opacity-50"
                          />
                          {edge.label && (
                            <text
                              x={(sourceNode.x + targetNode.x + 200) / 2}
                              y={(sourceNode.y + targetNode.y + 60) / 2}
                              fill="currentColor"
                              className="text-xs fill-muted-foreground"
                              textAnchor="middle"
                            >
                              {edge.label}
                            </text>
                          )}
                        </g>
                      )
                    })}
                  </svg>

                  {/* Render Nodes */}
                  {workflow.nodes.map((node) => {
                    const Icon = getNodeIcon(node.type)
                    return (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute w-[200px]"
                        style={{ left: node.x, top: node.y }}
                        onClick={() => setSelectedItem({ type: 'node', data: node })}
                      >
                        <div className={cn(
                          "px-4 py-3 rounded-xl border-2 shadow-lg transition-all hover:scale-105 cursor-pointer bg-background",
                          getNodeColor(node.type)
                        )}>
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5" />
                            <div>
                              <div className="font-semibold text-sm">{node.title}</div>
                              {node.subtitle && (
                                <div className="text-xs opacity-80">{node.subtitle}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Bottom Row: Evolution Chart + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Evolution Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Self-Evolution Timeline
                </CardTitle>
                <CardDescription>Accuracy improvement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={evolutionHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 12%)" />
                    <XAxis
                      dataKey="date"
                      stroke="hsl(0 0% 55%)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="hsl(0 0% 55%)"
                      style={{ fontSize: '12px' }}
                      domain={[0, 100]}
                      label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', style: { fill: 'hsl(0 0% 55%)' } }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 6%)',
                        border: '1px solid hsl(180 85% 55% / 0.2)',
                        borderRadius: '0.5rem',
                        color: 'hsl(0 0% 98%)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="hsl(180 85% 55%)"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(180 85% 55%)', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary animate-pulse" />
                  Live Activity
                </CardTitle>
                <CardDescription className="text-xs">Real-time coordination logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className="flex gap-2 p-2 rounded-lg hover:bg-accent/30 transition-colors text-xs"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            activity.type === 'complete' && "bg-green-500",
                            activity.type === 'assign' && "bg-blue-500",
                            activity.type === 'check' && "bg-purple-500",
                            activity.type === 'move' && "bg-yellow-500",
                            activity.type === 'optimize' && "bg-pink-500"
                          )} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-muted-foreground text-[10px] mb-0.5">{activity.time}</p>
                          <p className="font-medium text-xs leading-tight">
                            <span className="text-primary">{activity.agent}</span>: {activity.action}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Details Panel */}
        <AnimatePresence>
          {selectedItem && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 h-full w-[400px] bg-background border-l border-border z-50 shadow-2xl p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold">
                    {selectedItem.type === 'task' ? 'Task Details' : 'Node Configuration'}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedItem(null)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Title</h3>
                    <p className="text-lg font-medium">{selectedItem.data.title}</p>
                    {selectedItem.data.subtitle && (
                      <p className="text-sm text-muted-foreground">{selectedItem.data.subtitle}</p>
                    )}
                  </div>

                  {selectedItem.type === 'task' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Status</h3>
                          <Badge variant="outline" className="capitalize">
                            {selectedItem.data.column.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Priority</h3>
                          <Badge variant="outline" className={cn("capitalize", getPriorityColor(selectedItem.data.priority))}>
                            {selectedItem.data.priority}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Assignee</h3>
                        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{selectedItem.data.assignee || 'Unassigned'}</p>
                            <p className="text-xs text-muted-foreground">Worker Agent</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Dependencies</h3>
                        {selectedItem.data.dependencies.length > 0 ? (
                          <div className="space-y-2">
                            {selectedItem.data.dependencies.map((depId: string) => (
                              <div key={depId} className="flex items-center gap-2 text-sm p-2 bg-muted/20 rounded">
                                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                <span>Task #{depId}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No dependencies</p>
                        )}
                      </div>
                    </>
                  )}

                  {selectedItem.type === 'node' && (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Type</h3>
                        <Badge variant="secondary" className="capitalize">
                          {selectedItem.data.type}
                        </Badge>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Configuration</h3>
                        <div className="bg-muted/30 rounded-lg border border-border p-4 font-mono text-xs space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ID:</span>
                            <span>{selectedItem.data.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Position:</span>
                            <span>{selectedItem.data.x}, {selectedItem.data.y}</span>
                          </div>
                          {selectedItem.data.config && Object.entries(selectedItem.data.config).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-muted-foreground">{key}:</span>
                              <span>{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button className="w-full">
                    <Settings2 className="w-4 h-4 mr-2" />
                    Advanced Settings
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
