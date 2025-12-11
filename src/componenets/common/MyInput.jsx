import React, { useState } from "react";

const MyInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  hasError = false,
  errorMessage = "Required",
  disabled = false,
  placeholder = "",
  isMarginBtm = true,
  extra = null, // 👈 extra info/icons (right side of label)
  prefixIcon = null,
  suffixIcon = null,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={isMarginBtm ? "mb-4" : ""}>
      {/* Label Row */}
      {label && (
        <div className="flex justify-between items-center mb-1">
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
      )}

      {/* Input Field */}
      <div
        className={`relative mt-1 rounded-md flex items-center ${
          hasError
            ? "border border-red-500 ring-2 ring-red-200"
            : isFocused
            ? "border border-blue-500 ring-2 ring-blue-200"
            : "border border-gray-300 shadow-sm"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
      >
        {/* Prefix Icon */}
        {prefixIcon && (
          <div className="pl-3 pr-2 flex items-center text-gray-400">
            {prefixIcon}
          </div>
        )}
        
        <input
          id={name}
          name={name}
          type={type}
          value={value || ""}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={placeholder}
          className={`flex-1 rounded-md py-2 ${
            prefixIcon ? "pl-0" : "pl-3"
          } ${
            suffixIcon ? "pr-0" : "pr-3"
          } text-sm text-gray-900 outline-none
            ${disabled ? "bg-gray-100 text-gray-400" : "bg-white"}
            ${hasError ? "border-red-500" : ""}
          `}
        />
        
        {/* Suffix Icon */}
        {suffixIcon && (
          <div className="pr-3 pl-2 flex items-center text-gray-400">
            {suffixIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInput;
