import { create } from 'zustand'

export type WorkflowVersion = {
  version: string
  date: string
  accuracy: number
  branch: string
}

export type Task = {
  id: string
  title: string
  status: 'backlog' | 'in-progress' | 'review' | 'done'
  agent?: string
  dependencies?: string[]
}

interface DashboardState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void

  // Mock data for visualizations
  workflowVersions: WorkflowVersion[]
  tasks: Task[]
  activeWorkflows: number
  successRate: number
  costSaved: number
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Mock data
  workflowVersions: [
    { version: 'v1.0', date: 'Day 1', accuracy: 60, branch: 'main' },
    { version: 'v1.2', date: 'Day 7', accuracy: 72, branch: 'main' },
    { version: 'v2.0', date: 'Day 14', accuracy: 85, branch: 'main' },
    { version: 'v2.3', date: 'Day 30', accuracy: 95, branch: 'main' },
  ],

  tasks: [
    { id: '1', title: 'Process customer onboarding', status: 'done' },
    { id: '2', title: 'Generate compliance report', status: 'done' },
    { id: '3', title: 'Verify identity documents', status: 'in-progress', agent: 'Worker-2' },
    { id: '4', title: 'Send welcome email', status: 'review', agent: 'Worker-3' },
    { id: '5', title: 'Create user account', status: 'backlog', dependencies: ['3'] },
    { id: '6', title: 'Provision access rights', status: 'backlog', dependencies: ['5'] },
  ],

  activeWorkflows: 12,
  successRate: 94.2,
  costSaved: 127000,
}))
