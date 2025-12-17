import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function CustomSelect({ name, label, options = [], rules = {} }) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <select
              {...field}
              className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select {label.toLowerCase()}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
