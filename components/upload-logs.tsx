"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  RefreshCw,
  Trash2,
  Instagram,
  Facebook,
  Youtube,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
} from "lucide-react"

const statsData = [
  { title: "Total Uploads", value: "2,847", icon: CheckCircle, color: "from-blue-500 to-cyan-500" },
  { title: "Successful", value: "2,803", icon: CheckCircle, color: "from-green-500 to-emerald-500" },
  { title: "Failed", value: "32", icon: XCircle, color: "from-red-500 to-rose-500" },
  { title: "Processing", value: "12", icon: Loader2, color: "from-yellow-500 to-orange-500" },
]

const uploadLogs = [
  {
    id: 1,
    title: "Summer Campaign Video",
    thumbnail: "/placeholder.svg?height=40&width=40",
    status: "published",
    platforms: ["instagram", "facebook"],
    uploadDate: "2024-01-15 14:30",
    views: 12500,
    engagement: 8.2,
    size: "45.2 MB",
  },
  {
    id: 2,
    title: "Product Launch Teaser",
    thumbnail: "/placeholder.svg?height=40&width=40",
    status: "processing",
    platforms: ["youtube"],
    uploadDate: "2024-01-15 12:15",
    views: 0,
    engagement: 0,
    size: "78.1 MB",
  },
  {
    id: 3,
    title: "Behind the Scenes",
    thumbnail: "/placeholder.svg?height=40&width=40",
    status: "published",
    platforms: ["instagram", "facebook", "youtube"],
    uploadDate: "2024-01-14 16:45",
    views: 8200,
    engagement: 12.5,
    size: "52.7 MB",
  },
  {
    id: 4,
    title: "Tutorial: How to Use Our Product",
    thumbnail: "/placeholder.svg?height=40&width=40",
    status: "failed",
    platforms: ["youtube"],
    uploadDate: "2024-01-14 10:20",
    views: 0,
    engagement: 0,
    size: "125.4 MB",
  },
  {
    id: 5,
    title: "Customer Testimonial",
    thumbnail: "/placeholder.svg?height=40&width=40",
    status: "published",
    platforms: ["instagram", "facebook"],
    uploadDate: "2024-01-13 15:30",
    views: 5600,
    engagement: 15.8,
    size: "32.8 MB",
  },
]

export function UploadLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "default"
      case "processing":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredLogs = uploadLogs.filter((log) => {
    const matchesSearch = log.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus
    const matchesPlatform = selectedPlatform === "all" || log.platforms.includes(selectedPlatform)
    return matchesSearch && matchesStatus && matchesPlatform
  })

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Upload Logs</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage your content uploads</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="gradient-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search uploads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto bg-transparent">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {selectedStatus === "all" ? "All" : selectedStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedStatus("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("published")}>Published</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("processing")}>Processing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("failed")}>Failed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto bg-transparent">
                  <Filter className="mr-2 h-4 w-4" />
                  Platform: {selectedPlatform === "all" ? "All" : selectedPlatform}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedPlatform("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPlatform("instagram")}>Instagram</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPlatform("facebook")}>Facebook</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPlatform("youtube")}>YouTube</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Upload Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Upload History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <motion.tr
                  key={log.id}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  transition={{ duration: 0.2 }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={log.thumbnail || "/placeholder.svg"} />
                        <AvatarFallback>V</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{log.title}</p>
                        <p className="text-sm text-muted-foreground">ID: {log.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(log.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(log.status)}
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {log.platforms.map((platform) => (
                        <div key={platform} className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                          {platform === "instagram" && <Instagram className="h-3 w-3" />}
                          {platform === "facebook" && <Facebook className="h-3 w-3" />}
                          {platform === "youtube" && <Youtube className="h-3 w-3" />}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{log.uploadDate}</TableCell>
                  <TableCell>{log.views.toLocaleString()}</TableCell>
                  <TableCell>{log.engagement}%</TableCell>
                  <TableCell>{log.size}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{log.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                                  <Badge variant={getStatusColor(log.status)} className="mt-1">
                                    {log.status}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Upload Date</p>
                                  <p className="text-sm mt-1">{log.uploadDate}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Views</p>
                                  <p className="text-sm mt-1">{log.views.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                                  <p className="text-sm mt-1">{log.engagement}%</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">File Size</p>
                                  <p className="text-sm mt-1">{log.size}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Platforms</p>
                                  <div className="flex gap-2 mt-1">
                                    {log.platforms.map((platform) => (
                                      <Badge key={platform} variant="outline">
                                        {platform}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground">Video Preview</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {log.status === "failed" && (
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Retry Upload
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
