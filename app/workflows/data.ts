import { Bot, CheckCircle2, Database, FileText, GitBranch, MessageSquare, TrendingUp } from 'lucide-react'

export interface WorkflowAgent {
    name: string
    type: 'input' | 'process' | 'output'
    icon: any
    status: 'active' | 'idle' | 'paused'
}

export interface WorkflowTask {
    id: string
    title: string
    column: 'backlog' | 'in_progress' | 'review' | 'done'
    assignee: string | null
    priority: 'high' | 'medium' | 'low'
    phase: 'analysis' | 'implementation' | 'validation'
    dependencies: string[]
}

export interface WorkflowNode {
    id: string
    type: 'trigger' | 'action' | 'condition' | 'agent'
    title: string
    subtitle?: string
    icon?: any
    status?: 'active' | 'inactive'
    x: number
    y: number
    config?: any
}

export interface WorkflowEdge {
    id: string
    source: string
    target: string
    label?: string
    type?: 'default' | 'success' | 'failure'
}

export interface Workflow {
    id: string
    name: string
    description: string
    status: 'active' | 'testing' | 'paused'
    executions: number
    successRate: number
    avgTime: string
    costPerRun: string
    version: string
    branch: string
    agents: WorkflowAgent[]
    tasks: WorkflowTask[]
    nodes: WorkflowNode[]
    edges: WorkflowEdge[]
}

export const workflows: Workflow[] = [
    {
        id: 'wf-001',
        name: 'Customer Onboarding',
        description: 'Automate new customer setup and verification',
        status: 'active',
        executions: 1247,
        successRate: 94,
        avgTime: '2.3m',
        costPerRun: '$0.12',
        version: 'v3.2.1',
        branch: 'main',
        agents: [
            { name: 'Data Collector', type: 'input', icon: Database, status: 'active' },
            { name: 'Verifier', type: 'process', icon: CheckCircle2, status: 'active' },
            { name: 'Email Sender', type: 'output', icon: MessageSquare, status: 'active' },
        ],
        tasks: [
            { id: '1', title: 'Verify email address', column: 'in_progress', assignee: 'Verifier', priority: 'high', phase: 'analysis', dependencies: [] },
            { id: '2', title: 'Validate company domain', column: 'in_progress', assignee: 'Data Collector', priority: 'high', phase: 'analysis', dependencies: ['1'] },
            { id: '3', title: 'Check credit score', column: 'review', assignee: 'Verifier', priority: 'medium', phase: 'analysis', dependencies: ['1'] },
            { id: '4', title: 'Update CRM record', column: 'backlog', assignee: null, priority: 'medium', phase: 'implementation', dependencies: ['1', '2', '3'] },
            { id: '5', title: 'Send welcome email', column: 'backlog', assignee: null, priority: 'low', phase: 'implementation', dependencies: ['4'] },
            { id: '6', title: 'Create user account', column: 'done', assignee: 'Data Collector', priority: 'high', phase: 'implementation', dependencies: [] },
            { id: '7', title: 'Assign account manager', column: 'done', assignee: 'Email Sender', priority: 'medium', phase: 'validation', dependencies: ['6'] },
        ],
        nodes: [
            { id: 'trigger', type: 'trigger', title: 'New Customer', subtitle: 'Webhook / API Call', x: 400, y: 50 },
            { id: 'planner', type: 'agent', title: 'Task Planner', subtitle: 'ROMA decomposition', x: 400, y: 180 },
            { id: 'supervisor', type: 'agent', title: 'Supervisor Agent', subtitle: 'Orchestration', x: 400, y: 310 },
            { id: 'worker1', type: 'agent', title: 'Data Collector', subtitle: 'Extract info', x: 200, y: 450 },
            { id: 'worker2', type: 'agent', title: 'Verifier', subtitle: 'Validation', x: 400, y: 450 },
            { id: 'worker3', type: 'agent', title: 'Email Sender', subtitle: 'Communication', x: 600, y: 450 },
            { id: 'decision', type: 'condition', title: 'Approved?', x: 400, y: 580 },
            { id: 'end_success', type: 'action', title: 'Activate Account', x: 250, y: 700 },
            { id: 'end_fail', type: 'action', title: 'Escalate', x: 550, y: 700 },
        ],
        edges: [
            { id: 'e1', source: 'trigger', target: 'planner' },
            { id: 'e2', source: 'planner', target: 'supervisor' },
            { id: 'e3', source: 'supervisor', target: 'worker1' },
            { id: 'e4', source: 'supervisor', target: 'worker2' },
            { id: 'e5', source: 'supervisor', target: 'worker3' },
            { id: 'e6', source: 'worker1', target: 'decision' },
            { id: 'e7', source: 'worker2', target: 'decision' },
            { id: 'e8', source: 'worker3', target: 'decision' },
            { id: 'e9', source: 'decision', target: 'end_success', label: 'Yes', type: 'success' },
            { id: 'e10', source: 'decision', target: 'end_fail', label: 'No', type: 'failure' },
        ]
    },
    {
        id: 'wf-002',
        name: 'Support Ticket Triage',
        description: 'Classify and route support tickets automatically',
        status: 'active',
        executions: 3421,
        successRate: 97,
        avgTime: '0.8m',
        costPerRun: '$0.004',
        version: 'v5.1.0',
        branch: 'main',
        agents: [
            { name: 'Ticket Reader', type: 'input', icon: FileText, status: 'active' },
            { name: 'Classifier', type: 'process', icon: Bot, status: 'active' },
            { name: 'Router', type: 'output', icon: GitBranch, status: 'active' },
        ],
        tasks: [
            { id: '1', title: 'Ingest Ticket', column: 'done', assignee: 'Ticket Reader', priority: 'high', phase: 'analysis', dependencies: [] },
            { id: '2', title: 'Analyze Sentiment', column: 'done', assignee: 'Classifier', priority: 'medium', phase: 'analysis', dependencies: ['1'] },
            { id: '3', title: 'Determine Category', column: 'in_progress', assignee: 'Classifier', priority: 'high', phase: 'analysis', dependencies: ['2'] },
            { id: '4', title: 'Route to Team', column: 'backlog', assignee: 'Router', priority: 'high', phase: 'implementation', dependencies: ['3'] },
        ],
        nodes: [
            { id: 'trigger', type: 'trigger', title: 'New Ticket', subtitle: 'Email / Portal', x: 400, y: 50 },
            { id: 'reader', type: 'agent', title: 'Ticket Reader', subtitle: 'Parse content', x: 400, y: 180 },
            { id: 'classifier', type: 'agent', title: 'Classifier', subtitle: 'NLP Analysis', x: 400, y: 310 },
            { id: 'router', type: 'agent', title: 'Router', subtitle: 'Assign Team', x: 400, y: 440 },
            { id: 'end', type: 'action', title: 'Notify Team', x: 400, y: 570 },
        ],
        edges: [
            { id: 'e1', source: 'trigger', target: 'reader' },
            { id: 'e2', source: 'reader', target: 'classifier' },
            { id: 'e3', source: 'classifier', target: 'router' },
            { id: 'e4', source: 'router', target: 'end' },
        ]
    },
    {
        id: 'wf-003',
        name: 'Sales Lead Qualification',
        description: 'Score and qualify incoming sales leads',
        status: 'testing',
        executions: 892,
        successRate: 91,
        avgTime: '3.1m',
        costPerRun: '$0.18',
        version: 'v2.8.3',
        branch: 'experimental',
        agents: [
            { name: 'Lead Collector', type: 'input', icon: Database, status: 'active' },
            { name: 'Scoring Agent', type: 'process', icon: TrendingUp, status: 'active' },
            { name: 'CRM Updater', type: 'output', icon: CheckCircle2, status: 'active' },
        ],
        tasks: [],
        nodes: [],
        edges: []
    },
    {
        id: 'wf-004',
        name: 'Document Processing',
        description: 'Extract and index data from uploaded documents',
        status: 'paused',
        executions: 567,
        successRate: 89,
        avgTime: '5.2m',
        costPerRun: '$0.25',
        version: 'v1.9.2',
        branch: 'main',
        agents: [
            { name: 'Document Reader', type: 'input', icon: FileText, status: 'idle' },
            { name: 'Data Extractor', type: 'process', icon: Database, status: 'idle' },
            { name: 'Indexer', type: 'output', icon: CheckCircle2, status: 'idle' },
        ],
        tasks: [],
        nodes: [],
        edges: []
    },
]
