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
        description: 'Automate tier-1 support tickets for TechFlow SaaS - handles 75.7% of all support requests autonomously',
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
    {
        id: 'wf-002',
        name: 'FinanceFlow KYC Automation',
        description: 'Automated customer identity verification and AML compliance for financial services',
        status: 'active',
        executions: 892,
        successRate: 94,
        avgTime: '4.3m',
        costPerRun: '$0.18',
        version: 'v3.1.2',
        branch: 'main',
        agents: [
            { name: 'Document Collector', type: 'input', icon: FileText, status: 'active' },
            { name: 'ID Verifier', type: 'process', icon: CheckCircle2, status: 'active' },
            { name: 'AML Checker', type: 'process', icon: Shield, status: 'active' },
            { name: 'CRM Updater', type: 'output', icon: Database, status: 'active' },
        ],
        tasks: [
            { id: '1', title: 'Collect identity documents', column: 'done', assignee: 'Document Collector', priority: 'high', phase: 'analysis', dependencies: [] },
            { id: '2', title: 'Verify ID authenticity', column: 'in_progress', assignee: 'ID Verifier', priority: 'high', phase: 'analysis', dependencies: ['1'] },
            { id: '3', title: 'Run AML compliance check', column: 'in_progress', assignee: 'AML Checker', priority: 'high', phase: 'validation', dependencies: ['2'] },
            { id: '4', title: 'Update customer record', column: 'backlog', assignee: 'CRM Updater', priority: 'medium', phase: 'implementation', dependencies: ['3'] },
        ],
        nodes: [
            { id: 'trigger', type: 'trigger', title: 'New Customer Application', subtitle: 'Onboarding Form', x: 400, y: 50 },
            { id: 'supervisor', type: 'agent', title: 'Supervisor Agent', subtitle: 'Compliance Orchestration', x: 400, y: 180 },
            { id: 'collector', type: 'agent', title: 'Document Collector', subtitle: 'Extract ID docs', x: 400, y: 310 },
            { id: 'verifier', type: 'agent', title: 'ID Verifier', subtitle: 'OCR + Authenticity check', x: 300, y: 450 },
            { id: 'aml', type: 'agent', title: 'AML Checker', subtitle: 'Regulatory compliance', x: 500, y: 450 },
            { id: 'decision', type: 'condition', title: 'Approved?', x: 400, y: 580 },
            { id: 'approve', type: 'action', title: 'Activate Account', x: 250, y: 700 },
            { id: 'reject', type: 'action', title: 'Request More Info', x: 550, y: 700 },
        ],
        edges: [
            { id: 'e1', source: 'trigger', target: 'supervisor' },
            { id: 'e2', source: 'supervisor', target: 'collector' },
            { id: 'e3', source: 'collector', target: 'verifier' },
            { id: 'e4', source: 'collector', target: 'aml' },
            { id: 'e5', source: 'verifier', target: 'decision' },
            { id: 'e6', source: 'aml', target: 'decision' },
            { id: 'e7', source: 'decision', target: 'approve', label: 'Pass', type: 'success' },
            { id: 'e8', source: 'decision', target: 'reject', label: 'Fail', type: 'failure' },
        ]
    },
    {
        id: 'wf-003',
        name: 'HealthOS Prior Authorization',
        description: 'Automate medical prior authorization requests - reduces approval time from 3 days to 4 hours',
        status: 'testing',
        executions: 234,
        successRate: 91,
        avgTime: '12.3m',
        costPerRun: '$0.31',
        version: 'v1.2.0',
        branch: 'experimental',
        agents: [
            { name: 'Request Parser', type: 'input', icon: FileText, status: 'active' },
            { name: 'Medical Reviewer', type: 'process', icon: CheckCircle2, status: 'active' },
            { name: 'Insurance Submitter', type: 'output', icon: Mail, status: 'active' },
        ],
        tasks: [],
        nodes: [],
        edges: []
    },
    {
        id: 'wf-004',
        name: 'E-commerce Returns Processing',
        description: 'Automated return request validation and refund processing',
        status: 'paused',
        executions: 567,
        successRate: 89,
        avgTime: '3.2m',
        costPerRun: '$0.08',
        version: 'v1.9.2',
        branch: 'main',
        agents: [
            { name: 'Return Validator', type: 'input', icon: CheckCircle2, status: 'idle' },
            { name: 'Refund Processor', type: 'process', icon: Database, status: 'idle' },
            { name: 'Email Notifier', type: 'output', icon: MessageSquare, status: 'idle' },
        ],
        tasks: [],
        nodes: [],
        edges: []
    },
]
