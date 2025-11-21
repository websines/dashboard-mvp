export interface Rule {
    id: string
    name: string
    description: string
    status: 'active' | 'testing' | 'disabled'
    priority: 'critical' | 'high' | 'medium' | 'low'
    triggers: number
    category: 'Safety' | 'Security' | 'Quality' | 'Reliability' | 'Intelligence'
    lastTriggered: string
}

export const initialRules: Rule[] = [
    {
        id: 'rl-001',
        name: 'Compliance Check',
        description: 'Ensure all responses meet regulatory requirements',
        status: 'active',
        priority: 'high',
        triggers: 3420,
        category: 'Safety',
        lastTriggered: '2m ago',
    },
    {
        id: 'rl-002',
        name: 'PII Detection',
        description: 'Automatically redact personal identifiable information',
        status: 'active',
        priority: 'critical',
        triggers: 1250,
        category: 'Security',
        lastTriggered: '1h ago',
    },
    {
        id: 'rl-003',
        name: 'Tone Adjustment',
        description: 'Maintain professional and friendly communication style',
        status: 'active',
        priority: 'medium',
        triggers: 8900,
        category: 'Quality',
        lastTriggered: '5m ago',
    },
    {
        id: 'rl-004',
        name: 'Error Handling',
        description: 'Gracefully handle unexpected inputs and errors',
        status: 'active',
        priority: 'high',
        triggers: 450,
        category: 'Reliability',
        lastTriggered: '1d ago',
    },
    {
        id: 'rl-005',
        name: 'Context Retention',
        description: 'Remember conversation context across interactions',
        status: 'testing',
        priority: 'medium',
        triggers: 120,
        category: 'Intelligence',
        lastTriggered: '30m ago',
    },
]
