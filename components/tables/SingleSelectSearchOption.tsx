'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface SingleSelectSearchOptionProps {
  outsideIcon?: ReactNode;
  insideIcon?: ReactNode;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
  queryKey: string;
  size?: 'sm' | undefined;
  cb?: (value: string) => any;
  isSetQuery?: boolean;
  defaultValue?: string;
}

export default function SingleSelectSearchOption({
  outsideIcon,
  insideIcon,
  placeholder,
  options,
  queryKey,
  size,
  cb,
  isSetQuery = true,
  defaultValue,
}: SingleSelectSearchOptionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getSearchParams = searchParams.get(queryKey);
  const [value, setValue] = useState<string>(defaultValue ? defaultValue : '');

  useEffect(() => {
    if (getSearchParams) {
      setValue(getSearchParams);
    } else if (defaultValue) {
      setValue(defaultValue);
    } else {
      setValue('');
    }
  }, []);

  // handlers
  const handleChange = (value: string) => {
    setValue(value);
    if (isSetQuery) {
      const params = new URLSearchParams(searchParams);
      if (value) params.set(queryKey, value);
      else params.delete(queryKey);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
    if (cb) {
      cb(value);
    }
  };
  // if (!mounted) return null;
  return (
    <Select
      value={value}
      onValueChange={(e) => {
        handleChange(e);
      }}
    >
      <SelectTrigger
        size="sm"
        className={`border rounded-full bg-white
        ${outsideIcon || insideIcon ? 'min-w-[150px]' : ''}
        ${size === 'sm' ? 'min-h-[38px]' : 'min-h-11'}
        px-3 py-3`}
      >
        {outsideIcon && outsideIcon}

        <div
          className={`${outsideIcon || insideIcon ? 'bg-linear-to-l from-primary to-red-500 text-white rounded-full ' : ''} ${outsideIcon && 'justify-center'} ${insideIcon && 'justify-start gap-2'} flex items-center  w-full text-foreground text-md p-1  px-2`}
        >
          {insideIcon && insideIcon}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        <SelectGroup className="focus:bg-primary focus:text-white">
          <SelectLabel>{queryKey}</SelectLabel>
          {options.map((item, id) => (
            <SelectItem key={id} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
