"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Wallet, Activity, Clock } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      label: "Total Collected",
      value: "12.45 SOL",
      change: "+23.5%",
      icon: Wallet,
      trend: "up",
    },
    {
      label: "Total Distributed",
      value: "11.89 SOL",
      change: "+18.2%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      label: "Active Cycles",
      value: "1,247",
      change: "24/7",
      icon: Activity,
      trend: "neutral",
    },
    {
      label: "Next Cycle",
      value: "42s",
      change: "Every 1min",
      icon: Clock,
      trend: "neutral",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-6 bg-card border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              {stat.trend !== "neutral" && <span className="text-xs text-primary font-medium">{stat.change}</span>}
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              {stat.trend === "neutral" && <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
