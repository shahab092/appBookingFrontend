import React from "react";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

/**
 * CustomModal - A reusable modal component
 * @param {boolean} visible - Visibility of the modal
 * @param {string} title - Main title of the modal
 * @param {string} subtitle - Optional subtitle below the main title
 * @param {function} onCancel - Function to call when closing the modal
 * @param {function} onSubmit - Function to call for the primary action
 * @param {string} submitText - Text for the submit button
 * @param {boolean} loading - Loading state for the submit button
 * @param {string} width - Modal width (default: 800)
 * @param {React.ReactNode} children - Modal body content
 * @param {boolean} showSubmit - Whether to show the submit button in header
 */
export default function CustomModal({
  visible,
  title,
  subtitle,
  onCancel,
  onSubmit,
  submitText = "Submit",
  loading = false,
  width = 800,
  children,
  showSubmit = true,
  ...props
}) {
  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      onCancel={onCancel}
      centered
      width={width}
      {...props}
      className="custom-modal-container"
    >
      <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-medium shadow-lg flex flex-col">
        {/* HEADER */}
        <div className="bg-primary px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-white">
          {/* Close Button on Left */}
          <button
            type="button"
            onClick={onCancel}
            className="text-lg sm:text-xl hover:opacity-80 transition-opacity"
          >
            <CloseOutlined />
          </button>

          {/* Title and Subtitle in Middle */}
          <div className="flex-1 px-4">
            <h3 className="text-base sm:text-xl font-semibold m-0 leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[10px] sm:text-xs opacity-90 m-0 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {/* Submit Button on Right */}
          <div className="min-w-[80px] flex justify-end">
            {showSubmit && (
              <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="bg-white text-primary px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium hover:bg-opacity-90 disabled:opacity-50 transition-all"
              >
                {loading ? "..." : submitText}
              </button>
            )}
          </div>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </Modal>
  );
}
