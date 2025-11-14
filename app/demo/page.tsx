'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Bot, ArrowRight, CheckCircle2, Clock, Play, Sparkles,
  GitBranch, Layers, Zap, Send, User, Brain, Network,
  Eye, TrendingUp, Activity, Pause, FastForward
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Demo stages
type DemoStage =
  | 'input'
  | 'user_agent'
  | 'planner'
  | 'supervisor'
  | 'workers'
  | 'evolution'
  | 'complete'

interface LogEntry {
  id: number
  agent: string
  message: string
  type: 'info' | 'success' | 'processing' | 'evolution'
  timestamp: string
}

interface Task {
  id: number
  title: string
  atomic: boolean
  assignedTo?: string
  status: 'pending' | 'running' | 'complete'
  dependencies: number[]
  phase: string
}

export default function LiveDemoPage() {
  const { sidebarCollapsed } = useDashboardStore()
  const [stage, setStage] = React.useState<DemoStage>('input')
  const [userInput, setUserInput] = React.useState('')
  const [logs, setLogs] = React.useState<LogEntry[]>([])
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [accuracy, setAccuracy] = React.useState(62)
  const logIdRef = React.useRef(0)

  const exampleQuery = "Onboard new customer: john@acme.com from Acme Corp"

  const addLog = (agent: string, message: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, {
      id: logIdRef.current++,
      agent,
      message,
      type,
      timestamp
    }])
  }

  const simulateDemo = async () => {
    setIsPlaying(true)
    setLogs([])
    setTasks([])
    setStage('user_agent')

    // Stage 1: User-Facing Agent
    await sleep(800)
    addLog('User-Facing Agent', 'Received user request', 'info')
    await sleep(600)
    addLog('User-Facing Agent', 'Parsing natural language input...', 'processing')
    await sleep(800)
    addLog('User-Facing Agent', 'Extracted: email=john@acme.com, company=Acme Corp', 'success')
    await sleep(600)
    addLog('User-Facing Agent', 'Running business rule validation...', 'processing')
    await sleep(700)
    addLog('User-Facing Agent', '✓ All validation checks passed', 'success')
    await sleep(600)
    addLog('User-Facing Agent', 'Routing to Planner Agent', 'info')

    // Stage 2: Planner Agent (ROMA decomposition)
    setStage('planner')
    await sleep(1000)
    addLog('Planner Agent', 'Analyzing task complexity...', 'processing')
    await sleep(800)
    addLog('Planner Agent', 'Classification: NON-ATOMIC (requires decomposition)', 'info')
    await sleep(700)
    addLog('Planner Agent', 'Applying recursive decomposition...', 'processing')
    await sleep(900)

    // Create subtasks
    const newTasks: Task[] = [
      { id: 1, title: 'Verify email address', atomic: true, status: 'pending', dependencies: [], phase: 'analysis' },
      { id: 2, title: 'Validate company domain', atomic: true, status: 'pending', dependencies: [1], phase: 'analysis' },
      { id: 3, title: 'Check credit score', atomic: true, status: 'pending', dependencies: [1], phase: 'analysis' },
      { id: 4, title: 'Create CRM record', atomic: true, status: 'pending', dependencies: [1, 2, 3], phase: 'implementation' },
      { id: 5, title: 'Send welcome email', atomic: true, status: 'pending', dependencies: [4], phase: 'implementation' },
      { id: 6, title: 'Assign account manager', atomic: true, status: 'pending', dependencies: [4], phase: 'validation' },
    ]

    setTasks(newTasks)
    addLog('Planner Agent', `Decomposed into ${newTasks.length} atomic subtasks`, 'success')
    await sleep(700)
    addLog('Planner Agent', 'Building dependency graph (DAG)...', 'processing')
    await sleep(800)
    addLog('Planner Agent', 'Dependencies identified: Task #4 depends on #1, #2, #3', 'info')
    await sleep(600)
    addLog('Planner Agent', 'Execution strategy: PARALLEL with dependency constraints', 'success')
    await sleep(700)
    addLog('Planner Agent', 'Routing plan to Supervisor Agent', 'info')

    // Stage 3: Supervisor Agent
    setStage('supervisor')
    await sleep(1000)
    addLog('Supervisor Agent', 'Received execution plan from Planner', 'info')
    await sleep(700)
    addLog('Supervisor Agent', 'Creating Kanban board...', 'processing')
    await sleep(800)
    addLog('Supervisor Agent', 'Initializing workflow phases: Analysis → Implementation → Validation', 'info')
    await sleep(700)
    addLog('Supervisor Agent', 'Spawning worker pool (3 agents)...', 'processing')
    await sleep(900)
    addLog('Supervisor Agent', '✓ Workers ready: Data Worker, API Worker, Notification Worker', 'success')
    await sleep(600)
    addLog('Supervisor Agent', 'Analyzing dependency graph for parallel execution...', 'processing')
    await sleep(800)
    addLog('Supervisor Agent', 'Starting execution - Tasks #1, #2, #3 can run in parallel', 'info')

    // Stage 4: Workers executing
    setStage('workers')
    await sleep(1000)

    // Execute tasks in parallel simulation
    addLog('Supervisor Agent', 'Assigning Task #1 to Data Worker', 'info')
    setTasks(prev => prev.map(t => t.id === 1 ? { ...t, assignedTo: 'Data Worker', status: 'running' } : t))
    await sleep(400)

    addLog('Supervisor Agent', 'Assigning Task #2 to API Worker', 'info')
    setTasks(prev => prev.map(t => t.id === 2 ? { ...t, assignedTo: 'API Worker', status: 'running' } : t))
    await sleep(400)

    addLog('Supervisor Agent', 'Assigning Task #3 to Data Worker', 'info')
    setTasks(prev => prev.map(t => t.id === 3 ? { ...t, assignedTo: 'Data Worker', status: 'running' } : t))

    await sleep(1200)
    addLog('Data Worker', 'Task #1: Email verification complete (98.5% confidence)', 'success')
    setTasks(prev => prev.map(t => t.id === 1 ? { ...t, status: 'complete' } : t))

    await sleep(600)
    addLog('API Worker', 'Task #2: Domain validated - Acme Corp exists', 'success')
    setTasks(prev => prev.map(t => t.id === 2 ? { ...t, status: 'complete' } : t))

    await sleep(500)
    addLog('Data Worker', 'Task #3: Credit score retrieved (Score: 720)', 'success')
    setTasks(prev => prev.map(t => t.id === 3 ? { ...t, status: 'complete' } : t))

    await sleep(800)
    addLog('Guardian Monitor', 'Phase guard check: Analysis phase complete', 'info')
    await sleep(500)
    addLog('Guardian Monitor', 'Coherence validation: 96% alignment with objective ✓', 'success')

    await sleep(700)
    addLog('Supervisor Agent', 'Dependencies resolved - Task #4 ready', 'info')
    await sleep(500)
    addLog('Supervisor Agent', 'Assigning Task #4 to API Worker', 'info')
    setTasks(prev => prev.map(t => t.id === 4 ? { ...t, assignedTo: 'API Worker', status: 'running' } : t))

    await sleep(1000)
    addLog('API Worker', 'Task #4: CRM record created (ID: CUS-10247)', 'success')
    setTasks(prev => prev.map(t => t.id === 4 ? { ...t, status: 'complete' } : t))

    await sleep(600)
    addLog('Supervisor Agent', 'Parallel execution: Tasks #5 and #6 starting', 'info')
    setTasks(prev => prev.map(t =>
      t.id === 5 ? { ...t, assignedTo: 'Notification Worker', status: 'running' } :
      t.id === 6 ? { ...t, assignedTo: 'Data Worker', status: 'running' } : t
    ))

    await sleep(1100)
    addLog('Notification Worker', 'Task #5: Welcome email sent to john@acme.com', 'success')
    setTasks(prev => prev.map(t => t.id === 5 ? { ...t, status: 'complete' } : t))

    await sleep(400)
    addLog('Data Worker', 'Task #6: Account manager assigned (Sarah Chen)', 'success')
    setTasks(prev => prev.map(t => t.id === 6 ? { ...t, status: 'complete' } : t))

    await sleep(800)
    addLog('Guardian Monitor', 'Final coherence check: 94% alignment ✓', 'success')
    await sleep(600)
    addLog('Supervisor Agent', 'Workflow execution COMPLETE - All tasks finished', 'success')

    // Stage 5: Evolution
    setStage('evolution')
    await sleep(1200)
    addLog('Evolution Engine', 'Analyzing execution trajectory...', 'evolution')
    await sleep(900)
    addLog('Evolution Engine', 'Detected optimization: Email verification can use cached results', 'evolution')
    await sleep(700)
    addLog('Evolution Engine', 'Generating symbolic feedback for Planner prompts...', 'evolution')
    await sleep(800)
    addLog('Evolution Engine', 'Creating experimental branch: v3.2.2-experimental', 'evolution')
    await sleep(900)
    addLog('Evolution Engine', 'Testing improved workflow (10 iterations)...', 'evolution')
    await sleep(1500)
    addLog('Evolution Engine', 'A/B test results: 94.2% → 96.8% accuracy (+2.6%)', 'evolution')
    await sleep(800)
    addLog('Evolution Engine', 'Statistical significance confirmed (p < 0.05) ✓', 'evolution')
    await sleep(700)
    addLog('Evolution Engine', 'Merging to main branch → v3.2.2', 'evolution')

    setAccuracy(97)
    await sleep(600)
    addLog('Evolution Engine', 'Version incremented: v3.2.1 → v3.2.2', 'success')
    await sleep(500)
    addLog('Evolution Engine', 'Workflow will improve automatically next execution!', 'evolution')

    setStage('complete')
    setIsPlaying(false)
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const handleStart = () => {
    if (userInput.trim() || true) {
      simulateDemo()
    }
  }

  const getStageColor = (s: DemoStage) => {
    if (stage === s) return 'border-primary bg-primary/10 text-primary'
    const stages: DemoStage[] = ['input', 'user_agent', 'planner', 'supervisor', 'workers', 'evolution', 'complete']
    const currentIndex = stages.indexOf(stage)
    const stageIndex = stages.indexOf(s)
    if (stageIndex < currentIndex) return 'border-green-500 bg-green-500/10 text-green-400'
    return 'border-border/40 bg-accent/20 text-muted-foreground'
  }

  const getAgentIcon = (agent: string) => {
    if (agent.includes('User-Facing')) return User
    if (agent.includes('Planner')) return Brain
    if (agent.includes('Supervisor')) return Network
    if (agent.includes('Worker')) return Bot
    if (agent.includes('Guardian')) return Eye
    if (agent.includes('Evolution')) return Sparkles
    return Activity
  }

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        'lg:ml-64',
        sidebarCollapsed && 'lg:ml-16',
        'max-lg:ml-0'
      )}
    >
      <Header
        title="Live Demo"
        subtitle="Query → Self-Evolving Workflow"
        breadcrumbs={[{ label: 'Live Demo' }]}
      />

      <main className="mt-16 p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Zap className="h-7 w-7 text-primary" />
                Transform a Query into a Self-Evolving Workflow
              </CardTitle>
              <CardDescription>
                Watch in real-time as your request becomes an intelligent, self-improving multi-agent system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 mb-4">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={exampleQuery}
                  className="flex-1 bg-card/60 border-primary/30 focus:border-primary"
                  disabled={isPlaying}
                />
                <Button
                  onClick={handleStart}
                  disabled={isPlaying}
                  className="gap-2"
                  size="lg"
                >
                  {isPlaying ? (
                    <>
                      <Activity className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start Demo
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Click "Start Demo" to see the complete transformation from user query to self-improving workflow
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Agent Pipeline</CardTitle>
              <CardDescription>Multi-layer agent hierarchy (ROMA + Hephaestus patterns)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { id: 'input', label: 'Input', icon: Send },
                  { id: 'user_agent', label: 'User Agent', icon: User },
                  { id: 'planner', label: 'Planner', icon: Brain },
                  { id: 'supervisor', label: 'Supervisor', icon: Network },
                  { id: 'workers', label: 'Workers', icon: Bot },
                  { id: 'evolution', label: 'Evolution', icon: Sparkles },
                  { id: 'complete', label: 'Complete', icon: CheckCircle2 },
                ].map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all text-center",
                      getStageColor(item.id as DemoStage)
                    )}
                  >
                    <item.icon className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-xs font-medium">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Execution Logs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-primary/20 h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary animate-pulse" />
                  Live Execution Log
                </CardTitle>
                <CardDescription>Real-time agent coordination and decision making</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto space-y-2 pr-2">
                  <AnimatePresence>
                    {logs.map((log, index) => {
                      const Icon = getAgentIcon(log.agent)
                      return (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "p-3 rounded-lg border backdrop-blur-sm",
                            log.type === 'success' && "border-green-500/30 bg-green-500/5",
                            log.type === 'processing' && "border-blue-500/30 bg-blue-500/5",
                            log.type === 'evolution' && "border-purple-500/30 bg-purple-500/5",
                            log.type === 'info' && "border-border/40 bg-card/60"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                              log.type === 'success' && "bg-green-500/20",
                              log.type === 'processing' && "bg-blue-500/20",
                              log.type === 'evolution' && "bg-purple-500/20",
                              log.type === 'info' && "bg-primary/20"
                            )}>
                              <Icon className={cn(
                                "h-4 w-4",
                                log.type === 'success' && "text-green-400",
                                log.type === 'processing' && "text-blue-400 animate-pulse",
                                log.type === 'evolution' && "text-purple-400",
                                log.type === 'info' && "text-primary"
                              )} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-xs font-semibold text-primary">{log.agent}</p>
                                <p className="text-[10px] text-muted-foreground">{log.timestamp}</p>
                              </div>
                              <p className="text-sm leading-tight">{log.message}</p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Task Board + Evolution */}
          <div className="space-y-6">
            {/* Task Kanban */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Dynamic Task Board
                  </CardTitle>
                  <CardDescription>Planner decomposition → Supervisor orchestration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {tasks.map((task, index) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            "p-3 rounded-lg border-2 transition-all",
                            task.status === 'complete' && "border-green-500/50 bg-green-500/5",
                            task.status === 'running' && "border-blue-500/50 bg-blue-500/5",
                            task.status === 'pending' && "border-border/40 bg-card/60"
                          )}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-muted-foreground">#{task.id}</span>
                              <Badge variant="outline" className={cn(
                                "text-[10px] h-5",
                                task.phase === 'analysis' && "bg-purple-500/20 text-purple-400",
                                task.phase === 'implementation' && "bg-blue-500/20 text-blue-400",
                                task.phase === 'validation' && "bg-green-500/20 text-green-400"
                              )}>
                                {task.phase}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              {task.status === 'complete' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                              {task.status === 'running' && <Activity className="h-4 w-4 text-blue-500 animate-spin" />}
                              {task.status === 'pending' && <Clock className="h-4 w-4 text-muted-foreground" />}
                            </div>
                          </div>
                          <p className="text-sm font-medium mb-2">{task.title}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            {task.assignedTo && (
                              <Badge variant="outline" className="text-[10px] h-5 flex items-center gap-1">
                                <Bot className="h-3 w-3" />
                                {task.assignedTo}
                              </Badge>
                            )}
                            {task.dependencies.length > 0 && (
                              <Badge variant="outline" className="text-[10px] h-5 border-yellow-500/30 text-yellow-400">
                                Depends on: {task.dependencies.join(', ')}
                              </Badge>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {tasks.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <Brain className="h-12 w-12 mx-auto mb-3 opacity-40" />
                        <p className="text-sm">Tasks will appear here after Planner decomposition</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Evolution Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    Self-Evolution Engine
                  </CardTitle>
                  <CardDescription>Continuous learning and improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Workflow Accuracy</span>
                        <span className="text-2xl font-bold text-green-400">{accuracy}%</span>
                      </div>
                      <div className="h-3 bg-accent rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                          initial={{ width: '62%' }}
                          animate={{ width: `${accuracy}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <span className="text-red-400">Initial: 62%</span>
                        <span className="text-green-400">+{accuracy - 62}% improvement</span>
                      </div>
                    </div>

                    {stage === 'evolution' || stage === 'complete' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                          <p className="text-sm font-semibold text-purple-400">Evolution Complete!</p>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Workflow automatically improved from v3.2.1 → v3.2.2
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +2.6% accuracy
                          </Badge>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <GitBranch className="h-3 w-3 mr-1" />
                            v3.2.2
                          </Badge>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Sparkles className="h-10 w-10 mx-auto mb-2 opacity-40" />
                        <p className="text-xs">Evolution analysis starts after execution</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
