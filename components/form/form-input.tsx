"use client"

import { useController } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormFieldWrapper } from "./form-field-wrapper"
import type { BaseFormFieldProps } from "./types"
import type { FieldValues } from "react-hook-form"

interface FormInputProps<T extends FieldValues = FieldValues> extends BaseFormFieldProps<T> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url"
  placeholder?: string
  autoComplete?: string
}

export function FormInput<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  control,
  type = "text",
  placeholder,
  autoComplete,
}: FormInputProps<T>) {
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
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-describedby={description ? `${name}-description` : undefined}
      />
    </FormFieldWrapper>
  )
}
