import { CheckCircle2, Database, FileText, MessageSquare, Search, Shield, Zap, Mail } from 'lucide-react'

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
        name: 'TechFlow L1 Support Automation',
        description: 'Automate tier-1 support tickets for TechFlow SaaS - handles 75.7% of all support requests autonomously. Started Day 0 at 53% automation, now at 75.7% after 90 days of self-improvement.',
        status: 'active',
        executions: 1847,
        successRate: 97.2,
        avgTime: '2.1m',
        costPerRun: '$0.04',
        version: 'v2.4',
        branch: 'main',
        agents: [
            { name: 'Ticket Classifier', type: 'input', icon: Search, status: 'active' },
            { name: 'Context Gatherer', type: 'input', icon: Database, status: 'active' },
            { name: 'Knowledge Retriever', type: 'process', icon: FileText, status: 'active' },
            { name: 'Response Composer', type: 'process', icon: MessageSquare, status: 'active' },
            { name: 'Compliance Validator', type: 'process', icon: Shield, status: 'active' },
            { name: 'Integration Helper', type: 'process', icon: Zap, status: 'active' },
        ],
        tasks: [
            { id: '1', title: 'Classify ticket category', column: 'done', assignee: 'Ticket Classifier', priority: 'high', phase: 'analysis', dependencies: [] },
            { id: '2', title: 'Gather customer context', column: 'done', assignee: 'Context Gatherer', priority: 'high', phase: 'analysis', dependencies: ['1'] },
            { id: '3', title: 'Search knowledge base', column: 'in_progress', assignee: 'Knowledge Retriever', priority: 'high', phase: 'analysis', dependencies: ['1'] },
            { id: '4', title: 'Draft response', column: 'in_progress', assignee: 'Response Composer', priority: 'high', phase: 'implementation', dependencies: ['2', '3'] },
            { id: '5', title: 'Validate against business rules', column: 'review', assignee: 'Compliance Validator', priority: 'high', phase: 'validation', dependencies: ['4'] },
            { id: '6', title: 'Send response to customer', column: 'backlog', assignee: null, priority: 'high', phase: 'implementation', dependencies: ['5'] },
            { id: '7', title: 'Update Zendesk ticket status', column: 'backlog', assignee: null, priority: 'medium', phase: 'validation', dependencies: ['6'] },
        ],
        nodes: [
            { id: 'trigger', type: 'trigger', title: 'New Zendesk Ticket', subtitle: 'Email / Support Portal', x: 400, y: 50 },
            { id: 'supervisor', type: 'agent', title: 'Supervisor Agent', subtitle: 'Orchestration & Rule Enforcement', x: 400, y: 180 },
            { id: 'classifier', type: 'agent', title: 'Ticket Classifier', subtitle: 'Categorize: billing, technical, account', x: 200, y: 310 },
            { id: 'context', type: 'agent', title: 'Context Gatherer', subtitle: 'Customer history, plan, past tickets', x: 400, y: 310 },
            { id: 'knowledge', type: 'agent', title: 'Knowledge Retriever', subtitle: 'Search help docs & past resolutions', x: 600, y: 310 },
            { id: 'composer', type: 'agent', title: 'Response Composer', subtitle: 'Draft personalized response', x: 300, y: 450 },
            { id: 'validator', type: 'agent', title: 'Compliance Validator', subtitle: 'Check business rules', x: 500, y: 450 },
            { id: 'decision', type: 'condition', title: 'Rules Pass?', x: 400, y: 580 },
            { id: 'send', type: 'action', title: 'Send to Customer', x: 250, y: 700 },
            { id: 'escalate', type: 'action', title: 'Escalate to Human', x: 550, y: 700 },
        ],
        edges: [
            { id: 'e1', source: 'trigger', target: 'supervisor' },
            { id: 'e2', source: 'supervisor', target: 'classifier' },
            { id: 'e3', source: 'supervisor', target: 'context' },
            { id: 'e4', source: 'supervisor', target: 'knowledge' },
            { id: 'e5', source: 'classifier', target: 'composer' },
            { id: 'e6', source: 'context', target: 'composer' },
            { id: 'e7', source: 'knowledge', target: 'composer' },
            { id: 'e8', source: 'composer', target: 'validator' },
            { id: 'e9', source: 'validator', target: 'decision' },
            { id: 'e10', source: 'decision', target: 'send', label: 'Yes', type: 'success' },
            { id: 'e11', source: 'decision', target: 'escalate', label: 'No', type: 'failure' },
        ]
    },
]
