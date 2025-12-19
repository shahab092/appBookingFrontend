import React, { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Search } from "lucide-react";

const CustomTextField = ({
  name,
  type = "text",
  variant = "outlined",
  rules,
  label,
  height = "56px", // default height consistent with select
  onBlur,
  minRows,
  maxRows,
  onFocus,
  disabled,
  multiline,
  maxLength,
  allowOnly,
  placeholder,
  autoComplete,
  readOnly = false,
  showHelperText = true,
  endAdornment,
  showSearchIcon = false,
}) => {
  const { control } = useFormContext();

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;

      const patterns = {
        numeric: /[^0-9]/g,
        decimal: /[^0-9.]/g,
        alphabetic: /[^a-zA-Z]/g,
        alphanumeric: /[^a-zA-Z0-9]/g,
      };

      if (allowOnly && patterns[allowOnly]) {
        e.target.value = value.replace(patterns[allowOnly], "");
      }

      if (maxLength && e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
      }
    },
    [allowOnly, maxLength]
  );

  const variantStyles = {
    outlined: `border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500`,
    standard: `border-b border-gray-300 rounded-none focus-within:border-blue-500`,
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-xs font-bold text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const InputComponent = multiline ? "textarea" : "input";

          return (
            <>
              <div
                className={`form-input  ${variantStyles[variant]} ${
                  fieldState.error ? "border-red-500 ring-red-500" : ""
                } ${disabled ? "opacity-50" : ""}`}
                style={{
                  height: multiline ? "auto" : height, // same as select
                  minHeight: "39px", // ensures minimum height consistency
                }}
              >
                {showSearchIcon && (
                  <Search className="mr-2 h-4 w-4 text-gray-400" />
                )}

                <InputComponent
                  {...field}
                  rows={minRows}
                  type={multiline ? undefined : type}
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={readOnly}
                  autoComplete={autoComplete}
                  onInput={handleInputChange}
                  onBlur={(e) => {
                    field.onBlur();
                    onBlur?.(e);
                  }}
                  onFocus={onFocus}
                  className={`w-full bg-transparent text-sm outline-none placeholder-gray-400 resize-none h-full`}
                />

                {endAdornment && (
                  <div className="ml-2 flex items-center">{endAdornment}</div>
                )}
              </div>

              {showHelperText && fieldState.error?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default CustomTextField;
