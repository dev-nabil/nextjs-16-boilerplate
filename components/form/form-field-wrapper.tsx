import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { FormFieldWrapperProps } from "./types"

export function FormFieldWrapper({ label, description, required, error, children, className }: FormFieldWrapperProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
      {error && <p className="text-sm text-destructive font-medium">{error}</p>}
    </div>
  )
}
