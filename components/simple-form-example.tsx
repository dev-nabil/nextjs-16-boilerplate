"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { ScrollAnimation, MotionDiv } from "@/providers/motion-provider"
import { FormInput, FormSelect, FormCheckbox } from "@/components/form"

// Simple form schema
const simpleFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string({
    required_error: "Please select a role",
  }),
  agree: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
})

type SimpleFormType = z.infer<typeof simpleFormSchema>

const roleOptions = [
  { label: "Developer", value: "developer" },
  { label: "Designer", value: "designer" },
  { label: "Manager", value: "manager" },
  { label: "Other", value: "other" },
]

export function SimpleFormExample() {
  const form = useForm<SimpleFormType>({
    resolver: zodResolver(simpleFormSchema),
    defaultValues: {
      name: "",
      email: "",
      agree: false,
    },
  })

  const onSubmit = (data: SimpleFormType) => {
    toast.success("Simple form submitted!", {
      description: `Welcome ${data.name}! Your role: ${data.role}`,
    })
  }

  return (
    <ScrollAnimation variant="fadeInUp" className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Simple Form Example</CardTitle>
          <CardDescription>A basic form demonstrating the component usage</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput<SimpleFormType>
                name="name"
                label="Full Name"
                description="Enter your full name"
                placeholder="John Doe"
                required
                control={form.control}
              />

              <FormInput<SimpleFormType>
                name="email"
                label="Email"
                description="We'll use this to contact you"
                type="email"
                placeholder="john@example.com"
                required
                control={form.control}
              />

              <FormSelect<SimpleFormType>
                name="role"
                label="Role"
                description="Select your primary role"
                options={roleOptions}
                placeholder="Choose your role"
                required
                control={form.control}
              />

              <FormCheckbox<SimpleFormType>
                name="agree"
                label="I agree to the terms and conditions"
                description="Please read and accept our terms"
                required
                control={form.control}
              />

              <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </MotionDiv>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ScrollAnimation>
  )
}
