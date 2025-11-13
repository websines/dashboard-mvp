'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BookOpen, Upload, FileText, Link as LinkIcon, Database, Search, Plus, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const knowledgeSources = [
  {
    id: 1,
    name: 'Product Documentation',
    type: 'documents',
    icon: FileText,
    items: 245,
    size: '12.3 MB',
    lastUpdated: '2 hours ago',
    status: 'synced',
  },
  {
    id: 2,
    name: 'Company Website',
    type: 'website',
    icon: LinkIcon,
    items: 89,
    size: '4.2 MB',
    lastUpdated: '1 day ago',
    status: 'synced',
  },
  {
    id: 3,
    name: 'FAQ Database',
    type: 'database',
    icon: Database,
    items: 432,
    size: '2.1 MB',
    lastUpdated: '3 hours ago',
    status: 'synced',
  },
  {
    id: 4,
    name: 'Support Tickets Archive',
    type: 'database',
    icon: Database,
    items: 1240,
    size: '45.8 MB',
    lastUpdated: '5 hours ago',
    status: 'indexing',
  },
]

const uploadOptions = [
  {
    name: 'Upload Documents',
    description: 'PDF, DOCX, TXT, and more',
    icon: Upload,
    color: 'text-blue-500',
  },
  {
    name: 'Connect Website',
    description: 'Crawl and index web content',
    icon: LinkIcon,
    color: 'text-green-500',
  },
  {
    name: 'Connect Database',
    description: 'SQL, MongoDB, Elasticsearch',
    icon: Database,
    color: 'text-purple-500',
  },
]

export default function KnowledgeBasePage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Knowledge Base"
        subtitle="RAG Pipeline"
        breadcrumbs={[{ label: 'Training', href: '/agent-rules' }, { label: 'Knowledge Base' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2"
            >
              Knowledge Base
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Manage your agent's knowledge sources and retrieval pipeline
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Source
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
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <p className="text-sm text-muted-foreground">Total Sources</p>
                </div>
                <p className="text-3xl font-bold">{knowledgeSources.length}</p>
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
                  <FileText className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-muted-foreground">Documents</p>
                </div>
                <p className="text-3xl font-bold">
                  {knowledgeSources.reduce((sum, s) => sum + s.items, 0)}
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
                  <Database className="h-5 w-5 text-purple-500" />
                  <p className="text-sm text-muted-foreground">Total Size</p>
                </div>
                <p className="text-3xl font-bold">64.4 MB</p>
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
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <p className="text-sm text-muted-foreground">Retrieval Acc.</p>
                </div>
                <p className="text-3xl font-bold">94%</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upload Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle>Add Knowledge Source</CardTitle>
              <CardDescription>Choose how to add content to your knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {uploadOptions.map((option, index) => (
                  <motion.div
                    key={option.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="p-4 rounded-lg border border-border/40 bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer">
                      <option.icon className={cn('h-8 w-8 mb-3', option.color)} />
                      <h3 className="font-medium mb-1">{option.name}</h3>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Knowledge Sources */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Sources</h2>
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
                        <div className="h-12 w-12 rounded-xl bg-accent/50 flex items-center justify-center">
                          <source.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{source.name}</h3>
                            <Badge
                              variant={source.status === 'synced' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {source.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{source.items} items</span>
                            <span>•</span>
                            <span>{source.size}</span>
                            <span>•</span>
                            <span>Updated {source.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Search className="h-4 w-4" />
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
