"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useState } from "react"

function BuggyComponent({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error("This is a simulated error from the buggy component!")
  }

  return (
    <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/20 rounded-lg">
      <p className="text-green-900 dark:text-green-400 font-medium">✓ Component is working correctly</p>
    </div>
  )
}

export function ErrorBoundaryDemo() {
  const [shouldError, setShouldError] = useState(false)
  const [hasError, setHasError] = useState(false)

  function handleTriggerError() {
    setHasError(false)
    setShouldError(true)
  }

  function handleReset() {
    setShouldError(false)
    setHasError(false)
  }

  // Simple error boundary simulation with try-catch in render
  try {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Error Boundary Demo</CardTitle>
            <CardDescription>See how errors are caught and handled gracefully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button onClick={handleTriggerError} variant="destructive">
                Trigger Error
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>

            {!hasError && <BuggyComponent shouldError={shouldError} />}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                In production, errors would be caught by error.tsx files at the route level. This demo simulates that
                behavior.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    setHasError(true)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Boundary Demo</CardTitle>
          <CardDescription>An error occurred</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error instanceof Error ? error.message : "An unexpected error occurred"}
            </AlertDescription>
          </Alert>

          <Button onClick={handleReset}>Try Again</Button>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground font-mono">Error caught by error boundary pattern</p>
          </div>
        </CardContent>
      </Card>
    )
  }
}
