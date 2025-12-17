import React, { useState } from "react";

const CustomSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  hasError = false,
  errorMessage = "Required",
  disabled = false,
  placeholder = "Select...",
  isMarginBtm = true,
  extra = null,
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
        {extra && <div className="flex items-center gap-2 text-gray-500 text-sm">{extra}</div>}
      </div>

      {/* Select Field */}
      <div
        className={`relative mt-1 rounded-md ${
          hasError
            ? "border border-red-500 ring-2 ring-red-200"
            : isFocused
            ? "border border-blue-500 ring-2 ring-blue-200"
            : "border border-gray-300 shadow-sm"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      >
        <select
          name={name || "Select"}
          value={value || ""}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`w-full rounded-md py-2 pl-3 pr-8 text-sm text-gray-900 outline-none appearance-none 
            ${disabled ? "bg-gray-100 text-gray-400 border-gray-300" : "bg-white"}
            ${hasError ? "border-red-500" : ""}
          `}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.key || opt.label} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
          ▼
        </span>
      </div>
    </div>
  );
};

export default CustomSelect;
