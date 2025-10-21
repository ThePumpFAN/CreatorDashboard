"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Allocation {
  id: string
  name: string
  wallet: string
  percentage: number
}

interface AllocationManagerProps {
  supportDeveloper: boolean
}

export function AllocationManager({ supportDeveloper }: AllocationManagerProps) {
  const { toast } = useToast()
  const [allocations, setAllocations] = useState<Allocation[]>([
    { id: "1", name: "Marketing", wallet: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK", percentage: 30 },
    { id: "2", name: "Buyback", wallet: "EYw9jDUgxHOSKihnGdbYwWNEWGCX7ZLVnH6DNSKK", percentage: 25 },
    { id: "3", name: "Team", wallet: "FZx0kEVhyIOTLjinHebZxXOFWHCY8ZMWoI7ENSKK", percentage: 25 },
    { id: "4", name: "Airdrops", wallet: "GAxykFWizJPUMkjoIecaxYPGXIZNXpJ8FNSKK", percentage: 20 },
  ])

  const totalPercentage = allocations.reduce((sum, a) => sum + a.percentage, 0)
  const effectiveTotal = supportDeveloper ? totalPercentage + 1 : totalPercentage
  const isValid = effectiveTotal === 100

  const addAllocation = () => {
    const newAllocation: Allocation = {
      id: Date.now().toString(),
      name: "New Allocation",
      wallet: "",
      percentage: 0,
    }
    setAllocations([...allocations, newAllocation])
  }

  const removeAllocation = (id: string) => {
    setAllocations(allocations.filter((a) => a.id !== id))
  }

  const updateAllocation = (id: string, field: keyof Allocation, value: string | number) => {
    setAllocations(allocations.map((a) => (a.id === id ? { ...a, [field]: value } : a)))
  }

  const saveAllocations = () => {
    if (!isValid) {
      toast({
        title: "Invalid Allocations",
        description: "Total percentage must equal 100%",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Allocations Saved",
      description: "Your distribution settings have been updated",
    })
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Distribution Summary</h3>
            <p className="text-sm text-muted-foreground">Configure how collected fees are distributed</p>
          </div>
          <Badge variant={isValid ? "default" : "destructive"} className="text-lg px-4 py-2">
            {effectiveTotal}%
          </Badge>
        </div>

        {!isValid && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-destructive mb-1">Invalid Configuration</p>
              <p className="text-muted-foreground">
                Total allocation must equal 100%. Current total: {effectiveTotal}%
                {supportDeveloper && " (including 1% developer support)"}
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Developer Support Allocation */}
      {supportDeveloper && (
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="text-base font-semibold">Developer Support</Label>
              <p className="text-sm text-muted-foreground mt-1 font-mono text-xs">
                6VoHKxBzmmGZPXHnAstpDdpvokog1gn7wcuC4zd8w72Q
              </p>
            </div>
            <Badge variant="outline" className="text-primary border-primary/30 text-lg px-4 py-2">
              1%
            </Badge>
          </div>
        </Card>
      )}

      {/* Allocations List */}
      <div className="space-y-4">
        {allocations.map((allocation) => (
          <Card key={allocation.id} className="p-6 bg-card border-border">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${allocation.id}`}>Name</Label>
                      <Input
                        id={`name-${allocation.id}`}
                        value={allocation.name}
                        onChange={(e) => updateAllocation(allocation.id, "name", e.target.value)}
                        placeholder="e.g., Marketing"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`percentage-${allocation.id}`}>Percentage</Label>
                      <Input
                        id={`percentage-${allocation.id}`}
                        type="number"
                        value={allocation.percentage}
                        onChange={(e) =>
                          updateAllocation(allocation.id, "percentage", Number.parseFloat(e.target.value) || 0)
                        }
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`wallet-${allocation.id}`}>Wallet Address</Label>
                    <Input
                      id={`wallet-${allocation.id}`}
                      value={allocation.wallet}
                      onChange={(e) => updateAllocation(allocation.id, "wallet", e.target.value)}
                      placeholder="Solana wallet address"
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAllocation(allocation.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={addAllocation} variant="outline" className="gap-2 bg-transparent">
          <Plus className="w-4 h-4" />
          Add Allocation
        </Button>
        <Button onClick={saveAllocations} className="gap-2" disabled={!isValid}>
          Save Allocations
        </Button>
      </div>
    </div>
  )
}
