"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Play,
  Instagram,
  Facebook,
  Youtube,
  Zap,
  Palette,
  BarChart3,
  Clock,
  Shield,
  Users,
  Star,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Zap,
    title: "Automated Branding",
    description: "Apply your brand elements automatically to every video with AI-powered positioning and timing.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Palette,
    title: "Custom Overlays",
    description: "Add logos, captions, and effects with pixel-perfect positioning and smooth animations.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track performance across all platforms with detailed insights and engagement metrics.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "Scheduled Publishing",
    description: "Queue and schedule your content across multiple platforms with optimal timing.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and secure API integrations to protect your content and data.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together with your team using shared workspaces and approval workflows.",
    color: "from-indigo-500 to-purple-500",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "ReelBrand Pro transformed my workflow. I can now brand 50+ videos in minutes instead of hours.",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Marketing Director",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "The analytics insights helped us increase engagement by 300%. Absolutely game-changing!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Social Media Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Multi-platform publishing has never been easier. The automation saves us 20 hours per week.",
    rating: 5,
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary" />
              <span className="text-xl font-bold">ReelBrand Pro</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">
                Testimonials
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="gradient-primary">
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 gradient-primary text-white">✨ Now with AI-powered branding</Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Automate Your Reels Like a Pro
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your video content with automated branding, multi-platform publishing, and advanced analytics.
              Scale your social media presence effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="gradient-primary text-lg px-8">
                <Play className="mr-2 h-5 w-5" />
                <Link href="/dashboard">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-600" />
                <span>Instagram</span>
              </div>
              <div className="flex items-center gap-2">
                <Facebook className="h-5 w-5 text-blue-600" />
                <span>Facebook</span>
              </div>
              <div className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-600" />
                <span>YouTube</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-blue-500/10 animate-float" />
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-purple-500/10 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-12 h-12 rounded-full bg-pink-500/10 animate-float"
          style={{ animationDelay: "4s" }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Scale</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for content creators, marketers, and agencies who want to automate their video
              branding workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="gradient-card border-0 h-full hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Content Creators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators who have transformed their workflow with ReelBrand Pro.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Content?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your free trial today and see how ReelBrand Pro can revolutionize your video branding workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-lg px-8">
                <Link href="/dashboard">Start Free Trial</Link>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Schedule Demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg gradient-primary" />
                <span className="text-xl font-bold">ReelBrand Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Automate your video branding and scale your social media presence with AI-powered tools.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ReelBrand Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
