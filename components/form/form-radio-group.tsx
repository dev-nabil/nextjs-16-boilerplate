"use client"

import { useController } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormFieldWrapper } from "./form-field-wrapper"
import type { BaseFormFieldProps, RadioOption } from "./types"
import type { FieldValues } from "react-hook-form"

interface FormRadioGroupProps<T extends FieldValues = FieldValues> extends BaseFormFieldProps<T> {
  options: RadioOption[]
  orientation?: "horizontal" | "vertical"
}

export function FormRadioGroup<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  control,
  options,
  orientation = "vertical",
}: FormRadioGroupProps<T>) {
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
      <RadioGroup
        value={field.value}
        onValueChange={field.onChange}
        disabled={disabled}
        className={orientation === "horizontal" ? "flex flex-row space-x-4" : "flex flex-col space-y-2"}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              disabled={disabled || option.disabled}
            />
            <Label
              htmlFor={`${name}-${option.value}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </FormFieldWrapper>
  )
}
