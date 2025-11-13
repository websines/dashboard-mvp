'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Bot, Sparkles, Zap, Brain, Target, MessageSquare, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const agentTypes = [
  {
    name: 'Conversational Agent',
    description: 'Natural language interactions with users',
    icon: MessageSquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    features: ['NLP Processing', 'Context Memory', 'Multi-turn Dialog'],
  },
  {
    name: 'Task Automation Agent',
    description: 'Automate workflows and business processes',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    features: ['API Integration', 'Task Scheduling', 'Error Handling'],
  },
  {
    name: 'Knowledge Agent',
    description: 'Search and retrieve information intelligently',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    features: ['RAG Pipeline', 'Semantic Search', 'Citation Tracking'],
  },
  {
    name: 'Custom Agent',
    description: 'Build from scratch with custom capabilities',
    icon: Settings,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    features: ['Full Customization', 'Custom Tools', 'Advanced Config'],
  },
]

export default function CreateAgentPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Create Agent"
        subtitle="New Agent"
        breadcrumbs={[{ label: 'Creation', href: '/create-agent' }, { label: 'Create Agent' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold mb-3"
          >
            Create Your AI Agent
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Choose an agent type to get started. Each agent is automatically optimized and evolves over time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {agentTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-xl hover:shadow-black/20 transition-all duration-300 h-full cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', type.bgColor)}>
                      <type.icon className={cn('h-6 w-6', type.color)} />
                    </div>
                    <Badge variant="outline" className="text-xs">Popular</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{type.name}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {type.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">
                    Create {type.name.split(' ')[0]} Agent
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 max-w-5xl mx-auto"
        >
          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                What happens next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                    <span className="text-sm font-bold text-purple-500">1</span>
                  </div>
                  <h3 className="font-medium mb-1">Configure</h3>
                  <p className="text-sm text-muted-foreground">Set up your agent's capabilities, tools, and knowledge sources</p>
                </div>
                <div>
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                    <span className="text-sm font-bold text-purple-500">2</span>
                  </div>
                  <h3 className="font-medium mb-1">Train</h3>
                  <p className="text-sm text-muted-foreground">Provide scenarios and rules for optimal performance</p>
                </div>
                <div>
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                    <span className="text-sm font-bold text-purple-500">3</span>
                  </div>
                  <h3 className="font-medium mb-1">Deploy</h3>
                  <p className="text-sm text-muted-foreground">Launch your agent and watch it evolve automatically</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
