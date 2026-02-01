import React from "react";
import { Modal, ConfigProvider } from "antd";
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
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            padding: 0,
            paddingContentHorizontal: 0,
            paddingLG: 0,
            paddingMD: 0,
            paddingSM: 0,
            paddingXS: 0,
            margin: 0,
            contentBg: "transparent",
            headerBg: "transparent",
            boxShadow: "none",
            borderRadiusLG: 0,
          },
        },
      }}
    >
      <Modal
        open={visible}
        footer={null}
        closable={false}
        onCancel={onCancel}
        centered
        width={width}
        {...props}
      >
        <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-medium shadow-lg flex flex-col">
          {/* HEADER */}
          <div className="bg-primary text-white border-b border-primary/10 flex flex-col">
            {/* Top Row: Close Button and Submit Button (on small screens) */}
            <div className="flex justify-between items-center px-1 py-1.5 border-b border-white/5">
              {/* Close Button */}
              <button
                type="button"
                onClick={onCancel}
                className="text-lg sm:text-xl hover:opacity-80 transition-all p-1 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                <CloseOutlined />
              </button>

              {/* Submit Button (Visible only on small screens) */}
              {showSubmit && (
                <div className="sm:hidden shrink-0">
                  <button
                    type="button"
                    onClick={onSubmit}
                    disabled={loading}
                    className="bg-white text-primary px-3 py-1.5 rounded-lg text-[11px] font-bold hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center min-w-[65px]"
                  >
                    {loading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      submitText
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Row: Title and Submit Button (hidden on small screens) */}
            <div className="px-2 sm:px-4 md:px-5 py-2 sm:py-3 flex items-center justify-between gap-1 sm:gap-2 md:gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="whitespace-nowrap ">{title}</h3>
                {subtitle && (
                  <p className="text-[10px] sm:text-xs opacity-85 m-0 mt-1 font-medium leading-normal">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Submit Button (Hidden on small screens) */}
              {showSubmit && (
                <div className="hidden sm:block shrink-0">
                  <button
                    type="button"
                    onClick={onSubmit}
                    disabled={loading}
                    className="bg-white text-primary px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-bold hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all flex items-end justify-end min-w-[65px] sm:min-w-[90px]"
                  >
                    {loading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      submitText
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BODY */}
          <div className="px-3 py-4 sm:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[75vh] scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-neutral-dark">
            {children}
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
