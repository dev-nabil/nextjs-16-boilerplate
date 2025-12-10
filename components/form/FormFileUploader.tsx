// FormFileUploader.tsx
import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import FileUploader, { UploadedFile, FileUploaderProps } from './file-uploader';


interface FormFileUploaderProps<T extends FieldValues> extends Omit<FileUploaderProps, 'value' | 'onChange' | 'name'> {
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  label?: string;
  description?: string;
  error?: string;
}

export function FormFileUploader<T extends FieldValues>({
  name,
  control,
  required = false,
  label,
  description,
  error,
  ...props
}: FormFileUploaderProps<T>) {
  return (
    <div className="space-y-2">
      {label && (
        <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      
      <Controller
        name={name}
        control={control}
        rules={{ 
          required: required ? 'Please upload at least one file' : false,
          validate: (value) => {
            if (required && (!value || (Array.isArray(value) && value.length === 0))) {
              return 'Please upload at least one file';
            }
            return true;
          }
        }}
        render={({ field, fieldState }) => (
          <>
            <FileUploader
              {...props}
              value={field.value}
              onChange={(files) => field.onChange(files)}
            />
            {(fieldState.error?.message || error) && (
              <p className="text-sm text-red-500 mt-1">
                {fieldState.error?.message || error}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}