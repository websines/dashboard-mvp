'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
    Bot,
    Activity,
    Terminal,
    Cpu,
    ArrowLeft,
    Play,
    Pause,
    RotateCcw,
    Zap,
    CheckCircle2,
    Brain
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock Data (would normally fetch based on ID)
const agentData = {
    id: 'EA-001',
    name: 'Sim Agent Alpha',
    status: 'running',
    task: 'Shadow Testing v2.3',
    target: 'Customer Support Flow',
    uptime: '4d 12h 30m',
    iterations: 1240,
    logs: [
        { timestamp: '10:42:01', level: 'info', message: 'Initiating shadow run for Scenario #492...' },
        { timestamp: '10:42:05', level: 'debug', message: 'Context loaded. Tokens: 4096. Temperature: 0.7' },
        { timestamp: '10:42:12', level: 'info', message: 'Step 1 executed. Response time: 450ms' },
        { timestamp: '10:42:15', level: 'warn', message: 'Slight deviation detected in sentiment analysis.' },
        { timestamp: '10:42:18', level: 'info', message: 'Adjusting prompt parameters for next iteration...' },
        { timestamp: '10:42:22', level: 'success', message: 'Iteration complete. Score: 98/100' },
        { timestamp: '10:42:25', level: 'info', message: 'Saving checkpoint to vector store...' },
        { timestamp: '10:42:28', level: 'info', message: 'Fetching next scenario from queue...' },
    ]
}

const performanceData = [
    { time: '10:00', score: 85 },
    { time: '10:10', score: 88 },
    { time: '10:20', score: 87 },
    { time: '10:30', score: 92 },
    { time: '10:40', score: 95 },
    { time: '10:50', score: 98 },
    { time: '11:00', score: 97 },
    { time: '11:10', score: 99 },
]

export default function AgentDetailPage() {
    const { sidebarCollapsed } = useDashboardStore()
    const router = useRouter()
    const params = useParams()
    const [logs, setLogs] = useState(agentData.logs)

    // Simulate live logs
    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = {
                timestamp: new Date().toLocaleTimeString(),
                level: 'info',
                message: `Processing batch #${Math.floor(Math.random() * 1000)}...`
            }
            setLogs(prev => [...prev.slice(-10), newLog])
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className={cn(
                'min-h-screen bg-background transition-all duration-300 ease-in-out',
                'max-lg:ml-0',
                sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
            )}
        >
            <Header
                title={agentData.name}
                subtitle={`Agent ID: ${params.id}`}
                breadcrumbs={[
                    { label: 'Evolution Nexus', href: '/evolution' },
                    { label: agentData.name }
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
                        <Button variant="outline" size="sm">
                            <Pause className="w-4 h-4 mr-2" />
                            Pause Agent
                        </Button>
                        <Button variant="default" size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Restart
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Status & Metrics */}
                    <div className="space-y-6">
                        <Card className="border-border bg-card rounded-none p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-emerald-500/10 rounded border border-emerald-500/20">
                                        <Bot className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">{agentData.name}</h2>
                                        <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10 animate-pulse">
                                            {agentData.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Current Task</p>
                                    <p className="font-medium">{agentData.task}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Target System</p>
                                    <p className="font-medium">{agentData.target}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Uptime</p>
                                        <p className="font-mono font-medium">{agentData.uptime}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Iterations</p>
                                        <p className="font-mono font-medium">{agentData.iterations}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-border bg-card rounded-none p-6">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Performance Trend
                            </h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={performanceData}>
                                        <defs>
                                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="time" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} domain={[80, 100]} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Neural Decision Visualizer */}
                    <div className="lg:col-span-2">
                        <Card className="border-border bg-black rounded-none h-full min-h-[600px] flex flex-col relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black pointer-events-none" />

                            <CardHeader className="border-b border-white/10 py-3 px-4 bg-white/5 relative z-10">
                                <CardTitle className="text-sm font-mono font-medium flex items-center gap-2 text-emerald-400">
                                    <Cpu className="w-4 h-4" />
                                    Neural Decision Visualizer
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-6 flex-1 relative z-10 flex flex-col justify-center items-center">
                                {/* Node Graph Visualization */}
                                <div className="relative w-full max-w-2xl h-[400px] flex items-center justify-between">
                                    {/* Connecting Lines */}
                                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-emerald-900/30 -translate-y-1/2" />

                                    {[
                                        { id: 'context', label: 'Context', icon: Terminal, status: 'active' },
                                        { id: 'reasoning', label: 'Reasoning', icon: Brain, status: 'active' },
                                        { id: 'tools', label: 'Tool Use', icon: Zap, status: 'processing' },
                                        { id: 'output', label: 'Output', icon: CheckCircle2, status: 'pending' },
                                    ].map((node, i) => (
                                        <div key={node.id} className="relative group z-10">
                                            <div className={cn(
                                                "w-16 h-16 rounded-full border-2 flex items-center justify-center bg-black transition-all duration-500",
                                                node.status === 'active' ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" :
                                                    node.status === 'processing' ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse" :
                                                        "border-white/10 text-muted-foreground"
                                            )}>
                                                <node.icon className={cn(
                                                    "w-6 h-6",
                                                    node.status === 'active' ? "text-emerald-500" :
                                                        node.status === 'processing' ? "text-blue-500" :
                                                            "text-muted-foreground"
                                                )} />
                                            </div>
                                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-32">
                                                <p className="text-xs font-mono font-bold uppercase tracking-wider text-white/80">{node.label}</p>
                                                {node.status === 'processing' && (
                                                    <p className="text-[10px] text-blue-400 animate-pulse">Processing...</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Live Thought Stream */}
                                <div className="w-full mt-8 p-4 bg-black/50 border border-white/10 rounded font-mono text-xs h-[150px] overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />
                                    <div className="space-y-2">
                                        {logs.slice(-5).map((log, i) => (
                                            <div key={i} className="flex gap-2 animate-in slide-in-from-bottom duration-300">
                                                <span className="text-emerald-700">[{log.timestamp}]</span>
                                                <span className={cn(
                                                    "uppercase font-bold",
                                                    log.level === 'info' ? "text-blue-400" :
                                                        log.level === 'warn' ? "text-yellow-400" :
                                                            "text-emerald-400"
                                                )}>{log.level}</span>
                                                <span className="text-white/80">{log.message}</span>
                                            </div>
                                        ))}
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
