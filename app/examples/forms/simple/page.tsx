import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SimpleContactForm } from "@/components/examples/simple-contact-form"

export default function SimpleFormPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Simple Contact Form</h1>
          <p className="text-xl text-muted-foreground">
            Client-side validation with Zod and Server Actions for submission
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Live Demo</CardTitle>
              <CardDescription>Try submitting the form to see validation and success states</CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleContactForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">✓ Client-Side Validation</h3>
                <p className="text-sm text-muted-foreground">Instant feedback using Zod schema validation</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Server Actions</h3>
                <p className="text-sm text-muted-foreground">Type-safe server-side processing without API routes</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Loading States</h3>
                <p className="text-sm text-muted-foreground">Automatic button disabled state during submission</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Error Handling</h3>
                <p className="text-sm text-muted-foreground">Graceful error display with user-friendly messages</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✓ Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  ARIA labels, proper focus management, and keyboard navigation
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
