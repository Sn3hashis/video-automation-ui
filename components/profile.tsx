"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Upload,
  CreditCard,
  Activity,
  Award,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"

const activityData = [
  { date: "2024-01-15", action: "Uploaded 5 videos", type: "upload" },
  { date: "2024-01-14", action: "Connected Instagram account", type: "account" },
  { date: "2024-01-13", action: "Published to 3 platforms", type: "publish" },
  { date: "2024-01-12", action: "Updated branding settings", type: "settings" },
  { date: "2024-01-11", action: "Upgraded to Pro plan", type: "billing" },
]

const achievements = [
  { title: "First Upload", description: "Uploaded your first video", earned: true },
  { title: "Multi-Platform Master", description: "Published to all 3 platforms", earned: true },
  { title: "Consistent Creator", description: "Upload 30 days in a row", earned: false, progress: 15 },
  { title: "Viral Video", description: "Get 100K+ views on a single video", earned: false },
]

export function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "smm",
    email: "amit90917@gmail.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Content creator and social media manager passionate about building engaging brand experiences.",
    website: "https://myportfolio.com",
    joinDate: "January 2024",
  })

  const router = useRouter()

  const handleSave = () => {
    setIsEditing(false)
    // Handle save logic here
    console.log("Saving profile data:", profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback className="text-2xl">SM</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      variant="secondary"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{profileData.name}</h3>
                  <p className="text-muted-foreground">{profileData.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    Pro Plan
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity & Achievements Tabs */}
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="activity" className="w-full">
                <div className="border-b px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="activity" className="p-6 space-y-4">
                  {activityData.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg border"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="achievements" className="p-6 space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        achievement.earned ? "bg-green-50 border-green-200 dark:bg-green-950/20" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.earned ? "bg-green-500" : "bg-muted"
                        }`}
                      >
                        <Award className={`h-5 w-5 ${achievement.earned ? "text-white" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{achievement.title}</p>
                          {achievement.earned && <Badge variant="secondary">Earned</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {achievement.progress && (
                          <div className="mt-2">
                            <Progress value={(achievement.progress / 30) * 100} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">{achievement.progress}/30 days</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Quick Info */}
        <div className="space-y-6">
          {/* Account Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Total Uploads</span>
                </div>
                <span className="font-semibold">247</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Total Views</span>
                </div>
                <span className="font-semibold">1.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Achievements</span>
                </div>
                <span className="font-semibold">2/4</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member since</span>
                </div>
                <span className="text-sm text-muted-foreground">{profileData.joinDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Info */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Current Plan</span>
                <Badge>Pro Plan</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Monthly Credits</span>
                <span className="font-semibold">2.56 / 100</span>
              </div>
              <Progress value={2.56} className="h-2" />
              <Button className="w-full gradient-primary">
                <CreditCard className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => router.push("/upload")}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New Video
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <User className="mr-2 h-4 w-4" />
                Connect Account
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Activity className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
