'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { User, Bot, Network, ArrowDown, CheckCircle2, Clock, AlertCircle, Play, Settings, TrendingUp, Zap, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

const agents = [
  {
    id: '1',
    name: 'Planner Agent',
    type: 'planner',
    description: 'Orchestrates high-level workflow planning',
    status: 'active',
    tasks: 2,
    completedTasks: 847,
    accuracy: 98,
    uptime: '99.8%',
    level: 1,
  },
  {
    id: '2',
    name: 'Supervisor Agent',
    type: 'supervisor',
    description: 'Coordinates worker agents and monitors execution',
    status: 'active',
    tasks: 4,
    completedTasks: 2341,
    accuracy: 95,
    uptime: '99.5%',
    level: 2,
  },
  {
    id: '3',
    name: 'Data Worker',
    type: 'worker',
    description: 'Handles data extraction and processing tasks',
    status: 'active',
    tasks: 1,
    completedTasks: 1420,
    accuracy: 92,
    uptime: '98.9%',
    level: 3,
  },
  {
    id: '4',
    name: 'API Worker',
    type: 'worker',
    description: 'Manages external API integrations',
    status: 'active',
    tasks: 1,
    completedTasks: 956,
    accuracy: 94,
    uptime: '99.2%',
    level: 3,
  },
  {
    id: '5',
    name: 'Notification Worker',
    type: 'worker',
    description: 'Sends emails and notifications',
    status: 'idle',
    tasks: 0,
    completedTasks: 789,
    accuracy: 91,
    uptime: '97.8%',
    level: 3,
  },
]

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-500', icon: CheckCircle2 },
  idle: { label: 'Idle', color: 'bg-yellow-500', icon: Clock },
  error: { label: 'Error', color: 'bg-red-500', icon: AlertCircle },
}

export default function AgentsPage() {
  const { sidebarCollapsed } = useDashboardStore()

  const planners = agents.filter((a) => a.type === 'planner')
  const supervisors = agents.filter((a) => a.type === 'supervisor')
  const workers = agents.filter((a) => a.type === 'worker')
  const activeAgents = agents.filter((a) => a.status === 'active').length
  const totalTasks = agents.reduce((sum, a) => sum + a.tasks, 0)
  const avgAccuracy = Math.round(agents.reduce((sum, a) => sum + a.accuracy, 0) / agents.length)

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        // Desktop
        'lg:ml-64',
        sidebarCollapsed && 'lg:ml-16',
        // Mobile
        'max-lg:ml-0'
      )}
    >
      <Header
        title="Agents"
        subtitle="Multi-Layer Hierarchy"
        breadcrumbs={[{ label: 'Agents' }]}
      />

      <main className="mt-16 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold mb-2"
            >
              Agent Network
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-muted-foreground"
            >
              User → Planner → Supervisor → Workers hierarchy
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Agent
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 lg:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Bot className="h-5 w-5 text-purple-500" />
                  <p className="text-sm text-muted-foreground">Total Agents</p>
                </div>
                <p className="text-3xl font-bold">{agents.length}</p>
                <p className="text-xs text-purple-500 mt-1">{activeAgents} active</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <p className="text-sm text-muted-foreground">Active Tasks</p>
                </div>
                <p className="text-3xl font-bold">{totalTasks}</p>
                <p className="text-xs text-orange-500 mt-1">Processing now</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-muted-foreground">Avg Accuracy</p>
                </div>
                <p className="text-3xl font-bold">{avgAccuracy}%</p>
                <p className="text-xs text-green-500 mt-1">Across all agents</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Agent Hierarchy Visualization */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* User Level */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="w-64 border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <User className="h-5 w-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">User</p>
                <p className="text-xs text-muted-foreground">Initiates workflows</p>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>

          {/* Planner Level */}
          <div className="flex flex-col items-center gap-4">
            {planners.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="w-full max-w-2xl"
              >
                <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80 hover:border-border/80 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="h-14 w-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
                          <Network className="h-7 w-7 text-purple-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <Badge variant="default" className="gap-1.5">
                              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                              {statusConfig[agent.status as keyof typeof statusConfig].label}
                            </Badge>
                          </div>
                          <CardDescription>{agent.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Active Tasks</p>
                        <p className="text-lg font-semibold">{agent.tasks}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Completed</p>
                        <p className="text-lg font-semibold">{agent.completedTasks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                        <p className="text-lg font-semibold text-green-500">{agent.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                        <p className="text-lg font-semibold">{agent.uptime}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>

          {/* Supervisor Level */}
          <div className="flex flex-col items-center gap-4">
            {supervisors.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="w-full max-w-2xl"
              >
                <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80 hover:border-border/80 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="h-14 w-14 rounded-xl bg-green-500/20 flex items-center justify-center">
                          <Bot className="h-7 w-7 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <Badge variant="default" className="gap-1.5">
                              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                              {statusConfig[agent.status as keyof typeof statusConfig].label}
                            </Badge>
                          </div>
                          <CardDescription>{agent.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Active Tasks</p>
                        <p className="text-lg font-semibold">{agent.tasks}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Completed</p>
                        <p className="text-lg font-semibold">{agent.completedTasks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                        <p className="text-lg font-semibold text-green-500">{agent.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                        <p className="text-lg font-semibold">{agent.uptime}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>

          {/* Worker Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
            {workers.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80 hover:border-border/80 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="h-12 w-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <Bot className="h-6 w-6 text-orange-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-base truncate">{agent.name}</CardTitle>
                          </div>
                          <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="gap-1.5 text-xs">
                            {agent.status === 'active' && <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />}
                            {statusConfig[agent.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-xs">{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground mb-0.5">Active</p>
                          <p className="font-semibold">{agent.tasks}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-0.5">Completed</p>
                          <p className="font-semibold">{agent.completedTasks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-0.5">Accuracy</p>
                          <p className="font-semibold text-green-500">{agent.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-0.5">Uptime</p>
                          <p className="font-semibold">{agent.uptime}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">
                          <Play className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
