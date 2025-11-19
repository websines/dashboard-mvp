'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BookOpen, Upload, FileText, Link as LinkIcon, Database, Search, Plus, TrendingUp, HardDrive, Network, RefreshCw, Filter, ArrowUpRight, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const knowledgeSources = [
  {
    id: 'ks-001',
    name: 'Product Documentation',
    type: 'documents',
    icon: FileText,
    items: 245,
    size: '12.3 MB',
    lastUpdated: '2h ago',
    status: 'synced',
    vectorCount: '12,450',
  },
  {
    id: 'ks-002',
    name: 'Company Website',
    type: 'website',
    icon: Globe,
    items: 89,
    size: '4.2 MB',
    lastUpdated: '1d ago',
    status: 'synced',
    vectorCount: '4,210',
  },
  {
    id: 'ks-003',
    name: 'FAQ Database',
    type: 'database',
    icon: Database,
    items: 432,
    size: '2.1 MB',
    lastUpdated: '3h ago',
    status: 'synced',
    vectorCount: '8,900',
  },
  {
    id: 'ks-004',
    name: 'Support Tickets Archive',
    type: 'database',
    icon: Database,
    items: 1240,
    size: '45.8 MB',
    lastUpdated: '5h ago',
    status: 'indexing',
    vectorCount: '45,120',
  },
]

export default function KnowledgeBasePage() {
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
        title="Knowledge Base"
        subtitle="RAG Pipeline Management"
        breadcrumbs={[{ label: 'Knowledge', href: '/knowledge-base' }, { label: 'Index' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Vectors</p>
                <h3 className="text-2xl font-bold mt-1">70,680</h3>
              </div>
              <Network className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="w-full bg-secondary h-1 mt-4">
              <div className="bg-foreground h-full w-[75%]" />
            </div>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Storage Used</p>
                <h3 className="text-2xl font-bold mt-1">64.4 MB</h3>
              </div>
              <HardDrive className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-emerald-500 font-mono flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +2.4 MB today
            </p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Retrieval Latency</p>
                <h3 className="text-2xl font-bold mt-1">45ms</h3>
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-emerald-500 font-mono">p99 &lt; 100ms</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32 bg-foreground text-background">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Index Status</p>
                <h3 className="text-2xl font-bold mt-1 text-background">Healthy</h3>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Last sync: 2m ago</p>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Sources List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Data Sources</h2>
                <Badge variant="outline" className="rounded-none font-mono text-xs">{knowledgeSources.length}</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-none h-8 border-dashed">
                  <Filter className="w-3 h-3 mr-2" /> Filter
                </Button>
                <Button size="sm" className="rounded-none h-8 bg-foreground text-background hover:bg-foreground/90">
                  <Plus className="w-3 h-3 mr-2" /> Add Source
                </Button>
              </div>
            </div>

            <Card className="border-border bg-card rounded-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/30 border-b border-border text-xs uppercase font-mono text-muted-foreground">
                    <tr>
                      <th className="p-4 font-medium">Source Name</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Vectors</th>
                      <th className="p-4 font-medium">Size</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {knowledgeSources.map((source) => (
                      <tr key={source.id} className="group hover:bg-muted/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-none">
                              <source.icon className="w-4 h-4 text-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{source.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">{source.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground capitalize">{source.type}</td>
                        <td className="p-4 font-mono text-xs">{source.vectorCount}</td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">{source.size}</td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={cn(
                              "rounded-none text-[10px] uppercase tracking-wider",
                              source.status === 'synced'
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            )}
                          >
                            {source.status === 'indexing' && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                            {source.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" className="rounded-none h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right: Quick Actions / Upload */}
          <div className="space-y-6">
            <Card className="border-border bg-card rounded-none p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Upload className="w-4 h-4" /> Quick Ingestion
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start rounded-none h-12 border-dashed hover:border-foreground hover:bg-muted/50">
                  <FileText className="w-4 h-4 mr-3 text-muted-foreground" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Upload Documents</p>
                    <p className="text-[10px] text-muted-foreground">PDF, DOCX, TXT</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-none h-12 border-dashed hover:border-foreground hover:bg-muted/50">
                  <Globe className="w-4 h-4 mr-3 text-muted-foreground" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Crawl Website</p>
                    <p className="text-[10px] text-muted-foreground">Sitemap or URL list</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-none h-12 border-dashed hover:border-foreground hover:bg-muted/50">
                  <Database className="w-4 h-4 mr-3 text-muted-foreground" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Connect Database</p>
                    <p className="text-[10px] text-muted-foreground">Postgres, Mongo, Snowflake</p>
                  </div>
                </Button>
              </div>
            </Card>

            <Card className="border-border bg-card rounded-none p-6 bg-muted/10">
              <h3 className="font-semibold mb-2 text-sm">Embedding Model</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">text-embedding-3-large</span>
                <Badge variant="secondary" className="rounded-none text-[10px]">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="font-mono">3072</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Max Tokens</span>
                  <span className="font-mono">8191</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}
