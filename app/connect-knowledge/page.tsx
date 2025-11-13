'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link2, Bot, BookOpen, ArrowRight, CheckCircle2, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

const agents = [
  {
    id: 1,
    name: 'Customer Support Agent',
    type: 'Conversational',
    status: 'active',
    connectedKnowledge: 3,
  },
  {
    id: 2,
    name: 'Sales Assistant',
    type: 'Task Automation',
    status: 'active',
    connectedKnowledge: 2,
  },
  {
    id: 3,
    name: 'Technical Support',
    type: 'Knowledge',
    status: 'active',
    connectedKnowledge: 5,
  },
]

const knowledgeSources = [
  {
    id: 1,
    name: 'Product Documentation',
    type: 'documents',
    items: 245,
    connected: ['Customer Support Agent', 'Technical Support'],
  },
  {
    id: 2,
    name: 'FAQ Database',
    type: 'database',
    items: 432,
    connected: ['Customer Support Agent'],
  },
  {
    id: 3,
    name: 'Company Website',
    type: 'website',
    items: 89,
    connected: ['Sales Assistant'],
  },
  {
    id: 4,
    name: 'Support Tickets Archive',
    type: 'database',
    items: 1240,
    connected: ['Technical Support'],
  },
  {
    id: 5,
    name: 'Product Catalog',
    type: 'database',
    items: 156,
    connected: ['Sales Assistant'],
  },
]

export default function ConnectKnowledgePage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Connect Knowledge to Agent"
        subtitle="Link Resources"
        breadcrumbs={[{ label: 'Training', href: '/agent-rules' }, { label: 'Connect Knowledge' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2"
          >
            Connect Knowledge to Agents
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Link knowledge sources to specific agents for enhanced RAG performance
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  <p className="text-sm text-muted-foreground">Active Agents</p>
                </div>
                <p className="text-3xl font-bold">{agents.length}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-muted-foreground">Knowledge Sources</p>
                </div>
                <p className="text-3xl font-bold">{knowledgeSources.length}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Link2 className="h-5 w-5 text-purple-500" />
                  <p className="text-sm text-muted-foreground">Active Connections</p>
                </div>
                <p className="text-3xl font-bold">10</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Agents Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Agents</h2>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Connection
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-xl hover:shadow-black/20 transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-blue-500" />
                      </div>
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {agent.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription className="text-xs">{agent.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-muted-foreground">Connected sources</span>
                      <span className="font-semibold text-green-500">{agent.connectedKnowledge}</span>
                    </div>
                    <Button className="w-full" size="sm" variant="outline">
                      Manage Connections
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Knowledge Sources Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Knowledge Sources</h2>
          <div className="space-y-3">
            {knowledgeSources.map((source, index) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-lg hover:shadow-black/10 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{source.name}</h3>
                            <Badge variant="outline" className="text-xs">{source.type}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-muted-foreground">{source.items} items</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              Connected to {source.connected.length} agent{source.connected.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {source.connected.map((agentName) => (
                              <Badge key={agentName} variant="secondary" className="text-xs">
                                <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                                {agentName}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Link2 className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
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
