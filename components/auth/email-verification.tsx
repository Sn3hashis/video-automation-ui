"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, RefreshCw } from "lucide-react"

interface EmailVerificationProps {
  onBack: () => void
  onComplete: () => void
}

export function EmailVerification({ onBack, onComplete }: EmailVerificationProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }

    // Auto-verify when all fields are filled
    if (newCode.every((digit) => digit !== "") && !isVerifying) {
      handleVerify(newCode.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = async (verificationCode?: string) => {
    setIsVerifying(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success (90% success rate)
    const isSuccess = Math.random() > 0.1

    if (isSuccess) {
      onComplete()
    } else {
      // Reset code on failure
      setCode(["", "", "", "", "", ""])
      const firstInput = document.getElementById("code-0")
      firstInput?.focus()
    }

    setIsVerifying(false)
  }

  const handleResend = async () => {
    setIsResending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsResending(false)
    setCanResend(false)
    setCountdown(60)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <p className="text-muted-foreground">
          We've sent a 6-digit verification code to your email address. Enter it below to verify your account.
        </p>
      </motion.div>

      <div className="space-y-4">
        <Label className="text-center block">Verification Code</Label>
        <div className="flex gap-2 justify-center">
          {code.map((digit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Input
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
                disabled={isVerifying}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {isVerifying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          Verifying code...
        </motion.div>
      )}

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Didn't receive the code?</p>
        <Button
          type="button"
          variant="link"
          onClick={handleResend}
          disabled={!canResend || isResending}
          className="p-0 h-auto"
        >
          {isResending ? (
            <div className="flex items-center gap-2">
              <RefreshCw className="h-3 w-3 animate-spin" />
              Resending...
            </div>
          ) : canResend ? (
            "Resend code"
          ) : (
            `Resend in ${countdown}s`
          )}
        </Button>
      </div>

      <Button type="button" variant="ghost" onClick={onBack} className="w-full">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Sign Up
      </Button>
    </div>
  )
}
