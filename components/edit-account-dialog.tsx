"use client"

import type React from "react"

import { type FC, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Instagram,
  User,
  Hash,
  Calendar,
  Mail,
  MessageSquare,
  Settings,
  Upload,
  Clock,
  Loader2,
  Save,
  Key,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EditAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  accountId: string | null
  onSave?: () => void
}

const EditAccountDialog: FC<EditAccountDialogProps> = ({ open, onOpenChange, accountId, onSave }) => {
  const [form, setForm] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (open && accountId) {
      setLoading(true)
      fetch(process.env.NEXT_PUBLIC_API_URL + `/accounts/${accountId}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .finally(() => setLoading(false))
    }
  }, [open, accountId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setForm((prev: any) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard",
        description: "Access token has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the text manually.",
        variant: "destructive",
      })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + `/accounts/${accountId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      toast({
        title: "Account updated",
        description: "Your account settings have been saved successfully.",
      })
      onSave?.()
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save account:", error)
      toast({
        title: "Error",
        description: "Failed to save account settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-modal border-0 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg">
              <Instagram className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Edit Instagram Account
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">Update your account settings and preferences</p>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading account details...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Account Information */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-blue-600" />
                  <h3 className="font-semibold">Account Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram_username" className="text-sm font-medium">
                      Instagram Username
                    </Label>
                    <Input
                      id="instagram_username"
                      name="instagram_username"
                      value={form.instagram_username || ""}
                      onChange={handleChange}
                      placeholder="@username"
                      className="glass-input border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram_id" className="text-sm font-medium">
                      Instagram ID
                    </Label>
                    <Input
                      id="instagram_id"
                      name="instagram_id"
                      value={form.instagram_id || ""}
                      onChange={handleChange}
                      placeholder="17841400000000000"
                      className="glass-input border-0"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="page_id" className="text-sm font-medium">
                      Page ID
                    </Label>
                    <Input
                      id="page_id"
                      name="page_id"
                      value={form.page_id || ""}
                      onChange={handleChange}
                      placeholder="1234567890"
                      className="glass-input border-0"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reminder_email" className="text-sm font-medium">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Reminder Email
                    </Label>
                    <Input
                      id="reminder_email"
                      name="reminder_email"
                      type="email"
                      value={form.reminder_email || ""}
                      onChange={handleChange}
                      placeholder="user@example.com"
                      className="glass-input border-0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Access Token & Expiry */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Key className="h-4 w-4 text-green-600" />
                  <h3 className="font-semibold">Access Token & Authentication</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="access_token" className="text-sm font-medium">
                      Access Token
                    </Label>
                    <div className="relative">
                      <Input
                        id="access_token"
                        name="access_token"
                        type={showToken ? "text" : "password"}
                        value={form.access_token || ""}
                        onChange={handleChange}
                        placeholder="Enter your Facebook/Instagram access token"
                        className="glass-input border-0 pr-20"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setShowToken(!showToken)}
                        >
                          {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        {form.access_token && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(form.access_token)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This token is used to authenticate API requests to Instagram/Facebook
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="token_expiry_date" className="text-sm font-medium">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Token Expiry Date
                    </Label>
                    <Input
                      id="token_expiry_date"
                      name="token_expiry_date"
                      type="date"
                      value={form.token_expiry_date || ""}
                      onChange={handleChange}
                      className="glass-input border-0"
                    />
                    <p className="text-xs text-muted-foreground">
                      Set when your access token expires to receive renewal reminders
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Settings */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                  <h3 className="font-semibold">Content Settings</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="caption_template" className="text-sm font-medium">
                      Caption Template
                    </Label>
                    <Textarea
                      id="caption_template"
                      name="caption_template"
                      value={form.caption_template || ""}
                      onChange={handleChange}
                      placeholder="Enter your default caption template..."
                      className="glass-input border-0 min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hashtag_presets" className="text-sm font-medium">
                      <Hash className="h-4 w-4 inline mr-1" />
                      Hashtag Presets
                    </Label>
                    <Input
                      id="hashtag_presets"
                      name="hashtag_presets"
                      value={form.hashtag_presets || ""}
                      onChange={handleChange}
                      placeholder="#motivation #life #inspiration"
                      className="glass-input border-0"
                    />
                    <p className="text-xs text-muted-foreground">Separate hashtags with spaces</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Settings */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-4 w-4 text-orange-600" />
                  <h3 className="font-semibold">Upload Settings</h3>
                </div>
                <div className="space-y-6">
                  {/* Post Type Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Post as Reel</Label>
                        <p className="text-xs text-muted-foreground">Upload videos as Instagram Reels</p>
                      </div>
                      <Switch
                        checked={!!form.post_as_reel}
                        onCheckedChange={(checked) => handleSwitchChange("post_as_reel", checked)}
                      />
                    </div>
                    <Separator className="opacity-50" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Post to Feed</Label>
                        <p className="text-xs text-muted-foreground">Also post content to main Instagram feed</p>
                      </div>
                      <Switch
                        checked={!!form.post_to_feed}
                        onCheckedChange={(checked) => handleSwitchChange("post_to_feed", checked)}
                      />
                    </div>
                    <Separator className="opacity-50" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">
                          <Upload className="h-4 w-4 inline mr-1" />
                          Auto Upload
                        </Label>
                        <p className="text-xs text-muted-foreground">Automatically upload content at scheduled times</p>
                      </div>
                      <Switch
                        checked={!!form.auto_upload}
                        onCheckedChange={(checked) => handleSwitchChange("auto_upload", checked)}
                      />
                    </div>
                  </div>

                  {/* Upload Time */}
                  <div className="space-y-2">
                    <Label htmlFor="preferred_upload_time" className="text-sm font-medium">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Preferred Upload Time
                    </Label>
                    <Input
                      id="preferred_upload_time"
                      name="preferred_upload_time"
                      type="time"
                      value={form.preferred_upload_time || ""}
                      onChange={handleChange}
                      className="glass-input border-0"
                    />
                    <p className="text-xs text-muted-foreground">Set your preferred time for automatic uploads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <DialogFooter className="pt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="glass-button border-0"
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || saving}
            className="glass-button border-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditAccountDialog
