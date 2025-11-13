'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Layout, MessageCircle, Globe, Smartphone, Code, Palette, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const frontendTemplates = [
  {
    name: 'Chat Widget',
    description: 'Embeddable chat interface for websites',
    icon: MessageCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    features: ['Customizable UI', 'Real-time messaging', 'Mobile responsive'],
    preview: 'chat-widget.png',
  },
  {
    name: 'Full Page App',
    description: 'Standalone web application interface',
    icon: Globe,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    features: ['Dashboard layout', 'Multi-page routing', 'Advanced features'],
    preview: 'webapp.png',
  },
  {
    name: 'Mobile App',
    description: 'Native mobile application (React Native)',
    icon: Smartphone,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    features: ['iOS & Android', 'Push notifications', 'Offline support'],
    preview: 'mobile.png',
  },
  {
    name: 'API Interface',
    description: 'RESTful API for custom integrations',
    icon: Code,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    features: ['OpenAPI docs', 'SDKs included', 'Webhook support'],
    preview: 'api.png',
  },
]

export default function CreateFrontendPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Create Frontend"
        subtitle="Deploy Interface"
        breadcrumbs={[{ label: 'Creation', href: '/create-agent' }, { label: 'Create Frontend' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Layout className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold mb-3"
          >
            Generate Agent Frontend
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Create a deployable frontend interface to communicate with your agents. Choose from pre-built templates or customize your own.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {frontendTemplates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-xl hover:shadow-black/20 transition-all duration-300 h-full cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', template.bgColor)}>
                      <template.icon className={cn('h-6 w-6', template.color)} />
                    </div>
                    <Badge variant="secondary" className="text-xs">Ready</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {template.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant="outline">
                    Generate {template.name}
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
                <Palette className="h-5 w-5 text-blue-500" />
                Customization Options
              </CardTitle>
              <CardDescription>
                All templates include full customization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                    <Palette className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium">Branding</p>
                  <p className="text-xs text-muted-foreground mt-1">Colors, logos, fonts</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-2">
                    <Code className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="text-sm font-medium">Code Export</p>
                  <p className="text-xs text-muted-foreground mt-1">React, Vue, or vanilla</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-2">
                    <Globe className="h-6 w-6 text-purple-500" />
                  </div>
                  <p className="text-sm font-medium">Hosting</p>
                  <p className="text-xs text-muted-foreground mt-1">One-click deploy</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-2">
                    <Zap className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="text-sm font-medium">Real-time</p>
                  <p className="text-xs text-muted-foreground mt-1">WebSocket support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
