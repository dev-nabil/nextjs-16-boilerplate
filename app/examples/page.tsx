import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, Code2, Sparkles } from "lucide-react"

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Example Gallery</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive examples covering every use case you'll encounter
          </p>
        </div>

        <Tabs defaultValue="forms" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="data">Data Fetching</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {formExamples.map((example) => (
                <Link key={example.href} href={example.href}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{example.title}</CardTitle>
                          <CardDescription className="mt-2">{example.description}</CardDescription>
                        </div>
                        {example.new && (
                          <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            <Sparkles className="w-3 h-3" /> New
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Code2 className="w-4 h-4" />
                        <span>{example.tech}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {dataExamples.map((example) => (
                <Link key={example.href} href={example.href}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer hover:border-primary/50">
                    <CardHeader>
                      <CardTitle>{example.title}</CardTitle>
                      <CardDescription className="mt-2">{example.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Code2 className="w-4 h-4" />
                        <span>{example.tech}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {componentExamples.map((example) => (
                <Link key={example.href} href={example.href}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer hover:border-primary/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {patternExamples.map((example) => (
                <Link key={example.href} href={example.href}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer hover:border-primary/50">
                    <CardHeader>
                      <CardTitle>{example.title}</CardTitle>
                      <CardDescription className="mt-2">{example.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Code2 className="w-4 h-4" />
                        <span>{example.tech}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

const formExamples = [
  {
    title: "Simple Contact Form",
    description: "Basic form with client-side validation and Server Actions",
    href: "/examples/forms/simple",
    tech: "Server Actions + Zod",
    new: false,
  },
  {
    title: "Advanced Form with React Hook Form",
    description: "Complex form with field arrays, conditional fields, and async validation",
    href: "/examples/forms/advanced",
    tech: "React Hook Form + Zod",
    new: true,
  },
  {
    title: "Multi-Step Form",
    description: "Wizard-style form with progress tracking and state persistence",
    href: "/examples/forms/multi-step",
    tech: "useFormState + Server Actions",
    new: false,
  },
  {
    title: "File Upload Form",
    description: "File uploads with preview, validation, and progress tracking",
    href: "/examples/forms/file-upload",
    tech: "FormData + Server Actions",
    new: true,
  },
]

const dataExamples = [
  {
    title: "Server Components",
    description: "Fetch data directly in components with automatic caching",
    href: "/examples/data/server-components",
    tech: "Async Server Components",
  },
  {
    title: "Route Handlers",
    description: "API routes with GET, POST, PUT, DELETE operations",
    href: "/examples/data/route-handlers",
    tech: "Route Handlers API",
  },
  {
    title: "Streaming & Suspense",
    description: "Progressive data loading with React Suspense boundaries",
    href: "/examples/data/streaming",
    tech: "Streaming SSR",
  },
  {
    title: "Server Actions Mutations",
    description: "Data mutations with optimistic updates and revalidation",
    href: "/examples/data/mutations",
    tech: "Server Actions + revalidateTag",
  },
]

const componentExamples = [
  {
    title: "Buttons & Actions",
    description: "All button variants and loading states",
    href: "/examples/components/buttons",
  },
  {
    title: "Cards & Layouts",
    description: "Card patterns for different content types",
    href: "/examples/components/cards",
  },
  {
    title: "Dialogs & Modals",
    description: "Modal patterns with form handling",
    href: "/examples/components/dialogs",
  },
  {
    title: "Data Tables",
    description: "Sortable, filterable tables with pagination",
    href: "/examples/components/tables",
  },
  {
    title: "Navigation",
    description: "Menus, sidebars, and breadcrumbs",
    href: "/examples/components/navigation",
  },
  {
    title: "Charts & Graphs",
    description: "Data visualization with Recharts",
    href: "/examples/components/charts",
  },
]

const patternExamples = [
  {
    title: "Error Handling",
    description: "Global and route-specific error boundaries with recovery",
    href: "/examples/patterns/error-handling",
    tech: "error.tsx + try/catch",
  },
  {
    title: "Loading States",
    description: "Skeleton loaders and streaming patterns",
    href: "/examples/patterns/loading",
    tech: "loading.tsx + Suspense",
  },
  {
    title: "Protected Routes",
    description: "Authentication guards and middleware patterns",
    href: "/examples/patterns/protected-routes",
    tech: "middleware.ts",
  },
  {
    title: "Optimistic UI",
    description: "Instant feedback with automatic rollback on error",
    href: "/examples/patterns/optimistic-ui",
    tech: "useOptimistic + Server Actions",
  },
]
