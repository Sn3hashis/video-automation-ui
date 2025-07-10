"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Upload,
  Users,
  Eye,
  Heart,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react"

// Sample data for charts
const uploadTrendsData = [
  { month: "Jan", uploads: 45, views: 12, engagement: 850 },
  { month: "Feb", uploads: 52, views: 15, engagement: 1200 },
  { month: "Mar", uploads: 48, views: 18, engagement: 1450 },
  { month: "Apr", uploads: 61, views: 22, engagement: 1800 },
  { month: "May", uploads: 55, views: 25, engagement: 2100 },
  { month: "Jun", uploads: 67, views: 28, engagement: 2400 },
]

const platformDistributionData = [
  { name: "Instagram", value: 35, color: "#E1306C", uploads: 156 },
  { name: "Facebook", value: 25, color: "#1877F2", uploads: 112 },
  { name: "YouTube", value: 20, color: "#FF0000", uploads: 89 },
  { name: "TikTok", value: 15, color: "#000000", uploads: 67 },
  { name: "Twitter", value: 5, color: "#1DA1F2", uploads: 23 },
]

const recentUploads = [
  {
    id: 1,
    title: "Summer Campaign Video",
    platform: "Instagram",
    status: "published",
    views: "12.5K",
    engagement: "4.2%",
    uploadedAt: "2 hours ago",
    thumbnail: "/placeholder.svg?height=60&width=60",
    icon: Instagram,
    color: "text-pink-600",
  },
  {
    id: 2,
    title: "Product Launch Teaser",
    platform: "YouTube",
    status: "processing",
    views: "8.9K",
    engagement: "6.1%",
    uploadedAt: "4 hours ago",
    thumbnail: "/placeholder.svg?height=60&width=60",
    icon: Youtube,
    color: "text-red-600",
  },
  {
    id: 3,
    title: "Behind the Scenes",
    platform: "Facebook",
    status: "published",
    views: "15.2K",
    engagement: "3.8%",
    uploadedAt: "6 hours ago",
    thumbnail: "/placeholder.svg?height=60&width=60",
    icon: Facebook,
    color: "text-blue-600",
  },
  {
    id: 4,
    title: "Quick Tips Tutorial",
    platform: "TikTok",
    status: "scheduled",
    views: "0",
    engagement: "0%",
    uploadedAt: "Scheduled for tomorrow",
    thumbnail: "/placeholder.svg?height=60&width=60",
    icon: Twitter,
    color: "text-gray-800",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "published":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "processing":
      return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />
    case "scheduled":
      return <Calendar className="h-4 w-4 text-blue-500" />
    case "failed":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "published":
      return (
        <Badge className="glass-badge border-0 bg-green-500/20 text-green-600 border-green-500/30">Published</Badge>
      )
    case "processing":
      return (
        <Badge className="glass-badge border-0 bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Processing</Badge>
      )
    case "scheduled":
      return <Badge className="glass-badge border-0 bg-blue-500/20 text-blue-600 border-blue-500/30">Scheduled</Badge>
    case "failed":
      return <Badge className="glass-badge border-0 bg-red-500/20 text-red-600 border-red-500/30">Failed</Badge>
    default:
      return <Badge className="glass-badge border-0 bg-gray-500/20 text-gray-600 border-gray-500/30">Unknown</Badge>
  }
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dropdown border-0 p-3 rounded-xl shadow-glass-lg">
        <p className="font-medium text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.dataKey}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6M")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your content.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 glass-effect rounded-xl p-1">
            {["1M", "3M", "6M", "1Y"].map((range) => (
              <Button
                key={range}
                variant={selectedTimeRange === range ? "default" : "ghost"}
                size="sm"
                className={`h-8 px-3 text-xs ${
                  selectedTimeRange === range ? "gradient-primary text-white" : "glass-button border-0"
                }`}
                onClick={() => setSelectedTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
          <Button className="glass-hover-lift" onClick={() => window.location.href = '/upload'}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Content
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-0 shimmer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Uploads</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    447
                  </p>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-xs font-medium">+12%</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl glass-effect">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shimmer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    2.4M
                  </p>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-xs font-medium">+18%</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl glass-effect">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shimmer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    5.2%
                  </p>
                  <div className="flex items-center gap-1 text-red-600">
                    <ArrowDownRight className="h-4 w-4" />
                    <span className="text-xs font-medium">-2%</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl glass-effect">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shimmer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Accounts</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    6
                  </p>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-xs font-medium">+1</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl glass-effect">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Trends Chart */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Upload Trends
              </CardTitle>
              <Button variant="ghost" size="icon" className="glass-button border-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uploadTrendsData}>
                  <defs>
                    <linearGradient id="uploadsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="uploads"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#uploadsGradient)"
                    strokeWidth={2}
                    name="Uploads"
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--chart-2))"
                    fillOpacity={1}
                    fill="url(#viewsGradient)"
                    strokeWidth={2}
                    name="Views (K)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Distribution Chart */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Platform Distribution
              </CardTitle>
              <Button variant="ghost" size="icon" className="glass-button border-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {platformDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3 ml-6">
                {platformDistributionData.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                      <span className="text-sm font-medium">{platform.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{platform.value}%</p>
                      <p className="text-xs text-muted-foreground">{platform.uploads} uploads</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Uploads */}
      <Card className="glass-card border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Recent Uploads
            </CardTitle>
            <Button variant="outline" size="sm" className="glass-button border-0 bg-transparent">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center gap-4 p-4 glass-effect rounded-xl apple-ease hover:glass-hover-lift"
              >
                <div className="relative">
                  <img
                    src={upload.thumbnail || "/placeholder.svg"}
                    alt={upload.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full glass-effect">
                    <upload.icon className={`h-3 w-3 ${upload.color}`} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm truncate">{upload.title}</h3>
                    {getStatusBadge(upload.status)}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{upload.platform}</span>
                    <span>•</span>
                    <span>{upload.views} views</span>
                    <span>•</span>
                    <span>{upload.engagement} engagement</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(upload.status)}
                    <span className="text-xs text-muted-foreground">{upload.uploadedAt}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 glass-button border-0">
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2 glass-hover-lift">
              <Upload className="h-6 w-6" />
              <span>Upload Content</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 glass-button border-0 glass-hover-lift bg-transparent"
            >
              <Users className="h-6 w-6" />
              <span>Manage Accounts</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 glass-button border-0 glass-hover-lift bg-transparent"
            >
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
