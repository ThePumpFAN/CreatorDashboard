"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface Transaction {
  id: string
  type: "collection" | "distribution"
  amount: string
  timestamp: string
  signature: string
  status: "success" | "pending" | "failed"
}

export function TransactionLog() {
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "collection",
      amount: "0.45 SOL",
      timestamp: "2 minutes ago",
      signature: "5KJh7...9mNp",
      status: "success",
    },
    {
      id: "2",
      type: "distribution",
      amount: "0.44 SOL",
      timestamp: "2 minutes ago",
      signature: "3Hg9k...7xQw",
      status: "success",
    },
    {
      id: "3",
      type: "collection",
      amount: "0.38 SOL",
      timestamp: "1 hour ago",
      signature: "8Nm2p...4rTy",
      status: "success",
    },
    {
      id: "4",
      type: "distribution",
      amount: "0.37 SOL",
      timestamp: "1 hour ago",
      signature: "2Lk5m...8vBn",
      status: "success",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Transaction History</h3>
            <p className="text-sm text-muted-foreground">Recent fee collections and distributions</p>
          </div>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "collection" ? "bg-primary/10 text-primary" : "bg-chart-2/10 text-chart-2"
                  }`}
                >
                  {tx.type === "collection" ? (
                    <ArrowDownRight className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">
                      {tx.type === "collection" ? "Fee Collection" : "Distribution"}
                    </p>
                    <Badge variant={tx.status === "success" ? "default" : "secondary"} className="text-xs">
                      {tx.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{tx.timestamp}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="font-mono text-xs hidden sm:inline">{tx.signature}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold text-foreground text-right">{tx.amount}</p>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
