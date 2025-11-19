'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BookOpen, TrendingUp, FileText, Link as LinkIcon, Database, Upload, Search, Filter, Calendar, BarChart3, PieChart, Activity, ArrowUpRight, Download } from 'lucide-react'
import { motion } from 'framer-motion'

const recentActivity = [
  {
    id: 'act-001',
    action: 'Ingestion Complete',
    details: 'Added 45 documents to Product Documentation',
    time: '2h ago',
    type: 'upload',
    status: 'success',
  },
  {
    id: 'act-002',
    action: 'Sync Completed',
    details: 'Crawled 15 new pages from Company Website',
    time: '5h ago',
    type: 'sync',
    status: 'success',
  },
  {
    id: 'act-003',
    action: 'Index Rebuild',
    details: 'Re-indexed 120 support tickets for semantic search',
    time: '1d ago',
    type: 'index',
    status: 'success',
  },
  {
    id: 'act-004',
    action: 'Schema Update',
    details: 'Updated metadata schema for FAQ Database',
    time: '2d ago',
    type: 'update',
    status: 'warning',
  },
]

const topSources = [
  { name: 'Product Docs', queries: 2840, accuracy: 96, trend: '+12%' },
  { name: 'Support Tickets', queries: 1650, accuracy: 94, trend: '+5%' },
  { name: 'FAQ Database', queries: 1420, accuracy: 98, trend: '+8%' },
  { name: 'Company Website', queries: 890, accuracy: 92, trend: '-2%' },
]

const categories = [
  { name: 'Product Info', count: 485, percentage: 15 },
  { name: 'Support', count: 1240, percentage: 45 },
  { name: 'Sales', count: 320, percentage: 10 },
  { name: 'Technical', count: 567, percentage: 20 },
  { name: 'General', count: 245, percentage: 10 },
]

export default function KnowledgeHubPage() {
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
        title="Knowledge Hub"
        subtitle="Central Analytics"
        breadcrumbs={[{ label: 'Knowledge', href: '/knowledge-base' }, { label: 'Hub' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Knowledge Items</p>
                <h3 className="text-2xl font-bold mt-1">2,857</h3>
              </div>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-emerald-500 font-mono flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +245 this week
            </p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Daily Queries</p>
                <h3 className="text-2xl font-bold mt-1">6,800</h3>
              </div>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-emerald-500 font-mono flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +12% vs yesterday
            </p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Avg Relevance Score</p>
                <h3 className="text-2xl font-bold mt-1">94.2%</h3>
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-emerald-500 font-mono flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +2.1% this month
            </p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Storage Utilization</p>
                <h3 className="text-2xl font-bold mt-1">64.4 MB</h3>
              </div>
              <Database className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="w-full bg-secondary h-1 mt-4">
              <div className="bg-foreground h-full w-[6%] max-w-full" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Analytics */}
          <div className="lg:col-span-2 space-y-8">

            {/* Top Sources Table */}
            <Card className="border-border bg-card rounded-none overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold">Source Performance</h3>
                </div>
                <Button variant="outline" size="sm" className="rounded-none h-7 text-xs">
                  <Download className="w-3 h-3 mr-2" /> Export Report
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/30 border-b border-border text-xs uppercase font-mono text-muted-foreground">
                    <tr>
                      <th className="p-4 font-medium">Source Name</th>
                      <th className="p-4 font-medium">Total Queries</th>
                      <th className="p-4 font-medium">Accuracy Score</th>
                      <th className="p-4 font-medium text-right">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {topSources.map((source) => (
                      <tr key={source.name} className="group hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-medium text-foreground">{source.name}</td>
                        <td className="p-4 font-mono text-xs">{source.queries.toLocaleString()}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs">{source.accuracy}%</span>
                            <div className="h-1.5 w-16 bg-secondary rounded-none overflow-hidden">
                              <div className="h-full bg-foreground" style={{ width: `${source.accuracy}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className={cn("p-4 font-mono text-xs text-right", source.trend.startsWith('+') ? "text-emerald-500" : "text-red-500")}>
                          {source.trend}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Recent Activity Log */}
            <Card className="border-border bg-card rounded-none overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold">System Activity</h3>
                </div>
                <Button variant="ghost" size="sm" className="rounded-none h-7 text-xs">
                  View All
                </Button>
              </div>
              <div className="divide-y divide-border/50">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 flex items-start gap-4 hover:bg-muted/20 transition-colors">
                    <div className="mt-1">
                      {activity.type === 'upload' && <Upload className="w-4 h-4 text-muted-foreground" />}
                      {activity.type === 'sync' && <LinkIcon className="w-4 h-4 text-muted-foreground" />}
                      {activity.type === 'index' && <Search className="w-4 h-4 text-muted-foreground" />}
                      {activity.type === 'update' && <Database className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <span className="text-xs font-mono text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-none text-[10px] uppercase tracking-wider",
                        activity.status === 'success' ? "text-emerald-500 border-emerald-500/20" : "text-yellow-500 border-yellow-500/20"
                      )}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* Right Column: Distribution */}
          <div className="space-y-6">
            <Card className="border-border bg-card rounded-none h-full">
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold">Knowledge Distribution</h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-muted-foreground">{category.count} items ({category.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-secondary w-full overflow-hidden">
                      <div
                        className="h-full bg-foreground transition-all duration-500"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-6 border-t border-border mt-6">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Distribution analysis suggests a heavy concentration in Support documentation. Consider expanding Technical and Sales knowledge bases to improve agent versatility.
                  </p>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}
