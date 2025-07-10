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
import InstagramFacebookSetupDocs from "@/components/InstagramFacebookSetupDocs"

type PlatformField = {
  id: string;
  label: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  options?: string[];
  help?: string;
}

const platforms: {
  name: string
  icon: any
  color: string
  bgColor: string
  borderColor: string
  description: string
  fields: PlatformField[]
  guide: any
}[] = [
  {
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    borderColor: "border-pink-200 dark:border-pink-800",
    description: "Connect your Instagram Business account to publish reels and posts",
    fields: [
      { id: "instagramUsername", label: "Instagram Username", placeholder: "Your Instagram username", type: "text", required: false },
      { id: "businessAccountId", label: "Instagram Business ID", placeholder: "Business account ID (from Graph API)", type: "text", required: true },
      { id: "connectedPageId", label: "Connected Page ID", placeholder: "Facebook Page ID linked to this Instagram", type: "text", required: true },
      { id: "instagramAccessToken", label: "Instagram Access Token", placeholder: "Access token (same as FB Page token)", type: "password", required: true },
      { id: "tokenExpiryDate", label: "Token Expiry Date", placeholder: "Expiry date (optional)", type: "date", required: false },
      { id: "tokenRefreshReminderEmail", label: "Token Refresh Reminder Email", placeholder: "Email for token expiry reminders (optional)", type: "email", required: false, help: "We'll notify you before your token expires." },
      { id: "reelCaptionTemplate", label: "Reel Caption Template", placeholder: "e.g., 🔥 {title} 🔥 #motivation #life", type: "textarea", required: false },
      { id: "hashtagPresets", label: "Hashtag Presets", placeholder: "Add hashtags (comma or enter to separate)", type: "multitag", required: false },
      { id: "postAsReel", label: "Post as Reel", type: "toggle", required: false, help: "Enable to post as a Reel instead of a regular post." },
      { id: "postToFeed", label: "Post to Feed", type: "toggle", required: false, help: "Enable to post to your main feed." },
      { id: "autoUploadAfterProcessing", label: "Enable Auto Upload After Video Processing", type: "toggle", required: false, help: "Automatically upload after video is processed." },
      { id: "preferredUploadTime", label: "Preferred Upload Time", placeholder: "e.g. 14:30 or 'Immediately'", type: "text", required: false, help: "Schedule when uploads happen after processing." },
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
      { id: "pageName", label: "Page Name", placeholder: "Your page name for reference", type: "text", required: false },
      { id: "pageId", label: "Page ID", placeholder: "Your Facebook page ID", type: "text", required: true },
      { id: "pageAccessToken", label: "Page Access Token", placeholder: "Your Facebook page access token", type: "password", required: true },
      { id: "tokenExpiryDate", label: "Token Expiry Date", placeholder: "Expiry date (optional)", type: "date", required: false },
      { id: "tokenRefreshReminderEmail", label: "Token Refresh Reminder Email", placeholder: "Email for token expiry reminders (optional)", type: "email", required: false, help: "We'll notify you before your token expires." },
      { id: "postCaptionTemplate", label: "Post Caption Template", placeholder: "e.g. {title} - {date}", type: "textarea", required: false },
      { id: "defaultVisibility", label: "Default Visibility", placeholder: "Select visibility", type: "dropdown", options: ["Public", "Private", "Unlisted"], required: false },
      { id: "postAsReel", label: "Post as Reel", type: "toggle", required: false, help: "Enable to post as a Reel instead of a regular post." },
      { id: "postToFeed", label: "Post to Feed", type: "toggle", required: false, help: "Enable to post to your main feed." },
      { id: "autoUploadAfterProcessing", label: "Enable Auto Upload After Video Processing", type: "toggle", required: false, help: "Automatically upload after video is processed." },
      { id: "preferredUploadTime", label: "Preferred Upload Time", placeholder: "e.g. 14:30 or 'Immediately'", type: "text", required: false, help: "Schedule when uploads happen after processing." },
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
      { id: "channelName", label: "YouTube Channel Name", placeholder: "Your channel name for reference", type: "text", required: false },
      { id: "accessToken", label: "YouTube Access Token", placeholder: "OAuth token (via Google API)", type: "password", required: false },
      { id: "refreshToken", label: "Refresh Token", placeholder: "For regenerating access token", type: "password", required: false },
      { id: "clientId", label: "Client ID", placeholder: "From Google Cloud Console", type: "password", required: false },
      { id: "clientSecret", label: "Client Secret", placeholder: "Required with refresh token", type: "password", required: false },
      { id: "videoTitleTemplate", label: "Video Title Template", placeholder: "Optional SEO templates", type: "text", required: false },
      { id: "descriptionTemplate", label: "Description Template", placeholder: "Can support hashtags, etc.", type: "textarea", required: false },
      { id: "tokenRefreshReminderEmail", label: "Token Refresh Reminder Email", placeholder: "Email for token expiry reminders (optional)", type: "email", required: false, help: "We'll notify you before your token expires." },
      { id: "postAsReel", label: "Post as Reel", type: "toggle", required: false, help: "Enable to post as a Reel instead of a regular post." },
      { id: "postToFeed", label: "Post to Feed", type: "toggle", required: false, help: "Enable to post to your main feed." },
      { id: "autoUploadAfterProcessing", label: "Enable Auto Upload After Video Processing", type: "toggle", required: false, help: "Automatically upload after video is processed." },
      { id: "preferredUploadTime", label: "Preferred Upload Time", placeholder: "e.g. 14:30 or 'Immediately'", type: "text", required: false, help: "Schedule when uploads happen after processing." },
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
  const [formData, setFormData] = useState<{ [key: string]: string }>(() => {
    // Set default checked for toggles
    const initial: { [key: string]: string } = {}
    platforms.forEach((platform) => {
      platform.fields.forEach((field) => {
        if (field.type === 'toggle') {
          if (field.id === 'postAsReel' || field.id === 'postToFeed' || field.id === 'autoUploadAfterProcessing') {
            initial[field.id] = 'true';
          }
        }
      })
    })
    return initial
  })
  const [highlightMissing, setHighlightMissing] = useState<string[]>([])
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({})
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [guideOpen, setGuideOpen] = useState(false)
  const [showDocs, setShowDocs] = useState(false)
  const { toast } = useToast()

  // Helper to check if all required fields are filled for the selected platform
  const requiredFieldsFilled = selectedPlatform.fields
    .filter((f) => f.required)
    .every((f) => !!formData[f.id]?.trim())

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const toggleSecretVisibility = (fieldId: string) => {
    setShowSecrets((prev) => ({ ...prev, [fieldId]: !prev[fieldId] }))
  }

  const handleTestConnection = async () => {
    if (!requiredFieldsFilled) {
      setHighlightMissing(selectedPlatform.fields.filter(f => f.required && !formData[f.id]?.trim()).map(f => f.id))
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill all required fields before testing connection.',
        variant: 'destructive',
      })
      return
    }
    setHighlightMissing([])
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
    if (!requiredFieldsFilled) {
      setHighlightMissing(selectedPlatform.fields.filter(f => f.required && !formData[f.id]?.trim()).map(f => f.id))
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill all required fields before saving.',
        variant: 'destructive',
      })
      return
    }
    setHighlightMissing([])
    let apiUrl = '';
    let body: any = {};
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    if (selectedPlatform.name === 'Facebook') {
      apiUrl = baseUrl + '/accounts/facebook';
      body = {
        page_name: formData.pageName || undefined,
        page_id: formData.pageId || undefined,
        access_token: formData.pageAccessToken || undefined,
        token_expiry_date: formData.tokenExpiryDate || undefined,
        reminder_email: formData.tokenRefreshReminderEmail || undefined,
        caption_template: formData.postCaptionTemplate || undefined,
        default_visibility: formData.defaultVisibility || undefined,
        instagram_id: formData.connectedPageId || undefined,
        post_as_reel: formData.postAsReel === 'true',
        post_to_feed: formData.postToFeed === 'true',
        auto_upload: formData.autoUploadAfterProcessing === 'true',
        preferred_upload_time: formData.preferredUploadTime || undefined,
      };
    } else if (selectedPlatform.name === 'Instagram') {
      apiUrl = baseUrl + '/accounts/instagram';
      // Collect all Instagram fields from formData
      body = {
        instagram_username: formData.instagramUsername || undefined,
        instagram_id: formData.businessAccountId || undefined,
        page_id: formData.connectedPageId || undefined,
        access_token: formData.instagramAccessToken || undefined,
        token_expiry_date: formData.tokenExpiryDate || undefined,
        reminder_email: formData.tokenRefreshReminderEmail || undefined,
        caption_template: formData.reelCaptionTemplate || undefined,
        hashtag_presets: formData.hashtagPresets || undefined,
        post_as_reel: formData.postAsReel === 'true',
        post_to_feed: formData.postToFeed === 'true',
        auto_upload: formData.autoUploadAfterProcessing === 'true',
        preferred_upload_time: formData.preferredUploadTime || undefined,
      };
    } else if (selectedPlatform.name === 'YouTube') {
      apiUrl = baseUrl + '/accounts/youtube';
      body = {
        channel_name: formData.channelName || undefined,
        access_token: formData.accessToken || undefined,
        refresh_token: formData.refreshToken || undefined,
        client_id: formData.clientId || undefined,
        client_secret: formData.clientSecret || undefined,
        token_expiry_date: formData.tokenExpiryDate || undefined,
        reminder_email: formData.tokenRefreshReminderEmail || undefined,
        video_title_template: formData.videoTitleTemplate || undefined,
        description_template: formData.descriptionTemplate || undefined,
        post_as_reel: formData.postAsReel === 'true',
        post_to_feed: formData.postToFeed === 'true',
        auto_upload: formData.autoUploadAfterProcessing === 'true',
        preferred_upload_time: formData.preferredUploadTime || undefined,
        upload_privacy: formData.uploadPrivacy || undefined,
      };
    }
    if (apiUrl) {
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error('API error');
        toast({
          title: 'Account Saved',
          description: `${selectedPlatform.name} account has been saved successfully!`,
          variant: 'default',
        });
      } catch (e) {
        toast({
          title: 'Error',
          description: `Failed to save ${selectedPlatform.name} account.`,
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Account Saved',
        description: `${selectedPlatform.name} account has been saved successfully!`,
        variant: 'default',
      });
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Redirect URI has been copied to your clipboard.",
      variant: "default",
    })
  }

  const handleShowDocs = () => {
    setShowDocs(true)
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
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] gap-6">
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
                    {selectedPlatform.fields
                      .filter((field, index) => !["postAsReel", "postToFeed", "autoUploadAfterProcessing"].includes(field.id))
                      .map((field, index) => (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <Label htmlFor={field.id} className={`text-sm font-medium${field.required ? '': ''}${highlightMissing.includes(field.id) ? ' text-red-500' : ''}`}>
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                          <div className="relative">
                            {field.type === "password" ? (
                              <>
                                <Input
                                  id={field.id}
                                  type={showSecrets[field.id] ? "text" : "password"}
                                  placeholder={field.placeholder}
                                  value={formData[field.id] || ""}
                                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                                  className={`pr-10 text-sm${highlightMissing.includes(field.id) ? ' border-red-500' : ''}`}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => toggleSecretVisibility(field.id)}
                                >
                                  {showSecrets[field.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </>
                            ) : field.type === "textarea" ? (
                              <textarea
                                id={field.id}
                                placeholder={field.placeholder}
                                value={formData[field.id] || ""}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                className={`w-full p-2 border rounded-md text-sm min-h-[80px]${highlightMissing.includes(field.id) ? ' border-red-500' : ''}`}
                              />
                            ) : field.type === "dropdown" ? (
                              <select
                                id={field.id}
                                className={`w-full p-2 border rounded-md text-sm${highlightMissing.includes(field.id) ? ' border-red-500' : ''}`}
                                value={formData[field.id] || field.options?.[0] || ""}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                              >
                                {field.options?.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : field.type === "multitag" ? (
                              <Input
                                id={field.id}
                                type="text"
                                placeholder={field.placeholder}
                                value={formData[field.id] || ""}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                className={`text-sm${highlightMissing.includes(field.id) ? ' border-red-500' : ''}`}
                              />
                              // TODO: Replace with a tag input component for better UX
                            ) : field.type === "toggle" ? (
                              <div className="flex items-center gap-2">
                                <input
                                  id={field.id}
                                  type="checkbox"
                                  checked={formData[field.id] === 'true'}
                                  onChange={(e) => handleInputChange(field.id, e.target.checked ? "true" : "")}
                                  className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded"
                                />
                                <Label htmlFor={field.id} className="text-sm font-normal cursor-pointer">
                                  {field.label}
                                </Label>
                              </div>
                            ) : (
                              <Input
                                id={field.id}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={formData[field.id] || ""}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                className="text-sm"
                              />
                            )}
                          </div>
                          {field.help && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {field.help}
                            </p>
                          )}
                        </motion.div>
                      ))}
                  </div>

                  {/* Render toggles in one row */}
                  {selectedPlatform.fields.some(f => f.id === 'postAsReel') && (
                    <div className="flex items-center gap-6 mb-2">
                      {["postAsReel", "postToFeed", "autoUploadAfterProcessing"].map((toggleId) => {
                        const field = selectedPlatform.fields.find(f => f.id === toggleId)
                        if (!field) return null
                        return (
                          <div key={toggleId} className="flex items-center gap-2 relative">
                            <input
                              id={field.id}
                              type="checkbox"
                              checked={formData[field.id] === 'true'}
                              onChange={(e) => handleInputChange(field.id, e.target.checked ? "true" : "")}
                              className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded"
                            />
                            <Label htmlFor={field.id} className="text-sm font-normal cursor-pointer">
                              {field.label}
                            </Label>
                            <button
                              type="button"
                              className="ml-1 text-muted-foreground hover:text-primary"
                              tabIndex={-1}
                              aria-label={`Info about ${field.label}`}
                              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                              onClick={() => {
                                toast({
                                  title: field.label,
                                  description:
                                    field.id === 'postAsReel'
                                      ? 'Enable to post as a Reel instead of a regular post.'
                                      : field.id === 'postToFeed'
                                      ? 'Enable to post to your main feed.'
                                      : 'Automatically upload after video is processed.',
                                  variant: 'default',
                                })
                              }}
                            >
                              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">i</text></svg>
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
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
          <Card className="h-fit min-w-[0] max-w-[340px] w-full">
            <CardHeader className="flex flex-row items-center justify-between p-2">
              <CardTitle className="text-base">How to get credentials</CardTitle>
              <Button
                variant="secondary"
                className="ml-auto font-semibold flex items-center gap-1 border-2 border-primary text-primary bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded-md shadow text-xs"
                onClick={() => setGuideOpen((open) => !open)}
                aria-expanded={guideOpen}
                aria-controls="platform-guide-panel"
              >
                {guideOpen ? 'Hide' : 'Show'}
                <span className={`transition-transform ${guideOpen ? 'rotate-180' : ''}`}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </Button>
            </CardHeader>
            <AnimatePresence initial={false}>
              {guideOpen && (
                <motion.div
                  id="platform-guide-panel"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
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
                              {selectedPlatform.guide.steps.map((step: string, index: number) => (
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
                              {selectedPlatform.guide.urls.map((link: any, index: number) => (
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
                              {selectedPlatform.guide.notes.map((note: string, index: number) => (
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
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>

      {/* Documentation Section - Instagram & Facebook Setup */}
      {showDocs && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <InstagramFacebookSetupDocs />
        </motion.div>
      )}
    </div>
  )
}
