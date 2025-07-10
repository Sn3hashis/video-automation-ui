"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, Instagram, Facebook, Youtube, Loader2, Eye, LinkIcon } from "lucide-react"

interface UploadFile {
  id: string
  file: File
  preview: string
  progress: number
  status: "uploading" | "processing" | "completed" | "error"
}

export function UploadStudio() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    instagram: true,
    facebook: true,
    youtube: false,
  })
  const [brandingSettings, setBrandingSettings] = useState({
    enableLogo: true,
    logoPosition: "bottom-right",
    logoOpacity: 80,
    captionText: "",
    captionPosition: "bottom-center",
    captionSpeed: 50,
    showCaptions: true,
  })
  const [contentSettings, setContentSettings] = useState({
    title: "",
    description: "",
    hashtags: "#brand #content #reels",
    publishNow: true,
    scheduleDate: "",
  })
  const [processingModal, setProcessingModal] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [uploadMethod, setUploadMethod] = useState<"file" | "gdrive">("file")
  const [gdriveLink, setGdriveLink] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "uploading" as const,
    }))
    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress: 100, status: "completed" } : f)))
        } else {
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress } : f)))
        }
      }, 500)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
    multiple: true,
  })

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handleProcessing = () => {
    setProcessingModal(true)
    setProcessingProgress(0)

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setProcessingModal(false), 1000)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 800)
  }

  const togglePlatform = (platform: keyof typeof selectedPlatforms) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }))
  }

  const handleGdriveSubmit = () => {
    if (gdriveLink) {
      // Simulate adding file from Google Drive
      const newFile = {
        id: Math.random().toString(36).substr(2, 9),
        file: new File([], "gdrive-video.mp4"),
        preview: "/placeholder.svg?height=200&width=300",
        progress: 100,
        status: "completed" as const,
      }
      setFiles((prev) => [...prev, newFile])
      setGdriveLink("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Upload Studio</h1>
          <p className="text-muted-foreground mt-1">Create, brand, and publish your videos across platforms</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-transparent">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Upload & Branding */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Videos Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                <CardTitle>Upload Videos</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Drag and drop your video files or click to browse</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Method Toggle */}
              <div className="flex gap-2 mb-4">
                <Button
                  variant={uploadMethod === "file" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUploadMethod("file")}
                  className={uploadMethod === "file" ? "" : "bg-transparent"}
                >
                  File Upload
                </Button>
                <Button
                  variant={uploadMethod === "gdrive" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUploadMethod("gdrive")}
                  className={uploadMethod === "gdrive" ? "" : "bg-transparent"}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Google Drive
                </Button>
              </div>

              {uploadMethod === "file" ? (
                <motion.div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">
                    {isDragActive ? "Drop video files here" : "Drop video files here, or click to select"}
                  </p>
                  <p className="text-sm text-muted-foreground">Supports MP4, MOV, AVI, MKV up to 500MB each</p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Paste Google Drive link here..."
                      value={gdriveLink}
                      onChange={(e) => setGdriveLink(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleGdriveSubmit} disabled={!gdriveLink}>
                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Make sure the Google Drive link is publicly accessible or shared with view permissions
                  </p>
                </div>
              )}

              {/* File Preview Grid */}
              <AnimatePresence>
                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6"
                  >
                    {files.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                      >
                        <div className="aspect-video rounded-lg overflow-hidden bg-muted border">
                          <video src={file.preview} className="w-full h-full object-cover" muted />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="destructive" onClick={() => removeFile(file.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium truncate">{file.file.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={file.progress} className="flex-1 h-2" />
                            <Badge variant={file.status === "completed" ? "default" : "secondary"}>{file.status}</Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Branding & Effects Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded bg-primary" />
                </div>
                <CardTitle>Branding & Effects</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Customize your video branding and visual effects</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="logo" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="logo">Logo</TabsTrigger>
                  <TabsTrigger value="captions">Captions</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                </TabsList>

                <TabsContent value="logo" className="space-y-6 mt-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-logo" className="text-base font-medium">
                      Enable Logo Overlay
                    </Label>
                    <Switch
                      id="enable-logo"
                      checked={brandingSettings.enableLogo}
                      onCheckedChange={(checked) => setBrandingSettings((prev) => ({ ...prev, enableLogo: checked }))}
                    />
                  </div>

                  {brandingSettings.enableLogo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4"
                    >
                      <div>
                        <Label className="text-sm font-medium">Logo Position</Label>
                        <Select
                          value={brandingSettings.logoPosition}
                          onValueChange={(value) => setBrandingSettings((prev) => ({ ...prev, logoPosition: value }))}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top-left">Top Left</SelectItem>
                            <SelectItem value="top-right">Top Right</SelectItem>
                            <SelectItem value="bottom-left">Bottom Left</SelectItem>
                            <SelectItem value="bottom-right">Bottom Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Logo Opacity</Label>
                        <div className="mt-2">
                          <Slider
                            value={[brandingSettings.logoOpacity]}
                            onValueChange={([value]) =>
                              setBrandingSettings((prev) => ({ ...prev, logoOpacity: value }))
                            }
                            max={100}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>0%</span>
                            <span>{brandingSettings.logoOpacity}%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="captions" className="space-y-4 mt-6">
                  <p className="text-sm text-muted-foreground">
                    Caption settings will be available in the next update.
                  </p>
                </TabsContent>

                <TabsContent value="effects" className="space-y-4 mt-6">
                  <p className="text-sm text-muted-foreground">
                    Effects settings will be available in the next update.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Publishing & Content */}
        <div className="space-y-6">
          {/* Publishing Platforms */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded bg-primary" />
                </div>
                <CardTitle>Publishing Platforms</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Select where to publish your content</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "instagram",
                  name: "Instagram",
                  subtitle: "Reels & Stories",
                  icon: Instagram,
                  color: "text-pink-600",
                  bgColor: "bg-pink-50 dark:bg-pink-950/20",
                  borderColor: "border-pink-200 dark:border-pink-800",
                },
                {
                  key: "facebook",
                  name: "Facebook",
                  subtitle: "Posts & Stories",
                  icon: Facebook,
                  color: "text-blue-600",
                  bgColor: "bg-blue-50 dark:bg-blue-950/20",
                  borderColor: "border-blue-200 dark:border-blue-800",
                },
                {
                  key: "youtube",
                  name: "YouTube",
                  subtitle: "Shorts",
                  icon: Youtube,
                  color: "text-red-600",
                  bgColor: "bg-red-50 dark:bg-red-950/20",
                  borderColor: "border-red-200 dark:border-red-800",
                },
              ].map((platform) => (
                <motion.div
                  key={platform.key}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPlatforms[platform.key as keyof typeof selectedPlatforms]
                      ? `${platform.borderColor} ${platform.bgColor}`
                      : "border-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <platform.icon className={`h-6 w-6 ${platform.color}`} />
                      <div>
                        <p className="font-medium">{platform.name}</p>
                        <p className="text-sm text-muted-foreground">{platform.subtitle}</p>
                      </div>
                    </div>
                    <Switch
                      checked={selectedPlatforms[platform.key as keyof typeof selectedPlatforms]}
                      onCheckedChange={() => togglePlatform(platform.key as keyof typeof selectedPlatforms)}
                    />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Content Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <p className="text-sm text-muted-foreground">Configure your post details</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="caption" className="text-sm font-medium">
                  Caption
                </Label>
                <Textarea
                  id="caption"
                  placeholder="Write your caption here..."
                  value={contentSettings.description}
                  onChange={(e) => setContentSettings((prev) => ({ ...prev, description: e.target.value }))}
                  className="mt-2 min-h-[100px] resize-none"
                />
              </div>

              <div>
                <Label htmlFor="hashtags" className="text-sm font-medium">
                  Hashtags
                </Label>
                <Input
                  id="hashtags"
                  value={contentSettings.hashtags}
                  onChange={(e) => setContentSettings((prev) => ({ ...prev, hashtags: e.target.value }))}
                  placeholder="#brand #content #reels"
                  className="mt-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="publish-now" className="text-sm font-medium">
                  Publish Now
                </Label>
                <Switch
                  id="publish-now"
                  checked={contentSettings.publishNow}
                  onCheckedChange={(checked) => setContentSettings((prev) => ({ ...prev, publishNow: checked }))}
                />
              </div>

              {!contentSettings.publishNow && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                  <Label htmlFor="schedule-date" className="text-sm font-medium">
                    Schedule Date
                  </Label>
                  <Input
                    id="schedule-date"
                    type="datetime-local"
                    value={contentSettings.scheduleDate}
                    onChange={(e) => setContentSettings((prev) => ({ ...prev, scheduleDate: e.target.value }))}
                    className="mt-2"
                  />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Processing Modal */}
      <Dialog open={processingModal} onOpenChange={setProcessingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Processing Your Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Applying branding and processing videos...</span>
            </div>
            <Progress value={processingProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {processingProgress < 50
                ? "Applying logo and captions..."
                : processingProgress < 80
                  ? "Optimizing for platforms..."
                  : "Finalizing upload..."}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
