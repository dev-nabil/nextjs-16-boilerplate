'use client';

import { format } from 'date-fns';
import { Calendar1, Calendar1Icon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';


type RangeDateFilterProps =
  | {
      size?: string;
      isEnableSelectFiled: true;
      selectFiledQuery: string;
      className?: string;
      selectFiledOptions: {
        label: string;
        value: string;
      }[];
      applyOnSelect?: boolean;
      onDateChange?: (dateRange: { startDate?: Date; endDate?: Date }) => void;
      startQuery?: string;
      endQuery?: string;
      hasDebounce?: boolean;
    }
  | {
      size?: string;
      isEnableSelectFiled?: false;
      selectFiledQuery?: string;
      className?: string;
      selectFiledOptions?: {
        label: string;
        value: string;
      }[];
      applyOnSelect?: boolean;
      onDateChange?: (dateRange: { startDate?: Date; endDate?: Date }) => void;
      startQuery?: string;
      endQuery?: string;
      hasDebounce?: boolean;
    };

const formatDateToISO = (date: Date, isEndDate: boolean = false): string => {
  const d = new Date(date);
  if (isEndDate) {
    d.setHours(23, 59, 59, 999);
  } else {
    d.setHours(0, 0, 0, 0);
  }
  return d.toISOString();
};

const parseISODate = (dateStr: string): Date | null => {
  try {
    return new Date(dateStr);
  } catch {
    return null;
  }
};

export default function RangeDateFilter({
  isEnableSelectFiled = false,
  selectFiledQuery,
  selectFiledOptions,
  size = 'lg',
  className,
  applyOnSelect = true,
  onDateChange,
  startQuery,
  endQuery,
  hasDebounce = false,
}: RangeDateFilterProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const getFromDate =
      searchParams.get(startQuery ? startQuery : 'fromDate') ||
      searchParams.get('startDate');
    const getToDate =
      searchParams.get(endQuery ? endQuery : 'toDate') ||
      searchParams.get('endDate');
    const getSelectQuery = selectFiledQuery
      ? searchParams.get(selectFiledQuery)
      : null;
    let range: { from: Date; to: Date } | undefined = undefined;

    if (getFromDate && getToDate) {
      const fromDate = parseISODate(getFromDate);
      const toDate = parseISODate(getToDate);

      if (fromDate && toDate) {
        range = { from: fromDate, to: toDate };
        setDate(range);
      }
    } else {
      setDate(undefined);
    }

    if (getSelectQuery) {
      setSelectedValue(getSelectQuery);
    } else {
      setSelectedValue('');
    }
  }, [searchParams, selectFiledQuery]);

  // Debounced URL update function
  const updateUrlWithDebounce = (dateRange: DateRange) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (dateRange?.from && dateRange?.to) {
        const startDate = formatDateToISO(dateRange.from, false);
        const endDate = formatDateToISO(dateRange.to, true);

        params.set(startQuery ? startQuery : 'startDate', startDate);
        params.set(endQuery ? endQuery : 'endDate', endDate);
        const decodedUrl = decodeURIComponent(params.toString());
        router.replace(`?${decodedUrl}`, { scroll: false });
      }
    }, 500);
  };

  const handleDateSelect = (range: DateRange | undefined | any) => {
    setDate(range);

    // If applyOnSelect is true and hasDebounce is enabled, use debounce
    if (applyOnSelect && range?.from && range?.to) {
      if (!isEnableSelectFiled) {
        if (hasDebounce) {
          updateUrlWithDebounce(range);
        } else {
          // Original behavior - update immediately
          const startDate = formatDateToISO(range.from, false);
          const endDate = formatDateToISO(range.to, true);

          params.set(startQuery ? startQuery : 'startDate', startDate);
          params.set(endQuery ? endQuery : 'endDate', endDate);
          const decodedUrl = decodeURIComponent(params.toString());
          router.replace(`?${decodedUrl}`, { scroll: false });
        }
      }
    }

    // If onDateChange callback is provided, call it with the selected dates
    if (onDateChange && range?.from && range?.to) {
      onDateChange({
        startDate: range.from,
        endDate: range.to,
      });
    }
  };

  const handleFilter = (fromDate: Date, toDate: Date) => {
    if (date && isEnableSelectFiled && applyOnSelect) {
      const startDate = formatDateToISO(fromDate, false);
      const endDate = formatDateToISO(toDate, true);

      params.set('startDate', startDate);
      params.set('endDate', endDate);
      params.set('status', selectedValue);
      const decodedUrl = decodeURIComponent(params.toString());
      router.replace(`?${decodedUrl}`, { scroll: false });
    }
    setOpen(false);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`${size === 'sm' ? 'h-10' : 'h-11'} flex justify-center items-center  rounded-full bg-white py-3  ${className}`}
          >
            <div className="flex items-center">
              <Calendar1Icon className="h-4 w-4" />
              <span
                className={`font-normal ${size === 'sm' ? 'text-[14px]' : 'text-sm'} ml-2`}
              >
                {date?.from && date.to
                  ? `${format(date?.from, 'dd-MMM-yyyy')} to ${format(date?.to, 'dd-MMM-yyyy')}`
                  : 'Pick From & To Date'}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-1000 w-[250px] p-0 bg-white"
          align="start"
        >
          <Calendar
            numberOfMonths={1}
            mode="range"
            selected={date}
            onSelect={handleDateSelect}
            footer={
              <DatePickerFooter
                date={date}
                setSelectedValue={setSelectedValue}
                selectedValue={selectedValue}
                handleFilter={handleFilter}
                selectFiledOptions={
                  selectFiledOptions ? selectFiledOptions : null
                }
                isEnableSelectFiled={isEnableSelectFiled}
                applyOnSelect={applyOnSelect}
              />
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface DatePickerFooterProps {
  date: DateRange | undefined;
  selectedValue: string;
  setSelectedValue: any;
  handleFilter: any;
  isEnableSelectFiled: boolean;
  applyOnSelect: boolean;
  selectFiledOptions:
    | {
        label: string;
        value: string;
      }[]
    | null;
}

function DatePickerFooter({
  date,
  selectedValue,
  setSelectedValue,
  handleFilter,
  isEnableSelectFiled,
  selectFiledOptions,
  applyOnSelect,
}: DatePickerFooterProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 mt-5 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            From
          </label>
          <div className="relative flex justify-between border p-2 rounded-full">
            <Calendar1 className="h-4 w-4" />
            <p className="text-xs text-foreground">
              {date?.from && format(date?.from, 'dd/MM/yyyy')}
            </p>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            To
          </label>
          <div className="relative flex justify-between border p-2 rounded-full">
            <Calendar1 className="h-4 w-4" />
            <p className="text-xs text-foreground">
              {date?.to && format(date?.to, 'dd/MM/yyyy')}
            </p>
          </div>
        </div>
      </div>
      {isEnableSelectFiled && applyOnSelect && (
        <>
          <Select
            value={selectedValue}
            onValueChange={(e) => {
              setSelectedValue(e);
            }}
          >
            <SelectTrigger className="w-full rounded-full">
              <SelectValue placeholder="Select Option" />
            </SelectTrigger>
            <SelectGroup>
              <SelectContent>
                {selectFiledOptions?.map((item, index) => (
                  <SelectItem value={item?.value} key={index}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectGroup>
          </Select>
          <Button
            size={'sm'}
            className="w-full rounded-full mt-2"
            onClick={() => handleFilter(date?.from, date?.to)}
            disabled={!date || !selectedValue}
          >
            Select
          </Button>
        </>
      )}
    </>
  );
}
