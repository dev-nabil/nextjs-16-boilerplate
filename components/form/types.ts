import { ReactNode } from "react"
import type { FieldPath, FieldValues, Control } from "react-hook-form"

export interface BaseFormFieldProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>
  label: string
  description?: string
  required?: boolean
  disabled?: boolean
  className?: string
  control: Control<T>
}

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface RadioOption {
  label: string
  value: string
  disabled?: boolean
}

export interface FormFieldWrapperProps {
  label: string
  description?: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}
