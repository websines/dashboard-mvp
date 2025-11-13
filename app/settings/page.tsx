'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Settings, Bell, Shield, Zap, Database, Users, Save } from 'lucide-react'

const settingsSections = [
  {
    icon: Zap,
    title: 'Workflow Settings',
    description: 'Configure workflow behavior and automation',
    settings: [
      { label: 'Auto-evolution enabled', value: 'On', type: 'toggle' },
      { label: 'Max concurrent tasks', value: '10', type: 'input' },
      { label: 'Task timeout', value: '30s', type: 'input' },
      { label: 'Retry failed tasks', value: 'On', type: 'toggle' },
    ],
  },
  {
    icon: Users,
    title: 'Agent Configuration',
    description: 'Manage agent behavior and resources',
    settings: [
      { label: 'Max worker agents', value: '5', type: 'input' },
      { label: 'Agent timeout', value: '60s', type: 'input' },
      { label: 'Enable agent pooling', value: 'On', type: 'toggle' },
      { label: 'Log agent activity', value: 'On', type: 'toggle' },
    ],
  },
  {
    icon: Database,
    title: 'Data & Storage',
    description: 'Configure data persistence and storage',
    settings: [
      { label: 'Store execution traces', value: 'On', type: 'toggle' },
      { label: 'Retention period', value: '90 days', type: 'input' },
      { label: 'Export format', value: 'JSON', type: 'select' },
      { label: 'Backup frequency', value: 'Daily', type: 'select' },
    ],
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Manage alerts and notifications',
    settings: [
      { label: 'Evolution completed', value: 'On', type: 'toggle' },
      { label: 'Task failures', value: 'On', type: 'toggle' },
      { label: 'Performance alerts', value: 'On', type: 'toggle' },
      { label: 'Weekly reports', value: 'Off', type: 'toggle' },
    ],
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Security settings and compliance rules',
    settings: [
      { label: 'Enable audit logs', value: 'On', type: 'toggle' },
      { label: 'Require approval for deploys', value: 'On', type: 'toggle' },
      { label: 'Data encryption', value: 'AES-256', type: 'select' },
      { label: 'Session timeout', value: '24h', type: 'input' },
    ],
  },
]

export default function SettingsPage() {
  const { sidebarCollapsed } = useDashboardStore()

  return (
    <div
      className={cn(
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Settings"
        subtitle="Platform Configuration"
        showDeployButton={false}
        breadcrumbs={[{ label: 'Settings' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Platform Settings</h1>
          <p className="text-sm text-muted-foreground">
            Configure your GoNova AI platform
          </p>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section) => (
            <Card key={section.title} className="border-border/40">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.settings.map((setting) => (
                    <div
                      key={setting.label}
                      className="flex items-center justify-between py-2 border-b border-border/40 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium">{setting.label}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {setting.type === 'toggle' && (
                          <Badge
                            variant={setting.value === 'On' ? 'default' : 'secondary'}
                            className="min-w-[3rem] justify-center"
                          >
                            {setting.value}
                          </Badge>
                        )}
                        {setting.type === 'input' && (
                          <input
                            type="text"
                            value={setting.value}
                            className="w-32 px-3 py-1 text-sm rounded-md bg-accent/50 border border-border/40 focus:outline-none focus:ring-1 focus:ring-primary"
                            readOnly
                          />
                        )}
                        {setting.type === 'select' && (
                          <select className="w-32 px-3 py-1 text-sm rounded-md bg-accent/50 border border-border/40 focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>{setting.value}</option>
                          </select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-6 flex items-center justify-between p-4 rounded-lg bg-accent/30 border border-border/40">
          <div>
            <p className="text-sm font-medium">Unsaved Changes</p>
            <p className="text-xs text-muted-foreground">
              Changes will be applied to all workflows
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm" className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
