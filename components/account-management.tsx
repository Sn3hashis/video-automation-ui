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
import EditAccountDialog from "@/components/edit-account-dialog"

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

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return Instagram
    case "facebook":
      return Facebook
    case "youtube":
      return Youtube
    case "twitter":
      return Twitter
    case "linkedin":
      return Linkedin
    case "tiktok":
      return TikTok
    default:
      return Instagram
  }
}

const getPlatformColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return {
        color: "from-pink-500 to-rose-500",
        bgColor: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
      }
    case "facebook":
      return {
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
      }
    case "youtube":
      return {
        color: "from-red-500 to-red-600",
        bgColor: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20",
      }
    case "twitter":
      return {
        color: "from-sky-400 to-sky-500",
        bgColor: "bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/20 dark:to-sky-900/20",
      }
    case "linkedin":
      return {
        color: "from-blue-600 to-blue-700",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
      }
    case "tiktok":
      return {
        color: "from-gray-800 to-gray-900",
        bgColor: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20",
      }
    default:
      return {
        color: "from-gray-500 to-gray-600",
        bgColor: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20",
      }
  }
}

export function AccountManagement() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editAccountId, setEditAccountId] = useState<string | null>(null)

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true)
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/accounts/", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch accounts")
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

  const handleEdit = (id: string) => {
    setEditAccountId(id)
    setEditDialogOpen(true)
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-muted-foreground py-12">Loading accounts...</div>
            ) : accounts.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-12">No connected accounts found.</div>
            ) : (
              accounts.map((account, index) => {
                const PlatformIcon = getPlatformIcon(account.platform)
                const platformColors = getPlatformColor(account.platform)

                return (
                  <div
                    key={account.id || index}
                    className={`relative overflow-hidden rounded-2xl glass-effect apple-ease hover:glass-hover-lift ${platformColors.bgColor}`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-xl bg-gradient-to-r ${platformColors.color} text-white shadow-lg`}
                          >
                            <PlatformIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">
                              {account.platform === "Instagram"
                                ? `@${account.username || account.page_name || account.channel_id || "username"}`
                                : account.platform}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {account.platform === "Instagram"
                                ? account.platform
                                : account.username || account.page_name || account.channel_id || account.platform}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 glass-button border-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-dropdown border-0">
                            <DropdownMenuItem onClick={() => handleSync(account.id)} className="apple-ease">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Sync Now
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(account.id)} className="apple-ease">
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="apple-ease">
                              <Link href={`/accounts/${account.id}/edit`}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            {account.status === "error" ? (
                              <DropdownMenuItem onClick={() => handleReconnect(account.id)} className="apple-ease">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reconnect
                              </DropdownMenuItem>
                            ) : (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    className="text-red-600 focus:text-red-600 apple-ease"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Disconnect
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="glass-modal border-0">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Disconnect Account</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to disconnect your {account.platform} account? This will
                                      stop all automated posting to this platform.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="glass-button border-0">Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDisconnect(account.id)}
                                      className="glass-button border-0 bg-red-500 text-white hover:bg-red-600"
                                    >
                                      Disconnect
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Status</span>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(account.status || "connected")}
                            {getStatusBadge(account.status || "connected")}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="glass-effect rounded-lg p-3 border-0">
                            <p className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                              {account.followers || "-"}
                            </p>
                            <p className="text-xs text-muted-foreground">Followers</p>
                          </div>
                          <div className="glass-effect rounded-lg p-3 border-0">
                            <p className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                              {account.posts || "-"}
                            </p>
                            <p className="text-xs text-muted-foreground">Posts</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Engagement Rate</span>
                            <span className="font-medium">{account.engagement || "0%"}</span>
                          </div>
                          <Progress
                            value={Number.parseFloat(account.engagement?.replace("%", "") || "0")}
                            className="h-2"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">Last sync: {account.lastSync || "Never"}</div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
      <EditAccountDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        accountId={editAccountId}
        onSave={() => {
          // Optionally refresh accounts list here
          setEditDialogOpen(false)
        }}
      />
    </div>
  )
}
export default AccountManagement