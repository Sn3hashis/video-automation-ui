"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Upload, Eye, EyeOff, Download, Trash2 } from "lucide-react"

const auditLogs = [
  { action: "Login", timestamp: "2024-01-15 14:30:22", ip: "192.168.1.100", status: "success" },
  { action: "Token Updated", timestamp: "2024-01-15 12:15:45", ip: "192.168.1.100", status: "success" },
  { action: "Settings Changed", timestamp: "2024-01-14 16:20:11", ip: "192.168.1.100", status: "success" },
  { action: "Failed Login", timestamp: "2024-01-14 10:45:33", ip: "192.168.1.200", status: "failed" },
]

export function Settings() {
  const [showTokens, setShowTokens] = useState<{ [key: string]: boolean }>({})
  const [brandSettings, setBrandSettings] = useState({
    logoFile: null as File | null,
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    brandName: "My Brand",
    tagline: "Empowering creativity through technology",
  })
  const [captionSettings, setCaptionSettings] = useState({
    defaultTemplate: "Follow for more amazing content! 🔥",
    speed: 50,
    position: "bottom-center",
    fontSize: 16,
    fontFamily: "Inter",
  })
  const [generalSettings, setGeneralSettings] = useState({
    autoPublish: true,
    notifications: true,
    analytics: true,
    timezone: "UTC-5",
    language: "en",
  })

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBrandSettings((prev) => ({ ...prev, logoFile: file }))
    }
  }

  const toggleTokenVisibility = (tokenId: string) => {
    setShowTokens((prev) => ({
      ...prev,
      [tokenId]: !prev[tokenId],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your application preferences and security settings</p>
        </div>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="captions">Captions</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="brand-name">Brand Name</Label>
                  <Input
                    id="brand-name"
                    value={brandSettings.brandName}
                    onChange={(e) => setBrandSettings((prev) => ({ ...prev, brandName: e.target.value }))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={brandSettings.tagline}
                    onChange={(e) => setBrandSettings((prev) => ({ ...prev, tagline: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="logo-upload">Brand Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                    {brandSettings.logoFile ? (
                      <img
                        src={URL.createObjectURL(brandSettings.logoFile) || "/placeholder.svg"}
                        alt="Brand logo"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="flex-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={brandSettings.primaryColor}
                      onChange={(e) => setBrandSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={brandSettings.primaryColor}
                      onChange={(e) => setBrandSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={brandSettings.secondaryColor}
                      onChange={(e) => setBrandSettings((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={brandSettings.secondaryColor}
                      onChange={(e) => setBrandSettings((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Brand Preview</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: brandSettings.primaryColor }}>
                    {brandSettings.logoFile && (
                      <img
                        src={URL.createObjectURL(brandSettings.logoFile) || "/placeholder.svg"}
                        alt="Brand logo"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: brandSettings.primaryColor }}>
                      {brandSettings.brandName}
                    </p>
                    <p className="text-sm text-muted-foreground">{brandSettings.tagline}</p>
                  </div>
                </div>
              </div>

              <Button className="w-full md:w-auto">Save Brand Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="captions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Caption Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="default-template">Default Caption Template</Label>
                <Textarea
                  id="default-template"
                  value={captionSettings.defaultTemplate}
                  onChange={(e) => setCaptionSettings((prev) => ({ ...prev, defaultTemplate: e.target.value }))}
                  className="mt-2"
                  rows={3}
                  placeholder="Enter your default caption template..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Animation Speed: {captionSettings.speed}%</Label>
                  <Slider
                    value={[captionSettings.speed]}
                    onValueChange={([value]) => setCaptionSettings((prev) => ({ ...prev, speed: value }))}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Font Size: {captionSettings.fontSize}px</Label>
                  <Slider
                    value={[captionSettings.fontSize]}
                    onValueChange={([value]) => setCaptionSettings((prev) => ({ ...prev, fontSize: value }))}
                    min={12}
                    max={32}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Position</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"].map(
                      (pos) => (
                        <Button
                          key={pos}
                          variant={captionSettings.position === pos ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCaptionSettings((prev) => ({ ...prev, position: pos }))}
                        >
                          {pos.replace("-", " ")}
                        </Button>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="font-family">Font Family</Label>
                  <select
                    id="font-family"
                    value={captionSettings.fontFamily}
                    onChange={(e) => setCaptionSettings((prev) => ({ ...prev, fontFamily: e.target.value }))}
                    className="w-full mt-2 p-2 border rounded-md"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Montserrat">Montserrat</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Caption Preview</h3>
                <div className="relative h-32 bg-black rounded-lg overflow-hidden">
                  <motion.div
                    animate={{ x: [-100, 100] }}
                    transition={{
                      duration: 2 - captionSettings.speed / 100,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="absolute text-white px-2 py-1 rounded"
                    style={{
                      fontSize: `${captionSettings.fontSize}px`,
                      fontFamily: captionSettings.fontFamily,
                      bottom: captionSettings.position.includes("bottom") ? "8px" : "auto",
                      top: captionSettings.position.includes("top") ? "8px" : "auto",
                      left: captionSettings.position.includes("left") ? "8px" : "auto",
                      right: captionSettings.position.includes("right") ? "8px" : "auto",
                      transform: captionSettings.position.includes("center") ? "translateX(-50%)" : "none",
                      left: captionSettings.position.includes("center")
                        ? "50%"
                        : captionSettings.position.includes("left")
                          ? "8px"
                          : "auto",
                    }}
                  >
                    {captionSettings.defaultTemplate}
                  </motion.div>
                </div>
              </div>

              <Button className="w-full md:w-auto">Save Caption Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-publish">Auto-publish content</Label>
                    <p className="text-sm text-muted-foreground">Automatically publish to connected accounts</p>
                  </div>
                  <Switch
                    id="auto-publish"
                    checked={generalSettings.autoPublish}
                    onCheckedChange={(checked) => setGeneralSettings((prev) => ({ ...prev, autoPublish: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">Push notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for uploads and updates</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={generalSettings.notifications}
                    onCheckedChange={(checked) => setGeneralSettings((prev) => ({ ...prev, notifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Analytics tracking</Label>
                    <p className="text-sm text-muted-foreground">Allow analytics data collection</p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={generalSettings.analytics}
                    onCheckedChange={(checked) => setGeneralSettings((prev) => ({ ...prev, analytics: checked }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings((prev) => ({ ...prev, timezone: e.target.value }))}
                    className="w-full mt-2 p-2 border rounded-md"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">GMT (UTC+0)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={generalSettings.language}
                    onChange={(e) => setGeneralSettings((prev) => ({ ...prev, language: e.target.value }))}
                    className="w-full mt-2 p-2 border rounded-md"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>

              <Button className="w-full md:w-auto">Save General Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">API Keys</h3>
                <div className="space-y-4">
                  {[
                    { name: "Primary API Key", key: "primary", value: "sk_live_abc123...xyz789" },
                    { name: "Secondary API Key", key: "secondary", value: "sk_live_def456...uvw012" },
                  ].map((apiKey) => (
                    <div key={apiKey.key} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{apiKey.name}</p>
                        <div className="font-mono text-sm text-muted-foreground">
                          {showTokens[apiKey.key] ? apiKey.value : "••••••••••••••••••••••••••••••••"}
                        </div>
                      </div>
                      <Button variant="outline" size="icon" onClick={() => toggleTokenVisibility(apiKey.key)}>
                        {showTokens[apiKey.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Password & Authentication</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="mt-2" />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Activity Log</h3>
                <div className="space-y-2">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {log.timestamp} • {log.ip}
                        </p>
                      </div>
                      <Badge variant={log.status === "success" ? "default" : "destructive"}>{log.status}</Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export Full Activity Log
                </Button>
              </div>

              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h3 className="font-medium text-destructive mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions are irreversible. Please proceed with caution.
                </p>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
