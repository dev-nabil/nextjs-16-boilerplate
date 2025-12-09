"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useState } from "react"

export default function RouteHandlersPage() {
  const [getResult, setGetResult] = useState<any>(null)
  const [postResult, setPostResult] = useState<any>(null)
  const [loading, setLoading] = useState<{ get: boolean; post: boolean }>({
    get: false,
    post: false,
  })
  const [name, setName] = useState("")

  async function handleGet() {
    setLoading((prev) => ({ ...prev, get: true }))
    try {
      const response = await fetch("/api/hello")
      const data = await response.json()
      setGetResult(data)
    } catch (error) {
      setGetResult({ error: "Failed to fetch" })
    } finally {
      setLoading((prev) => ({ ...prev, get: false }))
    }
  }

  async function handlePost(e: React.FormEvent) {
    e.preventDefault()
    setLoading((prev) => ({ ...prev, post: true }))
    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      const data = await response.json()
      setPostResult(data)
    } catch (error) {
      setPostResult({ error: "Failed to post" })
    } finally {
      setLoading((prev) => ({ ...prev, post: false }))
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Route Handlers</h1>
          <p className="text-xl text-muted-foreground">API routes with GET, POST, PUT, DELETE operations</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>GET Request</CardTitle>
                <Badge variant="secondary">GET</Badge>
              </div>
              <CardDescription>Fetch data from the API endpoint</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleGet} disabled={loading.get} className="w-full">
                {loading.get ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching...
                  </>
                ) : (
                  "Fetch Data"
                )}
              </Button>

              {getResult && (
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs overflow-auto">{JSON.stringify(getResult, null, 2)}</pre>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>POST Request</CardTitle>
                <Badge variant="secondary">POST</Badge>
              </div>
              <CardDescription>Send data to the API endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePost} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <Button type="submit" disabled={loading.post} className="w-full">
                  {loading.post ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Data"
                  )}
                </Button>

                {postResult && (
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-xs overflow-auto">{JSON.stringify(postResult, null, 2)}</pre>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Implementation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">✓ Type-Safe Responses</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                NextResponse provides type-safe JSON responses with proper status codes
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Error Handling</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Graceful error handling with try-catch and appropriate HTTP status codes
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Request Validation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Validate incoming data before processing to ensure data integrity
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ RESTful Design</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Follows REST conventions with proper HTTP methods and status codes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
