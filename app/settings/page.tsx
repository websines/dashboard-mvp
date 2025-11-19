'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Settings, Bell, Shield, Zap, Database, Users, Save, Terminal, AlertTriangle, CheckCircle2 } from 'lucide-react'

const settingsSections = [
  {
    icon: Zap,
    title: 'Workflow Engine',
    description: 'Configure autonomous behavior and execution parameters',
    settings: [
      { label: 'Auto-evolution enabled', value: true, type: 'toggle', description: 'Allow Supervisor to self-modify' },
      { label: 'Max concurrent tasks', value: '10', type: 'input', description: 'Hard limit on parallel executions' },
      { label: 'Task timeout', value: '30s', type: 'input', description: 'Maximum duration before kill signal' },
      { label: 'Retry failed tasks', value: true, type: 'toggle', description: 'Auto-retry with exponential backoff' },
    ],
  },
  {
    icon: Users,
    title: 'Agent Swarm',
    description: 'Resource allocation and agent lifecycle management',
    settings: [
      { label: 'Max worker agents', value: '5', type: 'input', description: 'Maximum number of active workers' },
      { label: 'Agent timeout', value: '60s', type: 'input', description: 'Idle time before agent shutdown' },
      { label: 'Enable agent pooling', value: true, type: 'toggle', description: 'Reuse initialized agents' },
      { label: 'Log agent activity', value: true, type: 'toggle', description: 'Verbose logging of all actions' },
    ],
  },
  {
    icon: Database,
    title: 'Data Persistence',
    description: 'Storage retention policies and backup configuration',
    settings: [
      { label: 'Store execution traces', value: true, type: 'toggle', description: 'Keep full trace of every run' },
      { label: 'Retention period', value: '90 days', type: 'input', description: 'Time before auto-deletion' },
      { label: 'Export format', value: 'JSON', type: 'select', options: ['JSON', 'CSV', 'Parquet'], description: 'Default export format' },
      { label: 'Backup frequency', value: 'Daily', type: 'select', options: ['Hourly', 'Daily', 'Weekly'], description: 'Snapshot interval' },
    ],
  },
  {
    icon: Bell,
    title: 'System Alerts',
    description: 'Notification thresholds and channels',
    settings: [
      { label: 'Evolution completed', value: true, type: 'toggle', description: 'Notify on successful self-update' },
      { label: 'Task failures', value: true, type: 'toggle', description: 'Alert on critical failures' },
      { label: 'Performance alerts', value: true, type: 'toggle', description: 'Warn on high latency' },
      { label: 'Weekly reports', value: false, type: 'toggle', description: 'Email summary of system health' },
    ],
  },
  {
    icon: Shield,
    title: 'Security Protocols',
    description: 'Access control and compliance enforcement',
    settings: [
      { label: 'Enable audit logs', value: true, type: 'toggle', description: 'Immutable log of all changes' },
      { label: 'Require approval for deploys', value: true, type: 'toggle', description: 'Manual gate for production' },
      { label: 'Data encryption', value: 'AES-256', type: 'select', options: ['AES-256', 'ChaCha20'], description: 'At-rest encryption standard' },
      { label: 'Session timeout', value: '24h', type: 'input', description: 'Force re-authentication' },
    ],
  },
]

export default function SettingsPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="System Configuration"
        subtitle="Platform Control Plane"
        showDeployButton={false}
        breadcrumbs={[{ label: 'System', href: '/evolution' }, { label: 'Settings' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Configuration</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Global settings for the autonomous agent system
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-none h-8 gap-2 font-mono text-xs">
              <Terminal className="w-3 h-3" />
              Export Config
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {settingsSections.map((section) => (
            <Card key={section.title} className="border-border bg-card rounded-none flex flex-col">
              <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-3">
                <div className="p-2 bg-background border border-border">
                  <section.icon className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{section.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{section.description}</p>
                </div>
              </div>
              <div className="p-6 space-y-6 flex-1">
                {section.settings.map((setting, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {setting.label}
                      </label>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {setting.description}
                      </p>
                    </div>
                    <div className="flex items-center h-8">
                      {setting.type === 'toggle' && (
                        <Switch checked={setting.value as boolean} className="data-[state=checked]:bg-emerald-500" />
                      )}
                      {setting.type === 'input' && (
                        <Input
                          className="h-8 w-32 rounded-none font-mono text-xs bg-background"
                          defaultValue={setting.value as string}
                        />
                      )}
                      {setting.type === 'select' && (
                        <Select defaultValue={setting.value as string}>
                          <SelectTrigger className="h-8 w-32 rounded-none font-mono text-xs bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            {(setting.options || []).map((opt) => (
                              <SelectItem key={opt} value={opt} className="rounded-none font-mono text-xs">
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Save Bar */}
        <div className="fixed bottom-0 right-0 left-0 lg:left-64 p-4 bg-background/80 backdrop-blur-sm border-t border-border flex items-center justify-between z-40 transition-all duration-300"
          style={{ left: sidebarCollapsed ? '70px' : '256px' }}>
          <div className="flex items-center gap-2 text-amber-500">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider">Unsaved Changes</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="rounded-none h-8 text-muted-foreground hover:text-foreground">
              Reset to Defaults
            </Button>
            <Button size="sm" className="rounded-none h-8 gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold">
              <Save className="w-3 h-3" />
              Save Configuration
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
