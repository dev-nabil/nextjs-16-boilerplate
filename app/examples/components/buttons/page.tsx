import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Loader2, Mail, Plus, Download, Trash2 } from "lucide-react"

export default function ButtonsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Buttons & Actions</h1>
          <p className="text-xl text-muted-foreground">All button variants, sizes, and states</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <CardDescription>Different button styles for various contexts</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card>
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
              <CardDescription>From small to large buttons</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* With Icons */}
          <Card>
            <CardHeader>
              <CardTitle>With Icons</CardTitle>
              <CardDescription>Buttons with leading or trailing icons</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button className="gap-2">
                <Mail className="w-4 h-4" /> Send Email
              </Button>
              <Button variant="secondary" className="gap-2">
                <Download className="w-4 h-4" /> Download
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Plus className="w-4 h-4" /> Add New
              </Button>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </CardContent>
          </Card>

          {/* Loading States */}
          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <CardDescription>Buttons showing loading indicators</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </Button>
              <Button variant="secondary" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </Button>
              <Button variant="outline" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </Button>
            </CardContent>
          </Card>

          {/* Disabled States */}
          <Card>
            <CardHeader>
              <CardTitle>Disabled States</CardTitle>
              <CardDescription>Buttons in disabled state</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
              <Button variant="destructive" disabled>
                Disabled Destructive
              </Button>
            </CardContent>
          </Card>

          {/* Full Width */}
          <Card>
            <CardHeader>
              <CardTitle>Full Width</CardTitle>
              <CardDescription>Buttons that span the full container width</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Full Width Default</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Full Width Outline
              </Button>
              <Button variant="secondary" className="w-full gap-2">
                <Plus className="w-4 h-4" /> Full Width with Icon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Best Practices */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">✓ Use Semantic Variants</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use "destructive" for delete/remove actions, "secondary" for less important actions, and "outline" for
                alternative choices
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Show Loading States</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Always disable buttons and show a loading indicator during async operations
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Add Descriptive Icons</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Icons should reinforce the button's action, not replace clear text labels
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Maintain Accessibility</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ensure sufficient color contrast and use aria-label for icon-only buttons
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
