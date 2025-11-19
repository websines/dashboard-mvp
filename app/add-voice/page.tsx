'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Mic, Volume2, Languages, PlayCircle, Settings, CheckCircle2, Upload, User, Sparkles, AudioWaveform, MoreHorizontal, Plus, Download, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const voiceClones = [
  {
    id: 1,
    name: 'Professional Male',
    description: 'Clear, authoritative business voice',
    language: 'English (US)',
    quality: 98,
    duration: '45s',
    status: 'active',
    type: 'Cloned',
    lastUsed: '2m ago'
  },
  {
    id: 2,
    name: 'Friendly Female',
    description: 'Warm, welcoming customer service voice',
    language: 'English (US)',
    quality: 96,
    duration: '52s',
    status: 'active',
    type: 'Cloned',
    lastUsed: '1h ago'
  },
  {
    id: 3,
    name: 'Technical Support',
    description: 'Patient, helpful technical voice',
    language: 'English (UK)',
    quality: 94,
    duration: '38s',
    status: 'training',
    type: 'Synthetic',
    lastUsed: '1d ago'
  },
]

const voiceFeatures = [
  {
    name: 'Speech-to-Text',
    description: 'Convert user speech to text for processing',
    icon: Mic,
    enabled: true,
    latency: '<100ms'
  },
  {
    name: 'Text-to-Speech',
    description: 'Generate natural voice responses',
    icon: Volume2,
    enabled: true,
    latency: '<200ms'
  },
  {
    name: 'Voice Interruption',
    description: 'Allow users to interrupt agent speech',
    icon: PlayCircle,
    enabled: false,
    latency: 'N/A'
  },
  {
    name: 'Multilingual Support',
    description: 'Automatic language detection and switching',
    icon: Languages,
    enabled: true,
    latency: '<50ms'
  },
]

export default function AddVoicePage() {
  const { sidebarCollapsed } = useDashboardStore()
  const [cloneModalOpen, setCloneModalOpen] = useState(false)
  const [voiceName, setVoiceName] = useState('')
  const [voiceDescription, setVoiceDescription] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')

  return (
    <div
      className={cn(
        'min-h-screen bg-background transition-all duration-300 ease-in-out',
        'max-lg:ml-0',
        sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
      )}
    >
      <Header
        title="Voice Engine"
        subtitle="Audio Processing"
        breadcrumbs={[{ label: 'Features', href: '/add-voice' }, { label: 'Voice' }]}
      />

      <main className="mt-14 p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Voice Capabilities</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Proprietary ASR/TTS engine • 99.2% Accuracy
            </p>
          </div>
          <Dialog open={cloneModalOpen} onOpenChange={setCloneModalOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-none h-10 px-6">
                <Mic className="w-4 h-4 mr-2" />
                Clone Voice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-none border-border bg-card">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AudioWaveform className="h-5 w-5 text-foreground" />
                  Clone New Voice
                </DialogTitle>
                <DialogDescription>
                  Upload a 30-60 second audio sample to create a perfect voice clone
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="voice-name">Voice Name</Label>
                  <Input
                    id="voice-name"
                    placeholder="e.g., Professional Male"
                    value={voiceName}
                    onChange={(e) => setVoiceName(e.target.value)}
                    className="rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voice-description">Description</Label>
                  <Input
                    id="voice-description"
                    placeholder="e.g., Clear, authoritative business voice"
                    value={voiceDescription}
                    onChange={(e) => setVoiceDescription(e.target.value)}
                    className="rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="flex h-10 w-full rounded-none border border-border bg-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish (Spain)</option>
                    <option value="fr-FR">French (France)</option>
                    <option value="de-DE">German (Germany)</option>
                    <option value="it-IT">Italian (Italy)</option>
                    <option value="pt-BR">Portuguese (Brazil)</option>
                    <option value="ja-JP">Japanese</option>
                    <option value="ko-KR">Korean</option>
                    <option value="zh-CN">Chinese (Mandarin)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audio-file">Audio Sample</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="audio-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-none cursor-pointer bg-accent/20 hover:bg-accent/40 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">MP3, WAV, or M4A (30-60 seconds)</p>
                        </div>
                        <input id="audio-file" type="file" className="hidden" accept="audio/*" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setCloneModalOpen(false)} className="rounded-none">
                  Cancel
                </Button>
                <Button onClick={() => setCloneModalOpen(false)} className="rounded-none">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Cloning
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">ASR Accuracy</p>
                <h3 className="text-2xl font-bold mt-1">99.2%</h3>
              </div>
              <Mic className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-emerald-500 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> High Fidelity
            </p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">TTS Latency</p>
                <h3 className="text-2xl font-bold mt-1">12ms</h3>
              </div>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-emerald-500 font-mono">Real-time capable</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Voice Clones</p>
                <h3 className="text-2xl font-bold mt-1">{voiceClones.length}</h3>
              </div>
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Active models</p>
          </Card>

          <Card className="border-border bg-card rounded-none p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Languages</p>
                <h3 className="text-2xl font-bold mt-1">40+</h3>
              </div>
              <Languages className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">Auto-detect enabled</p>
          </Card>
        </div>

        {/* Voice Clones Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">Voice Models</h2>
          </div>

          <Card className="border-border bg-card rounded-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30 border-b border-border text-xs uppercase font-mono text-muted-foreground">
                  <tr>
                    <th className="p-4 font-medium w-[300px]">Voice Name</th>
                    <th className="p-4 font-medium">Language</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Quality Score</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {voiceClones.map((clone) => (
                    <tr key={clone.id} className="group hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <AudioWaveform className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground block">{clone.name}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">{clone.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-wider font-mono">
                          {clone.language}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-mono text-muted-foreground">{clone.type}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${clone.quality}%` }} />
                          </div>
                          <span className="text-xs font-mono">{clone.quality}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            clone.status === 'active' ? "bg-emerald-500" : "bg-yellow-500"
                          )} />
                          <span className="text-xs capitalize text-muted-foreground">{clone.status}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" className="rounded-none h-8 w-8 p-0">
                            <PlayCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-none h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border bg-card rounded-none p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-foreground" />
              <h3 className="font-bold text-lg">Engine Configuration</h3>
            </div>
            <div className="space-y-4">
              {voiceFeatures.map((feature) => (
                <div key={feature.name} className="flex items-center justify-between p-3 border border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{feature.name}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={feature.enabled ? 'default' : 'secondary'} className="rounded-none text-[10px] uppercase tracking-wider mb-1">
                      {feature.enabled ? 'On' : 'Off'}
                    </Badge>
                    <p className="text-[10px] font-mono text-muted-foreground">{feature.latency}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-border bg-card rounded-none p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-foreground" />
              <h3 className="font-bold text-lg">Cloning Pipeline</h3>
            </div>
            <div className="relative pl-4 border-l border-border space-y-8">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-foreground" />
                <h4 className="text-sm font-bold">Upload Sample</h4>
                <p className="text-xs text-muted-foreground mt-1">Provide 30-60s of clear audio data</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-muted-foreground" />
                <h4 className="text-sm font-bold text-muted-foreground">Feature Extraction</h4>
                <p className="text-xs text-muted-foreground mt-1">Analyze pitch, tone, and prosody</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-muted-foreground" />
                <h4 className="text-sm font-bold text-muted-foreground">Model Training</h4>
                <p className="text-xs text-muted-foreground mt-1">Fine-tune base model (2-5 mins)</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-muted-foreground" />
                <h4 className="text-sm font-bold text-muted-foreground">Deployment</h4>
                <p className="text-xs text-muted-foreground mt-1">Available via API and Dashboard</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
