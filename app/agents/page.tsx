'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { User, Bot, Network, ArrowDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const agents = [
  {
    id: '1',
    name: 'Planner Agent',
    type: 'planner',
    status: 'active',
    tasks: 2,
    accuracy: 98,
    level: 1,
  },
  {
    id: '2',
    name: 'Supervisor Agent',
    type: 'supervisor',
    status: 'active',
    tasks: 4,
    accuracy: 95,
    level: 2,
  },
  {
    id: '3',
    name: 'Worker-1',
    type: 'worker',
    status: 'active',
    tasks: 1,
    accuracy: 92,
    level: 3,
  },
  {
    id: '4',
    name: 'Worker-2',
    type: 'worker',
    status: 'active',
    tasks: 1,
    accuracy: 94,
    level: 3,
  },
  {
    id: '5',
    name: 'Worker-3',
    type: 'worker',
    status: 'idle',
    tasks: 0,
    accuracy: 91,
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

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Agent Hierarchy"
        subtitle="Multi-Layer"
        breadcrumbs={[{ label: 'Agents' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Agent Network</h1>
          <p className="text-sm text-muted-foreground">
            User → Planner → Supervisor → Workers
          </p>
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
                whileHover={{ scale: 1.05 }}
              >
                <Card className="w-64 border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Network className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{agent.name}</p>
                        <div className={cn('h-2 w-2 rounded-full', statusConfig[agent.status as keyof typeof statusConfig].color)} />
                      </div>
                      <p className="text-xs text-muted-foreground">Plans & orchestrates</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Tasks: </span>
                      <span className="font-medium">{agent.tasks}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Accuracy: </span>
                      <span className="font-medium">{agent.accuracy}%</span>
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
                whileHover={{ scale: 1.05 }}
              >
                <Card className="w-64 border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{agent.name}</p>
                        <div className={cn('h-2 w-2 rounded-full', statusConfig[agent.status as keyof typeof statusConfig].color)} />
                      </div>
                      <p className="text-xs text-muted-foreground">Supervises workers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Tasks: </span>
                      <span className="font-medium">{agent.tasks}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Accuracy: </span>
                      <span className="font-medium">{agent.accuracy}%</span>
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
          <div className="grid grid-cols-3 gap-4">
            {workers.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="w-56 border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{agent.name}</p>
                        <div className={cn('h-2 w-2 rounded-full', statusConfig[agent.status as keyof typeof statusConfig].color)} />
                      </div>
                      <p className="text-xs text-muted-foreground">Executes tasks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Tasks: </span>
                      <span className="font-medium">{agent.tasks}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Acc: </span>
                      <span className="font-medium">{agent.accuracy}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Agent Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{agents.length}</p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {agents.filter((a) => a.status === 'active').length}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {Math.round(agents.reduce((sum, a) => sum + a.accuracy, 0) / agents.length)}%
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
