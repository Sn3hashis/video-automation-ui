"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react"
import Link from "next/link"

const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    borderColor: "border-pink-200 dark:border-pink-800",
    description: "Connect your Instagram Business account to publish reels and posts",
    fields: [
      {
        id: "businessName",
        label: "Business Account Name",
        placeholder: "Your business name for reference",
        type: "text",
      },
      {
        id: "businessAccountId",
        label: "Instagram Business Account ID",
        placeholder: "Your Instagram business account ID",
        type: "text",
      },
      {
        id: "longLivedToken",
        label: "Long-Lived Access Token",
        placeholder: "Your Instagram long-lived access token",
        type: "password",
      },
      {
        id: "pageId",
        label: "Connected Facebook Page ID",
        placeholder: "Facebook page ID (if connected)",
        type: "text",
      },
    ],
    guide: {
      title: "How to get Instagram Business credentials",
      steps: [
        "Convert your Instagram account to a Business or Creator account",
        "Connect it to a Facebook Page in Instagram settings",
        "Go to Facebook Developers Console and create an app",
        "Add Instagram Basic Display and Instagram Graph API products",
        "Generate a long-lived access token (valid for ~60 days)",
        "Get your Instagram Business Account ID from Graph API",
      ],
      urls: [
        { label: "Facebook Developers Console", url: "https://developers.facebook.com/" },
        {
          label: "Instagram Graph API Setup",
          url: "https://developers.facebook.com/docs/instagram-api/getting-started",
        },
        { label: "Access Token Generator", url: "https://developers.facebook.com/tools/explorer/" },
      ],
      notes: [
        "Your Instagram account must be a Business or Creator account",
        "Long-lived tokens expire every 60 days and need to be refreshed",
        "You need a connected Facebook Page to use Instagram Graph API",
      ],
    },
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    description: "Connect your Facebook Page to publish posts and videos",
    fields: [
      { id: "pageName", label: "Facebook Page Name", placeholder: "Your page name for reference", type: "text" },
      { id: "pageId", label: "Facebook Page ID", placeholder: "Your Facebook page ID", type: "text" },
      {
        id: "longLivedToken",
        label: "Long-Lived Page Access Token",
        placeholder: "Your Facebook page access token",
        type: "password",
      },
      { id: "appId", label: "App ID", placeholder: "Your Facebook app ID", type: "text" },
    ],
    guide: {
      title: "How to get Facebook Page credentials",
      steps: [
        "Go to Facebook Developers Console",
        "Create a new app with 'Business' type",
        "Add Facebook Login and Pages API products",
        "Get your App ID from App Dashboard",
        "Use Graph API Explorer to generate Page Access Token",
        "Exchange for long-lived token (doesn't expire)",
        "Find your Page ID in your Facebook Page settings",
      ],
      urls: [
        { label: "Facebook Developers Console", url: "https://developers.facebook.com/" },
        { label: "Graph API Explorer", url: "https://developers.facebook.com/tools/explorer/" },
        { label: "Pages API Documentation", url: "https://developers.facebook.com/docs/pages-api/" },
      ],
      notes: [
        "You need admin access to the Facebook Page",
        "Long-lived Page Access Tokens don't expire if generated correctly",
        "Make sure your app has 'pages_manage_posts' permission",
      ],
    },
  },
  {
    name: "YouTube",
    icon: Youtube,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800",
    description: "Connect your YouTube channel to upload videos and shorts",
    fields: [
      {
        id: "channelName",
        label: "YouTube Channel Name",
        placeholder: "Your channel name for reference",
        type: "text",
      },
      { id: "clientId", label: "OAuth Client ID", placeholder: "Your YouTube OAuth client ID", type: "text" },
      {
        id: "clientSecret",
        label: "OAuth Client Secret",
        placeholder: "Your YouTube OAuth client secret",
        type: "password",
      },
      { id: "refreshToken", label: "Refresh Token", placeholder: "Your YouTube refresh token", type: "password" },
    ],
    guide: {
      title: "How to get YouTube OAuth credentials",
      steps: [
        "Go to Google Cloud Console",
        "Create a new project or select existing one",
        "Enable YouTube Data API v3",
        "Create OAuth 2.0 credentials (Web application type)",
        "Configure authorized redirect URIs",
        "Use OAuth 2.0 Playground to get refresh token",
        "Copy Client ID, Client Secret, and Refresh Token",
      ],
      urls: [
        { label: "Google Cloud Console", url: "https://console.cloud.google.com/" },
        { label: "YouTube Data API", url: "https://console.cloud.google.com/apis/library/youtube.googleapis.com" },
        { label: "OAuth 2.0 Playground", url: "https://developers.google.com/oauthplayground/" },
      ],
      notes: [
        "Your YouTube channel must be verified for uploads",
        "Refresh tokens don't expire unless revoked by user",
        "You need 'youtube.upload' scope for video uploads",
        "Set upload privacy: Public, Private, or Unlisted",
      ],
    },
  },
]

export function AddAccount() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0])
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({})
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const { toast } = useToast()

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const toggleSecretVisibility = (fieldId: string) => {
    setShowSecrets((prev) => ({ ...prev, [fieldId]: !prev[fieldId] }))
  }

  const handleTestConnection = async () => {
    setIsConnecting(true)
    setConnectionStatus("testing")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate random success/failure
    const isSuccess = Math.random() > 0.3

    setConnectionStatus(isSuccess ? "success" : "error")
    setIsConnecting(false)

    // Show toast notification
    if (isSuccess) {
      toast({
        title: "Connection Successful",
        description: `${selectedPlatform.name} account connected successfully!`,
        variant: "default",
      })
    } else {
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${selectedPlatform.name}. Please check your credentials.`,
        variant: "destructive",
      })
    }
  }

  const handleSaveAccount = async () => {
    // Handle saving the account
    console.log("Saving account:", { platform: selectedPlatform.name, data: formData })
    toast({
      title: "Account Saved",
      description: `${selectedPlatform.name} account has been saved successfully!`,
      variant: "default",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Redirect URI has been copied to your clipboard.",
      variant: "default",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/accounts">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Account</h1>
          <p className="text-muted-foreground mt-1">Connect your social media accounts to start publishing content</p>
        </div>
      </motion.div>

      {/* Platform Selection - Tabular */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Select Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedPlatform.name === platform.name
                        ? `ring-2 ring-primary ${platform.bgColor} ${platform.borderColor}`
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedPlatform(platform)}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-lg ${platform.bgColor} flex items-center justify-center`}
                      >
                        <platform.icon className={`h-8 w-8 ${platform.color}`} />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{platform.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{platform.description}</p>
                      {selectedPlatform.name === platform.name && (
                        <div className="mt-3 flex justify-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Credentials Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center gap-3">
                <selectedPlatform.icon className={`h-6 w-6 ${selectedPlatform.color}`} />
                <div>
                  <CardTitle>{selectedPlatform.name} Configuration</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{selectedPlatform.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlatform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-4 max-w-full">
                    {selectedPlatform.fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <Label htmlFor={field.id} className="text-sm font-medium">
                          {field.label}
                        </Label>
                        <div className="relative">
                          <Input
                            id={field.id}
                            type={field.type === "password" && !showSecrets[field.id] ? "password" : "text"}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="pr-10 text-sm"
                          />
                          {field.type === "password" && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => toggleSecretVisibility(field.id)}
                            >
                              {showSecrets[field.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {selectedPlatform.name === "YouTube" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 pt-4 border-t"
                >
                  <div className="space-y-2">
                    <Label htmlFor="uploadPrivacy" className="text-sm font-medium">
                      Default Upload Privacy
                    </Label>
                    <select
                      id="uploadPrivacy"
                      className="w-full p-2 border rounded-md text-sm"
                      value={formData.uploadPrivacy || "private"}
                      onChange={(e) => handleInputChange("uploadPrivacy", e.target.value)}
                    >
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                      <option value="unlisted">Unlisted</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Connect with Google OAuth</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically fetch tokens using Google OAuth flow
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </motion.div>
              )}

              <Separator />

              {/* Connection Status */}
              <AnimatePresence>
                {connectionStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`p-4 rounded-lg border ${
                      connectionStatus === "success"
                        ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                        : connectionStatus === "error"
                          ? "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800"
                          : "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {connectionStatus === "testing" && <Loader2 className="h-5 w-5 animate-spin text-blue-600" />}
                      {connectionStatus === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {connectionStatus === "error" && <CheckCircle className="h-5 w-5 text-red-600" />}
                      <p
                        className={`font-medium ${
                          connectionStatus === "success"
                            ? "text-green-800 dark:text-green-200"
                            : connectionStatus === "error"
                              ? "text-red-800 dark:text-red-200"
                              : "text-blue-800 dark:text-blue-200"
                        }`}
                      >
                        {connectionStatus === "testing" && "Testing connection..."}
                        {connectionStatus === "success" && "Connection successful!"}
                        {connectionStatus === "error" && "Connection failed"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={handleTestConnection}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "Test Connection"
                  )}
                </Button>
                <Button
                  className="flex-1 gradient-primary"
                  onClick={handleSaveAccount}
                  disabled={connectionStatus !== "success"}
                >
                  Save Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side - Setup Guide */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>{selectedPlatform.guide.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6 max-w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPlatform.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Steps */}
                    <div>
                      <h3 className="font-semibold mb-3 text-base">Step-by-step guide:</h3>
                      <ol className="space-y-3">
                        {selectedPlatform.guide.steps.map((step, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-3"
                          >
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                            >
                              {index + 1}
                            </Badge>
                            <span className="text-sm leading-relaxed break-words">{step}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>

                    <Separator />

                    {/* Useful Links */}
                    <div>
                      <h3 className="font-semibold mb-3 text-base">Useful links:</h3>
                      <div className="space-y-2">
                        {selectedPlatform.guide.urls.map((link, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <Button
                              variant="outline"
                              className="w-full justify-between bg-transparent text-left h-auto p-3"
                              onClick={() => window.open(link.url, "_blank")}
                            >
                              <span className="text-sm break-words text-left flex-1 mr-2">{link.label}</span>
                              <ExternalLink className="h-4 w-4 flex-shrink-0" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Important Notes */}
                    <div>
                      <h3 className="font-semibold mb-3 text-base">Important notes:</h3>
                      <div className="space-y-3">
                        {selectedPlatform.guide.notes.map((note, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="flex gap-3 p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground leading-relaxed break-words">{note}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Copy Section */}
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-3 text-sm">Quick copy:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-background rounded border">
                          <span className="text-sm font-mono break-all flex-1 mr-2">Redirect URI:</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0"
                            onClick={() => copyToClipboard("https://reelbrandpro.com/auth/callback")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <code className="text-xs text-muted-foreground block break-all p-2 bg-muted rounded">
                          https://reelbrandpro.com/auth/callback
                        </code>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
