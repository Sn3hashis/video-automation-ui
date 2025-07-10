"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"

interface PasswordResetProps {
  onBack: () => void
}

export function PasswordReset({ onBack }: PasswordResetProps) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success/failure
    const isSuccess = Math.random() > 0.2 // 80% success rate

    if (isSuccess) {
      setStep(2)
    } else {
      setError("Email address not found. Please check and try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">{error}</span>
                </motion.div>
              )}

              <Button type="submit" className="w-full gradient-primary" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Reset Link...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            <Button type="button" variant="ghost" onClick={onBack} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-950/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
              <p className="text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or{" "}
                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => setStep(1)}>
                  try again
                </Button>
              </p>
            </div>

            <Button type="button" variant="ghost" onClick={onBack} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
