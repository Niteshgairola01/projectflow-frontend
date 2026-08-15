import { CalendarDays, X } from "lucide-react";
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import { useEffect, useRef, useState } from "react";

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  error?: string;
  placeholder?: string;
}

const formatDate = (date: Date | null) => {
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Parse DD/MM/YYYY
const parseDate = (value: string): Date | null => {
  const parts = value.split("/");

  if (parts.length !== 3) return null;

  const [dayStr, monthStr, yearStr] = parts;

  if (dayStr.length !== 2 || monthStr.length !== 2 || yearStr.length !== 4) {
    return null;
  }

  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year)
  ) {
    return null;
  }

  // Basic range validation
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  // Prevent invalid dates like 31/02/2026
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

const DateSelector = ({
  value,
  onChange,
  disabled = false,
  minDate,
  maxDate,
  label = "Date",
  error,
  placeholder = "DD/MM/YYYY",
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(formatDate(value));

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep input in sync when value changes externally
  useEffect(() => {
    setInputValue(formatDate(value));
  }, [value]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (date: Date | undefined) => {
    const selectedDate = date ?? null;

    onChange(selectedDate);
    setInputValue(formatDate(selectedDate));
    setOpen(false);

    // Optional: keep focus on input
    inputRef.current?.focus();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setInputValue(newValue);

    // If the user completely clears the input
    if (newValue === "") {
      onChange(null);
      return;
    }

    // Don't update parent until a complete valid date exists
    const parsedDate = parseDate(newValue);

    if (parsedDate) {
      // Check min/max
      if (minDate && parsedDate < minDate) {
        return;
      }

      if (maxDate && parsedDate > maxDate) {
        return;
      }

      onChange(parsedDate);
    }
  };

  const handleInputBlur = () => {
    // Empty input is valid
    if (!inputValue) {
      onChange(null);
      return;
    }

    const parsedDate = parseDate(inputValue);

    if (!parsedDate) {
      // Restore the last valid value if input is invalid
      setInputValue(formatDate(value));
      return;
    }

    // Respect min/max
    if (
      (minDate && parsedDate < minDate) ||
      (maxDate && parsedDate > maxDate)
    ) {
      setInputValue(formatDate(value));
      return;
    }

    onChange(parsedDate);
    setInputValue(formatDate(parsedDate));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const parsedDate = parseDate(inputValue);

      if (parsedDate) {
        if (
          (!minDate || parsedDate >= minDate) &&
          (!maxDate || parsedDate <= maxDate)
        ) {
          onChange(parsedDate);
          setInputValue(formatDate(parsedDate));
          setOpen(false);
        }
      }

      return;
    }

    if (event.key === "Escape") {
      setInputValue(formatDate(value));
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setInputValue("");
    onChange(null);
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {/* Date input */}
      <div
        className={`
          flex
          h-11
          w-full
          items-center
          rounded-xl
          border
          bg-background
          transition
          focus-within:ring-2
          focus-within:ring-primary/20
          ${error ? "border-red-500" : "border-input hover:border-primary/50"}
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          className="
            h-full
            min-w-0
            flex-1
            rounded-xl
            bg-transparent
            px-3
            text-sm
            text-foreground
            outline-none
            placeholder:text-muted-foreground
            disabled:cursor-not-allowed
          "
        />

        {/* Clear button */}
        {inputValue && !disabled && (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              text-muted-foreground
              transition
              hover:bg-muted
              hover:text-foreground
            "
            aria-label="Clear date"
          >
            <X size={16} />
          </button>
        )}

        {/* Calendar button */}
        <button
          type="button"
          disabled={disabled}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            setOpen((prev) => !prev);
            inputRef.current?.focus();
          }}
          className="
            mr-1
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-muted-foreground
            transition
            hover:bg-muted
            hover:text-foreground
            disabled:cursor-not-allowed
          "
          aria-label="Open calendar"
        >
          <CalendarDays size={18} />
        </button>
      </div>

      {/* Calendar popover */}
      {open && !disabled && (
        <div
          className="
            absolute
            left-0
            top-full
            z-50
            mt-2
            rounded-xl
            border
            bg-background
            p-3
            shadow-lg
          "
        >
          <DayPicker
            mode="single"
            selected={value ?? undefined}
            onSelect={handleSelect}
            disabled={[
              ...(minDate ? [{ before: minDate }] : []),
              ...(maxDate ? [{ after: maxDate }] : []),
            ]}
          />
        </div>
      )}

      {/* Error */}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default DateSelector;
