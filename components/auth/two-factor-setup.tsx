"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Shield, Smartphone, Key, Copy, CheckCircle, ArrowRight } from "lucide-react"
import { AnimatePresence } from "framer-motion"

interface TwoFactorSetupProps {
  onComplete: () => void
}

export function TwoFactorSetup({ onComplete }: TwoFactorSetupProps) {
  const [step, setStep] = useState(1)
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [backupCodes] = useState([
    "1a2b-3c4d",
    "5e6f-7g8h",
    "9i0j-1k2l",
    "3m4n-5o6p",
    "7q8r-9s0t",
    "1u2v-3w4x",
    "5y6z-7a8b",
    "9c0d-1e2f",
  ])
  const [enable2FA, setEnable2FA] = useState(true)

  const qrCodeSecret = "JBSWY3DPEHPK3PXP"
  const qrCodeUrl = `otpauth://totp/ReelBrand%20Pro:user@example.com?secret=${qrCodeSecret}&issuer=ReelBrand%20Pro`

  const handleVerify = async () => {
    setIsVerifying(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success
    const isSuccess = verificationCode.length === 6

    if (isSuccess) {
      setStep(3)
    }

    setIsVerifying(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const copyAllBackupCodes = () => {
    const allCodes = backupCodes.join("\n")
    navigator.clipboard.writeText(allCodes)
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {i < step ? <CheckCircle className="h-4 w-4" /> : i}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Enable Two-Factor Authentication</h3>
              <p className="text-muted-foreground">Add an extra layer of security to your account with 2FA</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Use Google Authenticator, Authy, or similar apps</p>
                    </div>
                  </div>
                  <Switch checked={enable2FA} onCheckedChange={setEnable2FA} />
                </div>

                {enable2FA && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-4 border-t"
                  >
                    <p className="text-sm text-muted-foreground mb-4">
                      Scan the QR code with your authenticator app or enter the secret key manually.
                    </p>

                    <div className="flex flex-col items-center space-y-4">
                      {/* QR Code Placeholder */}
                      <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Key className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">QR Code</p>
                        </div>
                      </div>

                      <div className="w-full">
                        <Label className="text-sm">Secret Key</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input value={qrCodeSecret} readOnly className="font-mono text-sm" />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(qrCodeSecret)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            <Button onClick={() => setStep(2)} className="w-full" disabled={!enable2FA}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verify Setup</h3>
              <p className="text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="verification-code">Verification Code</Label>
                <Input
                  id="verification-code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="text-center text-lg font-mono tracking-widest"
                />
              </div>

              <Button onClick={handleVerify} className="w-full" disabled={verificationCode.length !== 6 || isVerifying}>
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  "Verify & Enable"
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">2FA Enabled Successfully!</h3>
              <p className="text-muted-foreground">Save these backup codes in a secure location</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Backup Codes</h4>
                  <Button variant="outline" size="sm" onClick={copyAllBackupCodes}>
                    <Copy className="mr-2 h-3 w-3" />
                    Copy All
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded font-mono text-sm"
                    >
                      <span>{code}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(code)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Important:</strong> Store these codes securely. Each code can only be used once to access
                    your account if you lose your authenticator device.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button onClick={onComplete} className="w-full gradient-primary">
              Continue to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
