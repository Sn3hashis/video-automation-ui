"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  TwitterIcon as TikTok,
  Plus,
  Settings,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  RefreshCw,
  ExternalLink,
  Users,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    case "syncing":
      return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "connected":
      return (
        <Badge className="glass-badge border-0 bg-green-500/20 text-green-600 border-green-500/30">Connected</Badge>
      )
    case "error":
      return <Badge className="glass-badge border-0 bg-red-500/20 text-red-600 border-red-500/30">Error</Badge>
    case "syncing":
      return (
        <Badge className="glass-badge border-0 bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Syncing</Badge>
      )
    default:
      return <Badge className="glass-badge border-0 bg-gray-500/20 text-gray-600 border-gray-500/30">Unknown</Badge>
  }
}

export function AccountManagement() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null)

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true)
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/accounts', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch accounts')
        const data = await res.json()
        setAccounts(data)
      } catch (e) {
        setAccounts([])
      }
      setLoading(false)
    }
    fetchAccounts()
  }, [])

  const handleDisconnect = (accountId: number) => {
    console.log("Disconnecting account:", accountId)
    // Handle disconnect logic here
  }

  const handleReconnect = (accountId: number) => {
    console.log("Reconnecting account:", accountId)
    // Handle reconnect logic here
  }

  const handleSync = (accountId: number) => {
    console.log("Syncing account:", accountId)
    // Handle sync logic here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Account Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage your connected social media accounts and their settings.</p>
        </div>
        <Button asChild className="glass-hover-lift">
          <Link href="/accounts/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl glass-effect">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  361K
                </p>
                <p className="text-sm text-muted-foreground">Total Followers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl glass-effect">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  2.4M
                </p>
                <p className="text-sm text-muted-foreground">Total Reach</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl glass-effect">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  5.2%
                </p>
                <p className="text-sm text-muted-foreground">Avg Engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl glass-effect">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  2,963
                </p>
                <p className="text-sm text-muted-foreground">Total Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connected Accounts */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Connected Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Accounts List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-muted-foreground py-12">Loading accounts...</div>
            ) : accounts.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-12">No connected accounts found.</div>
            ) : (
              accounts.map((account, idx) => (
                <Card key={account.id || idx} className="glass-card border-0">
                  <CardHeader className="flex flex-row items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      {/* Use platform icon if available, fallback to generic */}
                      {account.platform === 'Instagram' && <Instagram className="h-6 w-6 text-pink-600" />}
                      {account.platform === 'Facebook' && <Facebook className="h-6 w-6 text-blue-600" />}
                      {account.platform === 'YouTube' && <Youtube className="h-6 w-6 text-red-600" />}
                      {/* ...add more as needed... */}
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {account.username || account.page_name || account.channel_id || account.platform}
                        </CardTitle>
                        <div className="text-xs text-muted-foreground">{account.platform}</div>
                      </div>
                    </div>
                    <div>{getStatusIcon(account.status || 'connected')}</div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex gap-2 items-center">
                          {getStatusBadge(account.status || 'connected')}
                          <span className="text-xs text-muted-foreground">{account.lastSync || ''}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleSync(account.id)}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Sync
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReconnect(account.id)}>
                            <Settings className="mr-2 h-4 w-4" /> Reconnect
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/accounts/${account.id}/edit`}>
                              <ExternalLink className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Disconnect
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Disconnect Account</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to disconnect this account? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDisconnect(account.id)}>
                                  Disconnect
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Followers: {account.followers || '-'}</span>
                      <span>Engagement: {account.engagement || '-'}</span>
                      <span>Posts: {account.posts || '-'}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
