'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plug, Search, Database, Mail, Calendar, FileText, Github, Slack, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const connectedTools = [
  { name: 'GitHub', icon: Github, status: 'connected', color: 'text-gray-400' },
  { name: 'Slack', icon: Slack, status: 'connected', color: 'text-purple-500' },
  { name: 'Google Calendar', icon: Calendar, status: 'connected', color: 'text-blue-500' },
]

const availableTools = [
  {
    name: 'Web Search',
    description: 'Real-time web search and data retrieval',
    icon: Search,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    category: 'Data',
  },
  {
    name: 'Database',
    description: 'Connect to SQL/NoSQL databases',
    icon: Database,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    category: 'Data',
  },
  {
    name: 'Email',
    description: 'Send and receive emails',
    icon: Mail,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    category: 'Communication',
  },
  {
    name: 'Calendar',
    description: 'Schedule and manage events',
    icon: Calendar,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    category: 'Productivity',
  },
  {
    name: 'Document Processing',
    description: 'Parse PDFs, Word docs, and more',
    icon: FileText,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    category: 'Data',
  },
  {
    name: 'GitHub API',
    description: 'Manage repos, issues, and PRs',
    icon: Github,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    category: 'Development',
  },
]

export default function ConnectToolsPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Connect Tools"
        subtitle="Integrations"
        breadcrumbs={[{ label: 'Creation', href: '/create-agent' }, { label: 'Connect Tools' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2"
          >
            Tool Integrations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Connect external tools and APIs to extend your agent's capabilities
          </motion.p>
        </div>

        {/* Connected Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Connected Tools
              </CardTitle>
              <CardDescription>
                {connectedTools.length} tools currently active
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {connectedTools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/40 bg-accent/30">
                      <tool.icon className={cn('h-8 w-8', tool.color)} />
                      <span className="text-sm font-medium">{tool.name}</span>
                      <Badge variant="default" className="text-xs">Connected</Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Available Tools */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-xl hover:shadow-black/20 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', tool.bgColor)}>
                        <tool.icon className={cn('h-5 w-5', tool.color)} />
                      </div>
                      <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription className="text-sm">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline" size="sm">
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle>Custom Integration</CardTitle>
              <CardDescription>
                Don't see your tool? Add a custom integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">
                <Plug className="h-4 w-4 mr-2" />
                Add Custom Tool
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
