
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Building, ArrowLeft } from "lucide-react"
import React from "react"

export default function ForgotPasswordPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic (e.g., API call)
    console.log("Forgot password form submitted");
    // Show toast notification for success/error
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <main className="mx-auto w-full max-w-sm">
        <Card className="w-full shadow-xl">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <Building className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl font-bold text-primary">ProDash React</CardTitle>
            </div>
            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="pl-8"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 underline text-muted-foreground hover:text-primary"
              >
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
