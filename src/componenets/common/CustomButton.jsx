import React from "react";

const CustomButton = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // "primary" | "secondary" | "danger"
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  const baseStyles = `
    inline-flex items-center justify-center rounded-md font-medium
    transition-all duration-200 focus:outline-none
    px-4 py-2 text-sm
  `;

  const variants = {
    primary: `
      bg-blue-600 text-white hover:bg-blue-700
      focus:ring-2 focus:ring-blue-200
      disabled:bg-blue-300 disabled:cursor-not-allowed
    `,
    secondary: `
      bg-gray-100 text-gray-800 hover:bg-gray-200
      focus:ring-2 focus:ring-gray-300
      disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-700
      focus:ring-2 focus:ring-red-200
      disabled:bg-red-300 disabled:cursor-not-allowed
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default CustomButton;
