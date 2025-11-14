'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Activity, TrendingUp, DollarSign, Zap } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  const { sidebarCollapsed, workflowVersions, activeWorkflows, successRate, costSaved } = useDashboardStore()

  const metrics = [
    {
      title: 'Active Workflows',
      value: activeWorkflows,
      icon: Activity,
      trend: '+12% from last month',
      color: 'text-primary',
    },
    {
      title: 'Success Rate',
      value: `${successRate}%`,
      icon: TrendingUp,
      trend: '+2.4% improvement',
      color: 'text-primary',
    },
    {
      title: 'Cost Saved',
      value: `$${(costSaved / 1000).toFixed(0)}K`,
      icon: DollarSign,
      trend: 'This quarter',
      color: 'text-primary',
    },
    {
      title: 'Self-Evolutions',
      value: workflowVersions.length,
      icon: Zap,
      trend: 'Automatic improvements',
      color: 'text-primary',
    },
  ]

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      )}
    >
      <Header title="GoNova AI Platform" subtitle="Self-Evolving" showDeployButton={false} />

      <main className="mt-14 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
        {/* Metrics Grid */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {metrics.map((metric, index) => (
            <motion.div key={metric.title} variants={item}>
              <Card className="border border-border bg-card hover:border-border/80 transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    className="rounded bg-secondary p-2"
                  >
                    <metric.icon className={cn('h-4 w-4', metric.color)} />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {metric.value}
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.trend}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Workflow Evolution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="mt-6 border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-serif font-medium">Workflow Evolution</CardTitle>
            <CardDescription>
              Automatic accuracy improvements over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={workflowVersions}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 12%)" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(0 0% 55%)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="hsl(0 0% 55%)"
                  style={{ fontSize: '12px' }}
                  domain={[0, 100]}
                  label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', style: { fill: 'hsl(0 0% 55%)' } }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0 0% 6%)',
                    border: '1px solid hsl(0 0% 12%)',
                    borderRadius: '0.375rem',
                    color: 'hsl(0 0% 98%)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="hsl(180 85% 55%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(180 85% 55%)', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        </motion.div>

        {/* Evolution Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="mt-6 border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-serif font-medium">Self-Evolution Timeline</CardTitle>
            <CardDescription>
              System automatically improved workflow accuracy from 60% to 95%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowVersions.map((version, index) => (
                <div key={version.version} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 border-2 border-primary">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1 space-y-1 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="text-sm font-semibold">
                        {version.version} - {version.accuracy}% Accuracy
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {version.date}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {index === 0 && 'Initial deployment with baseline performance'}
                      {index === 1 && 'First self-evolution cycle completed'}
                      {index === 2 && 'Major architecture optimization detected'}
                      {index === 3 && 'Target accuracy achieved through continuous learning'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </main>
    </div>
  )
}
