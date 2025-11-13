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
  TrendingUp, Zap, Activity, MessageSquare, ChevronRight, RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const supervisorAgent = {
  name: 'Supervisor Agent',
  status: 'active',
  tasksAssigned: 247,
  accuracy: 95,
}

const workerAgents = [
  {
    id: 1,
    name: 'Data Worker',
    status: 'active',
    currentTask: 'Processing customer data batch #127',
    progress: 65,
    tasksCompleted: 45,
    accuracy: 92,
  },
  {
    id: 2,
    name: 'API Worker',
    status: 'active',
    currentTask: 'Calling external CRM API',
    progress: 30,
    tasksCompleted: 38,
    accuracy: 94,
  },
  {
    id: 3,
    name: 'Notification Worker',
    status: 'idle',
    currentTask: 'Awaiting task assignment',
    progress: 0,
    tasksCompleted: 41,
    accuracy: 91,
  },
]

const recentActivity = [
  { id: 1, time: '2s ago', agent: 'Supervisor', action: 'Assigned Task #127 to Data Worker', type: 'assign' },
  { id: 2, time: '5s ago', agent: 'Data Worker', action: 'Completed Task #126 (98% accuracy)', type: 'complete' },
  { id: 3, time: '8s ago', agent: 'Supervisor', action: 'Detected bottleneck in API Worker queue', type: 'alert' },
  { id: 4, time: '12s ago', agent: 'API Worker', action: 'Started processing Task #125', type: 'start' },
  { id: 5, time: '15s ago', agent: 'Supervisor', action: 'Redistributed tasks for load balancing', type: 'balance' },
  { id: 6, time: '20s ago', agent: 'Notification Worker', action: 'Sent 3 email notifications', type: 'complete' },
]

const pendingTasks = [
  { id: 128, title: 'Verify email address', priority: 'high', assignedTo: null },
  { id: 129, title: 'Update customer record', priority: 'medium', assignedTo: null },
  { id: 130, title: 'Send welcome email', priority: 'low', assignedTo: null },
]

export default function WorkflowDetailPage({ params }: { params: { id: string } }) {
  const { sidebarCollapsed } = useDashboardStore()
  const [activityItems, setActivityItems] = React.useState(recentActivity)

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
        title="Customer Onboarding"
        subtitle="Active"
        breadcrumbs={[
          { label: 'Workflows', href: '/workflows' },
          { label: 'Customer Onboarding' }
        ]}
      />

      <main className="mt-16 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold mb-2"
            >
              Active Execution
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-muted-foreground"
            >
              Supervisor coordinating 3 worker agents in real-time
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2"
          >
            <Button variant="outline" size="sm">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Restart
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - left side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Supervisor Agent Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 via-card to-card shadow-2xl shadow-primary/10">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center relative">
                        <Bot className="h-7 w-7 text-primary" />
                        <div className="absolute -top-1 -right-1">
                          <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse flex items-center justify-center">
                            <Activity className="h-2 w-2 text-white" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1">{supervisorAgent.name}</CardTitle>
                        <CardDescription>Orchestrating workflow execution</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default" className="gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      Managing
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Tasks Assigned</p>
                      <p className="text-xl font-bold">{supervisorAgent.tasksAssigned}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Active Workers</p>
                      <p className="text-xl font-bold">2/3</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                      <p className="text-xl font-bold text-green-500">{supervisorAgent.accuracy}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Zap className="h-4 w-4 text-primary animate-pulse" />
                    <p className="text-sm font-medium">Currently: Analyzing worker performance & optimizing task distribution</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Worker Agents */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-primary" />
                Worker Agents
              </h2>

              {workerAgents.map((worker, index) => (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className={cn(
                    "border border-border/60 bg-gradient-to-br from-card via-card to-card/80 hover:border-border/80 transition-all duration-300",
                    worker.status === 'active' && "shadow-lg shadow-green-500/5"
                  )}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={cn(
                            "h-12 w-12 rounded-lg flex items-center justify-center",
                            worker.status === 'active' ? "bg-green-500/20" : "bg-muted"
                          )}>
                            <Bot className={cn(
                              "h-6 w-6",
                              worker.status === 'active' ? "text-green-500" : "text-muted-foreground"
                            )} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{worker.name}</h3>
                              <Badge variant={worker.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                                {worker.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{worker.currentTask}</p>
                          </div>
                        </div>
                      </div>

                      {worker.status === 'active' && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">{worker.progress}%</span>
                          </div>
                          <div className="h-2 bg-accent rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-green-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${worker.progress}%` }}
                              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-muted-foreground mb-0.5">Completed</p>
                          <p className="font-semibold">{worker.tasksCompleted} tasks</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-0.5">Accuracy</p>
                          <p className="font-semibold text-green-500">{worker.accuracy}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Pending Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80">
                <CardHeader>
                  <CardTitle className="text-base">Pending Tasks</CardTitle>
                  <CardDescription className="text-xs">Awaiting supervisor assignment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pendingTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-accent/30 border border-border/40"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-sm font-medium">#{task.id}</p>
                          <Badge variant="outline" className="text-[10px] h-5">
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{task.title}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border border-border/60 bg-gradient-to-br from-card via-card to-card/80">
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
                      {activityItems.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-2 p-2 rounded-lg hover:bg-accent/30 transition-colors text-xs"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <div className={cn(
                              "h-2 w-2 rounded-full",
                              activity.type === 'complete' && "bg-green-500",
                              activity.type === 'assign' && "bg-blue-500",
                              activity.type === 'alert' && "bg-yellow-500",
                              activity.type === 'start' && "bg-purple-500",
                              activity.type === 'balance' && "bg-orange-500"
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
        </div>
      </main>
    </div>
  )
}
