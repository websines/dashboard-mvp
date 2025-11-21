'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import {
    ArrowLeft,
    Target,
    Sparkles,
    Activity,
    TrendingUp,
    Clock,
    Mail,
    GitBranch,
    X,
    Save,
    Trash2
} from 'lucide-react'
import { useParams, useRouter, notFound } from 'next/navigation'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { initialScenarios } from '../data'

interface Scenario {
    id: string
    name: string
    description: string
    trigger: string
    type: 'pre-made' | 'discovered'
    frequency: 'common' | 'uncommon' | 'rare'
    workflowResponse: {
        id: string
        type: 'action' | 'condition' | 'wait' | 'notification'
        title: string
        description: string
        config?: any
    }[]
    successRate: number
    timesEncountered: number
    lastSeen: string
}

type WorkflowStep = Scenario['workflowResponse'][0]

export default function ScenarioDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { sidebarCollapsed } = useDashboardStore()
    const router = useRouter()

    const { id } = React.use(params)
    const [scenario, setScenario] = React.useState<Scenario | undefined>(
        initialScenarios.find(s => s.id === id) as Scenario | undefined
    )
    const [isEditing, setIsEditing] = React.useState(false)
    const [editedScenario, setEditedScenario] = React.useState<Scenario | undefined>(scenario)

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

    const getStepIcon = (type: WorkflowStep['type']) => {
        switch (type) {
            case 'action': return <Mail className="w-4 h-4" />
            case 'condition': return <GitBranch className="w-4 h-4" />
            case 'wait': return <Clock className="w-4 h-4" />
            case 'notification': return <Mail className="w-4 h-4" /> // Fallback for notification if Bell is missing
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
                    { label: 'Scenario Library', href: '/scenarios' },
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
                        Back to Library
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

                <div className="space-y-8">
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
                                                                        {key}: {String(value)}
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
                </div>
            </main>
        </div>
    )
}
