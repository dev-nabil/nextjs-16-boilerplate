// Updated demo form
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import {
  FormCheckbox,
  FormDatePicker,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
  FormCombobox,
} from "@/components/form"

import { MotionDiv, ScrollAnimation } from "@/providers/motion-provider"
import { FormFileUploader } from "@/components/form/FormFileUploader"


// Define Zod schema for file validation
const fileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.enum(['image', 'video', 'pdf', 'unknown']),
  // Add other properties if needed
}).passthrough();

const uploadedFileSchema = fileSchema.extend({
  file: z.instanceof(File),
  id: z.string(),
  preview: z.string().nullable(),
});

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  birthDate: z.date({
    required_error: "Please select your birth date",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender",
  }),
  country: z.string({
    required_error: "Please select your country",
  }),
  favoriteFramework: z.string({
    required_error: "Please select your favorite framework",
  }),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  newsletter: z.boolean().default(false),
  notifications: z.boolean().default(true),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  // Add file upload field
  profileImage: z.array(uploadedFileSchema).min(1, "Please upload a profile image").max(1, "Only one profile image allowed"),
  documents: z.array(uploadedFileSchema).optional(),
  // Or for single file:
  // singleFile: uploadedFileSchema.optional(),
})

// Rename to avoid conflict with browser's FormData
type FormSchemaType = z.infer<typeof formSchema>

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "uk" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "Australia", value: "au" },
]

const frameworkOptions = [
  { label: "React", value: "react" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "nextjs" },
  { label: "Nuxt.js", value: "nuxtjs" },
]

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
]

export default function AdvancedFormPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      bio: "",
      newsletter: false,
      notifications: true,
      terms: false,
      profileImage: [],
      documents: [],
    },
  })

  const onSubmit = async (data: FormSchemaType) => {
    try {
      console.log("Form data:", data);
      
      // If you need to submit files to an API, you might need to convert them
      const formData = new FormData();
      
      // Append regular fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'profileImage' || key === 'documents') {
          // Handle file arrays
          if (Array.isArray(value)) {
            value.forEach((fileObj, index) => {
              formData.append(`${key}[${index}]`, fileObj.file);
            });
          }
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      
      toast.success("Form submitted successfully!", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      
      // Example: Submit to API
      // await fetch('/api/submit', {
      //   method: 'POST',
      //   body: formData,
      // });
      
    } catch (error) {
      toast.error("Failed to submit form");
      console.error(error);
    }
  }

  return (
    <ScrollAnimation variant="fadeInUp" className="w-full max-w-4xl mx-auto mt-20">
      <Card>
        <CardHeader>
          <CardTitle>Comprehensive Form Demo</CardTitle>
          <CardDescription>
            A showcase of all reusable form components with validation and proper error handling using shadcn Form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    name="firstName"
                    label="First Name"
                    description="Enter your first name"
                    placeholder="John"
                    required
                    control={form.control}
                  />

                  <FormInput
                    name="lastName"
                    label="Last Name"
                    description="Enter your last name"
                    placeholder="Doe"
                    required
                    control={form.control}
                  />
                </div>

                <FormInput
                  name="email"
                  label="Email Address"
                  description="We'll never share your email with anyone else"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  control={form.control}
                />

                <FormInput
                  name="password"
                  label="Password"
                  description="Must be at least 8 characters long"
                  type="password"
                  placeholder="••••••••"
                  required
                  control={form.control}
                />

                <FormFileUploader
                  name="profileImage"
                  previewUrl={"https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg"}
                  label="Profile Image"
                  description="Upload your profile picture (required)"
                  multiple={false}
                  allowedTypes={['image/*']}
                  maxSize={5 * 1024 * 1024} // 5MB
                  required
                  control={form.control}
                />

                <FormDatePicker
                  name="birthDate"
                  label="Birth Date"
                  description="Select your date of birth"
                  placeholder="Pick your birth date"
                  disableFuture={true}
                  fromYear={2000}
                  toYear={new Date().getFullYear()}
                  required
                  control={form.control}
                />

                <FormRadioGroup
                  name="gender"
                  label="Gender"
                  description="Select your gender"
                  options={genderOptions}
                  required
                  control={form.control}
                />
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Documents</h3>
                
                <FormFileUploader
                  name="documents"
                  label="Supporting Documents"
                  description="Upload any supporting documents (PDF, images, videos)"
                  multiple={true}
                  allowedTypes={['image/*', 'video/*', 'application/pdf']}
                  maxSize={10 * 1024 * 1024} // 10MB
                  control={form.control}
                  required
                />
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preferences</h3>

                <FormSelect
                  name="country"
                  label="Country"
                  description="Select your country of residence"
                  options={countryOptions}
                  placeholder="Choose your country"
                  required
                  control={form.control}
                />

                <FormCombobox
                  name="favoriteFramework"
                  label="Favorite Framework"
                  description="Search and select your favorite JavaScript framework"
                  options={frameworkOptions}
                  placeholder="Select framework..."
                  searchPlaceholder="Search frameworks..."
                  emptyMessage="No framework found."
                  required
                  control={form.control}
                />

                <FormTextarea
                  name="bio"
                  label="Bio"
                  description="Tell us a little about yourself"
                  placeholder="I'm a developer who loves..."
                  rows={4}
                  maxLength={500}
                  control={form.control}
                />
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Settings</h3>

                <FormSwitch
                  name="newsletter"
                  label="Newsletter Subscription"
                  description="Receive our weekly newsletter with updates and tips"
                  control={form.control}
                />

                <FormSwitch
                  name="notifications"
                  label="Push Notifications"
                  description="Get notified about important updates"
                  defaultChecked={true}
                  control={form.control}
                />

                <FormCheckbox
                  name="terms"
                  label="I accept the terms and conditions"
                  description="You must accept our terms and conditions to continue"
                  required
                  control={form.control}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting..." : "Submit Form"}
                  </Button>
                </MotionDiv>

                <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Reset
                  </Button>
                </MotionDiv>
              </div>

              {/* Form State Debug Info */}
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-semibold mb-2">Form State (Debug)</h4>
                <div className="text-xs space-y-1">
                  <div>Valid: {form.formState.isValid ? "✅" : "❌"}</div>
                  <div>Dirty: {form.formState.isDirty ? "✅" : "❌"}</div>
                  <div>Touched: {Object.keys(form.formState.touchedFields).length} fields</div>
                  <div>Errors: {Object.keys(form.formState.errors).length} fields</div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ScrollAnimation>
  )
}