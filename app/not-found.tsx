"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold">404</span>
          </div>
          <CardTitle className="text-3xl">Page Not Found</CardTitle>
          <CardDescription className="text-lg">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="gap-2 w-full sm:w-auto">
                <Home className="w-4 h-4" /> Go Home
              </Button>
            </Link>
            <Link href="/examples">
              <Button variant="outline" className="gap-2 w-full sm:w-auto bg-transparent">
                <Search className="w-4 h-4" /> View Examples
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => window.history.back()} className="gap-2 w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold mb-3 text-center">Popular Pages</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href="/examples/forms/simple">
                <Button variant="ghost" className="w-full justify-start">
                  Simple Form Example
                </Button>
              </Link>
              <Link href="/examples/data/server-components">
                <Button variant="ghost" className="w-full justify-start">
                  Server Components
                </Button>
              </Link>
              <Link href="/examples/components/buttons">
                <Button variant="ghost" className="w-full justify-start">
                  Button Components
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="ghost" className="w-full justify-start">
                  Documentation
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
