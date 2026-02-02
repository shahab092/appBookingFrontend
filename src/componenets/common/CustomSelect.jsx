import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function CustomSelect({
  name,
  label,
  options = [],
  rules = {},
  disabled = false,
}) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <select
              value={field.value || ""}
              disabled={disabled}
              onChange={(e) => {
                field.onChange(e.target.value);

                if (rules.onChange) {
                  rules.onChange(e.target.value);
                }
              }}
              className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              } ${disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : "bg-white"}`}
            >
              <option value="">Select {label?.toLowerCase()}</option>

              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
