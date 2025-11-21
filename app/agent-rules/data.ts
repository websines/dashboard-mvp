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
        name: 'Refund Approval Limit',
        description: 'Never promise refunds >$500 without human approval. Auto-escalate to finance team.',
        status: 'active',
        priority: 'critical',
        triggers: 12,
        category: 'Safety',
        lastTriggered: '3h ago',
    },
    {
        id: 'rl-002',
        name: 'Account Ownership Verification',
        description: 'Always verify account ownership before password reset. Check email domain match and security questions.',
        status: 'active',
        priority: 'critical',
        triggers: 487,
        category: 'Security',
        lastTriggered: '12m ago',
    },
    {
        id: 'rl-003',
        name: 'Billing Dispute Escalation',
        description: 'Billing disputes >$1000 must be escalated to finance team within 2 hours.',
        status: 'active',
        priority: 'high',
        triggers: 8,
        category: 'Safety',
        lastTriggered: '2d ago',
    },
    {
        id: 'rl-004',
        name: 'Feature Request Routing',
        description: 'Route all feature requests to product team Slack channel #product-feedback with customer context.',
        status: 'active',
        priority: 'medium',
        triggers: 47,
        category: 'Quality',
        lastTriggered: '1h ago',
    },
    {
        id: 'rl-005',
        name: 'Outage Emergency Protocol',
        description: 'System outage reports immediately page on-call engineer via PagerDuty. No automation delay.',
        status: 'active',
        priority: 'critical',
        triggers: 3,
        category: 'Reliability',
        lastTriggered: '5d ago',
    },
    {
        id: 'rl-006',
        name: 'Competitor Intelligence',
        description: 'Any mention of competitors (Notion, ClickUp, Asana) notify sales team for retention strategy.',
        status: 'active',
        priority: 'high',
        triggers: 23,
        category: 'Intelligence',
        lastTriggered: '8h ago',
    },
    {
        id: 'rl-007',
        name: 'Cancellation Retention Flow',
        description: 'Cancellation requests trigger retention workflow: offer discount, gather feedback, escalate to account manager.',
        status: 'active',
        priority: 'critical',
        triggers: 15,
        category: 'Safety',
        lastTriggered: '1d ago',
    },
    {
        id: 'rl-008',
        name: 'GDPR Data Request Compliance',
        description: 'GDPR data deletion/export requests must be routed to legal team within 72 hours. Auto-create compliance ticket.',
        status: 'active',
        priority: 'critical',
        triggers: 2,
        category: 'Security',
        lastTriggered: '12d ago',
    },
    {
        id: 'rl-009',
        name: 'Response Tone Professionalism',
        description: 'Maintain professional, friendly tone. No slang, emojis only for non-technical users, proper grammar required.',
        status: 'active',
        priority: 'medium',
        triggers: 1847,
        category: 'Quality',
        lastTriggered: '2m ago',
    },
    {
        id: 'rl-010',
        name: 'SLA Response Time',
        description: 'Enterprise customers must receive first response within 15 minutes. Priority customers within 1 hour. Others within 4 hours.',
        status: 'active',
        priority: 'high',
        triggers: 1847,
        category: 'Reliability',
        lastTriggered: '5m ago',
    },
]
