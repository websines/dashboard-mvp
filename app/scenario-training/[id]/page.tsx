'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils'
import { initialScenarios, Scenario, WorkflowStep } from '../data'
import { notFound, useRouter } from 'next/navigation'
import {
    ArrowLeft,
    Save,
    Trash2,
    Plus,
    X,
    Target,
    Sparkles,
    Activity,
    TrendingUp,
    Mail,
    GitBranch,
    Clock,
    Bell,
    Play,
    RotateCcw,
    CheckCircle2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScenarioDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { sidebarCollapsed } = useDashboardStore()
    const router = useRouter()

    const { id } = React.use(params)
    const [scenario, setScenario] = React.useState<Scenario | undefined>(
        initialScenarios.find(s => s.id === id)
    )
    const [isEditing, setIsEditing] = React.useState(false)
    const [editedScenario, setEditedScenario] = React.useState<Scenario | undefined>(scenario)
    const [activeTab, setActiveTab] = React.useState('overview')

    // Simulation State
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [currentStepIndex, setCurrentStepIndex] = React.useState(-1)
    const [simulationLogs, setSimulationLogs] = React.useState<string[]>([])

    if (!scenario) {
        return notFound()
    }

    const handleSave = () => {
        if (editedScenario) {
            setScenario(editedScenario)
            setIsEditing(false)
        }
    }

    const handleAddStep = (type: WorkflowStep['type']) => {
        if (editedScenario) {
            const newStep: WorkflowStep = {
                id: `step-${Date.now()}`,
                type,
                title: type === 'action' ? 'New Action' : type === 'condition' ? 'New Condition' : type === 'wait' ? 'New Delay' : 'New Notification',
                description: 'Configure this step...',
                config: {}
            }
            setEditedScenario({
                ...editedScenario,
                workflowResponse: [...editedScenario.workflowResponse, newStep]
            })
        }
    }

    const handleRemoveStep = (index: number) => {
        if (editedScenario) {
            const newWorkflow = [...editedScenario.workflowResponse]
            newWorkflow.splice(index, 1)
            setEditedScenario({
                ...editedScenario,
                workflowResponse: newWorkflow
            })
        }
    }

    const handleStepChange = (index: number, field: keyof WorkflowStep, value: string) => {
        if (editedScenario) {
            const newWorkflow = [...editedScenario.workflowResponse]
            newWorkflow[index] = { ...newWorkflow[index], [field]: value }
            setEditedScenario({
                ...editedScenario,
                workflowResponse: newWorkflow
            })
        }
    }

    const runSimulation = async () => {
        if (isPlaying) return
        setIsPlaying(true)
        setCurrentStepIndex(-1)
        setSimulationLogs(['Starting scenario simulation...', `Trigger: ${scenario.trigger}`])

        for (let i = 0; i < scenario.workflowResponse.length; i++) {
            setCurrentStepIndex(i)
            const step = scenario.workflowResponse[i]

            await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate processing time

            setSimulationLogs(prev => [...prev, `Executing Step ${i + 1}: ${step.title} (${step.type})`])

            if (step.type === 'wait') {
                setSimulationLogs(prev => [...prev, `Waiting for ${step.config?.duration || 'specified time'}...`])
                await new Promise(resolve => setTimeout(resolve, 1000))
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000))
        setCurrentStepIndex(scenario.workflowResponse.length)
        setSimulationLogs(prev => [...prev, 'Simulation complete. Scenario executed successfully.'])
        setIsPlaying(false)
    }

    const resetSimulation = () => {
        setIsPlaying(false)
        setCurrentStepIndex(-1)
        setSimulationLogs([])
    }

    const getStepIcon = (type: WorkflowStep['type']) => {
        switch (type) {
            case 'action': return <Mail className="w-4 h-4" />
            case 'condition': return <GitBranch className="w-4 h-4" />
            case 'wait': return <Clock className="w-4 h-4" />
            case 'notification': return <Bell className="w-4 h-4" />
        }
    }

    const getStepColor = (type: WorkflowStep['type']) => {
        switch (type) {
            case 'action': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
            case 'condition': return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
            case 'wait': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
            case 'notification': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
        }
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
                title={scenario.name}
                subtitle={`Scenario ID: ${scenario.id}`}
                breadcrumbs={[
                    { label: 'Training', href: '/scenario-training' },
                    { label: scenario.name }
                ]}
            />

            <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Scenarios
                    </button>
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <Button variant="outline" size="sm" onClick={() => {
                                    setEditedScenario(scenario)
                                    setIsEditing(false)
                                }}>
                                    Cancel
                                </Button>
                                <Button size="sm" onClick={handleSave}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </>
                        ) : (
                            <Button size="sm" onClick={() => setIsEditing(true)}>
                                Edit Scenario
                            </Button>
                        )}
                        <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-muted/50 p-1 rounded-lg">
                        <TabsTrigger value="overview" className="rounded-md">Overview & Editor</TabsTrigger>
                        <TabsTrigger value="simulation" className="rounded-md">Test Simulation</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Main Info */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="border-border bg-card rounded-none p-6 space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-secondary rounded-full">
                                                {scenario.type === 'discovered' ?
                                                    <Sparkles className="w-5 h-5 text-cyan-500" /> :
                                                    <Target className="w-5 h-5 text-foreground" />
                                                }
                                            </div>
                                            <div className="space-y-1">
                                                {isEditing ? (
                                                    <Input
                                                        value={editedScenario?.name}
                                                        onChange={(e) => setEditedScenario(prev => prev ? { ...prev, name: e.target.value } : undefined)}
                                                        className="font-semibold text-lg h-8"
                                                    />
                                                ) : (
                                                    <h2 className="text-xl font-semibold">{scenario.name}</h2>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            "rounded-none uppercase tracking-wider font-mono text-[10px]",
                                                            scenario.type === 'discovered' ? "text-cyan-500 border-cyan-500/20" : "text-muted-foreground border-border"
                                                        )}
                                                    >
                                                        {scenario.type}
                                                    </Badge>
                                                    {isEditing ? (
                                                        <Select
                                                            value={editedScenario?.frequency}
                                                            onValueChange={(v) => setEditedScenario(prev => prev ? { ...prev, frequency: v as any } : undefined)}
                                                        >
                                                            <SelectTrigger className="h-6 w-[120px] text-xs">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="common">Common</SelectItem>
                                                                <SelectItem value="uncommon">Uncommon</SelectItem>
                                                                <SelectItem value="rare">Rare</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className={cn(
                                                                "rounded-none uppercase tracking-wider font-mono text-[10px] border-0",
                                                                scenario.frequency === 'common' ? "text-emerald-500 bg-emerald-500/10" :
                                                                    scenario.frequency === 'uncommon' ? "text-yellow-500 bg-yellow-500/10" :
                                                                        "text-orange-500 bg-orange-500/10"
                                                            )}
                                                        >
                                                            {scenario.frequency}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Description</h3>
                                            {isEditing ? (
                                                <Textarea
                                                    value={editedScenario?.description}
                                                    onChange={(e) => setEditedScenario(prev => prev ? { ...prev, description: e.target.value } : undefined)}
                                                    className="min-h-[100px]"
                                                />
                                            ) : (
                                                <p className="text-foreground leading-relaxed">{scenario.description}</p>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Trigger Condition</h3>
                                            {isEditing ? (
                                                <Input
                                                    value={editedScenario?.trigger}
                                                    onChange={(e) => setEditedScenario(prev => prev ? { ...prev, trigger: e.target.value } : undefined)}
                                                />
                                            ) : (
                                                <div className="bg-muted/30 p-3 rounded border border-border font-mono text-sm text-muted-foreground">
                                                    {scenario.trigger}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>

                                <Card className="border-border bg-card rounded-none p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Workflow Timeline</h3>
                                        {isEditing && (
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" onClick={() => handleAddStep('action')} className="h-7 text-xs">
                                                    <Mail className="w-3 h-3 mr-1" /> Action
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleAddStep('condition')} className="h-7 text-xs">
                                                    <GitBranch className="w-3 h-3 mr-1" /> Condition
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleAddStep('wait')} className="h-7 text-xs">
                                                    <Clock className="w-3 h-3 mr-1" /> Wait
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative pl-4 border-l border-border space-y-8">
                                        {(isEditing ? editedScenario : scenario)?.workflowResponse.map((step, index) => (
                                            <div key={step.id} className="relative pl-6">
                                                <div className={cn(
                                                    "absolute -left-[25px] top-0 flex h-8 w-8 items-center justify-center rounded-full border bg-background",
                                                    getStepColor(step.type)
                                                )}>
                                                    {getStepIcon(step.type)}
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    {isEditing ? (
                                                        <div className="space-y-2 p-3 bg-muted/30 rounded border border-border">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs font-mono uppercase text-muted-foreground">{step.type}</span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleRemoveStep(index)}
                                                                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                                                                >
                                                                    <X className="w-3 h-3" />
                                                                </Button>
                                                            </div>
                                                            <Input
                                                                value={step.title}
                                                                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                                                                className="h-8 font-medium"
                                                                placeholder="Step Title"
                                                            />
                                                            <Textarea
                                                                value={step.description}
                                                                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                                                                className="min-h-[60px] text-sm"
                                                                placeholder="Step Description"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <h4 className="font-medium text-sm leading-none">{step.title}</h4>
                                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                                            {step.config && Object.keys(step.config).length > 0 && (
                                                                <div className="flex flex-wrap gap-2 mt-1">
                                                                    {Object.entries(step.config).map(([key, value]) => (
                                                                        <Badge key={key} variant="secondary" className="text-[10px] font-mono">
                                                                            {key}: {value}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            {/* Sidebar Stats */}
                            <div className="space-y-6">
                                <Card className="border-border bg-card rounded-none p-6">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Performance</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">Encounters</span>
                                            </div>
                                            <span className="font-mono font-medium">{scenario.timesEncountered}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">Success Rate</span>
                                            </div>
                                            <span className={cn("font-mono font-medium", scenario.successRate >= 90 ? "text-emerald-500" : "text-yellow-500")}>
                                                {scenario.successRate}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full", scenario.successRate >= 90 ? "bg-emerald-500" : "bg-yellow-500")}
                                                style={{ width: `${scenario.successRate}%` }}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="simulation" className="h-[600px] flex gap-6">
                        {/* Simulation Visualizer */}
                        <Card className="flex-1 border-border bg-card rounded-none p-6 relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
                                {isPlaying && (
                                    <motion.div
                                        className="h-full bg-cyan-500"
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: scenario.workflowResponse.length * 1.5 + 2, ease: "linear" }}
                                    />
                                )}
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Live Simulation</h3>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant={isPlaying ? "secondary" : "default"}
                                        onClick={runSimulation}
                                        disabled={isPlaying}
                                    >
                                        {isPlaying ? <Activity className="w-4 h-4 mr-2 animate-pulse" /> : <Play className="w-4 h-4 mr-2" />}
                                        {isPlaying ? 'Running...' : 'Start Simulation'}
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={resetSimulation} disabled={isPlaying}>
                                        <RotateCcw className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                                <AnimatePresence>
                                    {scenario.workflowResponse.map((step, index) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0.5, x: -10 }}
                                            animate={{
                                                opacity: index <= currentStepIndex ? 1 : 0.3,
                                                x: 0,
                                                scale: index === currentStepIndex ? 1.02 : 1
                                            }}
                                            className={cn(
                                                "p-4 rounded border transition-colors",
                                                index === currentStepIndex
                                                    ? "bg-cyan-500/10 border-cyan-500/30 shadow-sm"
                                                    : index < currentStepIndex
                                                        ? "bg-muted/20 border-border"
                                                        : "bg-transparent border-transparent"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-full border",
                                                    index === currentStepIndex ? "bg-cyan-500 text-white border-cyan-500" : "bg-background"
                                                )}>
                                                    {index < currentStepIndex ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : getStepIcon(step.type)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{step.title}</p>
                                                    <p className="text-xs text-muted-foreground">{step.description}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </Card>

                        {/* Console Logs */}
                        <Card className="w-[350px] border-border bg-black/90 text-green-400 font-mono text-xs p-4 rounded-none overflow-y-auto">
                            <div className="mb-2 pb-2 border-b border-white/10 flex justify-between">
                                <span>TERMINAL_OUTPUT</span>
                                <span className="text-white/30">v1.0.2</span>
                            </div>
                            <div className="space-y-1">
                                {simulationLogs.map((log, i) => (
                                    <div key={i} className="break-words">
                                        <span className="text-white/30 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                        {log}
                                    </div>
                                ))}
                                {isPlaying && (
                                    <div className="animate-pulse">_</div>
                                )}
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
