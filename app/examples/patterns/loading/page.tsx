import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Suspense } from "react"

// Simulated slow component
async function SlowComponent({ delay }: { delay: number }) {
  await new Promise((resolve) => setTimeout(resolve, delay))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loaded Content</CardTitle>
        <CardDescription>This content took {delay / 1000}s to load</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This demonstrates how Suspense boundaries allow different parts of your UI to load independently, creating a
          better user experience.
        </p>
      </CardContent>
    </Card>
  )
}

// Loading skeleton
function LoadingSkeleton({ label }: { label: string }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  )
}

export default function LoadingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Loading States</h1>
          <p className="text-xl text-muted-foreground">Skeleton loaders and progressive loading with Suspense</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progressive Loading Demo</CardTitle>
              <CardDescription>Watch how different parts of the UI load independently</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Each card below has a different loading time. Notice how the page remains interactive while content
                loads progressively.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Suspense fallback={<LoadingSkeleton label="Fast Content" />}>
              <SlowComponent delay={1000} />
            </Suspense>

            <Suspense fallback={<LoadingSkeleton label="Medium Content" />}>
              <SlowComponent delay={2000} />
            </Suspense>

            <Suspense fallback={<LoadingSkeleton label="Slow Content" />}>
              <SlowComponent delay={3000} />
            </Suspense>

            <Suspense fallback={<LoadingSkeleton label="Very Slow Content" />}>
              <SlowComponent delay={4000} />
            </Suspense>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Loading State Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">✓ Use Skeleton Loaders</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Skeleton screens that match the shape of the final content reduce perceived loading time
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Progressive Loading</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Load critical content first, then progressively render less important sections
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Suspense Boundaries</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Place Suspense boundaries strategically to enable parallel loading of independent components
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Route-Level Loading</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use loading.tsx files for route-level loading states that appear instantly
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Meaningful Feedback</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Show progress indicators for long operations and provide time estimates when possible
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
