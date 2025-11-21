'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { initialRules } from '../data'
import { notFound, useRouter } from 'next/navigation'
import {
    Shield,
    Lock,
    BrainCircuit,
    ArrowLeft,
    AlertTriangle,
    CheckCircle2,
    Activity,
    Zap,
    Clock,
    Edit,
    Trash2
} from 'lucide-react'

export default function RuleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { sidebarCollapsed } = useDashboardStore()
    const router = useRouter()

    const { id } = React.use(params)
    const rule = initialRules.find(r => r.id === id)

    if (!rule) {
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
                title={rule.name}
                subtitle={`Policy ID: ${rule.id}`}
                breadcrumbs={[
                    { label: 'Governance', href: '/agent-rules' },
                    { label: rule.name }
                ]}
            />

            <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

                {/* Back Button */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Policies
                    </button>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Policy
                        </Button>
                        <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Overview Card */}
                        <Card className="border-border bg-card rounded-none p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-secondary rounded-full">
                                        {rule.category === 'Security' ? <Lock className="w-5 h-5 text-foreground" /> :
                                            rule.category === 'Safety' ? <Shield className="w-5 h-5 text-foreground" /> :
                                                <BrainCircuit className="w-5 h-5 text-foreground" />}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold">{rule.name}</h2>
                                        <p className="text-sm text-muted-foreground">{rule.category} Protocol</p>
                                    </div>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "rounded-none uppercase tracking-wider font-mono",
                                        rule.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                    )}
                                >
                                    {rule.status}
                                </Badge>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Description</h3>
                                    <p className="text-foreground leading-relaxed">
                                        {rule.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Enforcement Logic</h3>
                                    <div className="bg-muted/30 p-4 rounded border border-border font-mono text-sm text-muted-foreground">
                    // Mock logic representation
                                        <br />
                                        if (context.contains(SENSITIVE_DATA)) {'{'}
                                        <br />
                                        &nbsp;&nbsp;return action.redact(SENSITIVE_DATA);
                                        <br />
                                        {'}'}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Activity Log (Mock) */}
                        <Card className="border-border bg-card rounded-none">
                            <div className="p-4 border-b border-border flex justify-between items-center">
                                <h3 className="font-medium flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                    Recent Triggers
                                </h3>
                                <span className="text-xs text-muted-foreground">Last 24 hours</span>
                            </div>
                            <div className="divide-y divide-border/50">
                                {[1, 2, 3, 4].map((_, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                            <div>
                                                <p className="text-sm font-medium">Policy Enforced</p>
                                                <p className="text-xs text-muted-foreground">Agent: Customer Support Bot</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-mono text-muted-foreground">
                                            {i === 0 ? '2 mins ago' : i === 1 ? '15 mins ago' : `${i} hours ago`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">

                        <Card className="border-border bg-card rounded-none p-6">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Impact Metrics</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm">Total Triggers</span>
                                    </div>
                                    <span className="font-mono font-medium">{rule.triggers.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm">Last Active</span>
                                    </div>
                                    <span className="font-mono font-medium">{rule.lastTriggered}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm">Priority Level</span>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "rounded-none text-[10px] uppercase tracking-wider font-mono border-0",
                                            rule.priority === 'critical' ? "text-red-500 bg-red-500/10" :
                                                rule.priority === 'high' ? "text-orange-500 bg-orange-500/10" :
                                                    "text-blue-500 bg-blue-500/10"
                                        )}
                                    >
                                        {rule.priority}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm">Success Rate</span>
                                    </div>
                                    <span className="font-mono font-medium text-emerald-500">100%</span>
                                </div>
                            </div>
                        </Card>

                        <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded text-sm text-blue-400">
                            <p className="flex items-start gap-2">
                                <Activity className="w-4 h-4 mt-0.5 shrink-0" />
                                This policy is currently active and monitoring all agent interactions in real-time.
                            </p>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    )
}
