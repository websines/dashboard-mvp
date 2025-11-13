'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BrainCircuit, Plus, Shield, AlertTriangle, CheckCircle2, Edit } from 'lucide-react'
import { motion } from 'framer-motion'

const rules = [
  {
    id: 1,
    name: 'Compliance Check',
    description: 'Ensure all responses meet regulatory requirements',
    status: 'active',
    priority: 'high',
    triggers: 3420,
    category: 'Safety',
  },
  {
    id: 2,
    name: 'PII Detection',
    description: 'Automatically redact personal identifiable information',
    status: 'active',
    priority: 'critical',
    triggers: 1250,
    category: 'Security',
  },
  {
    id: 3,
    name: 'Tone Adjustment',
    description: 'Maintain professional and friendly communication style',
    status: 'active',
    priority: 'medium',
    triggers: 8900,
    category: 'Quality',
  },
  {
    id: 4,
    name: 'Error Handling',
    description: 'Gracefully handle unexpected inputs and errors',
    status: 'active',
    priority: 'high',
    triggers: 450,
    category: 'Reliability',
  },
  {
    id: 5,
    name: 'Context Retention',
    description: 'Remember conversation context across interactions',
    status: 'testing',
    priority: 'medium',
    triggers: 120,
    category: 'Intelligence',
  },
]

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-500', icon: CheckCircle2 },
  testing: { label: 'Testing', color: 'bg-yellow-500', icon: AlertTriangle },
  inactive: { label: 'Inactive', color: 'bg-gray-500', icon: Shield },
}

const priorityColors = {
  critical: 'text-red-500',
  high: 'text-orange-500',
  medium: 'text-yellow-500',
  low: 'text-blue-500',
}

export default function AgentRulesPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Agent Rules"
        subtitle="Behavior Config"
        breadcrumbs={[{ label: 'Training', href: '/agent-rules' }, { label: 'Agent Rules' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2"
            >
              Agent Behavior Rules
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Define and manage rules that govern your agent's behavior and responses
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Rules</p>
                <p className="text-2xl font-bold">{rules.length}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Active</p>
                <p className="text-2xl font-bold text-green-500">
                  {rules.filter(r => r.status === 'active').length}
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
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Triggers</p>
                <p className="text-2xl font-bold">
                  {rules.reduce((sum, r) => sum + r.triggers, 0).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                <p className="text-2xl font-bold">98.5%</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Rules List */}
        <div className="space-y-3">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ x: 5 }}
            >
              <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-lg hover:shadow-black/10 transition-all duration-300 cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <BrainCircuit className={cn('h-5 w-5', priorityColors[rule.priority as keyof typeof priorityColors])} />
                        <h3 className="font-semibold text-lg">{rule.name}</h3>
                        <Badge variant="outline" className="text-xs">{rule.category}</Badge>
                        <div className="flex items-center gap-1.5">
                          <div className={cn('h-2 w-2 rounded-full', statusConfig[rule.status as keyof typeof statusConfig].color)} />
                          <span className="text-xs text-muted-foreground">
                            {statusConfig[rule.status as keyof typeof statusConfig].label}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Priority: <span className={cn('font-medium capitalize', priorityColors[rule.priority as keyof typeof priorityColors])}>{rule.priority}</span></span>
                        <span>•</span>
                        <span>Triggered: <span className="font-medium">{rule.triggers.toLocaleString()}</span> times</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
