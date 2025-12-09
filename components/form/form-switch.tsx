"use client"

import { useController } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { FormFieldWrapper } from "./form-field-wrapper"
import type { BaseFormFieldProps } from "./types"
import type { FieldValues } from "react-hook-form"

interface FormSwitchProps<T extends FieldValues = FieldValues> extends BaseFormFieldProps<T> {
  defaultChecked?: boolean
}

export function FormSwitch<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  control,
  defaultChecked = false,
}: FormSwitchProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultChecked as any,
  })

  return (
    <FormFieldWrapper label="" description="" required={required} error={error?.message} className={className}>
      <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
        <div className="space-y-0.5">
          <Label htmlFor={name} className="text-base font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <Switch
          id={name}
          checked={field.value}
          onCheckedChange={field.onChange}
          disabled={disabled}
          aria-describedby={description ? `${name}-description` : undefined}
        />
      </div>
    </FormFieldWrapper>
  )
}
