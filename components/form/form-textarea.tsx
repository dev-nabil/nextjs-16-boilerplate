"use client"

import { useController } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { FormFieldWrapper } from "./form-field-wrapper"
import type { BaseFormFieldProps } from "./types"
import type { FieldValues } from "react-hook-form"

interface FormTextareaProps<T extends FieldValues = FieldValues> extends BaseFormFieldProps<T> {
  placeholder?: string
  rows?: number
  maxLength?: number
  resize?: boolean
}

export function FormTextarea<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  control,
  placeholder,
  rows = 3,
  maxLength,
  resize = true,
}: FormTextareaProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "" as any,
  })

  return (
    <FormFieldWrapper
      label={label}
      description={description}
      required={required}
      error={error?.message}
      className={className}
    >
      <Textarea
        {...field}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={!resize ? "resize-none" : ""}
        aria-describedby={description ? `${name}-description` : undefined}
      />
      {maxLength && (
        <div className="flex justify-end">
          <span className="text-xs text-muted-foreground">
            {field.value?.length || 0}/{maxLength}
          </span>
        </div>
      )}
    </FormFieldWrapper>
  )
}
