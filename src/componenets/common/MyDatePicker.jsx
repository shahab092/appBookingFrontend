import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const MyDatePicker = ({
  label,
  name,
  value,
  onChange,
  required = false,
  hasError = false,
  errorMessage = "Required",
  disabled = false,
  placeholder = "Select date",
  isMarginBtm = true,
  extra = null, // 👈 extra info/icons (right side of label)
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={isMarginBtm ? "mb-4" : ""}>
      {/* Label Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <label
            htmlFor={name}
            className={`font-semibold text-sm mb-0 ${
              hasError ? "text-red-500" : "text-gray-900"
            } ${disabled ? "text-gray-400 cursor-not-allowed" : ""}`}
          >
            {label}
          </label>
          {required && <span className="text-red-500 ml-0.5">*</span>}
          {hasError && !disabled && (
            <span className="text-red-500 text-xs ml-1">({errorMessage})</span>
          )}
        </div>

        {/* Extra item on right */}
        {extra && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            {extra}
          </div>
        )}
      </div>

      {/* Date Picker */}
      <div
        className={`relative mt-1 rounded-md ${
          hasError
            ? "border border-red-500 ring-2 ring-red-200"
            : isFocused
            ? "border border-blue-500 ring-2 ring-blue-200"
            : "border border-gray-300 shadow-sm"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      >
        <DatePicker
          id={name}
          name={name}
          value={value ? dayjs(value) : null}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          format="YYYY-MM-DD"
          className={`w-full rounded-md py-2 px-3 text-sm 
            ${disabled ? "bg-gray-100 text-gray-400" : "bg-white"}
            ${hasError ? "border-red-500" : ""}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default MyDatePicker;
