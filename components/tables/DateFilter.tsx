'use client';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar1 } from 'lucide-react';


interface DateFilterProps {
  mode?: string;
  dateFormat?: string;
  queryKey?: string;
  defaultDate?: Date;
  footer?: ReactNode;
  size?: 'sm' | 'lg';
}

export default function DateFilter({
  dateFormat = 'yyyy-MM-dd',
  queryKey = 'date',
  footer,
  size = 'lg',
}: DateFilterProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getSearchParams = searchParams.get(queryKey);

  useEffect(() => {
    if (getSearchParams) {
      const parsed = new Date(decodeURIComponent(getSearchParams));
      if (!isNaN(parsed.getTime())) setDate(parsed);
      else setDate(undefined);
    } else {
      setDate(undefined);
    }
  }, [getSearchParams]);

  const handleSelect = (selectedDate: Date | undefined) => {
    const url = new URL(window.location.href);

    if (selectedDate) {
      url.searchParams.set(queryKey, selectedDate.toISOString());
    } else {
      url.searchParams.delete(queryKey);
    }

    // ✅ Manually update without encoding %3A etc.
    const queryString = url.searchParams
      .toString()
      .replace(/%3A/g, ':')
      .replace(/%2F/g, '/');

    router.replace(`${url.pathname}?${queryString}`, { scroll: false });
    setDate(selectedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`${size === 'sm' ? 'h-8' : 'h-11'} flex justify-center items-center rounded-full bg-white py-3`}
        >
          <div className="flex items-center">
            <Calendar1 className="h-3 w-3" />
            <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} ml-2`}>
              {date ? format(date, dateFormat) : 'Pick a date'}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-1000 w-[250px] p-0 bg-white" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          footer={footer}
        />
      </PopoverContent>
    </Popover>
  );
}
