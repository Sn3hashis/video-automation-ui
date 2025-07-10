"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Upload,
  FileText,
  BarChart3,
  Users,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  Monitor,
  Menu,
  User,
  DollarSign,
  BookOpen,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Upload Studio", href: "/upload", icon: Upload },
  { name: "Upload Logs", href: "/upload-logs", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Accounts", href: "/accounts", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

const SidebarContent = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  pathname,
}: {
  sidebarCollapsed: boolean
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  pathname: string
}) => {
  const isAccountsActive = pathname.startsWith("/accounts")

  return (
    <div className="flex h-full flex-col relative">
      {/* Glass Sidebar Background */}
      <div className="absolute inset-0 glass-sidebar" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-glass-border">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl glass-effect flex items-center justify-center">
                <div className="h-4 w-4 rounded-lg gradient-primary" />
              </div>
              <span className="text-xl font-bold text-glass bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                ReelBrand Pro
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex glass-button border-0"
          >
            {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 space-y-2 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href === "/accounts" && isAccountsActive)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 rounded-2xl px-4 py-3 text-base font-medium apple-ease group relative overflow-hidden",
                  sidebarCollapsed ? "justify-center" : "",
                  isActive
                    ? "glass-card border-glass-border-strong text-primary shadow-glass-lg"
                    : "text-muted-foreground hover:text-foreground hover:glass-effect hover:shadow-glass-md",
                )}
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 apple-ease" />

                <item.icon
                  className={cn(
                    "apple-ease relative z-10",
                    sidebarCollapsed ? "h-6 w-6" : "h-5 w-5",
                    isActive ? "drop-shadow-lg" : "group-hover:scale-110",
                  )}
                />
                {!sidebarCollapsed && <span className="text-base font-medium relative z-10">{item.name}</span>}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  const getBreadcrumbs = () => {
    if (pathname.startsWith("/accounts/add")) {
      return "ReelBrand Pro / Accounts / Add New Account"
    }
    if (pathname.startsWith("/accounts")) {
      return "ReelBrand Pro / Accounts"
    }
    if (pathname.startsWith("/profile")) {
      return "ReelBrand Pro / Profile"
    }
    const currentPage = navigation.find((item) => item.href === pathname)?.name || "Dashboard"
    return `ReelBrand Pro / ${currentPage}`
  }

  const handleLogout = () => {
    console.log("Logging out...")
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col relative z-20 transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-20" : "w-64",
        )}
      >
        <SidebarContent
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          pathname={pathname}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 glass-modal border-0">
          <SidebarContent sidebarCollapsed={false} setSidebarCollapsed={setSidebarCollapsed} pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Navigation */}
        <header className="flex h-16 items-center justify-between px-4 relative">
          {/* Glass Header Background */}
          <div className="absolute inset-0 glass-header" />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden glass-button border-0">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 glass-modal border-0">
                <SidebarContent
                  sidebarCollapsed={false}
                  setSidebarCollapsed={setSidebarCollapsed}
                  pathname={pathname}
                />
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="bg-gradient-to-r from-foreground/80 to-foreground/60 bg-clip-text text-transparent font-medium">
                {getBreadcrumbs()}
              </span>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            {/* Enhanced Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-80 pl-10 glass-input border-0 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Theme Switch */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="glass-button border-0 glass-hover-lift">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-dropdown border-0 z-50">
                <DropdownMenuItem onClick={() => setTheme("light")} className="apple-ease">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="apple-ease">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="apple-ease">
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notification Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative glass-button border-0 glass-hover-lift">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs glass-badge border-0 gradient-primary text-white">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 glass-dropdown border-0 z-50">
                <div className="p-4 border-b border-glass-border">
                  <h4 className="font-semibold">Notifications</h4>
                  <p className="text-sm text-muted-foreground">You have 3 unread notifications</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <DropdownMenuItem className="p-4 apple-ease">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Upload completed</p>
                        <p className="text-xs text-muted-foreground">
                          Your video "Summer Campaign" has been uploaded successfully
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 apple-ease">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Account connected</p>
                        <p className="text-xs text-muted-foreground">Instagram account @mybrand has been connected</p>
                        <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 apple-ease">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Storage warning</p>
                        <p className="text-xs text-muted-foreground">You're using 85% of your storage space</p>
                        <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full glass-button border-0 glass-hover-lift p-0">
                  <Avatar className="h-8 w-8 ring-2 ring-glass-border">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="glass-effect border-0">SM</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-dropdown border-0 z-50">
                {/* User Info Header - Compact */}
                <div className="p-3 border-b border-glass-border">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 ring-1 ring-glass-border">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="glass-effect border-0 text-xs">SM</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">smm</p>
                      <p className="text-xs text-muted-foreground truncate">amit90917@gmail.com</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items - Compact */}
                <div className="p-1">
                  <DropdownMenuItem asChild className="apple-ease">
                    <Link href="/profile" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="apple-ease">
                    <Link href="/settings" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg apple-ease">
                    <DollarSign className="h-4 w-4" />
                    Pricing
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg apple-ease">
                    <BookOpen className="h-4 w-4" />
                    Documentation
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg apple-ease">
                    <HelpCircle className="h-4 w-4" />
                    Feedback
                  </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="bg-glass-border" />

                {/* Theme Toggle - Compact */}
                <div className="p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <div className="flex items-center gap-1 glass-effect rounded-lg p-0.5">
                      <Button
                        variant={theme === "light" ? "default" : "ghost"}
                        size="icon"
                        className="h-5 w-5 glass-button border-0"
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="h-3 w-3" />
                      </Button>
                      <Button
                        variant={theme === "system" ? "default" : "ghost"}
                        size="icon"
                        className="h-5 w-5 glass-button border-0"
                        onClick={() => setTheme("system")}
                      >
                        <Monitor className="h-3 w-3" />
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "ghost"}
                        size="icon"
                        className="h-5 w-5 glass-button border-0"
                        onClick={() => setTheme("dark")}
                      >
                        <Moon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator className="bg-glass-border" />

                {/* Sign Out */}
                <div className="p-1">
                  <DropdownMenuItem
                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 focus:text-red-600 rounded-lg apple-ease"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 relative">
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
