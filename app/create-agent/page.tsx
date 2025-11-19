'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Bot, Sparkles, Zap, Brain, Target, MessageSquare, Settings, Terminal, Code2, Database, ArrowRight, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'

const agentTypes = [
  {
    id: 'conversational',
    name: 'Conversational Interface',
    description: 'Natural language processing unit optimized for human-computer interaction.',
    icon: MessageSquare,
    specs: ['LLM Integration', 'Context Window: 128k', 'Sentiment Analysis'],
    complexity: 'Medium',
  },
  {
    id: 'automation',
    name: 'Process Automator',
    description: 'High-throughput task execution engine for business logic automation.',
    icon: Zap,
    specs: ['API Connectors', 'Parallel Execution', 'Error Recovery'],
    complexity: 'Low',
  },
  {
    id: 'knowledge',
    name: 'Knowledge Engine',
    description: 'Semantic search and retrieval system with RAG pipeline capabilities.',
    icon: Database,
    specs: ['Vector Database', 'Semantic Indexing', 'Source Citation'],
    complexity: 'High',
  },
  {
    id: 'custom',
    name: 'Custom Architecture',
    description: 'Blank slate for specialized agentic workflows and proprietary logic.',
    icon: Code2,
    specs: ['Full Control', 'Custom Runtime', 'External Libs'],
    complexity: 'Advanced',
  },
]

export default function CreateAgentPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Deploy Agent"
        subtitle="System Configuration"
        breadcrumbs={[{ label: 'Agents', href: '/agents' }, { label: 'Deploy New' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Selection */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Select Architecture</h1>
                <p className="text-muted-foreground font-mono text-xs mt-1">CHOOSE BASE CONFIGURATION FOR NEW INSTANCE</p>
              </div>
              <Badge variant="outline" className="rounded-none font-mono">v2.4.0-stable</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agentTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group relative overflow-hidden border-border bg-card rounded-none hover:border-foreground/50 transition-colors cursor-pointer h-full">
                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-foreground" />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-muted rounded-none">
                          <type.icon className="w-5 h-5 text-foreground" />
                        </div>
                        <Badge variant="secondary" className="rounded-none font-mono text-[10px] uppercase tracking-wider">
                          {type.complexity} Complexity
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-bold">{type.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {type.description}
                      </p>
                      <div className="space-y-1">
                        {type.specs.map((spec) => (
                          <div key={spec} className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                            <div className="w-1 h-1 bg-foreground/50" />
                            {spec}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Info / Preview */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-border bg-card rounded-none sticky top-20">
              <CardHeader className="border-b border-border bg-muted/20 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <CardTitle className="text-sm font-mono uppercase tracking-wider">Deployment Sequence</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="relative pl-4 border-l border-border space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-foreground border-2 border-background rounded-full" />
                    <h3 className="text-sm font-bold">1. Architecture Selection</h3>
                    <p className="text-xs text-muted-foreground mt-1">Choose the foundational model and capabilities.</p>
                  </div>
                  <div className="relative opacity-50">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-muted-foreground border-2 border-background rounded-full" />
                    <h3 className="text-sm font-bold">2. Configuration</h3>
                    <p className="text-xs text-muted-foreground mt-1">Define parameters, tools, and knowledge base access.</p>
                  </div>
                  <div className="relative opacity-50">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-muted-foreground border-2 border-background rounded-full" />
                    <h3 className="text-sm font-bold">3. Training & Validation</h3>
                    <p className="text-xs text-muted-foreground mt-1">Run initial scenarios and validate output quality.</p>
                  </div>
                  <div className="relative opacity-50">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-muted-foreground border-2 border-background rounded-full" />
                    <h3 className="text-sm font-bold">4. Deployment</h3>
                    <p className="text-xs text-muted-foreground mt-1">Provision resources and activate agent endpoint.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 border border-border">
                    <Cpu className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-bold">System Resources</p>
                      <p className="text-[10px] text-muted-foreground">Available for new allocation</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-xs font-mono text-emerald-500">98%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}
