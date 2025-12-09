"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import toast from "react-hot-toast"

const steps = [
  { id: 1, title: "Personal Info", description: "Basic information" },
  { id: 2, title: "Preferences", description: "Your preferences" },
  { id: 3, title: "Review", description: "Confirm details" },
]

const step1Schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
})

const step2Schema = z.object({
  interest: z.enum(["development", "design", "marketing", "other"]),
  budget: z.enum(["small", "medium", "large"]),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

type Step1Data = z.infer<typeof step1Schema>
type Step2Data = z.infer<typeof step2Schema>
type FormData = Step1Data & Step2Data

export default function MultiStepFormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const progress = (currentStep / steps.length) * 100

  const validateStep = (step: number): boolean => {
    setErrors({})
    try {
      if (step === 1) {
        step1Schema.parse(formData)
      } else if (step === 2) {
        step2Schema.parse(formData)
      }
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Final form data:", formData)
    toast.success("Form submitted successfully!")
    setIsSubmitting(false)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Multi-Step Form</h1>
          <p className="text-muted-foreground">Wizard-style form with progress tracking and validation</p>
        </div>

        <Card>
          <CardHeader>
            <div className="space-y-4">
              <div>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>Complete the form in 3 easy steps</CardDescription>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex flex-col items-center ${
                        step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                          step.id < currentStep
                            ? "bg-primary text-primary-foreground"
                            : step.id === currentStep
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                        }`}
                      >
                        {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                      </div>
                      <span className="font-medium hidden sm:block">{step.title}</span>
                    </div>
                  ))}
                </div>
                <Progress value={progress} />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName || ""}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Area of Interest</Label>
                  <RadioGroup value={formData.interest} onValueChange={(value) => updateFormData("interest", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="development" id="development" />
                      <Label htmlFor="development" className="font-normal cursor-pointer">
                        Development
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="design" id="design" />
                      <Label htmlFor="design" className="font-normal cursor-pointer">
                        Design
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="marketing" id="marketing" />
                      <Label htmlFor="marketing" className="font-normal cursor-pointer">
                        Marketing
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="font-normal cursor-pointer">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.interest && <p className="text-sm text-destructive">{errors.interest}</p>}
                </div>

                <div className="space-y-3">
                  <Label>Budget Range</Label>
                  <RadioGroup value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small" className="font-normal cursor-pointer">
                        Small ($1k - $5k)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="font-normal cursor-pointer">
                        Medium ($5k - $20k)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large" className="font-normal cursor-pointer">
                        Large ($20k+)
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your project</Label>
                  <Textarea
                    id="message"
                    value={formData.message || ""}
                    onChange={(e) => updateFormData("message", e.target.value)}
                    placeholder="Describe your project..."
                    rows={4}
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="rounded-lg border p-4 space-y-3">
                  <h3 className="font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p className="font-medium">{formData.fullName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-3">
                  <h3 className="font-semibold">Preferences</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Interest:</span>
                      <p className="font-medium capitalize">{formData.interest}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <p className="font-medium capitalize">{formData.budget}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Message:</span>
                      <p className="font-medium mt-1">{formData.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-2 mt-6">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              {currentStep < steps.length ? (
                <Button type="button" onClick={handleNext} className="ml-auto">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="ml-auto">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
