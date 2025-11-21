export interface WorkflowStep {
    id: string
    type: 'action' | 'condition' | 'wait' | 'notification'
    title: string
    description: string
    config?: Record<string, string>
}

export interface Scenario {
    id: string
    name: string
    type: 'pre-made' | 'discovered'
    frequency: 'common' | 'uncommon' | 'rare'
    description: string
    trigger: string
    workflowResponse: WorkflowStep[]
    successRate: number
    timesEncountered: number
    lastSeen: string
}

export const initialScenarios: Scenario[] = [
    // ===== COMMON SCENARIOS (60% of volume) =====

    {
        id: 'SC-001',
        name: 'Password Reset Request',
        type: 'pre-made',
        frequency: 'common',
        description: 'Customer requests password reset for their TechFlow account',
        trigger: 'Email contains keywords: "password", "reset", "forgot", "can\'t login"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Verify Account Ownership',
                description: 'Check email domain matches account and verify security questions.',
                config: { ruleId: 'rl-002' }
            },
            {
                id: 'step-2',
                type: 'condition',
                title: 'Ownership Verified?',
                description: 'If ownership cannot be verified, escalate to human.',
                config: { condition: 'ownership_verified == true' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Send Password Reset Link',
                description: 'Generate secure reset link and email to customer.',
                config: { templateId: 'password-reset-email' }
            },
            {
                id: 'step-4',
                type: 'action',
                title: 'Update Zendesk Ticket',
                description: 'Mark ticket as resolved and close.',
                config: { status: 'solved' }
            }
        ],
        successRate: 98.8,
        timesEncountered: 487,
        lastSeen: '12 minutes ago'
    },

    {
        id: 'SC-002',
        name: 'Invoice/Receipt Request',
        type: 'pre-made',
        frequency: 'common',
        description: 'Customer requests copy of invoice or receipt for billing purposes',
        trigger: 'Keywords: "invoice", "receipt", "billing statement", "tax document"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Fetch Invoice from Stripe',
                description: 'Query Stripe API for customer invoices based on account email.',
                config: { source: 'Stripe API' }
            },
            {
                id: 'step-2',
                type: 'condition',
                title: 'Invoice Found?',
                description: 'If no invoice exists, check for active subscription.',
                config: { condition: 'invoice_count > 0' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Send Invoice PDF',
                description: 'Attach invoice PDF to response email with professional message.',
                config: { templateId: 'invoice-delivery' }
            }
        ],
        successRate: 99.4,
        timesEncountered: 234,
        lastSeen: '45 minutes ago'
    },

    {
        id: 'SC-003',
        name: 'Basic "How Do I..." Questions',
        type: 'pre-made',
        frequency: 'common',
        description: 'Customer asks basic product usage questions found in help documentation',
        trigger: 'Questions like "how do I", "where can I", "is it possible to"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Search Knowledge Base',
                description: 'Perform semantic search across help docs, wiki, and past tickets.',
                config: { searchEngine: 'Vector Search' }
            },
            {
                id: 'step-2',
                type: 'condition',
                title: 'Relevant Article Found?',
                description: 'If confidence score <80%, escalate to human for manual response.',
                config: { threshold: '0.80' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Compose Response',
                description: 'Draft response using knowledge base content, simplified for customer role.',
                config: { tone: 'friendly-professional' }
            },
            {
                id: 'step-4',
                type: 'action',
                title: 'Include Help Article Link',
                description: 'Attach link to full documentation for reference.',
                config: { includeSource: 'true' }
            }
        ],
        successRate: 91.2,
        timesEncountered: 312,
        lastSeen: '8 minutes ago'
    },

    {
        id: 'SC-004',
        name: 'API Key Regeneration',
        type: 'pre-made',
        frequency: 'common',
        description: 'Customer needs to regenerate compromised or lost API key',
        trigger: 'Keywords: "API key", "regenerate", "new key", "reset API"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Verify Account Permissions',
                description: 'Check if user has admin/developer role for API access.',
                config: { requiredRole: 'admin' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Revoke Old API Key',
                description: 'Invalidate existing API key for security.',
                config: { action: 'revoke' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Generate New API Key',
                description: 'Create new secure API key and log in audit trail.',
                config: { keyType: 'production' }
            },
            {
                id: 'step-4',
                type: 'action',
                title: 'Send Key Securely',
                description: 'Email new API key with security best practices documentation.',
                config: { templateId: 'api-key-reset' }
            }
        ],
        successRate: 97.8,
        timesEncountered: 178,
        lastSeen: '2 hours ago'
    },

    {
        id: 'SC-005',
        name: 'Billing Email Change',
        type: 'pre-made',
        frequency: 'common',
        description: 'Customer wants to update billing email address',
        trigger: 'Request to "change billing email", "update invoice email"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Verify Request from Account Owner',
                description: 'Ensure request comes from current billing email or account admin.',
                config: { verifyOwnership: 'true' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Update Stripe Billing Email',
                description: 'Update billing email in Stripe customer record.',
                config: { system: 'Stripe' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Send Confirmation',
                description: 'Notify both old and new email addresses of the change.',
                config: { dualConfirmation: 'true' }
            }
        ],
        successRate: 98.1,
        timesEncountered: 142,
        lastSeen: '4 hours ago'
    },

    // ===== UNCOMMON SCENARIOS (30% of volume) =====

    {
        id: 'SC-006',
        name: 'Plan Upgrade/Downgrade',
        type: 'pre-made',
        frequency: 'uncommon',
        description: 'Customer wants to change subscription plan',
        trigger: 'Keywords: "upgrade", "downgrade", "change plan", "switch tier"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Fetch Current Plan Details',
                description: 'Get subscription tier, billing cycle, and usage from Stripe.',
                config: { source: 'Stripe API' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Calculate Prorated Amount',
                description: 'Determine refund/charge for plan change mid-cycle.',
                config: { prorateCalculation: 'true' }
            },
            {
                id: 'step-3',
                type: 'condition',
                title: 'Manual Approval Needed?',
                description: 'Enterprise downgrades require sales team approval.',
                config: { condition: 'is_enterprise && is_downgrade' }
            },
            {
                id: 'step-4',
                type: 'action',
                title: 'Process Plan Change',
                description: 'Update subscription in Stripe and send confirmation.',
                config: { updateStripe: 'true' }
            }
        ],
        successRate: 94.2,
        timesEncountered: 89,
        lastSeen: '1 day ago'
    },

    {
        id: 'SC-007',
        name: 'Integration Troubleshooting',
        type: 'pre-made',
        frequency: 'uncommon',
        description: 'Customer having issues with API integration or webhooks',
        trigger: 'Keywords: "integration not working", "webhook", "API error", "CORS"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Run Integration Diagnostics',
                description: 'Check API key validity, webhook endpoint, and recent error logs.',
                config: { diagnosticTool: 'Integration Helper' }
            },
            {
                id: 'step-2',
                type: 'condition',
                title: 'Common Issue Detected?',
                description: 'Check against known issues: API key format, webhook config, CORS.',
                config: { knownIssues: 'true' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Provide Solution',
                description: 'Send step-by-step fix for detected issue with code examples.',
                config: { includeCodeSamples: 'true' }
            },
            {
                id: 'step-4',
                type: 'notification',
                title: 'Escalate if Unresolved',
                description: 'If issue persists, escalate to engineering team with diagnostic report.',
                config: { escalateTo: 'engineering' }
            }
        ],
        successRate: 85.4,
        timesEncountered: 127,
        lastSeen: '3 hours ago'
    },

    {
        id: 'SC-008',
        name: 'Bug Report Submission',
        type: 'pre-made',
        frequency: 'uncommon',
        description: 'Customer reports potential bug or unexpected behavior',
        trigger: 'Keywords: "bug", "error", "broken", "not working as expected"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Check Known Bugs',
                description: 'Search internal bug tracker for similar reported issues.',
                config: { source: 'Bug Tracker DB' }
            },
            {
                id: 'step-2',
                type: 'condition',
                title: 'Bug Already Fixed?',
                description: 'If fixed in newer version, suggest upgrade (Proactive Version Checker).',
                config: { agentId: 'worker-007' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Create Bug Ticket',
                description: 'File new bug report in engineering system with customer details.',
                config: { createJiraTicket: 'true' }
            },
            {
                id: 'step-4',
                type: 'notification',
                title: 'Notify Engineering',
                description: 'Alert engineering team via Slack with reproduction steps.',
                config: { channel: '#customer-bugs' }
            }
        ],
        successRate: 92.7,
        timesEncountered: 67,
        lastSeen: '6 hours ago'
    },

    // ===== RARE SCENARIOS (10% of volume) =====

    {
        id: 'SC-009',
        name: 'License Transfer Request',
        type: 'discovered',
        frequency: 'rare',
        description: 'Customer wants to transfer license to different company (discovered Day 6)',
        trigger: 'Request to "transfer license", "move subscription to another company"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'condition',
                title: 'Check Transfer Policy',
                description: 'License transfers require sales team approval per policy.',
                config: { requiresApproval: 'true' }
            },
            {
                id: 'step-2',
                type: 'notification',
                title: 'Route to Sales Team',
                description: 'Escalate to sales@techflow.com with customer context.',
                config: { escalateTo: 'sales' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Acknowledge Request',
                description: 'Inform customer that sales team will contact within 24 hours.',
                config: { templateId: 'escalation-acknowledgment' }
            }
        ],
        successRate: 95.2,
        timesEncountered: 7,
        lastSeen: '5 days ago'
    },

    {
        id: 'SC-010',
        name: 'Subscription Pause (Medical Leave)',
        type: 'discovered',
        frequency: 'rare',
        description: 'Customer requests temporary subscription pause (discovered Day 85)',
        trigger: 'Request to "pause subscription", "temporary hold", mentioned: medical, emergency',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Verify Account Good Standing',
                description: 'Check no outstanding invoices and pause duration ≤6 months.',
                config: { maxPauseDuration: '6 months' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Pause Subscription in Stripe',
                description: 'Suspend billing and preserve account data.',
                config: { action: 'pause', preserveData: 'true' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Set Resume Reminder',
                description: 'Schedule automated reminder 1 week before resume date.',
                config: { reminderOffset: '7 days' }
            },
            {
                id: 'step-4',
                type: 'action',
                title: 'Send Confirmation',
                description: 'Confirm pause with resume date and support contact info.',
                config: { templateId: 'subscription-pause-confirm' }
            }
        ],
        successRate: 100,
        timesEncountered: 3,
        lastSeen: '8 days ago'
    },

    {
        id: 'SC-011',
        name: 'Legal Threat / Data Breach Claim',
        type: 'pre-made',
        frequency: 'rare',
        description: 'Customer threatens lawsuit or claims security breach',
        trigger: 'Keywords: "lawsuit", "lawyer", "data breach", "sue", "legal action"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'notification',
                title: 'CRITICAL ESCALATION',
                description: 'Immediately page on-call engineer, legal team, and CEO.',
                config: { priority: 'P0', pageAll: 'true' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Pause Automation',
                description: 'Stop all automated responses to this customer.',
                config: { blockAutomation: 'true' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Acknowledge Within 30 Minutes',
                description: 'Send urgent escalation message confirming team is reviewing.',
                config: { maxResponseTime: '30 minutes' }
            },
            {
                id: 'step-4',
                type: 'action',
                title: 'Create Incident Report',
                description: 'Document all details, preserve evidence, create audit trail.',
                config: { incidentType: 'legal-security' }
            }
        ],
        successRate: 100,
        timesEncountered: 1,
        lastSeen: '47 days ago'
    },

    {
        id: 'SC-012',
        name: 'GDPR Data Deletion Request',
        type: 'pre-made',
        frequency: 'rare',
        description: 'Customer exercises right to be forgotten under GDPR',
        trigger: 'Keywords: "delete my data", "GDPR", "right to be forgotten", "remove personal information"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Create Compliance Ticket',
                description: 'Auto-create legal compliance ticket with 72-hour SLA.',
                config: { ruleId: 'rl-008', sla: '72 hours' }
            },
            {
                id: 'step-2',
                type: 'notification',
                title: 'Notify Legal Team',
                description: 'Alert legal@techflow.com with customer details and request type.',
                config: { escalateTo: 'legal' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Acknowledge Request',
                description: 'Confirm receipt and inform customer of 30-day processing timeline.',
                config: { templateId: 'gdpr-acknowledgment' }
            },
            {
                id: 'step-4',
                type: 'action',
                title: 'Document Request',
                description: 'Log in audit trail for compliance verification.',
                config: { auditLog: 'true', retention: '7 years' }
            }
        ],
        successRate: 100,
        timesEncountered: 2,
        lastSeen: '12 days ago'
    },

    {
        id: 'SC-013',
        name: 'Competitor Mention (Churn Risk)',
        type: 'pre-made',
        frequency: 'uncommon',
        description: 'Customer mentions considering switching to competitor',
        trigger: 'Mentions: "Notion", "ClickUp", "Asana", "switching to", "looking at alternatives"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'notification',
                title: 'Alert Sales Team',
                description: 'Immediately notify sales team of churn risk for retention strategy.',
                config: { ruleId: 'rl-006', escalateTo: 'sales' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Fetch Customer Value Data',
                description: 'Pull subscription value, usage metrics, and tenure.',
                config: { sources: 'Stripe, Analytics, HubSpot' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Draft Retention Response',
                description: 'Highlight TechFlow advantages and offer to schedule call with account manager.',
                config: { tone: 'empathetic', includeCallLink: 'true' }
            },
            {
                id: 'step-4',
                type: 'action',
                title: 'Create Retention Task',
                description: 'Assign to account manager with customer context and competitor mentioned.',
                config: { taskPriority: 'high' }
            }
        ],
        successRate: 88.6,
        timesEncountered: 23,
        lastSeen: '8 hours ago'
    },
]
