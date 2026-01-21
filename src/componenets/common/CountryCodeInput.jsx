import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CountryCodeInput = ({
  name,
  label,
  country,
  variant = "outlined",
  height = "35px",
  disabled = false,
  showHelperText = true,
  rules,
  placeholder,
}) => {
  const { control } = useFormContext();

  const variantStyles = {
    outlined: `border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary`,
    standard: `border-b border-gray-300 rounded-none focus-within:border-primary`,
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="mb-2 block text-xs font-bold text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <div
              className={`${variantStyles[variant]} ${
                fieldState.error ? "border-red-500 ring-red-500" : ""
              } ${disabled ? "opacity-50" : ""}`}
              style={{
                height: height,
              }}
            >
              <PhoneInput
                {...field}
                country={country || "pk"}
                onChange={(value) => {
                  field.onChange(value);
                }}
                onBlur={field.onBlur}
                inputProps={{
                  name: field.name,
                  required: true,
                  autoComplete: "tel",
                  className: "!w-full !h-full",
                }}
                disabled={disabled}
                placeholder={placeholder}
                containerClass="!w-full !h-full"
                inputClass="!w-full !h-full !border-0 !bg-transparent !text-sm !outline-none !pl-12 !py-0"
                // buttonClass="!border-0 !bg-transparent !left-0 !pl-3"
                dropdownClass="!z-50 !border !border-gray-300 !rounded-lg !shadow-sm !mt-1"
                enableSearch
                searchClass="!border !border-gray-300 !rounded !p-2"
                inputStyle={{
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                  fontSize: "14px",
                  padding: "0",
                  paddingLeft: "46px", // Adjust based on flag width
                }}
                buttonStyle={{
                  background: "transparent",
                  border: "none",
                  padding: "0 8px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
                containerStyle={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
                dropdownStyle={{
                  zIndex: 9999,
                  width: "300px", // Fixed width for dropdown
                }}
              />
            </div>

            {showHelperText && fieldState.error?.message && (
              <p className="mt-1 text-[10px] text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default CountryCodeInput;
