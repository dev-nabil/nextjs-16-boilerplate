import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Shield, Code2, Palette, Database } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Production-Ready Next.js 16 Boilerplate
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Build Fast, Ship Faster</h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            A comprehensive starter template with Next.js 16, TypeScript, Tailwind CSS v4, and all the tools you need
            for modern web development.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link href="/examples">
              <Button size="lg" className="gap-2">
                View Examples <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline">
                Documentation
              </Button>
            </Link>
          </div>
        </section>

        {/* Tech Stack Badges */}
        <section className="flex flex-wrap justify-center gap-2 mb-20">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="px-3 py-1">
              {tech}
            </Badge>
          ))}
        </section>

        {/* Features Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need, Out of the Box</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Demo Examples Preview */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Comprehensive Examples</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Every example is production-ready and follows best practices
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {exampleCategories.map((category) => (
              <Link key={category.href} href={category.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {category.title}
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example) => (
                        <Badge key={example} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="text-center">
          <Card className="max-w-3xl mx-auto bg-muted/50">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Start?</CardTitle>
              <CardDescription>Clone the repository and start building immediately</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background p-4 rounded-lg text-left font-mono text-sm">
                <code>npm install && npm run dev</code>
              </div>
              <p className="text-sm text-muted-foreground">
                All dependencies are pre-configured. Just install and run.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

const techStack = [
  "Next.js 16",
  "React 19.2",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui",
  "Server Actions",
  "Route Handlers",
  "Zod Validation",
  "Lucide Icons",
]

const features = [
  {
    title: "Next.js 16 with React 19",
    description:
      "Latest Next.js with App Router, Server Components, React Compiler support, and enhanced caching APIs.",
    icon: Zap,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Tailwind CSS v4",
    description: "Properly configured with design tokens, custom utilities, and responsive design patterns.",
    icon: Palette,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    title: "TypeScript First",
    description: "Fully typed codebase with strict TypeScript configuration for maximum type safety.",
    icon: Code2,
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "Server Actions & API Routes",
    description: "Modern data fetching patterns with Server Actions and Route Handlers with proper error handling.",
    icon: Database,
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "Form Handling",
    description: "Advanced form examples with Zod validation, React Hook Form, and server-side processing.",
    icon: Shield,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    title: "shadcn/ui Components",
    description: "Complete UI component library with accessibility, theming, and customization support.",
    icon: Sparkles,
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
]

const exampleCategories = [
  {
    title: "Forms & Validation",
    description: "Complete form examples with client and server validation",
    href: "/examples/forms",
    examples: ["Basic Form", "Complex Form", "Multi-Step", "File Upload", "Dynamic Fields"],
  },
  {
    title: "Data Fetching",
    description: "Server Components, API routes, and caching strategies",
    href: "/examples/data-fetching",
    examples: ["Server Components", "Route Handlers", "Streaming", "Caching", "Mutations"],
  },
  {
    title: "UI Components",
    description: "All shadcn/ui components with examples and variants",
    href: "/examples/components",
    examples: ["Buttons", "Cards", "Dialogs", "Tables", "Charts", "Navigation"],
  },
  {
    title: "Advanced Patterns",
    description: "Real-world patterns and best practices",
    href: "/examples/patterns",
    examples: ["Auth Flow", "Protected Routes", "Error Handling", "Loading States", "Optimistic UI"],
  },
]
