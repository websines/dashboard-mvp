import {
    Network,
    User,
    Brain,
    BrainCircuit,
    Zap,
    Database,
    Mail,
    FileText,
    Calendar,
    Shield,
    Activity,
    TrendingUp,
    Bot,
    Cpu,
    Server,
    GitBranch,
    Terminal
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
        name: 'Sarah (HR Manager)',
        type: 'user-facing',
        status: 'active',
        tasksCompleted: 342,
        successRate: 96,
        averageLatency: '1.2s',
        costPerTask: '$0.02',
        createdBy: 'initial_setup',
        description: 'Personalized agent for Sarah. Remembers preferences, communication style, and delivers results.',
        tools: ['Email', 'Slack', 'Calendar', 'Notifications'],
        currentTask: 'Preparing daily summary report',
        icon: User,
    },
    {
        id: 'uf-002',
        name: 'Mike (Recruiter)',
        type: 'user-facing',
        status: 'idle',
        tasksCompleted: 287,
        successRate: 94,
        averageLatency: '1.1s',
        costPerTask: '$0.02',
        createdBy: 'initial_setup',
        description: 'Personalized agent for Mike. Real-time notifications, brief updates, all candidates.',
        tools: ['Email', 'SMS', 'Slack', 'CRM'],
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
        averageLatency: '2.8s',
        costPerTask: '$0.05',
        createdBy: 'initial_setup',
        description: 'Decomposes user requests into atomic tasks. Uses ROMA pattern for recursive breakdown.',
        tools: ['Task Analyzer', 'Dependency Tracker', 'Phase Designer'],
        currentTask: 'Decomposing "Screen 50 candidates" request',
        icon: Brain,
    },

    // Supervisor Layer
    {
        id: 'supervisor-001',
        name: 'Autonomous Supervisor',
        type: 'supervisor',
        status: 'active',
        tasksCompleted: 247,
        successRate: 92,
        averageLatency: '3.5s',
        costPerTask: '$0.08',
        createdBy: 'initial_setup',
        description: 'Orchestrates all agents. Autonomously adds/removes/modifies agents based on feedback and performance.',
        tools: ['Agent Manager', 'Workflow Optimizer', 'Feedback Analyzer', 'Version Control', 'Guardian Monitor'],
        currentTask: 'Analyzing feedback: Modify email tone',
        icon: BrainCircuit,
    },

    // Worker Layer
    {
        id: 'worker-001',
        name: 'Resume Parser',
        type: 'worker',
        status: 'active',
        tasksCompleted: 1247,
        successRate: 98,
        averageLatency: '0.8s',
        costPerTask: '$0.003',
        createdBy: 'initial_setup',
        description: 'Extracts structured data from resumes. Handles PDF, DOCX, plain text.',
        tools: ['PDF Parser', 'OCR', 'NLP Extractor'],
        currentTask: 'Parsing John Doe resume',
        icon: FileText,
    },
    {
        id: 'worker-002',
        name: 'Email Sender',
        type: 'worker',
        status: 'idle',
        tasksCompleted: 892,
        successRate: 96,
        averageLatency: '1.5s',
        costPerTask: '$0.004',
        createdBy: 'initial_setup',
        description: 'Sends personalized emails. Recently modified by Supervisor to use professional tone.',
        tools: ['Email API', 'Template Engine', 'Personalization'],
        icon: Mail,
    },
    {
        id: 'worker-003',
        name: 'Interview Scheduler',
        type: 'worker',
        status: 'processing',
        tasksCompleted: 534,
        successRate: 94,
        averageLatency: '2.1s',
        costPerTask: '$0.005',
        createdBy: 'initial_setup',
        description: 'Coordinates interview scheduling. Checks calendars, sends invites, handles conflicts.',
        tools: ['Calendar API', 'Timezone Handler', 'Availability Checker'],
        currentTask: 'Finding slot for Jane Smith interview',
        icon: Calendar,
    },
    {
        id: 'worker-004',
        name: 'Compliance Checker',
        type: 'worker',
        status: 'idle',
        tasksCompleted: 1089,
        successRate: 99,
        averageLatency: '0.6s',
        costPerTask: '$0.002',
        createdBy: 'initial_setup',
        description: 'Validates all actions against business rules. GDPR, no weekends, logging, approval workflows.',
        tools: ['Rule Engine', 'Audit Logger', 'Policy Validator'],
        icon: Shield,
    },
    {
        id: 'worker-005',
        name: 'Document Parser',
        type: 'worker',
        status: 'active',
        tasksCompleted: 45,
        successRate: 91,
        averageLatency: '1.8s',
        costPerTask: '$0.006',
        createdBy: 'supervisor_autonomous',
        description: 'Created autonomously by Supervisor. Handles unstructured PDF parsing that Resume Parser missed.',
        tools: ['Advanced OCR', 'Layout Analyzer', 'Table Extractor'],
        currentTask: 'Extracting data from scanned document',
        icon: FileText,
    },
]
