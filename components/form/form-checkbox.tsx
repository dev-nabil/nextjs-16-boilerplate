"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { BaseFormFieldProps } from "./types"
import type { FieldValues, Path, PathValue } from "react-hook-form"

interface FormCheckboxProps<T extends FieldValues = FieldValues> extends BaseFormFieldProps<T> {
  defaultChecked?: boolean
}

export function FormCheckbox<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  control,
  defaultChecked = false,
}: FormCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultChecked as PathValue<T, Path<T>>}
      render={({ field }) => (
        <FormItem className={`flex flex-row items-start space-x-3 space-y-0 ${className || ""}`}>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="cursor-pointer">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
