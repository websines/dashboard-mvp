'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { agents } from '../data'
import { notFound, useRouter } from 'next/navigation'
import {
    Activity,
    Zap,
    TrendingUp,
    Clock,
    DollarSign,
    CheckCircle,
    XCircle,
    Terminal,
    ArrowLeft,
    Cpu,
    Settings,
    History
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AgentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { sidebarCollapsed } = useDashboardStore()
    const router = useRouter()

    const { id } = React.use(params)
    const agent = agents.find(a => a.id === id)

    if (!agent) {
        return notFound()
    }

    return (
        <div
            className={cn(
                'min-h-screen bg-background transition-all duration-300 ease-in-out',
                'max-lg:ml-0',
                sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
            )}
        >
            <Header
                title={agent.name}
                subtitle={`Agent ID: ${agent.id}`}
                breadcrumbs={[
                    { label: 'Agents', href: '/agents' },
                    { label: agent.name }
                ]}
            />

            <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

                {/* Back Button */}
                <div>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Agents
                    </button>
                </div>

                {/* Top Metrics */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-5 border-border bg-card rounded-none flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={cn(
                                    "h-2 w-2 rounded-full",
                                    agent.status === 'active' ? "bg-emerald-500" :
                                        agent.status === 'processing' ? "bg-blue-500 animate-pulse" : "bg-slate-500"
                                )} />
                                <p className="text-xl font-medium capitalize">{agent.status}</p>
                            </div>
                        </div>
                        <div className="p-2 bg-secondary text-foreground">
                            <Activity className="h-4 w-4" />
                        </div>
                    </Card>

                    <Card className="p-5 border-border bg-card rounded-none flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Success Rate</p>
                            <p className="text-xl font-medium mt-1">{agent.successRate}%</p>
                        </div>
                        <div className="p-2 bg-secondary text-foreground">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </Card>

                    <Card className="p-5 border-border bg-card rounded-none flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Tasks Completed</p>
                            <p className="text-xl font-medium mt-1">{agent.tasksCompleted.toLocaleString()}</p>
                        </div>
                        <div className="p-2 bg-secondary text-foreground">
                            <CheckCircle className="h-4 w-4" />
                        </div>
                    </Card>

                    <Card className="p-5 border-border bg-card rounded-none flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Latency</p>
                            <p className="text-xl font-medium mt-1">{agent.averageLatency}</p>
                        </div>
                        <div className="p-2 bg-secondary text-foreground">
                            <Clock className="h-4 w-4" />
                        </div>
                    </Card>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Info & Terminal */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Description & Details */}
                        <Card className="border-border bg-card rounded-none p-6">
                            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                <agent.icon className="h-5 w-5 text-primary" />
                                Agent Overview
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {agent.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground block mb-1">Type</span>
                                    <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">{agent.type}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block mb-1">Created By</span>
                                    <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">{agent.createdBy}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block mb-1">Cost Per Task</span>
                                    <span className="font-medium">{agent.costPerTask}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Live Terminal */}
                        <Card className="border-border bg-card rounded-none overflow-hidden flex flex-col h-[300px]">
                            <div className="p-3 border-b border-border bg-muted/30 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Terminal className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-xs font-mono text-muted-foreground">LIVE ACTIVITY LOG</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-red-500/20" />
                                    <div className="h-2 w-2 rounded-full bg-yellow-500/20" />
                                    <div className="h-2 w-2 rounded-full bg-green-500/20" />
                                </div>
                            </div>
                            <div className="flex-1 bg-black/50 p-4 font-mono text-xs text-green-500/80 overflow-y-auto space-y-2">
                                <div className="opacity-50">
                                    <span className="text-blue-400">info</span> [10:42:01] Initializing context...
                                </div>
                                <div className="opacity-50">
                                    <span className="text-blue-400">info</span> [10:42:02] Loading tools: {agent.tools.join(', ')}...
                                </div>
                                <div className="opacity-70">
                                    <span className="text-blue-400">info</span> [10:42:05] Ready for task execution.
                                </div>
                                {agent.currentTask && (
                                    <div className="animate-pulse">
                                        <span className="text-yellow-400">exec</span> [10:45:12] {agent.currentTask}...
                                    </div>
                                )}
                                <div className="mt-2">
                                    <span className="animate-blink">_</span>
                                </div>
                            </div>
                        </Card>

                    </div>

                    {/* Sidebar: Tools & Config */}
                    <div className="space-y-8">

                        {/* Tools */}
                        <Card className="border-border bg-card rounded-none">
                            <div className="p-4 border-b border-border">
                                <h3 className="font-medium flex items-center gap-2">
                                    <Cpu className="h-4 w-4 text-muted-foreground" />
                                    Available Tools
                                </h3>
                            </div>
                            <div className="p-4">
                                <div className="flex flex-wrap gap-2">
                                    {agent.tools.map((tool, i) => (
                                        <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded border border-border/50">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Recent History (Mock) */}
                        <Card className="border-border bg-card rounded-none">
                            <div className="p-4 border-b border-border">
                                <h3 className="font-medium flex items-center gap-2">
                                    <History className="h-4 w-4 text-muted-foreground" />
                                    Recent Tasks
                                </h3>
                            </div>
                            <div className="divide-y divide-border/50">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="p-3 text-xs hover:bg-muted/30 transition-colors">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-muted-foreground">Task #{2045 - i}</span>
                                            <span className="text-emerald-500">Success</span>
                                        </div>
                                        <div className="truncate opacity-80">
                                            Processed request successfully in {agent.averageLatency}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                    </div>
                </div>

            </main>
        </div>
    )
}
