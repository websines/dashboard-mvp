'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { TrendingUp, Zap, Brain, Target, CheckCircle2 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const evolutionStages = [
  {
    id: 1,
    name: 'Symbolic Learning',
    description: 'Analyzing execution traces and identifying patterns',
    status: 'completed',
    improvement: '+12%',
  },
  {
    id: 2,
    name: 'RL Training',
    description: 'Reinforcement learning on workflow variations',
    status: 'completed',
    improvement: '+13%',
  },
  {
    id: 3,
    name: 'Architecture Search',
    description: 'Optimizing agent structure and communication',
    status: 'in-progress',
    improvement: '+10%',
  },
  {
    id: 4,
    name: 'Distillation',
    description: 'Creating specialized Action Models',
    status: 'pending',
    improvement: 'TBD',
  },
]

const costData = [
  { version: 'v1.0', cost: 100, efficiency: 60 },
  { version: 'v1.2', cost: 85, efficiency: 72 },
  { version: 'v2.0', cost: 60, efficiency: 85 },
  { version: 'v2.3', cost: 45, efficiency: 95 },
]

export default function EvolutionPage() {
  const { sidebarCollapsed, workflowVersions } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Self-Evolution Engine"
        subtitle="Autonomous Improvement"
        breadcrumbs={[{ label: 'Evolution' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Evolution Pipeline</h1>
          <p className="text-sm text-muted-foreground">
            Automatic workflow improvement from 60% to 95% accuracy
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-sm font-medium text-muted-foreground">Accuracy Gain</p>
              </div>
              <p className="text-2xl font-bold">+35%</p>
              <p className="text-xs text-muted-foreground mt-1">60% → 95%</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <p className="text-sm font-medium text-muted-foreground">Cost Reduction</p>
              </div>
              <p className="text-2xl font-bold">-55%</p>
              <p className="text-xs text-muted-foreground mt-1">Through optimization</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-purple-500" />
                <p className="text-sm font-medium text-muted-foreground">Evolution Cycles</p>
              </div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-xs text-muted-foreground mt-1">Over 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-500" />
                <p className="text-sm font-medium text-muted-foreground">Next Target</p>
              </div>
              <p className="text-2xl font-bold">97%</p>
              <p className="text-xs text-muted-foreground mt-1">Estimated in 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Evolution Stages */}
        <Card className="mb-6 border-border/40">
          <CardHeader>
            <CardTitle>Evolution Stages</CardTitle>
            <CardDescription>Multi-stage self-improvement pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evolutionStages.map((stage, index) => (
                <div key={stage.id} className="flex items-start gap-4">
                  <div className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2',
                    stage.status === 'completed'
                      ? 'border-green-500 bg-green-500/10'
                      : stage.status === 'in-progress'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-border bg-accent/50'
                  )}>
                    {stage.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <span className="text-sm font-medium">{stage.id}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{stage.name}</h3>
                      <Badge
                        variant={
                          stage.status === 'completed'
                            ? 'default'
                            : stage.status === 'in-progress'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {stage.status}
                      </Badge>
                      <span className="ml-auto text-sm font-medium text-green-500">
                        {stage.improvement}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Accuracy Improvement</CardTitle>
              <CardDescription>Workflow performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={workflowVersions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 10%)" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(0 0% 60%)"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="hsl(0 0% 60%)"
                    style={{ fontSize: '12px' }}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(0 0% 3%)',
                      border: '1px solid hsl(0 0% 10%)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="hsl(142 76% 36%)"
                    fill="hsl(142 76% 36% / 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Cost vs Efficiency</CardTitle>
              <CardDescription>Operational cost reduction</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 10%)" />
                  <XAxis
                    dataKey="version"
                    stroke="hsl(0 0% 60%)"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="hsl(0 0% 60%)"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(0 0% 3%)',
                      border: '1px solid hsl(0 0% 10%)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="hsl(0 84.2% 60.2%)"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(0 84.2% 60.2%)', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="efficiency"
                    stroke="hsl(142 76% 36%)"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(142 76% 36%)', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
