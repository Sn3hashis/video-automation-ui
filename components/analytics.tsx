"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, TrendingDown, Eye, Heart, Share2, Users, Instagram, Facebook, Youtube } from "lucide-react"

const keyMetrics = [
  { title: "Total Views", value: "2.4M", change: "+12.5%", trend: "up", icon: Eye },
  { title: "Engagement Rate", value: "8.2%", change: "+2.1%", trend: "up", icon: Heart },
  { title: "Reach", value: "890K", change: "-3.2%", trend: "down", icon: Users },
  { title: "Shares", value: "45.2K", change: "+18.7%", trend: "up", icon: Share2 },
]

const performanceData = [
  { date: "2024-01-01", views: 45000, engagement: 3200, reach: 38000 },
  { date: "2024-01-02", views: 52000, engagement: 4100, reach: 42000 },
  { date: "2024-01-03", views: 48000, engagement: 3800, reach: 40000 },
  { date: "2024-01-04", views: 65000, engagement: 5200, reach: 55000 },
  { date: "2024-01-05", views: 58000, engagement: 4600, reach: 48000 },
  { date: "2024-01-06", views: 72000, engagement: 6100, reach: 62000 },
  { date: "2024-01-07", views: 68000, engagement: 5800, reach: 58000 },
]

const platformData = [
  { name: "Instagram", views: 1200000, engagement: 98000, color: "#E4405F" },
  { name: "Facebook", views: 800000, engagement: 52000, color: "#1877F2" },
  { name: "YouTube", value: 400000, engagement: 28000, color: "#FF0000" },
]

const topContent = [
  {
    id: 1,
    title: "Summer Campaign Launch",
    thumbnail: "/placeholder.svg?height=40&width=40",
    platform: "Instagram",
    views: 125000,
    engagement: 12500,
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Behind the Scenes",
    thumbnail: "/placeholder.svg?height=40&width=40",
    platform: "Facebook",
    views: 98000,
    engagement: 9800,
    date: "2024-01-14",
  },
  {
    id: 3,
    title: "Product Tutorial",
    thumbnail: "/placeholder.svg?height=40&width=40",
    platform: "YouTube",
    views: 87000,
    engagement: 8700,
    date: "2024-01-13",
  },
]

const audienceData = [
  { age: "18-24", percentage: 25 },
  { age: "25-34", percentage: 35 },
  { age: "35-44", percentage: 28 },
  { age: "45-54", percentage: 12 },
]

const bestTimes = [
  { time: "9:00 AM", engagement: 85 },
  { time: "12:00 PM", engagement: 92 },
  { time: "3:00 PM", engagement: 78 },
  { time: "6:00 PM", engagement: 95 },
  { time: "9:00 PM", engagement: 88 },
]

export function Analytics() {
  const [activeTab, setActiveTab] = useState("overview")

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-4 w-4" />
      case "Facebook":
        return <Facebook className="h-4 w-4" />
      case "YouTube":
        return <Youtube className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your content performance and audience insights</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="gradient-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <metric.icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={platformData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="views" label>
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContent.map((content, index) => (
                  <div key={content.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={content.thumbnail || "/placeholder.svg"} />
                      <AvatarFallback>V</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{content.title}</h3>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getPlatformIcon(content.platform)}
                          {content.platform}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{content.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{content.views.toLocaleString()} views</p>
                      <p className="text-sm text-muted-foreground">{content.engagement.toLocaleString()} engagements</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ fill: "#8884d8" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Posting Times</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bestTimes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="engagement" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {audienceData.map((demo) => (
                    <div key={demo.age} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{demo.age}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${demo.percentage}%` }} />
                        </div>
                        <span className="text-sm text-muted-foreground">{demo.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="reach" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
