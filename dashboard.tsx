"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { WalletConnect } from "@/components/wallet-connect"
import { AllocationManager } from "@/components/allocation-manager"
import { TransactionLog } from "@/components/transaction-log"
import { AutomationControls } from "@/components/automation-controls"
import { StatsOverview } from "@/components/stats-overview"
import { Activity, Zap, Settings, History } from "lucide-react"

export function Dashboard() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [supportDeveloper, setSupportDeveloper] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PumpFun Creator</h1>
                <p className="text-xs text-muted-foreground">Automated Fee Distribution</p>
              </div>
            </div>
            <WalletConnect
              isConnected={isConnected}
              walletAddress={walletAddress}
              onConnect={(address) => {
                setIsConnected(true)
                setWalletAddress(address)
              }}
              onDisconnect={() => {
                setIsConnected(false)
                setWalletAddress("")
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground">
                Connect your Solana wallet to start automating your token creator fee collection and distribution
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Overview */}
            <StatsOverview />

            {/* Support Developer Toggle */}
            <Card className="p-6 border-primary/20 bg-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="support-dev" className="text-base font-semibold">
                      Support Developer (Optional)
                    </Label>
                    <Badge variant="outline" className="text-primary border-primary/30">
                      1%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable to contribute 1% of collected fees to support the development of this tool. This is
                    completely optional and can be toggled at any time.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                    Developer Wallet: 6VoHKxBzmmGZPXHnAstpDdpvokog1gn7wcuC4zd8w72Q
                  </p>
                </div>
                <Switch id="support-dev" checked={supportDeveloper} onCheckedChange={setSupportDeveloper} />
              </div>
            </Card>

            {/* Main Tabs */}
            <Tabs defaultValue="automation" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto">
                <TabsTrigger value="automation" className="gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">Automation</span>
                </TabsTrigger>
                <TabsTrigger value="allocations" className="gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Allocations</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline">History</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="automation" className="space-y-6">
                <AutomationControls supportDeveloper={supportDeveloper} />
              </TabsContent>

              <TabsContent value="allocations" className="space-y-6">
                <AllocationManager supportDeveloper={supportDeveloper} />
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <TransactionLog />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  )
}
