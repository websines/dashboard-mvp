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
    // Pre-made scenarios (client-provided)
    {
        id: 'SC-001',
        name: 'Candidate No Response',
        type: 'pre-made',
        frequency: 'common',
        description: 'Candidate does not respond to initial outreach email within 48 hours',
        trigger: 'No email reply after 48 hours',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Send Follow-up Email',
                description: 'Send the "First Follow-up" template to candidate.',
                config: { templateId: 'email-followup-01' }
            },
            {
                id: 'step-2',
                type: 'wait',
                title: 'Wait for Response',
                description: 'Wait for 5 days before taking next action.',
                config: { duration: '5d' }
            },
            {
                id: 'step-3',
                type: 'condition',
                title: 'Check Response Status',
                description: 'If no response received, proceed to escalation.',
                config: { condition: 'has_replied == false' }
            },
            {
                id: 'step-4',
                type: 'notification',
                title: 'Escalate to Recruiter',
                description: 'Notify the assigned recruiter to attempt manual contact.',
                config: { role: 'recruiter' }
            }
        ],
        successRate: 87,
        timesEncountered: 142,
        lastSeen: '2 hours ago'
    },
    {
        id: 'SC-002',
        name: 'Salary Inquiry Pre-Interview',
        type: 'pre-made',
        frequency: 'common',
        description: 'Candidate asks about salary range before scheduling interview',
        trigger: 'Email contains keywords: "salary", "compensation", "pay"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Fetch Salary Band',
                description: 'Retrieve approved salary range for the position ID.',
                config: { source: 'ATS_DB' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Draft Response',
                description: 'Create email with salary range and benefits summary.',
                config: { template: 'salary-inquiry-response' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Schedule Call',
                description: 'Propose a 15-min call to discuss compensation details.',
                config: { calendar: 'recruiter_availability' }
            }
        ],
        successRate: 92,
        timesEncountered: 89,
        lastSeen: '5 hours ago'
    },
    {
        id: 'SC-003',
        name: 'Employment Gap Detected',
        type: 'pre-made',
        frequency: 'uncommon',
        description: 'Resume shows gap in employment history > 6 months',
        trigger: 'Resume parser detects employment gap',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'notification',
                title: 'Flag for Review',
                description: 'Mark application as "Needs Review" in ATS.',
                config: { tag: 'employment_gap' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Add Note',
                description: 'Append note to candidate profile highlighting the gap duration.',
                config: { note_type: 'warning' }
            }
        ],
        successRate: 94,
        timesEncountered: 34,
        lastSeen: '1 day ago'
    },
    {
        id: 'SC-004',
        name: 'Weekend Contact Attempt',
        type: 'pre-made',
        frequency: 'rare',
        description: 'System attempts to contact candidate on weekend (violates business rules)',
        trigger: 'Scheduled action falls on Saturday/Sunday',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Reschedule Action',
                description: 'Move scheduled task to next Monday at 9:00 AM.',
                config: { time: 'Monday 09:00' }
            },
            {
                id: 'step-2',
                type: 'notification',
                title: 'Log Compliance Event',
                description: 'Record the attempted violation for audit purposes.',
                config: { severity: 'low' }
            }
        ],
        successRate: 100,
        timesEncountered: 12,
        lastSeen: '3 days ago'
    },

    // Discovered scenarios (learned during operation)
    {
        id: 'SC-D001',
        name: 'Duplicate Application',
        type: 'discovered',
        frequency: 'uncommon',
        description: 'Candidate applies to same position twice within 7 days',
        trigger: 'Email/name match detected within 7 day window',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Merge Applications',
                description: 'Combine new application data into existing profile.',
                config: { strategy: 'merge_latest' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Send Single Response',
                description: 'Acknowledge receipt without sending duplicate emails.',
                config: { template: 'application_received_dedup' }
            }
        ],
        successRate: 91,
        timesEncountered: 23,
        lastSeen: '6 hours ago'
    },
    {
        id: 'SC-D002',
        name: 'Out-of-Office Auto-Reply',
        type: 'discovered',
        frequency: 'common',
        description: 'Candidate email triggers out-of-office auto-reply',
        trigger: 'Email reply contains "out of office", "OOO", "vacation"',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'condition',
                title: 'Check for Return Date',
                description: 'Attempt to parse return date from email body.',
                config: { parser: 'date_extraction' }
            },
            {
                id: 'step-2',
                type: 'wait',
                title: 'Pause Outreach',
                description: 'Suspend all automated emails until return date.',
                config: { until: 'return_date' }
            },
            {
                id: 'step-3',
                type: 'action',
                title: 'Reschedule Follow-up',
                description: 'Set next contact for Return Date + 1 day.',
                config: { offset: '1d' }
            }
        ],
        successRate: 88,
        timesEncountered: 67,
        lastSeen: '1 hour ago'
    },
    {
        id: 'SC-D003',
        name: 'Competitor Company Application',
        type: 'discovered',
        frequency: 'rare',
        description: 'Candidate currently employed at direct competitor company',
        trigger: 'Current employer matches competitor list',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'notification',
                title: 'Confidentiality Alert',
                description: 'Notify hiring manager of potential conflict of interest.',
                config: { priority: 'high' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Add Non-Compete Check',
                description: 'Add a mandatory task for legal review before offer.',
                config: { task: 'legal_review' }
            }
        ],
        successRate: 96,
        timesEncountered: 8,
        lastSeen: '2 days ago'
    },
    {
        id: 'SC-D004',
        name: 'Resume Format Parsing Failure',
        type: 'discovered',
        frequency: 'uncommon',
        description: 'Resume parser fails on scanned PDF or unusual format',
        trigger: 'Resume Parser agent returns error',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Route to OCR',
                description: 'Send document to advanced OCR processing queue.',
                config: { service: 'ocr_advanced' }
            },
            {
                id: 'step-2',
                type: 'condition',
                title: 'Check OCR Success',
                description: 'If OCR fails, flag for manual data entry.',
                config: { retry_count: '1' }
            },
            {
                id: 'step-3',
                type: 'notification',
                title: 'Notify Candidate',
                description: 'Inform candidate of slight processing delay.',
                config: { template: 'processing_delay' }
            }
        ],
        successRate: 85,
        timesEncountered: 18,
        lastSeen: '8 hours ago'
    },
    {
        id: 'SC-D005',
        name: 'Interview Scheduling Conflict',
        type: 'discovered',
        frequency: 'common',
        description: 'Proposed interview time conflicts with existing meeting',
        trigger: 'Calendar API returns "busy" for proposed time',
        workflowResponse: [
            {
                id: 'step-1',
                type: 'action',
                title: 'Find Alternatives',
                description: 'Search calendar for next 3 available slots.',
                config: { slots: '3' }
            },
            {
                id: 'step-2',
                type: 'action',
                title: 'Send Options',
                description: 'Email candidate with new time options.',
                config: { template: 'reschedule_options' }
            }
        ],
        successRate: 93,
        timesEncountered: 56,
        lastSeen: '30 minutes ago'
    }
]
