import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, BookOpen, Code2, Rocket, Settings } from "lucide-react"

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground">Everything you need to know to get started</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>Set up your development environment</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Install Dependencies</h3>
                <div className="bg-muted p-3 rounded-lg font-mono text-sm">npm install</div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Run Development Server</h3>
                <div className="bg-muted p-3 rounded-lg font-mono text-sm">npm run dev</div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Open Your Browser</h3>
                <p className="text-sm text-muted-foreground">
                  Navigate to <code className="bg-muted px-2 py-1 rounded">http://localhost:3000</code>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Project Structure</CardTitle>
                  <CardDescription>Understanding the folder layout</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">📁</span>
                  <div>
                    <span className="font-semibold">app/</span>
                    <span className="text-muted-foreground"> - Next.js App Router pages and layouts</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">📁</span>
                  <div>
                    <span className="font-semibold">components/</span>
                    <span className="text-muted-foreground"> - Reusable React components</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">📁</span>
                  <div>
                    <span className="font-semibold">lib/</span>
                    <span className="text-muted-foreground"> - Utility functions and Server Actions</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">📁</span>
                  <div>
                    <span className="font-semibold">hooks/</span>
                    <span className="text-muted-foreground"> - Custom React hooks</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">📄</span>
                  <div>
                    <span className="font-semibold">next.config.mjs</span>
                    <span className="text-muted-foreground"> - Next.js configuration</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Tech Stack</CardTitle>
                  <CardDescription>Built with the latest and greatest</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Core Framework</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Next.js 16 with App Router</li>
                    <li>• React 19.2 with Compiler</li>
                    <li>• TypeScript 5+</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Styling</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Tailwind CSS v4</li>
                    <li>• shadcn/ui components</li>
                    <li>• Lucide React icons</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Management</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Server Actions</li>
                    <li>• Route Handlers</li>
                    <li>• Zod validation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Developer Tools</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• ESLint configuration</li>
                    <li>• TypeScript strict mode</li>
                    <li>• Hot module replacement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>What makes this boilerplate special</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-1">✓ Production Ready</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Optimized configuration for performance, SEO, and accessibility
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">✓ Type Safe</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  End-to-end TypeScript with strict mode enabled
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">✓ Modern Patterns</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Server Components, Server Actions, and streaming by default
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">✓ Comprehensive Examples</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Real-world examples for every common use case
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
