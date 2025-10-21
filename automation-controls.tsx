"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCw, Settings2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AutomationControlsProps {
  supportDeveloper: boolean
}

export function AutomationControls({ supportDeveloper }: AutomationControlsProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [cycleInterval, setCycleInterval] = useState("60")
  const [minAmount, setMinAmount] = useState("0.1")
  const { toast } = useToast()

  const toggleAutomation = () => {
    setIsRunning(!isRunning)
    toast({
      title: isRunning ? "Automation Stopped" : "Automation Started",
      description: isRunning
        ? "Fee collection cycles have been paused"
        : `Running cycles every ${cycleInterval} seconds`,
    })
  }

  const runManualCycle = () => {
    toast({
      title: "Manual Cycle Started",
      description: "Collecting and distributing fees...",
    })
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Automation Status</h3>
            <p className="text-sm text-muted-foreground">
              {isRunning ? "System is actively collecting and distributing fees" : "System is paused"}
            </p>
          </div>
          <Badge variant={isRunning ? "default" : "secondary"} className="text-sm">
            {isRunning ? "Active" : "Paused"}
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={toggleAutomation} className="flex-1 gap-2" variant={isRunning ? "destructive" : "default"}>
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Stop Automation
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Automation
              </>
            )}
          </Button>
          <Button
            onClick={runManualCycle}
            variant="outline"
            className="flex-1 gap-2 bg-transparent"
            disabled={isRunning}
          >
            <RotateCw className="w-4 h-4" />
            Run Manual Cycle
          </Button>
        </div>
      </Card>

      {/* Configuration Card */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 mb-6">
          <Settings2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Automation Settings</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cycle-interval">Cycle Interval (seconds)</Label>
            <Input
              id="cycle-interval"
              type="number"
              value={cycleInterval}
              onChange={(e) => setCycleInterval(e.target.value)}
              placeholder="60"
              min="10"
              disabled={isRunning}
            />
            <p className="text-xs text-muted-foreground">How often to check and distribute fees (minimum 10 seconds)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="min-amount">Minimum Collection Amount (SOL)</Label>
            <Input
              id="min-amount"
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="0.1"
              step="0.01"
              min="0"
              disabled={isRunning}
            />
            <p className="text-xs text-muted-foreground">Only collect and distribute when fees exceed this amount</p>
          </div>

          {supportDeveloper && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground">
                <span className="font-semibold text-primary">Thank you!</span> 1% of collected fees will be sent to
                support development.
              </p>
            </div>
          )}

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <h4 className="text-sm font-semibold mb-2">Backend Automation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For true 24/7 automation without keeping your browser open, deploy the backend relayer service. It will
              use your private key (stored securely in environment variables) to sign transactions automatically.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
