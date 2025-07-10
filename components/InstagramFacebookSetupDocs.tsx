"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Copy,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Info,
  Code,
  Shield,
  Instagram,
  Facebook,
  BookOpen,
  Terminal,
  Globe,
} from "lucide-react"

const steps = [
  {
    id: "create-app",
    title: "Create Facebook App",
    description: "Set up your Facebook application in the Developer Console",
    icon: Facebook,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "add-products",
    title: "Add Products",
    description: "Configure Instagram Graph API and Facebook Login",
    icon: Instagram,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "oauth-settings",
    title: "OAuth Settings",
    description: "Configure authentication and redirect URIs",
    icon: Shield,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "get-tokens",
    title: "Get Access Tokens",
    description: "Generate and exchange tokens for API access",
    icon: Code,
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "test-setup",
    title: "Test & Validate",
    description: "Verify your setup with test API calls",
    icon: CheckCircle,
    color: "from-orange-500 to-amber-500",
  },
]

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "https://graph.facebook.com/v19.0/me/accounts",
    description: "Get Page Access Token",
    params: "access_token={USER_ACCESS_TOKEN}",
  },
  {
    method: "GET",
    endpoint: "https://graph.facebook.com/v19.0/{PAGE_ID}",
    description: "Get Instagram Business ID",
    params: "fields=connected_instagram_account&access_token={PAGE_ACCESS_TOKEN}",
  },
  {
    method: "GET",
    endpoint: "https://graph.facebook.com/v19.0/{IG_ID}",
    description: "Get Instagram Profile Info",
    params: "fields=username,profile_picture_url&access_token={PAGE_ACCESS_TOKEN}",
  },
  {
    method: "GET",
    endpoint: "https://graph.facebook.com/debug_token",
    description: "Check Token Expiry",
    params: "input_token={ACCESS_TOKEN}&access_token={APP_ID}|{APP_SECRET}",
  },
]

const permissions = [
  "pages_show_list",
  "pages_read_engagement",
  "pages_read_user_content",
  "instagram_basic",
  "instagram_content_publish",
  "pages_manage_metadata",
  "pages_manage_posts",
  "public_profile",
]

export default function InstagramFacebookSetupDocs() {
  const [activeStep, setActiveStep] = useState("create-app")
  const [copiedText, setCopiedText] = useState("")
  const { toast } = useToast()

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      toast({
        title: "Copied to clipboard",
        description: `${label} has been copied to your clipboard.`,
      })
      setTimeout(() => setCopiedText(""), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the text manually.",
        variant: "destructive",
      })
    }
  }

  const CodeBlock = ({ children, language = "bash", copyable = true }: any) => (
    <div className="relative group">
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border">
        <code className={`language-${language}`}>{children}</code>
      </pre>
      {copyable && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 bg-slate-800 hover:bg-slate-700"
          onClick={() => copyToClipboard(children, "Code")}
        >
          {copiedText === children ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <Instagram className="h-8 w-8" />
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <Facebook className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Instagram & Facebook
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Credentials Setup
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Complete guide to get all required credentials and data from Facebook and Instagram Graph API for your
              application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <BookOpen className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Facebook Developers
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Prerequisites */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Info className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Prerequisites</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Required Accounts
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Facebook Developer Account
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Facebook Page (admin access)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Instagram Business Account
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Instagram linked to Facebook Page
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      onClick={() => window.open("https://developers.facebook.com/", "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Facebook Developers Console
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      onClick={() => window.open("https://developers.facebook.com/tools/explorer/", "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Graph API Explorer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Step-by-Step Guide */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Step-by-Step Instructions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these steps to set up your Facebook app and get all the required credentials for Instagram and
              Facebook integration.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Step Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-2">
                {steps.map((step, index) => (
                  <Button
                    key={step.id}
                    variant={activeStep === step.id ? "default" : "ghost"}
                    className={`w-full justify-start h-auto p-4 ${
                      activeStep === step.id ? "glass-card border-0" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          activeStep === step.id
                            ? `bg-gradient-to-r ${step.color} text-white`
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <step.icon className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm">Step {index + 1}</div>
                        <div className="text-xs opacity-80">{step.title}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeStep} onValueChange={setActiveStep}>
                <TabsContent value="create-app" className="space-y-6">
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                          <Facebook className="h-5 w-5" />
                        </div>
                        Step 1: Create Facebook App
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ol className="space-y-4">
                        <li className="flex gap-4">
                          <Badge className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center">1</Badge>
                          <div>
                            <p className="font-medium">Go to Facebook App Dashboard</p>
                            <p className="text-sm text-muted-foreground">
                              Visit the Facebook Developers Console and sign in with your account.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <Badge className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center">2</Badge>
                          <div>
                            <p className="font-medium">Click Create App</p>
                            <p className="text-sm text-muted-foreground">
                              Select "Business" as the app type for commercial use.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <Badge className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center">3</Badge>
                          <div>
                            <p className="font-medium">Fill in App Details</p>
                            <div className="mt-2 space-y-2">
                              <div className="p-3 bg-muted rounded-lg">
                                <p className="text-sm font-medium">App Name</p>
                                <p className="text-sm text-muted-foreground">Choose a descriptive name for your app</p>
                              </div>
                              <div className="p-3 bg-muted rounded-lg">
                                <p className="text-sm font-medium">Contact Email</p>
                                <p className="text-sm text-muted-foreground">Your business email address</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add-products" className="space-y-6">
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                          <Instagram className="h-5 w-5" />
                        </div>
                        Step 2: Add Products to Your App
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          You need to add both Instagram Graph API and Facebook Login products to enable full
                          functionality.
                        </AlertDescription>
                      </Alert>
                      <ol className="space-y-4">
                        <li className="flex gap-4">
                          <Badge className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center">1</Badge>
                          <div>
                            <p className="font-medium">Navigate to Products Section</p>
                            <p className="text-sm text-muted-foreground">
                              In your app dashboard, find the "Add a Product" section.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <Badge className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center">2</Badge>
                          <div>
                            <p className="font-medium">Add Instagram Graph API</p>
                            <p className="text-sm text-muted-foreground">
                              Click "Set Up" for Instagram Graph API to enable Instagram integration.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <Badge className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center">3</Badge>
                          <div>
                            <p className="font-medium">Add Facebook Login</p>
                            <p className="text-sm text-muted-foreground">
                              Click "Set Up" for Facebook Login to enable authentication.
                            </p>
                          </div>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="oauth-settings" className="space-y-6">
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                          <Shield className="h-5 w-5" />
                        </div>
                        Step 3: Configure OAuth Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ol className="space-y-4">
                        <li className="flex gap-4">
                          <Badge className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center">1</Badge>
                          <div>
                            <p className="font-medium">Go to Facebook Login Settings</p>
                            <p className="text-sm text-muted-foreground">
                              Navigate to Facebook Login → Settings in your app dashboard.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <Badge className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center">2</Badge>
                          <div>
                            <p className="font-medium">Set Valid OAuth Redirect URIs</p>
                            <div className="mt-2">
                              <CodeBlock language="text">https://reelbrandpro.com/auth/callback</CodeBlock>
                            </div>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <Badge className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center">3</Badge>
                          <div>
                            <p className="font-medium">Enable Client OAuth Settings</p>
                            <p className="text-sm text-muted-foreground">
                              Leave default client-side redirect settings enabled for development.
                            </p>
                          </div>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="get-tokens" className="space-y-6">
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white">
                          <Code className="h-5 w-5" />
                        </div>
                        Step 4: Get Access Tokens
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">4.1 Get App Credentials</h3>
                        <p className="text-sm text-muted-foreground">
                          From App → Settings → Basic, copy your App ID and App Secret:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="font-medium text-sm">App ID</p>
                            <p className="text-xs text-muted-foreground">Use this to identify your app</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="font-medium text-sm">App Secret</p>
                            <p className="text-xs text-muted-foreground">Used to exchange tokens</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-semibold">4.2 Get User Access Token</h3>
                        <ol className="space-y-3">
                          <li className="flex gap-3">
                            <Badge className="min-w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                              1
                            </Badge>
                            <p className="text-sm">Go to Graph API Explorer</p>
                          </li>
                          <li className="flex gap-3">
                            <Badge className="min-w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                              2
                            </Badge>
                            <p className="text-sm">Select your App from dropdown</p>
                          </li>
                          <li className="flex gap-3">
                            <Badge className="min-w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                              3
                            </Badge>
                            <p className="text-sm">Click "Get User Access Token"</p>
                          </li>
                          <li className="flex gap-3">
                            <Badge className="min-w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                              4
                            </Badge>
                            <div className="flex-1">
                              <p className="text-sm mb-2">Choose required permissions:</p>
                              <div className="grid grid-cols-2 gap-2">
                                {permissions.map((permission) => (
                                  <Badge key={permission} variant="outline" className="text-xs">
                                    {permission}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-semibold">4.3 Get Page Access Token</h3>
                        <p className="text-sm text-muted-foreground">
                          Make this API call to get your page access token:
                        </p>
                        <CodeBlock language="http">
                          GET https://graph.facebook.com/v19.0/me/accounts?access_token={"{USER_ACCESS_TOKEN}"}
                        </CodeBlock>
                        <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                            ✅ Expected Response:
                          </p>
                          <CodeBlock language="json">
                            {`{
  "data": [
    {
      "id": "1234567890",
      "name": "My Page",
      "access_token": "EAA...",
      "category": "Product/Service"
    }
  ]
}`}
                          </CodeBlock>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-semibold">4.4 Get Instagram Business ID</h3>
                        <CodeBlock language="http">
                          GET https://graph.facebook.com/v19.0/{"{PAGE_ID}"}
                          ?fields=connected_instagram_account&access_token=
                          {"{PAGE_ACCESS_TOKEN}"}
                        </CodeBlock>
                        <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                            ✅ Expected Response:
                          </p>
                          <CodeBlock language="json">
                            {`{
  "connected_instagram_account": {
    "id": "17841400000000000"
  },
  "id": "1234567890"
}`}
                          </CodeBlock>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="test-setup" className="space-y-6">
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        Step 5: Test & Validate Setup
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertDescription>
                          Use these test endpoints in Graph API Explorer to verify your setup is working correctly.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <h3 className="font-semibold">Test Endpoints</h3>
                        <div className="space-y-4">
                          {apiEndpoints.map((endpoint, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{endpoint.method}</Badge>
                                <p className="font-medium text-sm">{endpoint.description}</p>
                              </div>
                              <CodeBlock language="http">
                                {endpoint.method} {endpoint.endpoint}?{endpoint.params}
                              </CodeBlock>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-semibold">Final JSON Structure</h3>
                        <p className="text-sm text-muted-foreground">
                          Store all credentials in this format in your backend:
                        </p>
                        <CodeBlock language="json">
                          {`{
  "id": "insta_17841400000000000",
  "platform": "instagram",
  "instagram_username": "myinsta",
  "instagram_id": "17841400000000000",
  "page_id": "1234567890",
  "token_expiry_date": "2025-08-01",
  "reminder_email": "user@example.com",
  "hashtag_presets": "#motivation #life"
}`}
                        </CodeBlock>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.section>

        {/* Important Notes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                Important Notes & Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-green-600 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />✅ Do This
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      Store page_id, instagram_id, and access_token securely
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      Refresh tokens before they expire
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      Use long-lived tokens or implement webhooks
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      Always use Page Access Token for posting
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />🔥 Important Notes
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      Instagram must be a Business account, not Creator/Personal
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      Long-lived tokens expire every 60 days and need refresh
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      Instagram must be connected to a Facebook Page
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      Never use User Access Token for posting Reels
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Quick Actions */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => window.open("https://developers.facebook.com/", "_blank")}
                >
                  <ExternalLink className="h-6 w-6" />
                  <span>Facebook Developers</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => window.open("https://developers.facebook.com/tools/explorer/", "_blank")}
                >
                  <Terminal className="h-6 w-6" />
                  <span>Graph API Explorer</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => copyToClipboard("https://reelbrandpro.com/auth/callback", "Redirect URI")}
                >
                  <Copy className="h-6 w-6" />
                  <span>Copy Redirect URI</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
