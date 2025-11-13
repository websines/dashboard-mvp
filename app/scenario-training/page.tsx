'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FlaskConical, Play, Plus, CheckCircle2, Clock, Target } from 'lucide-react'
import { motion } from 'framer-motion'

const scenarios = [
  {
    id: 1,
    name: 'Customer Onboarding Flow',
    description: 'Train agent to handle new customer registration and setup',
    status: 'completed',
    accuracy: 96,
    runs: 240,
    lastRun: '2 hours ago',
  },
  {
    id: 2,
    name: 'Technical Support',
    description: 'Handle common technical issues and troubleshooting',
    status: 'training',
    accuracy: 84,
    runs: 120,
    lastRun: 'Running now',
  },
  {
    id: 3,
    name: 'Refund Processing',
    description: 'Manage refund requests with policy compliance',
    status: 'completed',
    accuracy: 92,
    runs: 180,
    lastRun: '1 day ago',
  },
  {
    id: 4,
    name: 'Escalation Handling',
    description: 'Identify and properly escalate complex issues',
    status: 'pending',
    accuracy: 0,
    runs: 0,
    lastRun: 'Not started',
  },
]

const statusConfig = {
  completed: { label: 'Completed', color: 'bg-green-500', icon: CheckCircle2 },
  training: { label: 'Training', color: 'bg-blue-500', icon: Clock },
  pending: { label: 'Pending', color: 'bg-gray-500', icon: Target },
}

export default function ScenarioTrainingPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Scenario Training"
        subtitle="Training Pipeline"
        breadcrumbs={[{ label: 'Training', href: '/agent-rules' }, { label: 'Scenario Training' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2"
            >
              Training Scenarios
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Create and run training scenarios to improve agent performance
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Scenario
            </Button>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <FlaskConical className="h-5 w-5 text-purple-500" />
                  <p className="text-sm text-muted-foreground">Total Scenarios</p>
                </div>
                <p className="text-3xl font-bold">{scenarios.length}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <p className="text-3xl font-bold">
                  {scenarios.filter(s => s.status === 'completed').length}
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <p className="text-sm text-muted-foreground">Avg Accuracy</p>
                </div>
                <p className="text-3xl font-bold">91%</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Play className="h-5 w-5 text-orange-500" />
                  <p className="text-sm text-muted-foreground">Total Runs</p>
                </div>
                <p className="text-3xl font-bold">540</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Scenarios List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scenario, index) => {
            const StatusIcon = statusConfig[scenario.status as keyof typeof statusConfig].icon
            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-xl hover:shadow-black/20 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'h-2 w-2 rounded-full',
                          statusConfig[scenario.status as keyof typeof statusConfig].color
                        )} />
                        <Badge variant="outline" className="text-xs">
                          {statusConfig[scenario.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                      {scenario.accuracy > 0 && (
                        <span className="text-sm font-semibold text-green-500">
                          {scenario.accuracy}% accuracy
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2">{scenario.name}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{scenario.runs} training runs</span>
                      <span>Last run: {scenario.lastRun}</span>
                    </div>
                    <Button
                      className="w-full"
                      variant={scenario.status === 'training' ? 'secondary' : 'outline'}
                      disabled={scenario.status === 'training'}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {scenario.status === 'training' ? 'Training...' : 'Run Scenario'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
