"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

export default function DialogsPage() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("User added successfully!")
    setOpen(false)
    setName("")
    setEmail("")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dialogs & Modals</h1>
          <p className="text-muted-foreground">Interactive dialog patterns for different use cases</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Form Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Form Dialog</CardTitle>
              <CardDescription>Dialog with form inputs and validation</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>Enter the user details below. Click save when you're done.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save User</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <div className="mt-4 p-3 rounded-lg bg-muted text-sm">
                <p className="font-medium mb-1">Use Case:</p>
                <p className="text-muted-foreground">Quick data entry without leaving the page</p>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Confirmation Dialog</CardTitle>
              <CardDescription>Alert dialog for destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => toast.error("Account deleted")}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="mt-4 p-3 rounded-lg bg-muted text-sm">
                <p className="font-medium mb-1">Use Case:</p>
                <p className="text-muted-foreground">Confirm dangerous or irreversible actions</p>
              </div>
            </CardContent>
          </Card>

          {/* Info Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Info Dialog</CardTitle>
              <CardDescription>Simple content display dialog</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Product Information</DialogTitle>
                    <DialogDescription>Detailed information about this product</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                    <div>
                      <h4 className="font-semibold mb-1">Features</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>High-quality materials</li>
                        <li>Eco-friendly production</li>
                        <li>2-year warranty included</li>
                        <li>Free shipping worldwide</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Specifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Dimensions: 10" x 8" x 4"
                        <br />
                        Weight: 2.5 lbs
                        <br />
                        Material: Recycled plastic
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="mt-4 p-3 rounded-lg bg-muted text-sm">
                <p className="font-medium mb-1">Use Case:</p>
                <p className="text-muted-foreground">Display additional information on demand</p>
              </div>
            </CardContent>
          </Card>

          {/* Nested Dialogs */}
          <Card>
            <CardHeader>
              <CardTitle>Complex Dialog Flow</CardTitle>
              <CardDescription>Multi-step process with nested dialogs</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="w-full">
                    Start Process
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Step 1: Confirmation</DialogTitle>
                    <DialogDescription>Are you ready to begin the process?</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      This process will guide you through multiple steps to complete your setup.
                    </p>
                  </div>
                  <DialogFooter>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Continue</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Final Confirmation</AlertDialogTitle>
                          <AlertDialogDescription>This will activate your account. Continue?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Go Back</AlertDialogCancel>
                          <AlertDialogAction onClick={() => toast.success("Process completed!")}>
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="mt-4 p-3 rounded-lg bg-muted text-sm">
                <p className="font-medium mb-1">Use Case:</p>
                <p className="text-muted-foreground">Complex workflows requiring multiple confirmations</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Dialog Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Use dialogs sparingly - they interrupt the user experience</li>
              <li>Always provide a clear way to close (X button, Cancel, outside click)</li>
              <li>Use AlertDialog for destructive or irreversible actions</li>
              <li>Keep dialog content focused and concise</li>
              <li>Use controlled state for complex form dialogs</li>
              <li>Provide clear action buttons with descriptive labels</li>
              <li>Ensure dialogs are accessible with proper ARIA labels</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
