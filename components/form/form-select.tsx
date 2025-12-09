"use client"

import { useController } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormFieldWrapper } from "./form-field-wrapper"
import type { BaseFormFieldProps, SelectOption } from "./types"
import type { FieldValues } from "react-hook-form"

interface FormSelectProps<T extends FieldValues = FieldValues> extends BaseFormFieldProps<T> {
  options: SelectOption[]
  placeholder?: string
}

export function FormSelect<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  control,
  options,
  placeholder = "Select an option",
}: FormSelectProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <FormFieldWrapper
      label={label}
      description={description}
      required={required}
      error={error?.message}
      className={className}
    >
      <Select value={field.value} onValueChange={field.onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormFieldWrapper>
  )
}
