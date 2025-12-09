import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ErrorBoundaryDemo } from "@/components/examples/error-boundary-demo"

export default function ErrorHandlingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Error Handling</h1>
          <p className="text-xl text-muted-foreground">Graceful error handling with error boundaries and recovery</p>
        </div>

        <div className="space-y-6">
          <ErrorBoundaryDemo />

          <Card>
            <CardHeader>
              <CardTitle>Error Handling Strategies</CardTitle>
              <CardDescription>Best practices for handling errors in Next.js</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">✓ Error Boundaries (error.tsx)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Catch React errors at the route level with error.tsx files. Provides automatic error UI with reset
                  functionality.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Try-Catch in Server Actions</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wrap Server Actions in try-catch blocks to handle errors gracefully and return user-friendly error
                  messages.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Loading States</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Show loading indicators during async operations to provide feedback and prevent duplicate submissions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ User-Friendly Messages</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Display clear, actionable error messages that help users understand what went wrong and how to fix it.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Logging and Monitoring</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Log errors to monitoring services (Sentry, LogRocket) for debugging and tracking issues in production.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Network Errors</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Handle failed API requests with retry logic and fallback UI. Show offline indicators when network is
                  unavailable.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Validation Errors</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Display field-level validation errors from Zod schemas. Highlight invalid fields and provide clear
                  correction guidance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Server Errors</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Show generic error messages for 500 errors. Log detailed error information for debugging without
                  exposing internals.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Not Found Errors</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use not-found.tsx for custom 404 pages. Provide helpful navigation options to recover from missing
                  resources.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
