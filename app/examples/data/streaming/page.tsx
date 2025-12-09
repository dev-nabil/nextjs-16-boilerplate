import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import { Suspense } from "react"

// Simulated slow data fetch
async function getSlowData(delay: number, label: string) {
  await new Promise((resolve) => setTimeout(resolve, delay))
  return {
    label,
    timestamp: new Date().toISOString(),
    data: Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      title: `${label} Item ${i + 1}`,
      description: `This is a sample item from ${label}`,
    })),
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
}

async function FastComponent() {
  const data = await getSlowData(500, "Fast Section")
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {data.label}
          <Clock className="w-4 h-4 text-green-500" />
        </CardTitle>
        <CardDescription>Loaded in 0.5s</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.data.map((item) => (
            <div key={item.id} className="p-3 rounded-lg border">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

async function MediumComponent() {
  const data = await getSlowData(1500, "Medium Section")
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {data.label}
          <Clock className="w-4 h-4 text-yellow-500" />
        </CardTitle>
        <CardDescription>Loaded in 1.5s</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.data.map((item) => (
            <div key={item.id} className="p-3 rounded-lg border">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

async function SlowComponent() {
  const data = await getSlowData(3000, "Slow Section")
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {data.label}
          <Clock className="w-4 h-4 text-red-500" />
        </CardTitle>
        <CardDescription>Loaded in 3s</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.data.map((item) => (
            <div key={item.id} className="p-3 rounded-lg border">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function StreamingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Streaming & Suspense</h1>
          <p className="text-muted-foreground">
            Progressive loading with React Suspense - components stream in as data becomes available
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<LoadingSkeleton />}>
            <FastComponent />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton />}>
            <MediumComponent />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton />}>
            <SlowComponent />
          </Suspense>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How Streaming Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Benefits:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Faster Time to First Byte (TTFB)</li>
                <li>Progressive rendering - show content as it becomes available</li>
                <li>Better perceived performance</li>
                <li>Automatic loading states with Suspense boundaries</li>
                <li>No client-side JavaScript needed for streaming</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Implementation:</h3>
              <p className="text-sm text-muted-foreground">
                Each component is wrapped in a Suspense boundary. Fast data loads immediately, while slower data streams
                in later without blocking the initial render.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
