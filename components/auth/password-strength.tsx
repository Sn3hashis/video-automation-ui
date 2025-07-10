"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface PasswordStrengthIndicatorProps {
  password: string
  strength: number
}

export function PasswordStrengthIndicator({ password, strength }: PasswordStrengthIndicatorProps) {
  const requirements = [
    { label: "At least 8 characters", test: password.length >= 8 },
    { label: "One uppercase letter", test: /[A-Z]/.test(password) },
    { label: "One number", test: /[0-9]/.test(password) },
    { label: "One special character", test: /[^A-Za-z0-9]/.test(password) },
  ]

  const getStrengthLabel = () => {
    if (strength < 25) return { label: "Weak", color: "destructive" }
    if (strength < 50) return { label: "Fair", color: "secondary" }
    if (strength < 75) return { label: "Good", color: "default" }
    return { label: "Strong", color: "default" }
  }

  const strengthInfo = getStrengthLabel()

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Password strength</span>
        <Badge variant={strengthInfo.color as any}>{strengthInfo.label}</Badge>
      </div>

      <Progress value={strength} className="h-2" />

      <div className="space-y-2">
        {requirements.map((req, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-sm"
          >
            {req.test ? <Check className="h-3 w-3 text-green-600" /> : <X className="h-3 w-3 text-muted-foreground" />}
            <span className={req.test ? "text-green-600" : "text-muted-foreground"}>{req.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
