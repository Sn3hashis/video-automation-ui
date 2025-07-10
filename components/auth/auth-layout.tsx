"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand Imagery */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/10 animate-float" />
          <div
            className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white/10 animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-white/10 animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Brand Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 mx-auto">
              <div className="h-8 w-8 rounded-lg bg-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">ReelBrand Pro</h1>
            <p className="text-xl text-white/90 mb-8 max-w-md">
              Automate your video branding and scale your social media presence with AI-powered tools
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <span>AI-Powered Branding</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <span>Multi-Platform Publishing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <span>Advanced Analytics</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-background to-muted/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
