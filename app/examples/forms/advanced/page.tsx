"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast from "react-hot-toast"

const skillSchema = z.object({
  name: z.string().min(2, "Skill name must be at least 2 characters"),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
})

const advancedFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  role: z.enum(["developer", "designer", "manager", "other"]),
  experience: z.string().min(10, "Experience must be at least 10 characters"),
  skills: z.array(skillSchema).min(1, "Add at least one skill"),
  remote: z.boolean(),
  availableDate: z.string().min(1, "Availability date is required"),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
})

type AdvancedFormData = z.infer<typeof advancedFormSchema>

export default function AdvancedFormPage() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AdvancedFormData>({
    resolver: zodResolver(advancedFormSchema),
    defaultValues: {
      skills: [{ name: "", level: "beginner" }],
      remote: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  })

  const role = watch("role")

  const onSubmit = async (data: AdvancedFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Form data:", data)
    toast.success("Application submitted successfully!")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Advanced Form</h1>
          <p className="text-muted-foreground">
            Complex form with React Hook Form, dynamic fields, and conditional rendering
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Application Form</CardTitle>
            <CardDescription>Fill out this comprehensive application with dynamic skill fields</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...register("firstName")} placeholder="John" />
                    {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...register("lastName")} placeholder="Doe" />
                    {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="john@example.com" />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" {...register("phone")} placeholder="+1234567890" />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Professional Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="designer">Designer</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Textarea
                    id="experience"
                    {...register("experience")}
                    placeholder="Tell us about your experience..."
                    rows={4}
                  />
                  {errors.experience && <p className="text-sm text-destructive">{errors.experience.message}</p>}
                </div>

                {/* Conditional Portfolio Field */}
                {(role === "developer" || role === "designer") && (
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio URL</Label>
                    <Input id="portfolio" {...register("portfolio")} placeholder="https://yourportfolio.com" />
                    {errors.portfolio && <p className="text-sm text-destructive">{errors.portfolio.message}</p>}
                  </div>
                )}
              </div>

              {/* Dynamic Skills Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ name: "", level: "beginner" })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <div className="flex-1 space-y-2">
                      <Input {...register(`skills.${index}.name`)} placeholder="Skill name" />
                      {errors.skills?.[index]?.name && (
                        <p className="text-sm text-destructive">{errors.skills[index]?.name?.message}</p>
                      )}
                    </div>

                    <div className="w-[180px] space-y-2">
                      <Controller
                        name={`skills.${index}.level`}
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    {fields.length > 1 && (
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                {errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Availability</h3>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="remote">Open to Remote Work</Label>
                    <p className="text-sm text-muted-foreground">Are you willing to work remotely?</p>
                  </div>
                  <Controller
                    name="remote"
                    control={control}
                    render={({ field }) => (
                      <Switch id="remote" checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableDate">Available Start Date</Label>
                  <Input id="availableDate" type="date" {...register("availableDate")} />
                  {errors.availableDate && <p className="text-sm text-destructive">{errors.availableDate.message}</p>}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Advanced Form Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>React Hook Form for performant form handling</li>
              <li>Zod schema validation with type safety</li>
              <li>Dynamic field arrays (add/remove skills)</li>
              <li>Conditional field rendering based on role selection</li>
              <li>Complex validation rules (phone, URL, date)</li>
              <li>Loading states during submission</li>
              <li>Toast notifications for user feedback</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
