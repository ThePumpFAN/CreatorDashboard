"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Wallet, ChevronDown, Copy, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletConnectProps {
  isConnected: boolean
  walletAddress: string
  onConnect: (address: string) => void
  onDisconnect: () => void
}

export function WalletConnect({ isConnected, walletAddress, onConnect, onDisconnect }: WalletConnectProps) {
  const { toast } = useToast()
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK"
      onConnect(mockAddress)
      setIsConnecting(false)
      toast({
        title: "Wallet Connected",
        description: `Connected to ${walletType}`,
      })
    }, 1000)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  if (!isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2" disabled={isConnecting}>
            <Wallet className="w-4 h-4" />
            {isConnecting ? "Connecting..." : "Connect Wallet"}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => connectWallet("Phantom")}>Phantom</DropdownMenuItem>
          <DropdownMenuItem onClick={() => connectWallet("Backpack")}>Backpack</DropdownMenuItem>
          <DropdownMenuItem onClick={() => connectWallet("Solflare")}>Solflare</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 font-mono bg-transparent">
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">
            {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
          </span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDisconnect} className="text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
