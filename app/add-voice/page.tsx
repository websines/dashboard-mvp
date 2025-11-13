'use client'

import { Header } from '@/components/header'
import { useDashboardStore } from '@/store/dashboard-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Mic, Volume2, Languages, Waves, PlayCircle, Settings, CheckCircle2, Upload, User, Sparkles } from 'lucide-react'
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
    duration: '45 seconds',
    status: 'active',
  },
  {
    id: 2,
    name: 'Friendly Female',
    description: 'Warm, welcoming customer service voice',
    language: 'English (US)',
    quality: 96,
    duration: '52 seconds',
    status: 'active',
  },
  {
    id: 3,
    name: 'Technical Support',
    description: 'Patient, helpful technical voice',
    language: 'English (UK)',
    quality: 94,
    duration: '38 seconds',
    status: 'training',
  },
]

const voiceFeatures = [
  {
    name: 'Speech-to-Text',
    description: 'Convert user speech to text for processing',
    icon: Mic,
    enabled: true,
  },
  {
    name: 'Text-to-Speech',
    description: 'Generate natural voice responses',
    icon: Volume2,
    enabled: true,
  },
  {
    name: 'Voice Interruption',
    description: 'Allow users to interrupt agent speech',
    icon: PlayCircle,
    enabled: false,
  },
  {
    name: 'Multilingual Support',
    description: 'Automatic language detection and switching',
    icon: Languages,
    enabled: true,
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
        'min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <Header
        title="Add Voice"
        subtitle="Voice Capabilities"
        breadcrumbs={[{ label: 'Features', href: '/add-voice' }, { label: 'Add Voice' }]}
      />

      <main className="mt-16 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-2"
              >
                Voice Capabilities
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground"
              >
                GoNova's proprietary ASR and TTS with voice cloning technology
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Dialog open={cloneModalOpen} onOpenChange={setCloneModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Clone New Voice
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="voice-description">Description</Label>
                      <Input
                        id="voice-description"
                        placeholder="e.g., Clear, authoritative business voice"
                        value={voiceDescription}
                        onChange={(e) => setVoiceDescription(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                          <label htmlFor="audio-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-accent/20 hover:bg-accent/40 transition-colors">
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
                    <Button variant="outline" onClick={() => setCloneModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      // Handle voice cloning
                      setCloneModalOpen(false)
                    }}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start Cloning
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Mic className="h-5 w-5 text-purple-500" />
                    <p className="text-sm text-muted-foreground">ASR Accuracy</p>
                  </div>
                  <p className="text-3xl font-bold">99.2%</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Volume2 className="h-5 w-5 text-blue-500" />
                    <p className="text-sm text-muted-foreground">TTS Quality</p>
                  </div>
                  <p className="text-3xl font-bold">98.5%</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="h-5 w-5 text-green-500" />
                    <p className="text-sm text-muted-foreground">Voice Clones</p>
                  </div>
                  <p className="text-3xl font-bold">{voiceClones.length}</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Languages className="h-5 w-5 text-orange-500" />
                    <p className="text-sm text-muted-foreground">Languages</p>
                  </div>
                  <p className="text-3xl font-bold">40+</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Voice Features Config */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 max-w-4xl mx-auto"
        >
          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle>Voice Features</CardTitle>
              <CardDescription>Configure voice capabilities for your agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {voiceFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-accent/20">
                      <div className="flex items-center gap-3">
                        <feature.icon className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium">{feature.name}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                      <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                        {feature.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Voice Clones */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Voice Clones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {voiceClones.map((clone, index) => (
              <motion.div
                key={clone.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50 hover:border-border hover:shadow-xl hover:shadow-black/20 transition-all duration-300 h-full cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-purple-500" />
                      </div>
                      <Badge variant={clone.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {clone.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{clone.name}</CardTitle>
                    <CardDescription className="text-sm">{clone.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Language:</span>
                        <span className="font-medium">{clone.language}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Quality:</span>
                        <span className="font-medium text-green-500">{clone.quality}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Sample:</span>
                        <span className="font-medium">{clone.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" variant="outline" size="sm">
                        <PlayCircle className="h-3 w-3 mr-1" />
                        Test
                      </Button>
                      <Button className="flex-1" size="sm">
                        Use Voice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Voice Cloning Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Voice Cloning Process
              </CardTitle>
              <CardDescription>
                Clone any voice in minutes with our proprietary technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                    <span className="text-lg font-bold text-purple-500">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Upload Sample</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide 30-60 seconds of clear audio in any language
                  </p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                    <span className="text-lg font-bold text-purple-500">2</span>
                  </div>
                  <h3 className="font-medium mb-2">AI Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Our model analyzes tone, pitch, and speech patterns
                  </p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                    <span className="text-lg font-bold text-purple-500">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Ready to Use</h3>
                  <p className="text-sm text-muted-foreground">
                    Voice clone ready in 2-5 minutes with 98%+ quality
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technology Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="border border-border/60 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                GoNova Voice Technology
              </CardTitle>
              <CardDescription>
                Industry-leading ASR and TTS capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Mic className="h-5 w-5 text-purple-500" />
                    Automatic Speech Recognition (ASR)
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>99.2% accuracy across 40+ languages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Real-time transcription with &lt;100ms latency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Noise cancellation and accent adaptation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Speaker diarization (multi-speaker)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-blue-500" />
                    Text-to-Speech (TTS) with Cloning
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Human-like voice quality (98.5% MOS score)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>30-second sample for perfect cloning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Emotion and prosody control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Streaming generation for low latency</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
