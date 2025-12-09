"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { BaseFormFieldProps } from "./types"
import type { FieldValues } from "react-hook-form"

interface FormDatePickerProps<T extends FieldValues = FieldValues> extends BaseFormFieldProps<T> {
  placeholder?: string
  dateFormat?: string
  disableFuture?: boolean
  disablePast?: boolean
  fromYear?: number
  toYear?: number
}

export function FormDatePicker<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  control,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  disableFuture = false,
  disablePast = false,
  fromYear = 2000,
  toYear = new Date().getFullYear(),
}: FormDatePickerProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormItem className={`flex flex-col ${className || ""}`}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                  disabled={disabled}
                >
                  {field.value ? format(field.value, dateFormat) : <span>{placeholder}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date: any) => {
                  if (disableFuture && date > new Date()) return true
                  if (disablePast && date < new Date()) return true
                  if (date < new Date(`${fromYear}-01-01`)) return true
                  if (date > new Date(`${toYear}-12-31`)) return true
                  return false
                }}
                captionLayout="dropdown"
                startMonth={new Date(fromYear, 0)}
                endMonth={new Date(toYear, 0)}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
