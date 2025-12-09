import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Users, TrendingUp, Activity } from "lucide-react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Simulated async data fetching
async function getStats() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    users: 1234,
    revenue: 45678,
    activeUsers: 567,
    growth: 12.5,
  }
}

async function getRecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return [
    { id: 1, user: "Alice Johnson", action: "Created new project", time: "2 min ago" },
    { id: 2, user: "Bob Smith", action: "Updated profile", time: "5 min ago" },
    { id: 3, user: "Carol White", action: "Completed task", time: "10 min ago" },
    { id: 4, user: "David Brown", action: "Added comment", time: "15 min ago" },
  ]
}

// Server Component that fetches data
async function StatsCards() {
  const stats = await getStats()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.users.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+{stats.growth}% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground">Users online</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{stats.growth}%</div>
          <p className="text-xs text-muted-foreground">Month over month</p>
        </CardContent>
      </Card>
    </div>
  )
}

async function ActivityFeed() {
  const activities = await getRecentActivity()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest user actions in your application</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {activity.time}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Loading fallbacks
function StatsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ActivityLoading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-start gap-4">
            <Skeleton className="w-2 h-2 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function ServerComponentsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Server Components</h1>
          <p className="text-xl text-muted-foreground">
            Fetch data directly in components with automatic caching and streaming
          </p>
        </div>

        <div className="space-y-8">
          <Suspense fallback={<StatsLoading />}>
            <StatsCards />
          </Suspense>

          <Suspense fallback={<ActivityLoading />}>
            <ActivityFeed />
          </Suspense>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">✓ Async Server Components</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Components can be async and fetch data directly without useEffect or state management
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Automatic Caching</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Next.js automatically caches fetch requests for optimal performance
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Streaming with Suspense</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Different parts of the page load independently, showing loading states progressively
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Zero Client JavaScript</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Server Components don't ship any JavaScript to the client by default
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
