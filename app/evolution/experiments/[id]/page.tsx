'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
    FlaskConical,
    Split,
    ArrowLeft,
    CheckCircle2,
    TrendingUp,
    Users,
    Clock,
    AlertCircle,
    BarChart2,
    Sparkles
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Mock Data
const experimentData = {
    id: 'EXP-102',
    name: 'Tone Adjustment: Empathetic vs Direct',
    type: 'A/B Test',
    status: 'active',
    startDate: '2024-05-15',
    duration: '48h',
    sampleSize: 2450,
    confidence: 88,
    uplift: 5.4,
    variants: [
        { name: 'Control (A)', conversion: 12.4, satisfaction: 4.2, responseTime: 1.2 },
        { name: 'Variant (B)', conversion: 13.1, satisfaction: 4.5, responseTime: 1.3 },
    ]
}

const chartData = [
    { metric: 'Conversion (%)', Control: 12.4, Variant: 13.1 },
    { metric: 'CSAT (x10)', Control: 42, Variant: 45 }, // Scaled for visualization
    { metric: 'Speed (s)', Control: 12, Variant: 13 }, // Scaled
]

export default function ExperimentDetailPage() {
    const { sidebarCollapsed } = useDashboardStore()
    const router = useRouter()
    const params = useParams()

    return (
        <div
            className={cn(
                'min-h-screen bg-background transition-all duration-300 ease-in-out',
                'max-lg:ml-0',
                sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
            )}
        >
            <Header
                title={experimentData.name}
                subtitle={`Experiment ID: ${params.id}`}
                breadcrumbs={[
                    { label: 'Evolution Nexus', href: '/evolution' },
                    { label: 'Experiment Details' }
                ]}
            />

            <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => router.back()} className="pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Nexus
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10">
                            Stop Experiment
                        </Button>
                        <Button variant="default" size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Promote Variant
                        </Button>
                    </div>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border-border bg-card rounded-none p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded border border-purple-500/20">
                            <Split className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Type</p>
                            <p className="font-bold">{experimentData.type}</p>
                        </div>
                    </Card>
                    <Card className="border-border bg-card rounded-none p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Sample Size</p>
                            <p className="font-bold font-mono">{experimentData.sampleSize}</p>
                        </div>
                    </Card>
                    <Card className="border-border bg-card rounded-none p-4 flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded border border-emerald-500/20">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Uplift</p>
                            <p className="font-bold font-mono text-emerald-500">+{experimentData.uplift}%</p>
                        </div>
                    </Card>
                    <Card className="border-border bg-card rounded-none p-4 flex items-center gap-4">
                        <div className="p-3 bg-amber-500/10 rounded border border-amber-500/20">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Confidence</p>
                            <p className="font-bold font-mono">{experimentData.confidence}%</p>
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Comparative Chart */}
                    <div className="lg:col-span-2">
                        <Card className="border-border bg-card rounded-none p-6 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                    <BarChart2 className="w-4 h-4" />
                                    Variant Comparison
                                </h3>
                            </div>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="metric" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                            itemStyle={{ color: '#fff' }}
                                            cursor={{ fill: '#ffffff10' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="Control" fill="#64748b" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Variant" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    {/* Right: Detailed Metrics */}
                    <div className="space-y-6">
                        <Card className="border-border bg-card rounded-none p-6">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Variant Breakdown</h3>
                            <div className="space-y-6">
                                {experimentData.variants.map((variant, i) => (
                                    <div key={i} className="p-4 bg-secondary/50 border border-border rounded">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={cn(
                                                "font-bold text-sm px-2 py-1 rounded",
                                                i === 0 ? "bg-slate-500/20 text-slate-400" : "bg-emerald-500/20 text-emerald-500"
                                            )}>
                                                {variant.name}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Conversion</span>
                                                <span className="font-mono">{variant.conversion}%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">CSAT</span>
                                                <span className="font-mono">{variant.satisfaction}/5.0</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Resp. Time</span>
                                                <span className="font-mono">{variant.responseTime}s</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-border">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-full mt-1">
                                        <Sparkles className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-emerald-500">Recommendation</p>
                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                            Variant B shows a strong uplift in conversion (+5.4%) with higher customer satisfaction.
                                            Wait for confidence to reach 95% before promoting.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    )
}
