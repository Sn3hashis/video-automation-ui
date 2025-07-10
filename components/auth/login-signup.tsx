"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { AuthLayout } from "./auth-layout"
import { SocialLogin } from "./social-login"
import { PasswordStrengthIndicator } from "./password-strength"
import { TwoFactorSetup } from "./two-factor-setup"
import { EmailVerification } from "./email-verification"
import { PasswordReset } from "./password-reset"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield } from "lucide-react"

type AuthMode = "login" | "signup" | "reset" | "verify" | "2fa-setup"

export function LoginSignup() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    rememberMe: false,
    acceptTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "password") {
      // Calculate password strength
      const password = value as string
      let strength = 0
      if (password.length >= 8) strength += 25
      if (/[A-Z]/.test(password)) strength += 25
      if (/[0-9]/.test(password)) strength += 25
      if (/[^A-Za-z0-9]/.test(password)) strength += 25
      setPasswordStrength(strength)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (mode === "signup") {
      setMode("verify")
    } else if (mode === "login") {
      // Check if 2FA is enabled (simulate)
      const has2FA = Math.random() > 0.5
      if (has2FA) {
        setMode("2fa-setup")
      } else {
        // Redirect to dashboard
        window.location.href = "/dashboard"
      }
    }

    setIsLoading(false)
  }

  const getTitle = () => {
    switch (mode) {
      case "login":
        return "Welcome Back"
      case "signup":
        return "Create Account"
      case "reset":
        return "Reset Password"
      case "verify":
        return "Verify Email"
      case "2fa-setup":
        return "Two-Factor Authentication"
      default:
        return "Welcome"
    }
  }

  const getSubtitle = () => {
    switch (mode) {
      case "login":
        return "Sign in to your account to continue"
      case "signup":
        return "Join thousands of creators automating their content"
      case "reset":
        return "Enter your email to reset your password"
      case "verify":
        return "Check your email for verification code"
      case "2fa-setup":
        return "Secure your account with two-factor authentication"
      default:
        return ""
    }
  }

  if (mode === "verify") {
    return (
      <AuthLayout title={getTitle()} subtitle={getSubtitle()}>
        <EmailVerification onBack={() => setMode("signup")} onComplete={() => setMode("login")} />
      </AuthLayout>
    )
  }

  if (mode === "2fa-setup") {
    return (
      <AuthLayout title={getTitle()} subtitle={getSubtitle()}>
        <TwoFactorSetup onComplete={() => (window.location.href = "/dashboard")} />
      </AuthLayout>
    )
  }

  if (mode === "reset") {
    return (
      <AuthLayout title={getTitle()} subtitle={getSubtitle()}>
        <PasswordReset onBack={() => setMode("login")} />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title={getTitle()} subtitle={getSubtitle()}>
      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="flex bg-muted rounded-lg p-1">
          <motion.button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              mode === "login" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setMode("login")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
          <motion.button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              mode === "signup" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setMode("signup")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign Up
          </motion.button>
        </div>

        {/* Social Login */}
        <SocialLogin />

        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-background px-2 text-xs text-muted-foreground">OR CONTINUE WITH EMAIL</span>
          </div>
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </motion.div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {mode === "signup" && formData.password && (
                <PasswordStrengthIndicator password={formData.password} strength={passwordStrength} />
              )}
            </div>

            {mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-600">Passwords do not match</p>
                )}
              </motion.div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Button type="button" variant="link" className="p-0 h-auto text-sm" onClick={() => setMode("reset")}>
                  Forgot password?
                </Button>
              </div>
            )}

            {mode === "signup" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Terms of Service
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Privacy Policy
                  </Button>
                </Label>
              </div>
            )}

            <Button
              type="submit"
              className="w-full gradient-primary"
              disabled={
                isLoading ||
                (mode === "signup" &&
                  (!formData.acceptTerms || formData.password !== formData.confirmPassword || passwordStrength < 50))
              }
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Signing In..." : "Creating Account..."}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </motion.form>
        </AnimatePresence>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" />
          <span>Protected by enterprise-grade security</span>
        </div>
      </div>
    </AuthLayout>
  )
}
