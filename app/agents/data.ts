import {
    User,
    Brain,
    BrainCircuit,
    Zap,
    Database,
    Mail,
    FileText,
    Shield,
    MessageSquare,
    Search,
    CheckCircle2
} from 'lucide-react'

export interface Agent {
    id: string
    name: string
    type: 'user-facing' | 'planner' | 'supervisor' | 'worker'
    status: 'active' | 'idle' | 'processing'
    tasksCompleted: number
    successRate: number
    averageLatency: string
    costPerTask: string
    createdBy: 'initial_setup' | 'supervisor_autonomous'
    description: string
    tools: string[]
    currentTask?: string
    icon: any
}

export const agents: Agent[] = [
    // User-Facing Layer
    {
        id: 'uf-001',
        name: 'Jessica Chen (Support Lead)',
        type: 'user-facing',
        status: 'active',
        tasksCompleted: 127,
        successRate: 98,
        averageLatency: '0.9s',
        costPerTask: '$0.01',
        createdBy: 'initial_setup',
        description: 'User-facing agent for TechFlow support team lead. Provides real-time updates on automation performance and escalated tickets.',
        tools: ['Slack', 'Zendesk', 'Email', 'Dashboard'],
        currentTask: 'Reviewing escalated tickets',
        icon: User,
    },
    {
        id: 'uf-002',
        name: 'Marcus (Engineering Lead)',
        type: 'user-facing',
        status: 'idle',
        tasksCompleted: 34,
        successRate: 96,
        averageLatency: '1.1s',
        costPerTask: '$0.01',
        createdBy: 'initial_setup',
        description: 'Personalized agent for engineering team. Notified of technical escalations and integration issues.',
        tools: ['Slack', 'PagerDuty', 'Zendesk API'],
        icon: User,
    },

    // Planner Layer
    {
        id: 'planner-001',
        name: 'Task Planner',
        type: 'planner',
        status: 'processing',
        tasksCompleted: 1847,
        successRate: 97,
        averageLatency: '2.1s',
        costPerTask: '$0.03',
        createdBy: 'initial_setup',
        description: 'Decomposes support ticket resolution into atomic tasks. Routes to appropriate worker agents.',
        tools: ['Task Analyzer', 'Dependency Tracker', 'Priority Sorter'],
        currentTask: 'Planning resolution for complex billing query',
        icon: Brain,
    },

    // Supervisor Layer
    {
        id: 'supervisor-001',
        name: 'Supervisor Agent',
        type: 'supervisor',
        status: 'active',
        tasksCompleted: 1847,
        successRate: 97.2,
        averageLatency: '2.4s',
        costPerTask: '$0.05',
        createdBy: 'initial_setup',
        description: 'Orchestrates TechFlow support automation. Has autonomously created 2 agents (Integration Helper on Day 18, Proactive Version Checker on Day 50). Manages feedback loops and self-improvement.',
        tools: ['Agent Manager', 'Workflow Optimizer', 'Feedback Analyzer', 'Version Control', 'A/B Testing', 'Shadow Testing'],
        currentTask: 'Optimizing response timing based on complexity',
        icon: BrainCircuit,
    },

    // Worker Layer - TechFlow Support Agents
    {
        id: 'worker-001',
        name: 'Ticket Classifier',
        type: 'worker',
        status: 'active',
        tasksCompleted: 1847,
        successRate: 99.1,
        averageLatency: '0.4s',
        costPerTask: '$0.001',
        createdBy: 'initial_setup',
        description: 'Categorizes incoming support tickets: billing, technical, account, feature requests. Distilled model (Day 70) - 87% cost reduction.',
        tools: ['NLP Classifier', 'Category Mapper', 'Priority Detector'],
        currentTask: 'Categorizing "API integration help" ticket',
        icon: Search,
    },
    {
        id: 'worker-002',
        name: 'Context Gatherer',
        type: 'worker',
        status: 'processing',
        tasksCompleted: 1847,
        successRate: 98.2,
        averageLatency: '1.2s',
        costPerTask: '$0.003',
        createdBy: 'initial_setup',
        description: 'Retrieves customer history, subscription plan, usage data, and past tickets from Zendesk, Stripe, and HubSpot. Optimized on Day 35 to skip empty CRM queries.',
        tools: ['Zendesk API', 'Stripe API', 'HubSpot API', 'Cache Manager'],
        currentTask: 'Gathering context for Enterprise customer',
        icon: Database,
    },
    {
        id: 'worker-003',
        name: 'Knowledge Retriever',
        type: 'worker',
        status: 'active',
        tasksCompleted: 1847,
        successRate: 96.8,
        averageLatency: '1.8s',
        costPerTask: '$0.004',
        createdBy: 'initial_setup',
        description: 'Searches help documentation, internal wiki, past ticket resolutions, and Slack history. Auto-updated on Day 80 when API v3 was released.',
        tools: ['Vector Search', 'Semantic Retrieval', 'RAG System', 'Knowledge Base'],
        currentTask: 'Searching for webhook configuration docs',
        icon: FileText,
    },
    {
        id: 'worker-004',
        name: 'Response Composer',
        type: 'worker',
        status: 'active',
        tasksCompleted: 1847,
        successRate: 97.6,
        averageLatency: '2.3s',
        costPerTask: '$0.008',
        createdBy: 'initial_setup',
        description: 'Drafts personalized customer responses using context and knowledge. Tone adjusted on Day 20 for non-technical users. Variable timing added on Day 60 for better perceived personalization.',
        tools: ['Response Generator', 'Tone Adjuster', 'Personalization Engine', 'Template System'],
        currentTask: 'Composing response for password reset request',
        icon: MessageSquare,
    },
    {
        id: 'worker-005',
        name: 'Compliance Validator',
        type: 'worker',
        status: 'processing',
        tasksCompleted: 1847,
        successRate: 100,
        averageLatency: '0.3s',
        costPerTask: '$0.001',
        createdBy: 'initial_setup',
        description: 'Validates all responses against 8 TechFlow business rules. Has blocked 127 policy violations in 90 days. Zero false negatives.',
        tools: ['Rule Engine', 'Policy Validator', 'Escalation Router', 'Audit Logger'],
        currentTask: 'Validating refund amount against $500 limit',
        icon: Shield,
    },
    {
        id: 'worker-006',
        name: 'Integration Helper',
        type: 'worker',
        status: 'idle',
        tasksCompleted: 89,
        successRate: 92.1,
        averageLatency: '3.2s',
        costPerTask: '$0.007',
        createdBy: 'supervisor_autonomous',
        description: 'Created autonomously by Supervisor on Day 18. Handles common API integration issues (API key format, webhook config, CORS). Auto-updated knowledge base when API v3 was released.',
        tools: ['API Validator', 'Webhook Tester', 'CORS Checker', 'Integration Docs'],
        icon: Zap,
    },
    {
        id: 'worker-007',
        name: 'Proactive Version Checker',
        type: 'worker',
        status: 'active',
        tasksCompleted: 178,
        successRate: 92.4,
        averageLatency: '1.1s',
        costPerTask: '$0.002',
        createdBy: 'supervisor_autonomous',
        description: 'Created by Supervisor on Day 50 via shadow testing. Detects when customers report bugs already fixed in newer versions and suggests upgrades proactively. Increased automation rate by 21%.',
        tools: ['Version Detector', 'Bug Tracker', 'Upgrade Advisor'],
        currentTask: 'Checking if bug is fixed in customer version',
        icon: CheckCircle2,
    },
]
