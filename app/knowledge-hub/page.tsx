'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BookOpen, TrendingUp, FileText, Link as LinkIcon, Database, Upload, Search, Filter, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const recentActivity = [
  {
    id: 1,
    action: 'Added 45 documents',
    source: 'Product Documentation',
    time: '2 hours ago',
    type: 'upload',
  },
  {
    id: 2,
    action: 'Synced website',
    source: 'Company Website',
    time: '5 hours ago',
    type: 'sync',
  },
  {
    id: 3,
    action: 'Indexed 120 tickets',
    source: 'Support Tickets',
    time: '1 day ago',
    type: 'index',
  },
  {
    id: 4,
    action: 'Updated FAQ',
    source: 'FAQ Database',
    time: '2 days ago',
    type: 'update',
  },
]

const topSources = [
  { name: 'Product Docs', queries: 2840, accuracy: 96 },
  { name: 'Support Tickets', queries: 1650, accuracy: 94 },
  { name: 'FAQ Database', queries: 1420, accuracy: 98 },
  { name: 'Company Website', queries: 890, accuracy: 92 },
]

const categories = [
  { name: 'Product Info', count: 485, color: 'bg-blue-500' },
  { name: 'Support', count: 1240, color: 'bg-green-500' },
  { name: 'Sales', count: 320, color: 'bg-purple-500' },
  { name: 'Technical', count: 567, color: 'bg-orange-500' },
  { name: 'General', count: 245, color: 'bg-cyan-500' },
]

export default function KnowledgeHubPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Knowledge Hub"
        subtitle="Central Repository"
        breadcrumbs={[{ label: 'Training', href: '/agent-rules' }, { label: 'Knowledge Hub' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2"
            >
              Knowledge Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Centralized knowledge management and analytics across all sources
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2"
          >
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search Knowledge
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
                  <p className="text-sm text-muted-foreground">Total Items</p>
                </div>
                <p className="text-3xl font-bold">2,857</p>
                <p className="text-xs text-green-500 mt-1">+245 this week</p>
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
                  <Search className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-muted-foreground">Queries Today</p>
                </div>
                <p className="text-3xl font-bold">6,800</p>
                <p className="text-xs text-green-500 mt-1">+12% vs yesterday</p>
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
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <p className="text-sm text-muted-foreground">Avg Relevance</p>
                </div>
                <p className="text-3xl font-bold">94.2%</p>
                <p className="text-xs text-green-500 mt-1">+2.1% this month</p>
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
                  <Database className="h-5 w-5 text-orange-500" />
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                </div>
                <p className="text-3xl font-bold">64.4 MB</p>
                <p className="text-xs text-muted-foreground mt-1">of 1 GB</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
                <CardDescription>Knowledge distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{category.name}</span>
                        <span className="text-sm font-medium">{category.count}</span>
                      </div>
                      <div className="h-2 bg-accent rounded-full overflow-hidden">
                        <div
                          className={cn('h-full', category.color)}
                          style={{ width: `${(category.count / 2857) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Sources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="col-span-2"
          >
            <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Sources</CardTitle>
                <CardDescription>Most queried knowledge sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topSources.map((source, index) => (
                    <motion.div
                      key={source.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                    >
                      <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{source.name}</h4>
                            <p className="text-xs text-muted-foreground">{source.queries.toLocaleString()} queries</p>
                          </div>
                        </div>
                        <Badge variant="default" className="text-xs">
                          {source.accuracy}% accurate
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest updates across your knowledge base</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                  >
                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/30 transition-colors">
                      <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <Upload className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{activity.action}</h4>
                        <p className="text-xs text-muted-foreground">{activity.source}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
